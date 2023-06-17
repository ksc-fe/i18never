import * as t from '@babel/types';
import { WalkTreeOptions, KeyWithTags, Tags } from './types';
import { ElementNode, DirectiveNode, ExpressionNode } from '@vue/compiler-core';
import options from './config';

/**
 * Check if it is in Chinese and ignore those marked with ignore
 * @param content
 * @returns
 */
export function hasChinese(content: string): boolean {
    return (
        !options.matchIgnoreRE.test(content) &&
        options.matchChineseRE.test(content)
    );
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
    let defaultIndex = 0;
    let allIsDefault = true;
    const matches = str.match(options.matchPrefixRE);
    if (!matches) return { key: str, tags: null, allIsDefault };

    const tagStr = matches[2].trim();
    const key = matches[3];
    const tags = !tagStr
        ? {}
        : tagStr
              .split(/\s*,\s*/)
              .reduce(
                  (
                      memo: Tags,
                      item: string,
                      index: number,
                      array: string[]
                  ) => {
                      const [language = '', name = ''] = item.split('=');
                      if (!name) defaultIndex++;
                      memo[language] = name || '';
                      allIsDefault = defaultIndex === array.length;
                      return memo;
                  },
                  {}
              );

    return { key, tags, allIsDefault };
}

/**
 * tags Convert to objectProperty type function
 * @param str
 * @returns
 */
export function parseTags(tags: Tags): Array<t.ObjectProperty> {
    const astTags: Array<t.ObjectProperty> = [];
    Object.keys(tags).forEach((key) => {
        if (tags[key]) {
            astTags.push(
                t.objectProperty(t.identifier(key), t.stringLiteral(tags[key]))
            );
        }
    });

    return astTags;
}
