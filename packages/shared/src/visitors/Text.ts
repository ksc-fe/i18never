import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import { parseString } from '../helpers';
import type { Context } from '.';

export function Text<T extends t.StringLiteral | t.JSXText>(
    this: Context,
    path: NodePath<T>
) {
    const node = path.node;
    const value = node.value;
    if (!value) return;

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
