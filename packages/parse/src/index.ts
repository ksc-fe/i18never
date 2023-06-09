import { TempKeyItem, FileType, TransResult } from './types';
import { matchFileType } from './utils';
import { parse } from '@babel/parser';
import generate from '@babel/generator';
import traverse from '@babel/traverse';
import visitors from './visitors';
import options from './config';

import {
    parsePug,
    parseJs,
    i18ntransform,
    parseVue,
    generateFile,
} from './parseHelpers';

export async function i18nparse(
    template: string,
    filename: string
): Promise<TempKeyItem[]> {
    let keys: TempKeyItem[] = [];
    let transResult: Array<TempKeyItem[]> = [];
    if (!matchFileType(filename)) {
        throw new Error('only Pug/Vue/Tsx/Jsx/Js syntax is supported');
    }

    const filesuffix = matchFileType(filename);

    switch (filesuffix) {
        case FileType.PUG:
            keys = await parsePug(template, filename);
            break;
        case FileType.VUE:
            keys = await parseVue(template, filename);
            break;
        case FileType.JSX:
        case FileType.TSX:
        case FileType.TS:
        case FileType.JS:
            keys = await parseJs(template, filename, false, 1);
            break;
        default:
            break;
    }
    transResult = await i18ntransform(keys, filename);
    generateFile(filename, transResult);

    return keys;
}

export async function i18nTrans(
    sourceCode: string,
    filename
): Promise<TransResult> {
    if (!options.matchChineseRE.test(sourceCode)) {
        const allKeys: TempKeyItem[] = [];
        const transCode = sourceCode;
        return { transCode, allKeys };
    }
    const codeAst = parse(sourceCode, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
    });
    const transResult: TransResult = transAst(codeAst, filename);
    return transResult;
}

function transAst(codeAst, filename) {
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
