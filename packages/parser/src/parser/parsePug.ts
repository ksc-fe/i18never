import * as pugparse from 'pug-parser';
import { Lexer } from 'pug-lexer';
import * as pugwalk from 'pug-walk';
import { TempKeyItem } from '../types';
import { hasChinese, parseString } from '../utils';
import options from '../config';
import parseJs from './parseJs';
import parseVue from './parseVue';

export default function parsePug(
    source: string,
    filename: string,
    rootLine = 1
): TempKeyItem[] {
    const keys: TempKeyItem[] = [];
    const lexer = new Lexer(source, { filename });
    const tokens = JSON.parse(JSON.stringify(lexer.getTokens()));
    const ast = pugparse(tokens, { filename });
    const allKeys: any = [];
    pugwalk(
        ast,
        function before(node: any) {
            if (node.type === 'Text') {
                if (!node.val || !hasChinese(node.val)) return;
                allKeys.push(getParams(node, filename, rootLine));
            }
            if (node.attrs && node.attrs.length !== 0) {
                node.attrs.forEach((attr) => {
                    if (!attr.val || !hasChinese(attr.val)) return;
                    allKeys.push(getParams(attr, filename, rootLine, true));
                });
            }
        },
        {
            includeDependencies: true,
        }
    );

    allKeys.reduce((prev, next) => {
        if (next.content.length >= 1) {
            next.content.forEach((it) => {
                prev.push({
                    filename,
                    key: it.key,
                    loc: formatLoc(it.loc, next.originLoc),
                    prefix: '',
                    tags: it.tags,
                });
            });
        } else {
            const { tags, key } = parseString(next.matchVal);
            prev.push({
                filename,
                key,
                loc: next.originLoc,
                prefix: '',
                tags,
            });
        }
        return prev;
    }, keys);
    return keys;
}

function formatLoc(loc, originLoc) {
    if (!loc) {
        return { line: -1, column: -1 };
    }
    const line = originLoc.line;
    const column = originLoc.column + loc.column;
    return {
        line,
        column,
    };
}

function getParams(node, filename, rootLine, isAttr = false) {
    let content: TempKeyItem[] = [];
    const matchVal = isAttr
        ? node.val.replace(options.matchQuoteRE, '$1')
        : node.val;
    let prefixLength = 0;
    if (node.name && node.name.startsWith(':')) {
        prefixLength = (node.val.length - matchVal.length) / 2;
        content = parseJs(matchVal, filename, true);
    } else {
        const sourceText = `<template>\n<span>${matchVal}</span>\n</template>`;
        content = parseVue(sourceText, filename);
        content.map((it) => {
            it.loc.column -= 6;
            return it;
        });
    }

    const originLoc = {
        line: rootLine + node.line - 2,
        // If it is an attribute, you need to add the length of "="
        column: isAttr
            ? node.column + node.name.length + 1 + prefixLength
            : node.column - 1,
    };
    return { content, originLoc };
}
