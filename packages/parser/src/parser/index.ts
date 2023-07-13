// import { matchFileType } from '../helpers/utils';
import { parse as babelParse } from '@babel/parser';
import babelGenerate from '@babel/generator';
import traverse, { TraverseOptions } from '@babel/traverse';
import options from '../helpers/options';
// import parsePug from './parsePug';
// import parseJs from './parseJs';
// import parseVue from './parseVue';
// import transform from '../helpers/transform';
// import writeFile from '../helpers/writeFile';
import defaultVisitors, { KeyItem, Context } from '../visitors';

export enum FileType {
    JS = 'js',
    VUE = 'vue',
    PUG = 'pug',
    JSX = 'jsx',
    TSX = 'tsx',
    TS = 'ts',
}

// export async function parse(
//     source: string,
//     filename: string
// ): Promise<TempKeyItem[]> {
//     let keys: TempKeyItem[] = [];
//     let transResult: Array<TempKeyItem[]> = [];
//     if (!matchFileType(filename)) {
//         throw new Error('only Pug/Vue/Tsx/Jsx/Js syntax is supported');
//     }

//     const filesuffix = matchFileType(filename);

//     switch (filesuffix) {
//         case FileType.PUG:
//             keys = parsePug(source, filename);
//             break;
//         case FileType.VUE:
//             keys = parseVue(source, filename);
//             break;
//         case FileType.JSX:
//         case FileType.TSX:
//         case FileType.TS:
//         case FileType.JS:
//             keys = parseJs(source, filename, false, 1);
//             break;
//         default:
//             break;
//     }
//     transResult = await i18ntransform(keys, filename);
//     generateFile(filename, transResult);

//     return keys;
// }

export function generate(
    sourceCode: string,
    filename: string,
    visitors: TraverseOptions<Context> = defaultVisitors // for unit test
) {
    const keys: KeyItem[] = [];

    if (!options.matchChineseRE.test(sourceCode)) {
        return { keys, code: sourceCode };
    }

    const codeAst = babelParse(sourceCode, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
    });

    traverse(codeAst, visitors, undefined, {
        keys,
        filename,
    });
    const code = babelGenerate(codeAst, {
        jsescOption: { minimal: true },
        retainLines: true,
    }).code;

    return { keys, code };
}
