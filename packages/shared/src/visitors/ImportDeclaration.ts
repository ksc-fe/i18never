import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import { options } from '../helpers';
import type { Context } from '.';

export function ImportDeclaration(
    this: Context,
    path: NodePath<t.ImportDeclaration>
) {
    const {
        node: { source, specifiers },
    } = path;
    if (source.extra?.rawValue === options.clientModule) {
        if (
            specifiers.find((specifier) => {
                return (
                    t.isImportSpecifier(specifier) &&
                    t.isIdentifier(specifier.imported) &&
                    specifier.imported.name === options.clientFunction
                );
            })
        ) {
            this.hasImportedModule = true;
        }
    }

    path.skipKey('source');
}
