import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import { SkipStringLieteral } from './Program';
import { options } from '../options';
import { Context, parseString } from '../helpers';

export function StringLiteral(
    this: Context,
    path: NodePath<t.StringLiteral | SkipStringLieteral>
) {
    const node = path.node;

    if (node.extra?.skip) return;

    const value = path.node.value.trim();
    if (!value || !options.matchRegexp.test(value)) return;

    let params: t.Expression[];
    const { key, tags } = parseString(value);
    if (tags !== null) {
        params = [t.stringLiteral(key)];
    } else {
        params = [node];
    }

    path.skip();

    this.keys.push({
        key,
        tags,
        params,
        callback() {
            path.replaceWith(t.callExpression(t.identifier('_$'), params));
        },
    });
}
