import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import { options } from '../helpers';
import type { Context } from '.';

export function ImportDeclaration(
    this: Context,
    path: NodePath<t.ImportDeclaration>
) {
    path.skipKey('source');
}
