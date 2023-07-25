import type { Tags } from './visitors';
import { GraphQLClient } from 'graphql-request';
import { getSdk as baseGetSdk } from './graphql';
import type { SourceLocation } from './visitors';
import { parseRegexp, options } from './options';

type KeyWithTags = {
    key: string;
    tags: Tags | null;
    identifier: string | null;
};

export const supportExts = [
    '.vue',
    '.js',
    '.ts',
    '.mjs',
    '.mts',
    '.jsx',
    '.tsx',
    '.pug',
    '.jade',
] as const;

export type SupportExt = (typeof supportExts)[number];

export function parseString(str: string): KeyWithTags {
    const matches = str.match(parseRegexp);
    if (!matches) return { key: str, tags: null, identifier: null };

    const identifier = matches[1].trim();
    const tagStr = matches[2].trim();
    const key = matches[3];
    const tags = !tagStr
        ? null
        : tagStr.split(/\s*,\s*/).reduce((memo, item) => {
              const [language, name] = item.split('=');
              memo[language] = name || '';

              return memo;
          }, {} as Tags);

    return { key, tags, identifier: identifier };
}

export function getSdk(uri = options.uri) {
    const token = options.token;
    const client = new GraphQLClient(uri, {
        headers: token
            ? {
                  Authorization: token,
              }
            : undefined,
    });

    return baseGetSdk(client);
}

export function isIgnore(identifier: string) {
    return identifier === `${options.prefix}:${options.ignore}`;
}

export function matched(value: string) {
    return value && options.matchRegexp.test(value);
}

export function getLoc(
    loc: SourceLocation,
    rootLoc?: SourceLocation | null,
    startColumn = 0
) {
    if (rootLoc) {
        const { line, column } = loc;
        const { line: rootLine, column: rootColumn } = rootLoc;

        loc = {
            line: rootLine + line - 1,
            // the first line, e.g. the same line with rootLoc, adds the offset column
            column: line === 1 ? rootColumn + column : column,
        };
    }

    const { line, column } = loc;

    return { line, column: column - startColumn };
}

export function getSourceByLoc(source: string, loc: SourceLocation) {
    const lines = source.split('\n');
    const { line, column } = loc;
    const lineNumbers = getNearNumbers(line, lines.length);
    const numberWidth = String(lineNumbers[lineNumbers.length - 1]).length;

    return lineNumbers
        .map((num) => {
            let code = `${strPad(num, numberWidth)} | ${lines[num - 1]}`;
            if (num === line) {
                code += `\n${whitespaces(numberWidth)} | ${whitespaces(
                    column
                )}^`;
            }

            return code;
        })
        .join('\n');
}

function getNearNumbers(num: number, max: number) {
    const nums: number[] = [];

    for (let i = num - 1; i > Math.max(num - 2, 0); i--) {
        nums.unshift(i);
    }
    for (let i = num; i <= Math.min(num + 2, max); i++) {
        nums.push(i);
    }

    return nums;
}

function whitespaces(length: number) {
    return ' '.repeat(length);
}

function strPad(str: string | number, length: number) {
    const strLength = String(str).length;

    if (strLength >= length) return str;

    return `${whitespaces(length - strLength)}${str}`;
}

export function isString(str: unknown): str is string {
    return typeof str === 'string';
}
