import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';

export function ImportDeclaration(path: NodePath<t.ImportDeclaration>) {
    path.skipKey('source');
}
