import { TempKeyItem, FileType } from './types';
import { matchFileType } from './utils';
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
