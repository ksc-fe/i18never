import {
    baseParse as vueBaseParse,
    NodeTypes,
    Node as VueNode,
    RootNode,
    InterpolationNode,
    SimpleExpressionNode,
    TextNode,
} from '@vue/compiler-core';
import { parse as jsParse } from './js';
import { KeyItem } from './';
import { parseString, SourceLocation, getLoc } from '@i18never/shared';

export type Entity = TextNode;
export type VueVisitors = {
    SimpleExpression(node: SimpleExpressionNode): void;
    Text(node: TextNode): void;
};

export function parseTemplate(value: string, rootLoc?: SourceLocation) {
    const keys: KeyItem[] = [];
    const ast = vueBaseParse(value);
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

function walkTemplateNode(node: VueNode, visitors: VueVisitors) {
    switch (node.type) {
        case NodeTypes.ROOT:
            (node as RootNode).children.forEach((node) =>
                walkTemplateNode(node, visitors)
            );
            break;
        case NodeTypes.ELEMENT:
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
    }
}
