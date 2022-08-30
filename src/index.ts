import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import { visitor } from './visitors';
import { KeyItem } from './helpers';
import * as t from '@babel/types';

export async function manipulate(source: string) {
    const ast = parse(source, { sourceType: 'module' });
    const allKeys = getAllKeys(ast);

    allKeys.forEach(({ callback }) => callback());

    return generate(ast, { concise: true, jsescOption: { minimal: true } })
        .code;
}

function getAllKeys(ast) {
    const allKeys: KeyItem[] = [];

    traverse(ast, visitor, undefined, {
        keys: allKeys,
    });

    return allKeys;
}
