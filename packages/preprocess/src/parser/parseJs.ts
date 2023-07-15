import { parse, ParseResult } from '@babel/parser';
import traverse from '@babel/traverse';
import { visitors, Context } from '../visitors';
import * as t from '@babel/types';

export function parseJs(source: string) {
    const ast = parse(source, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
    });

    return getContext(ast);
}

function getContext(ast: ParseResult<t.File>) {
    const context: Context = {
        keys: [],
    };

    traverse(ast, visitors, undefined, context);

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
