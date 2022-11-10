import { WalkTreeOptions } from '../types';
import { ElementNode } from '@vue/compiler-core';

const MatchRegexp = /[\u4E00-\u9FFF]+/;

export function hasChinese(content: string): boolean {
    return MatchRegexp.test(content);
}

export function matchFileType(filename: string) {
    const fileMatch = filename.match(/\.(pug|vue)$/) || [];
    return filename && fileMatch ? fileMatch[1] : '';
}

/**
 *
 * @param rootNodes
 * @param opts
 */
export function walkTree(
    rootNodes: ElementNode | undefined,
    opts: WalkTreeOptions
) {
    if (rootNodes && rootNodes.props.length) {
        (rootNodes.props || []).map((prop) => {
            opts.onEachBefore!(prop);
        });
    }
    if (rootNodes && rootNodes.children.length) {
        (rootNodes.children || []).map((node) => {
            opts.onEachBefore!(node);
            if (node.type === 1) {
                walkTree(node, opts);
            }
        });
    }
}
