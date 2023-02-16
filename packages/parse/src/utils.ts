import { WalkTreeOptions, KeyWithTags, Tags } from './types';
import { ElementNode, DirectiveNode, ExpressionNode } from '@vue/compiler-core';
import options from './config';

/**
 * Check whether it is in Chinese
 * @param content
 * @returns
 */
export function hasChinese(content: string): boolean {
    return options.matchChineseRE.test(content);
}

/**
 *
 * @param filename
 * @returns
 */
export function matchFileType(filename: string) {
    if (!filename) return;
    const fileMatch = filename.match(/\.(pug|vue|tsx|jsx|js|ts)$/) || [];
    return fileMatch ? fileMatch[1] : '';
}

export function deepCopy(data) {
    let obj = {};
    if (Array.isArray(data)) {
        obj = [];
        data.forEach((item, index) => {
            obj[index] = deepCopy(item);
        });
        return obj;
    } else if (data instanceof Object) {
        Object.keys(data).map((key) => {
            obj[key] = deepCopy(data[key]);
        });
        return obj;
    } else {
        return data;
    }
}

/**
 * Traversal tree content
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
            if ((prop as DirectiveNode)?.exp) {
                opts.onEachBefore!(
                    (prop as DirectiveNode).exp as ExpressionNode
                );
            }
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

/**
 *
 * @param str
 * @returns
 */
export function parseString(str: string): KeyWithTags {
    const matches = str.match(options.matchPrefixRE);
    if (!matches) return { key: str, tags: null, identifier: null };

    const identifier = matches[1].trim();
    const tagStr = matches[2].trim();
    const key = matches[3];
    const tags = !tagStr
        ? {}
        : tagStr.split(/\s*,\s*/).reduce((memo, item) => {
              const [language, name] = item.split('=');
              memo[language] = name || '';

              return memo;
          }, {} as Tags);

    return { key, tags, identifier: identifier };
}
