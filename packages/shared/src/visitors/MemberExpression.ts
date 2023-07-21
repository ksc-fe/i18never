import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';

export function MemberExpression(path: NodePath<t.MemberExpression>) {
    path.skipKey('property');
}
