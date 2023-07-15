import { parseJs } from './parser';
import fs from 'fs/promises';
import path from 'path';

export async function process(file: string) {
    const context = await getContext(file);

    console.log(context);
}

async function getContext(file: string) {
    const extname = path.extname(file);
    const source = await fs.readFile(file, 'utf-8');
    switch (extname) {
        case '.js':
        case '.ts':
        case '.jsx':
        case '.tsx':
        case '.mjs':
            return parseJs(source);
        default:
            throw new Error(`${extname} file is not supported.`);
    }
}
