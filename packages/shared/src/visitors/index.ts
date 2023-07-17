import { ImportDeclaration } from './ImportDeclaration';
import { ObjectProperty } from './ObjectProperty';
import { Text } from './Text';
import { TemplateLiteral } from './TemplateLiteral';
import { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { StringLiteral } from 'typescript';

export type Tags = Record<string, string>;
export type SourceLocation = {
    line: number;
    column: number;
};

export type KeyItem<T> = {
    key: string;
    tags: Tags | null;
    loc: SourceLocation;
    entity: T;
    identifier: string | null;
};

export type Context<T extends t.Node = t.Node> = {
    keys: KeyItem<NodePath<T>>[];
    // indicate how much should the location be offset
    rootLoc?: SourceLocation;
    // hasImportedModule?: boolean;
    // indicate whether we need use regexp to check string, because we only
    // need to do this when we are tagging the string, but when we are transfoming
    // we don't need it.
    // useRegexp?: boolean;
};

const StringLiteral = Text<t.StringLiteral>;

export {
    ImportDeclaration,
    ObjectProperty,
    StringLiteral,
    TemplateLiteral,
    Text,
};
