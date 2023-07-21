import { isIgnore, options, matched } from '@i18never/shared';
import fs from 'fs/promises';
import path from 'path';
import { inquire } from './inquire';
import { generate } from './generate';
import { getParserByExt } from './helpers';

export * from './parsers';
export * from './helpers';
export * from './inquire';

export async function process(file: string) {
    const source = await fs.readFile(file, 'utf-8');
    const extname = path.extname(file);

    const keys = getKeys(source, extname);
    const translations = await inquire(keys);
    const newSource = generate(source, keys, translations);

    await fs.writeFile(file, newSource, 'utf-8');

    return { source, newSource, keys, translations };
}

function getKeys(source: string, extname: string) {
    const parser = getParserByExt(extname);
    const keys = parser(source);

    return keys.filter(({ identifier, key }) => {
        if (identifier) return !isIgnore(identifier);

        return matched(key);
    });
}
