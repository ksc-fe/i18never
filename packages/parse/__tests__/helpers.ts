import { parse } from '@babel/parser';
import traverse, { TraverseOptions } from '@babel/traverse';
import generate from '@babel/generator';
import { JsContext, TempKeyItem, TransResult } from '../src/types';
import options from '../src/config';

export function i18nTrans(
    sourceCode = '',
    filename: string,
    visitors: TraverseOptions<JsContext>
) {
    if (!options.matchChineseRE.test(sourceCode)) {
        const allKeys: TempKeyItem[] = [];
        const transCode = sourceCode;
        return { transCode, allKeys };
    }

    const codeAst = parse(sourceCode, {
        sourceType: 'module',
        plugins: ['jsx'],
    });
    const transResult: TransResult = transAst(codeAst, filename, visitors);
    return transResult;
}

function transAst(codeAst, filename, visitors) {
    const allKeys: TempKeyItem[] = [];
    traverse(codeAst, visitors, undefined, {
        keys: allKeys,
        filename,
    });
    const transCode: string = generate(codeAst, {
        jsescOption: { minimal: true },
        retainLines: true,
    }).code;
    return { transCode, allKeys };
}
