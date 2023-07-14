import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import { options } from '../helpers';

export type SkipStringLieteral = t.StringLiteral & {
    extra: { skip: boolean };
};

export function skipStringLiteral(value: string) {
    const node = t.stringLiteral(value) as SkipStringLieteral;
    node.extra = { skip: true };
    return node;
}

export function Program(path: NodePath<t.Program>) {
    const identifier = t.identifier(`{ ${options.clientFunction} }`);
    const importDefaultSpecifier = t.importDefaultSpecifier(identifier);
    const importDeclaration = t.importDeclaration(
        [importDefaultSpecifier],
        skipStringLiteral(options.clientModule)
    );
    path.unshiftContainer('body', importDeclaration);
}
