import { isIgnore, options } from '@i18never/shared';
import { jsParse, pugParse, KeyItem } from './parsers';
import fs from 'fs/promises';
import path from 'path';
import { inquire } from './inquire';
import { generate } from './generate';

export async function process(file: string) {
    const source = await fs.readFile(file, 'utf-8');
    const extname = path.extname(file);

    const keys = getKeys(source, extname);
    const translations = await inquire(keys);
    const newSource = generate(source, keys, translations);

    await fs.writeFile(newSource, file, 'utf-8');

    return newSource;
}

function getKeys(source: string, extname: string) {
    let keys: KeyItem[];
    switch (extname) {
        case '.js':
        case '.ts':
        case '.jsx':
        case '.tsx':
        case '.mjs':
            keys = jsParse(source);
            break;
        case '.pug':
            keys = pugParse(source);
            break;
        default:
            throw new Error(`${extname} file is not supported.`);
    }

    return keys.filter(({ identifier, key }) => {
        if (identifier) return !isIgnore(identifier);

        return options.matchRegexp.test(key);
    });
}
