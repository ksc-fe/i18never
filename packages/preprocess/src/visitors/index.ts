import { StringLiteral } from './StringLiteral';
import { TemplateLiteral } from './TemplateLiteral';
import { Program } from './Program';
import { JSXText } from './JSXText';
import { TraverseOptions } from '@babel/traverse';
import * as t from '@babel/types';

export type Tags = Record<string, string>;

export type KeyItem = {
    key: string;
    filename: string;
    loc?: t.SourceLocation | null;
    prefix: string;
    tags: Tags | null;
    jsx?: boolean;
};

export type Context = {
    keys: KeyItem[];
    filename: string;
};

const visitor: TraverseOptions<Context> = {
    JSXText,
    Program,
    StringLiteral,
    TemplateLiteral,
};

export default visitor;
