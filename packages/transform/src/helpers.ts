import * as t from '@babel/types';
import { TranslationDetail } from './inquire';
import traverse from '@babel/traverse';
import { visitor } from './visitors';
import { ParseResult } from '@babel/parser';

type KeyWithTags = {
    key: string;
    tags: Tags | null;
    identifier: string | null;
};

export type Tags = Record<string, string>;

export type KeyItem = {
    key: string;
    tags: Tags | null;
    params: t.Expression[];
    callback: () => void;
    loc: t.SourceLocation;
    oldIndentifer: string | null;
    newIdentifier?: string;
};

export type Context = {
    keys: KeyItem[];
};

export const options = {
    // match the text that will be translated
    matchRegexp: /[\u4E00-\u9FFF]+/,

    // the graphql api for getting translations
    uri: 'http://localhost:3003',

    // the source to distinguish clients
    source: 'i18never',

    // the prefix string of identifier
    prefix: 'i18never',

    // the module providing the translation function, namely _$
    clientModule: '@i18never/client',
};

export function set(opt: Partial<typeof options>) {
    return Object.assign(options, opt);
}

const parseRegexp = /^\[(i18never:([^\]]*))\](.*)/;
export function parseString(str: string): KeyWithTags {
    const matches = str.match(parseRegexp);
    if (!matches) return { key: str, tags: null, identifier: null };

    const identifier = matches[1].trim();
    const tagStr = matches[2].trim();
    const key = matches[3];
    const tags = !tagStr
        ? {}
        : tagStr.split(/\s*,\s*/).reduce((memo, item) => {
              const [language, name] = item.split('=');
              memo[language] = name || '';

              return memo;
          }, {} as Tags);

    return { key, tags, identifier: identifier };
}

export function getTagsParam(tags: TranslationDetail[]) {
    const properties = tags.reduce((memo, { language, tag }) => {
        const tagName = tag.name;
        if (!tagName || tagName === 'default') return memo;

        memo.push(
            t.objectProperty(
                t.stringLiteral(language),
                t.stringLiteral(tagName)
            )
        );

        return memo;
    }, [] as t.ObjectProperty[]);

    if (properties.length) {
        return t.objectExpression(properties);
    }
}

export function getIdentifier(tags: TranslationDetail[]) {
    const identifierTags: string[] = [];
    tags.forEach(({ language, tag }) => {
        const tagName = tag.name;
        if (!tagName || tagName === 'default') {
            identifierTags.push(`${language}`);
        } else {
            identifierTags.push(`${language}=${tagName}`);
        }
    });

    return `${options.prefix}:${identifierTags.join(',')}`;
}

export function getAllKeys(ast: ParseResult<t.File>) {
    const allKeys: KeyItem[] = [];

    traverse(ast, visitor, undefined, {
        keys: allKeys,
    });

    return allKeys;
}
