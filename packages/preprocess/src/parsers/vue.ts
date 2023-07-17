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
import { KeyItem } from './';
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

    keys.push(...getTemplateKeys(descriptor.template?.ast));

    return keys;
}

export function parseTemplate(value: string, rootLoc?: SourceLocation) {
    return getTemplateKeys(vueBaseParse(value), rootLoc);
}

function getTemplateKeys(ast: VueNode | undefined, rootLoc?: SourceLocation) {
    const keys: KeyItem[] = [];
    walkTemplateNode(ast, {
        SimpleExpression(node) {
            keys.push(
                ...jsParse(node.content, getLoc(node.loc.start, rootLoc, 1))
            );
        },
        Text(node) {
            keys.push({
                ...parseString(node.content),
                loc: getLoc(node.loc.start, rootLoc, 1),
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
