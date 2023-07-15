import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import { options, Context, ImportDeclaration as BaseImportDeclaration } from '@i18never/shared';

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

    BaseImportDeclaration.call(this, path);
}
