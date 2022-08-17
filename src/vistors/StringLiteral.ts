import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import { SkipStringLieteral } from './Program';

export function StringLiteral(
    path: NodePath<t.StringLiteral | SkipStringLieteral>
) {
    const node = path.node;

    if (node.extra?.skip || !path.node.value.trim()) return;

    // console.log(path.node, path.node.value);
    path.replaceWith(t.callExpression(t.identifier('_$'), [node]));
    path.skip();
}
