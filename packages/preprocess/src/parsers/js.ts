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

// const defaultRootLoc: SourceLocation = { line: 1, column: 0 };
export function parse(
    source: string,
    // because the column of location of babel parser starts from 0, but the others, e.g.
    // Vue/Pug, start from 1. We use a defaultRootLoc starting from 1 to keep
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
