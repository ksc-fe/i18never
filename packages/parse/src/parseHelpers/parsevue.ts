import { parse } from '@vue/compiler-sfc';
import {
    ElementNode,
    AttributeNode,
    DirectiveNode,
    TemplateChildNode,
    SimpleExpressionNode,
} from '@vue/compiler-core';
import { TempKeyItem, StartLocation } from '../types';
import { hasChinese, walkTree } from '../utils';
import parseJs from './parsejs';

export default async function parseVue(
    source: string,
    filename: string
): Promise<TempKeyItem[]> {
    const keys: TempKeyItem[] = [];
    const descriptor = parse(source).descriptor;
    const TemplateAst = descriptor?.template?.ast;
    const ScriptContent = descriptor?.script?.content || '';
    const ScriptRootLine = descriptor?.script?.loc?.start.line;
    const ScriptSetupAst = descriptor?.scriptSetup;
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
                    hasChinese((node.exp as SimpleExpressionNode)?.content))
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
                            (node.exp as SimpleExpressionNode).loc.start,
                            node.type
                        );
                        break;
                    case 6:
                        content = node.value?.content as string;
                        loc = formatLoc(node.value?.loc?.start, node.type);
                        break;
                    case 5:
                        content = parseJs(
                            (node.content as SimpleExpressionNode)?.content,
                            filename,
                            true
                        );
                        loc = formatLoc(node.content.loc.start, node.type);
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
                                tags: null,
                            });
                        });
                    } else {
                        keys.push({
                            filename: filename,
                            key: content as string,
                            loc,
                            prefix: '',
                            tags: null,
                        });
                    }
                }
            }
        },
    });

    const aa = parseJs(ScriptContent, filename, false, ScriptRootLine);
    keys.push(...aa);
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
