import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import options from '../helpers/options';
import { Context } from './';

export function Program(this: Context, path: NodePath<t.Program>) {
    const identifier = t.identifier('{ $_ }');
    const importDefaultSpecifier = t.importDefaultSpecifier(identifier);
    const importDeclaration = t.importDeclaration(
        [importDefaultSpecifier as t.ImportDefaultSpecifier],
        t.stringLiteral(options.clientModule)
    );

    path.unshiftContainer('body', importDeclaration);
}
