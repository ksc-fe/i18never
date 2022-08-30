import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import { visitor } from './visitors';
import { KeyItem } from './helpers';

export async function manipulate(source: string) {
    const ast = parse(source, { sourceType: 'module' });
    const allKeys: KeyItem[] = [];

    traverse(ast, visitor, undefined, {
        keys: allKeys,
    });

    console.log(allKeys);

    allKeys.forEach(({ callback }) => callback());

    return generate(ast, { concise: true, jsescOption: { minimal: true } })
        .code;
}
