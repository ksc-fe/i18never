import pugparse from 'pug-parser';
import puglex from 'pug-lexer';
import pugwalk from 'pug-walk';
import { TempKeyItem } from '../types';
import { hasChinese } from '../utils';
import options from '../config';
import parseJs from './parsejs';

export default async function parsePug(
    source: string,
    filename: string
): Promise<TempKeyItem[]> {
    const keys: TempKeyItem[] = [];
    const tokens = puglex(source, { filename });
    const ast = pugparse(tokens, { filename });
    const allKeys: any = [];
    pugwalk(
        ast,
        function before(node: any) {
            if (node.type === 'Text') {
                if (!node.val || !hasChinese(node.val)) return;
                allKeys.push(getParams(node, filename));
            }
            if (node.attrs && node.attrs.length !== 0) {
                node.attrs.forEach((attr) => {
                    if (!attr.val || !hasChinese(attr.val)) return;
                    allKeys.push(getParams(attr, filename, true));
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
                    loc: formatLoc(it.loc, next.originLoc, next.prefixLength),
                    prefix: '',
                });
            });
        } else {
            prev.push({
                filename,
                key: next.matchVal,
                loc: next.originLoc,
                prefix: '',
            });
        }
        return prev;
    }, keys);
    return keys;
}

function formatLoc(loc, originLoc, prefixLength) {
    if (!loc) {
        return { line: -1, column: -1 };
    }
    const line = originLoc.line;
    const column = originLoc.column + prefixLength + loc.column;
    return {
        line,
        column,
    };
}

function getParams(node, filename, isAttr = false) {
    const matchVal = node.val.replace(
        isAttr ? options.matchQuoteRE : options.matchMustacheRE,
        '$1'
    );
    const prefixLength = (node.val.length - matchVal.length) / 2;
    const content = parseJs(matchVal, filename, true);
    const originLoc = {
        line: node.line - 1,
        // If it is an attribute, you need to add the length of "="
        column: isAttr
            ? node.column + node.name.length + 1
            : content.length === 0
            ? node.column - 1
            : node.column,
    };
    return { matchVal, prefixLength, content, originLoc };
}
