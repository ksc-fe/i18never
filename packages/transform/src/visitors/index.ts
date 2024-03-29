import {
    ObjectProperty,
    StringLiteral,
    TemplateLiteral,
    Context as BaseContext,
    KeyItem as BaseKeyItem,
    MemberExpression,
} from '@i18never/shared';
import { ImportDeclaration } from './ImportDeclaration';
import { TraverseOptions, NodePath } from '@babel/traverse';
import * as t from '@babel/types';

type TextNode = t.StringLiteral | t.TemplateLiteral;
export type KeyItem = BaseKeyItem<NodePath<TextNode>>;
export type Context = BaseContext<TextNode> & {
    hasImportedModule: boolean;
};

export const visitors: TraverseOptions<Context> = {
    ImportDeclaration,
    ObjectProperty,
    StringLiteral,
    TemplateLiteral,
    MemberExpression,
};
