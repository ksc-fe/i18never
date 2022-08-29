import { ImportDeclaration } from './ImportDeclaration';
import { ObjectProperty } from './ObjectProperty';
import { Program } from './Program';
import { StringLiteral } from './StringLiteral';
import { TemplateLiteral } from './TemplateLiteral';
import { TraverseOptions } from '@babel/traverse';
import { Context } from '../helpers';

export const visitor: TraverseOptions<Context> = {
    ImportDeclaration,
    ObjectProperty,
    Program,
    StringLiteral,
    TemplateLiteral,
};
