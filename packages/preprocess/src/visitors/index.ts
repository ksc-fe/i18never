import { TraverseOptions } from '@babel/traverse';
import {
    ImportDeclaration,
    ObjectProperty,
    StringLiteral,
    TemplateLiteral,
    Context as BaseContext,
    KeyItem as BaseKeyItem,
} from '@i18never/shared';
import * as t from '@babel/types';
import { JSXText } from './JSXText';

type TextNode = t.StringLiteral | t.TemplateLiteral | t.JSXText;
export type KeyItem = BaseKeyItem<TextNode>;
export type Context = BaseContext<TextNode>;

export const visitors: TraverseOptions<Context> = {
    ImportDeclaration,
    ObjectProperty,
    StringLiteral,
    TemplateLiteral,
    JSXText,
};
