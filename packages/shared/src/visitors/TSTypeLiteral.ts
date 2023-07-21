import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';

export function TSTypeLiteral(path: NodePath<t.TSTypeLiteral>) {
    path.skip();
}
