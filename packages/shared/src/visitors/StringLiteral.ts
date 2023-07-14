import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import { SkipStringLieteral } from './Program';
import { parseString, options } from '../helpers';
import type { Context } from '.';

export function StringLiteral(
    this: Context,
    path: NodePath<t.StringLiteral | SkipStringLieteral>
) {
    const node = path.node;

    if (node.extra?.skip) return;

    const value = path.node.value;
    if (!value || !options.matchRegexp.test(value)) return;

    const { key, tags, identifier } = parseString(value);

    path.skip();

    this.keys.push({
        key,
        tags,
        identifier,
        loc: node.loc!,
        path,
    });
}
