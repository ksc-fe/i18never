import { parse } from '@vue/compiler-sfc';
import {
    ElementNode,
    AttributeNode,
    DirectiveNode,
    TemplateChildNode,
    SimpleExpressionNode,
} from '@vue/compiler-core';
import { KeyItem } from '../types';
import { hasChinese, walkTree } from './utils';

export default async function parseVue(
    source: string,
    filename: string
): Promise<KeyItem[]> {
    const keys: KeyItem[] = [];
    const descriptor = parse(source).descriptor;
    const ast = descriptor?.template?.ast;
    walkTree(ast as ElementNode, {
        onEachBefore(node: AttributeNode | DirectiveNode | TemplateChildNode) {
            if (
                (node.type === 2 && hasChinese(node?.content)) ||
                (node.type === 7 &&
                    hasChinese((node.exp as SimpleExpressionNode)?.content)) ||
                (node.type === 6 &&
                    node.value?.content &&
                    hasChinese(node.value?.content))
            ) {
                let content = '';
                switch (node.type) {
                    case 2:
                        content = node.content;
                        break;
                    case 7:
                        content = (node.exp as SimpleExpressionNode)?.content;
                        break;
                    case 6:
                        content = node.value?.content as string;
                        break;
                }
                keys.push({
                    filename: filename,
                    key: content,
                    loc: node.loc,
                });
            }
        },
    });
    return keys;
}
