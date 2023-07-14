import { ImportDeclaration } from './ImportDeclaration';
import { ObjectProperty } from './ObjectProperty';
import { Program } from './Program';
import { StringLiteral } from './StringLiteral';
import { TemplateLiteral } from './TemplateLiteral';
import { TraverseOptions, NodePath } from '@babel/traverse';
import * as t from '@babel/types';

export type Tags = Record<string, string>;

export type KeyItem = {
    key: string;
    tags: Tags | null;
    loc: t.SourceLocation;
    path: NodePath<t.StringLiteral | t.TemplateLiteral>;
    identifier: string | null;
};

export type Context = {
    keys: KeyItem[];
};

export {
    ImportDeclaration,
    ObjectProperty,
    Program,
    StringLiteral,
    TemplateLiteral,
};

export const visitors: TraverseOptions<Context> = {
    ImportDeclaration,
    ObjectProperty,
    Program,
    StringLiteral,
    TemplateLiteral,
};
