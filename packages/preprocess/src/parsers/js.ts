import { parse as babelParse, ParseResult } from '@babel/parser';
import traverse, { NodePath } from '@babel/traverse';
import {
    ImportDeclaration,
    ObjectProperty,
    StringLiteral,
    TemplateLiteral,
    Context as BaseContext,
    Text,
    SourceLocation,
} from '@i18never/shared';
import * as t from '@babel/types';

type TextNode = t.StringLiteral | t.TemplateLiteral | t.JSXText;
export type Entity = NodePath<TextNode>;
export type Context = BaseContext<TextNode>;

export function parse(source: string, rootLoc?: SourceLocation) {
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
        },
        undefined,
        context
    );

    return context;
}

// function formatJsLocLine(jsKey: TempKeyItem, rootLine: number) {
//     // - 2 is script index ande template index
//     const line = jsKey.loc.line + rootLine - 2;
//     const column = jsKey.jsx ? jsKey.loc.column : jsKey.loc.column + 1;

//     return {
//         line,
//         column,
//     };
// }

// function getAllKeysLoc(ast, filename: string) {
//     const allKeys: TempKeyItem[] = [];

//     traverse(ast, visitor, undefined, {
//         keys: allKeys,
//         filename,
//     });

//     // const code = generate(ast, {
//     //     // concise: true,
//     //     jsescOption: { minimal: true },
//     //     retainLines: true,
//     // }).code;
//     // console.log('log', code);
//     return allKeys;
// }
