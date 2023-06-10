import { parse } from '@vue/compiler-sfc';
import {
    ElementNode,
    AttributeNode,
    DirectiveNode,
    TemplateChildNode,
    SimpleExpressionNode,
} from '@vue/compiler-core';
import { TempKeyItem, StartLocation } from '../types';
import { hasChinese, walkTree, parseString } from '../utils';
import parseJs from './parsejs';
import parsePug from './parsepug';

export default async function parseVue(
    source: string,
    filename: string
): Promise<TempKeyItem[]> {
    const keys: TempKeyItem[] = [];
    const descriptor = parse(source).descriptor;
    const TemplateAst = descriptor?.template?.ast;
    const TemplateContent = descriptor?.template?.content || '';
    const TemplateLang = descriptor?.template?.lang || '';
    const TemplateLangRootLine = descriptor?.template?.loc?.start.line || 1;
    const ScriptContent = descriptor?.script?.content || '';
    const ScriptRootLine = descriptor?.script?.loc?.start.line;
    const ScriptSetupAst = descriptor?.scriptSetup?.content || '';
    const SetupRootLine = descriptor?.scriptSetup?.loc?.start.line;

    switch (TemplateLang) {
        case 'pug':
            keys.push(
                ...(await parsePug(
                    TemplateContent,
                    filename,
                    TemplateLangRootLine
                ))
            );
            break;
        default:
            walkTree(TemplateAst as ElementNode, {
                onEachBefore(
                    node:
                        | AttributeNode
                        | DirectiveNode
                        | TemplateChildNode
                        | SimpleExpressionNode
                ) {
                    if (
                        (node.type === 2 && hasChinese(node?.content)) ||
                        (node.type === 5 &&
                            hasChinese(
                                (node.content as SimpleExpressionNode)?.content
                            )) ||
                        (node.type === 6 &&
                            node.value?.content &&
                            hasChinese(node.value?.content)) ||
                        (node.type === 7 &&
                            hasChinese(
                                (node.exp as SimpleExpressionNode)?.content
                            ))
                    ) {
                        let content: string | TempKeyItem[] = '';
                        let loc: StartLocation | null = {
                            line: -1,
                            column: -1,
                        };
                        switch (node.type) {
                            case 2:
                                content = node.content;
                                loc = formatLoc(node.loc.start, node.type);
                                break;
                            case 7:
                                content = parseJs(
                                    (node.exp as SimpleExpressionNode)?.content,
                                    filename,
                                    true
                                );
                                loc = formatLoc(
                                    (node.exp as SimpleExpressionNode).loc
                                        .start,
                                    node.type
                                );
                                break;
                            case 6:
                                content = node.value?.content as string;
                                loc = formatLoc(
                                    node.value?.loc?.start,
                                    node.type
                                );
                                break;
                            case 5:
                                content = parseJs(
                                    (node.content as SimpleExpressionNode)
                                        ?.content,
                                    filename,
                                    true
                                );
                                loc = formatLoc(
                                    node.content.loc.start,
                                    node.type
                                );
                                break;
                        }
                        if (loc) {
                            if (Array.isArray(content)) {
                                content.forEach((it) => {
                                    keys.push({
                                        filename: filename,
                                        key: it.key,
                                        loc: formatJsLoc(it.loc, loc!),
                                        prefix: '',
                                        tags: it.tags,
                                    });
                                });
                            } else {
                                const { tags, key } = parseString(
                                    content as string
                                );
                                keys.push({
                                    filename: filename,
                                    key,
                                    loc,
                                    prefix: '',
                                    tags,
                                });
                            }
                        }
                    }
                },
            });
            break;
    }

    const scriptKeys =
        descriptor.script !== null
            ? parseJs(ScriptContent, filename, false, ScriptRootLine)
            : [];
    const setupKeys =
        descriptor.scriptSetup !== null
            ? parseJs(ScriptSetupAst, filename, false, SetupRootLine)
            : [];
    keys.push(...scriptKeys, ...setupKeys);
    return keys;
}

function formatLoc(loc, type) {
    let column = 0;
    if (!loc.line || !loc.column) {
        return null;
    }
    column = type === 2 ? loc.column - 1 : loc.column;
    return {
        line: loc.line - 1,
        column,
    };
}

function formatJsLoc(
    templateJsLoc: StartLocation,
    originLoc: StartLocation
): StartLocation {
    const line = originLoc.line;
    const column = templateJsLoc.column + +originLoc.column;

    return {
        line,
        column,
    };
}
