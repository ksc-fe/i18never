import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import { parseString, getLoc } from '../helpers';
import type { Context } from '.';

export function Text<T extends t.StringLiteral | t.JSXText>(
    this: Context,
    path: NodePath<T>
) {
    const node = path.node;
    const value = node.value;
    if (!value) return;

    path.skip();

    const { line, column } = getLoc(node.loc!.start, this.rootLoc);
    this.keys.push({
        ...parseString(value),
        // forward one column because of the quote mark
        loc: { line, column: t.isStringLiteral(node) ? column + 1 : column },
        entity: path,
    });
}
