import { KeyItem } from './types';
import { matchFileType } from './helpers/utils';
import { parsePug, parseVue } from './helpers';

export async function i18nparse(
    template: string,
    filename: string
): Promise<KeyItem[]> {
    let keys: KeyItem[] = [];
    if (!matchFileType(filename)) {
        throw new Error('only Pug and Vue syntax is supported');
    }

    const filesuffix = matchFileType(filename);

    switch (filesuffix) {
        case 'pug':
            keys = await parsePug(template, filename);
            break;
        case 'vue':
            keys = await parseVue(template, filename);
            break;
        default:
            break;
    }

    return keys;
}
