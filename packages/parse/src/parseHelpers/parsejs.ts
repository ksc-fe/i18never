import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import { TemplateLiteral, StringLiteral, JSXText } from '../visitors';
import { TempKeyItem } from '../types';

export default function parseJs(
    source: string,
    filename: string,
    isInTemplate: boolean,
    rootLine?: number
) {
    const keys: TempKeyItem[] = [];
    const ast = parse(source, { sourceType: 'module', plugins: ['jsx'] });
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

    traverse(ast, { StringLiteral, TemplateLiteral, JSXText }, undefined, {
        keys: allKeys,
        filename,
    });

    return allKeys;
}
