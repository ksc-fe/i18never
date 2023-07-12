import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { TempKeyItem } from '../types';

export function generateFile(filename: string, keys: Array<TempKeyItem[]>) {
    const cwd = process.cwd();
    const file = resolve(cwd, filename);
    const sourceCode = readFileSync(file, 'utf8');
    const fileCodeList = sourceCode.split('\n');

    keys.forEach((it) => {
        if (it.length === 1) {
            generateString(it[0], fileCodeList);
        } else {
            it = it.sort((a, b) => b.loc.column - a.loc.column);
            it.forEach((child) => {
                generateString(child, fileCodeList);
            });
        }
    });
    writeFileSync(file, fileCodeList.join('\n'), 'utf8');
}

function generateString(item: TempKeyItem, fileCodeList) {
    if (!item.loc) return;
    let tat = '';
    const line = item.loc.line;
    const column = item.loc.column;
    tat = insertString(fileCodeList[line], column, item.prefix);
    fileCodeList[line] = tat;

    return fileCodeList;
}

function insertString(source, start, newStr) {
    if (start < 0) return source;
    return `${source.slice(0, start)}${newStr}${source.slice(start)}`;
}
