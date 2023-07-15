import { parse, ParseResult } from '@babel/parser';
import traverse from '@babel/traverse';
import { visitors, Context, KeyItem } from '@i18never/shared';

export default function parseJs(source: string) {
    const ast = parse(source, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
    });
    const context = getContext(ast);

    const keys: TempKeyItem[] = [];
    const ast = parse(source, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
    });
    const allJsKeys = getAllKeysLoc(ast, filename);

    if (!isInTemplate) {
        allJsKeys.map((jsKey) => {
            const keyItem = {
                filename: filename,
                key: jsKey.key,
                loc: formatJsLocLine(jsKey, rootLine!),
                prefix: '',
                tags: jsKey.tags,
            };
            keys.push(keyItem);
        });
        return keys;
    }
    return allJsKeys;
}

function getContext(ast: )

function formatJsLocLine(jsKey: TempKeyItem, rootLine: number) {
    // - 2 is script index ande template index
    const line = jsKey.loc.line + rootLine - 2;
    const column = jsKey.jsx ? jsKey.loc.column : jsKey.loc.column + 1;

    return {
        line,
        column,
    };
}

function getAllKeysLoc(ast, filename: string) {
    const allKeys: TempKeyItem[] = [];

    traverse(ast, visitor, undefined, {
        keys: allKeys,
        filename,
    });

    // const code = generate(ast, {
    //     // concise: true,
    //     jsescOption: { minimal: true },
    //     retainLines: true,
    // }).code;
    // console.log('log', code);
    return allKeys;
}
