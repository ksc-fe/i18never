import { parse } from '@babel/parser';
import traverse, { TraverseOptions } from '@babel/traverse';
import generate from '@babel/generator';
import { Context, KeyItem } from '../helpers';

export function manipulate(source: string, visitors: TraverseOptions<Context>) {
    const ast = parse(source, { sourceType: 'module' });
    const allKeys: KeyItem[] = [];

    traverse(ast, visitors, undefined, {
        keys: allKeys,
    });

    console.log(allKeys);

    allKeys.forEach(({ callback }) => callback());

    return expect(
        generate(ast, { concise: true, jsescOption: { minimal: true } }).code
    );
}
