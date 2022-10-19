import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';

export function ObjectProperty(path: NodePath<t.ObjectProperty>) {
    path.skipKey('key');
}
