import { parse as babelParse, ParseResult } from '@babel/parser';
import traverse, { NodePath } from '@babel/traverse';
import {
    ImportDeclaration,
    ObjectProperty,
    StringLiteral,
    TemplateLiteral,
    MemberExpression,
    TSTypeLiteral,
    Context as BaseContext,
    Text,
    SourceLocation,
} from '@i18never/shared';
import * as t from '@babel/types';

type TextNode = t.StringLiteral | t.TemplateLiteral | t.JSXText;
export type Entity = NodePath<TextNode>;
export type Context = BaseContext<TextNode>;

// const defaultRootLoc: SourceLocation = { line: 1, column: 0 };
export function parse(
    source: string,
    // because the column of location of babel parser starts from 0, but the others, e.g.
    // Vue/Pug, start from 1. We use column here starting from 0 to keep
    // consistent with them.
    rootLoc?: SourceLocation
) {
    const ast = babelParse(source, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
    });

    return getContext(ast, rootLoc).keys;
}

function getContext(ast: ParseResult<t.File>, rootLoc?: SourceLocation) {
    const context: Context = {
        keys: [],
        rootLoc,
    };

    traverse(
        ast,
        {
            ImportDeclaration,
            ObjectProperty,
            StringLiteral,
            TemplateLiteral,
            JSXText: Text<t.JSXText>,
            MemberExpression,
            TSTypeLiteral,
        },
        undefined,
        context
    );

    return context;
}
