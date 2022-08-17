import { parse } from '@babel/parser';
import traverse, { TraverseOptions } from '@babel/traverse';
import generate from '@babel/generator';

export function manipulate(source: string, vistors: TraverseOptions) {
    const ast = parse(source, { sourceType: 'module' });
    traverse(ast, vistors);

    return expect(
        generate(ast, { concise: true, jsescOption: { minimal: true } })
            .code
    );
}
