import { TraverseOptions } from '@babel/traverse';
import {
    ImportDeclaration,
    ObjectProperty,
    StringLiteral,
    TemplateLiteral,
    Context,
} from '@i18never/shared';
import { JSXText } from './JSXText';

export const visitors: TraverseOptions<Context> = {
    ImportDeclaration,
    ObjectProperty,
    StringLiteral,
    TemplateLiteral,
    JSXText,
};
