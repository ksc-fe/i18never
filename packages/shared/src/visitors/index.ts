import { ImportDeclaration } from './ImportDeclaration';
import { ObjectProperty } from './ObjectProperty';
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
    hasImportedModule?: boolean;
    // indicate whether we need use regexp to check string, because we only
    // need to do this when we are tagging the string, but when we are transfoming
    // we don't need it.
    // useRegexp?: boolean;
};

export { ImportDeclaration, ObjectProperty, StringLiteral, TemplateLiteral };
