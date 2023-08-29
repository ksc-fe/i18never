import {
    baseParse as vueBaseParse,
    NodeTypes,
    Node as VueNode,
    InterpolationNode,
    SimpleExpressionNode,
    TextNode,
    ElementNode,
    AttributeNode,
    DirectiveNode,
} from '@vue/compiler-core';
import { parse as jsParse } from './js';
import { KeyItem, pugParse } from './';
import { parseString, SourceLocation, getLoc } from '@i18never/shared';
import { parse as vueParse } from '@vue/compiler-sfc';

export type Entity = TextNode;
export type VueVisitors = {
    SimpleExpression(node: SimpleExpressionNode): void;
    Text(node: TextNode): void;
};

export function parse(source: string) {
    const keys: KeyItem[] = [];
    const { descriptor } = vueParse(source);
    const { template, script, scriptSetup } = descriptor;

    if (template) {
        const rootLoc = getLoc(template.loc.start, null, 1);
        if (template.lang === 'pug') {
            keys.push(...pugParse(template.content, rootLoc));
        } else {
            keys.push(...getTemplateKeys(template.ast));
        }
    }

    if (script) {
        keys.push(
            ...jsParse(script.content, getLoc(script.loc.start, null, 1))
        );
    }

    if (scriptSetup) {
        keys.push(
            ...jsParse(
                scriptSetup.content,
                getLoc(scriptSetup.loc.start, null, 1)
            )
        );
    }

    return keys;
}

export function parseTemplate(value: string, rootLoc?: SourceLocation) {
    return getTemplateKeys(vueBaseParse(value), rootLoc);
}

export function parseSimpleExpression(
    value: string,
    loc: SourceLocation,
    rootLoc?: SourceLocation
) {
    // we must use a pair of bracket to wrap the value, so that the js parser
    // can parse it. The startNumber should also add 1 (1 + 1 = 2)
    // i.e.: { a: true } => ({ a: true })
    return jsParse(`(${value})`, getLoc(loc, rootLoc, 2));
}

function getTemplateKeys(ast: VueNode | undefined, rootLoc?: SourceLocation) {
    const keys: KeyItem[] = [];
    walkTemplateNode(ast, {
        SimpleExpression(node) {
            keys.push(
                ...parseSimpleExpression(node.content, node.loc.start, rootLoc)
            );
        },
        Text(node) {
            const content = node.content;
            if (!content.trim()) return;

            const nodeLoc = node.loc;
            const loc = getLoc(nodeLoc.start, rootLoc, 1);
            if (nodeLoc.source !== content) {
                // if source isn't equal to content, it indicates
                // the content has quotes, so forward one column
                // i.e. <div a="测试"></div>
                loc.column++;
            }

            keys.push({
                ...parseString(content),
                loc,
                entity: node,
            });
        },
    });

    return keys;
}

function walkTemplateNode(node: VueNode | undefined, visitors: VueVisitors) {
    if (!node) return;

    switch (node.type) {
        case NodeTypes.ROOT:
        case NodeTypes.ELEMENT:
            if (node.type === NodeTypes.ELEMENT) {
                (node as ElementNode).props.forEach((attr) => {
                    walkTemplateNode(attr, visitors);
                });
            }
            (node as ElementNode).children.forEach((node) =>
                walkTemplateNode(node, visitors)
            );
            break;
        case NodeTypes.TEXT:
            visitors.Text(node as TextNode);
            break;
        case NodeTypes.INTERPOLATION:
            walkTemplateNode((node as InterpolationNode).content, visitors);
            break;
        case NodeTypes.SIMPLE_EXPRESSION:
            visitors.SimpleExpression(node as SimpleExpressionNode);
            break;
        case NodeTypes.ATTRIBUTE:
            walkTemplateNode((node as AttributeNode).value, visitors);
            break;
        case NodeTypes.DIRECTIVE:
            walkTemplateNode((node as DirectiveNode).exp, visitors);
            break;
    }
}
