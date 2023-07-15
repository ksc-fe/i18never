import { ObjectProperty, StringLiteral, TemplateLiteral, Context } from '@i18never/shared';
import { ImportDeclaration } from './ImportDeclaration';
import { TraverseOptions, NodePath } from '@babel/traverse';

export const visitors: TraverseOptions<Context> = {
    ImportDeclaration,
    ObjectProperty,
    StringLiteral,
    TemplateLiteral,
};
