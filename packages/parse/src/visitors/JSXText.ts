import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import options from '../config';
import { parseString } from '../utils';
import { JsContext } from '../types';

export function JSXText(this: JsContext, path: NodePath<t.JSXText>) {
    const node = path.node;

    if (node.extra?.skip) return;

    const value = node.value.trim();
    if (!value || !options.matchChineseRE.test(value)) return;

    const { tags, key } = parseString(value);
    path.skip();

    this.keys.push({
        key,
        prefix: '',
        filename: this.filename,
        loc: node.loc?.start || {
            line: -1,
            column: -1,
        },
        jsx: true,
        tags,
    });
}
