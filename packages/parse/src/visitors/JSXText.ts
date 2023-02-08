import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import options from '../config';
import { JsContext } from '../types';

export function JSXText(this: JsContext, path: NodePath<t.JSXText>) {
    const node = path.node;

    if (node.extra?.skip) return;

    const key = node.value.trim();
    if (!key || !options.matchChineseRE.test(key)) return;
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
    });
}
