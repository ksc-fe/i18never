import type { Tags } from './visitors';
import { GraphQLClient } from 'graphql-request';
import { getSdk as baseGetSdk } from './graphql';

type KeyWithTags = {
    key: string;
    tags: Tags | null;
    identifier: string | null;
};

export const options = {
    // match the text that will be translated
    matchRegexp: /[\u4E00-\u9FFF]+/,

    // the graphql api for getting translations
    uri: 'http://i18never.ksyun.com/graphql',

    // the source to distinguish clients
    source: 'i18never',

    // the prefix string of identifier
    prefix: '$_',

    // the ignore tag indicates we shouldn't translate this string
    ignore: 'ignore',

    // the module providing the translation function, namely $_
    clientModule: '@i18never/client',
    clientFunction: '$_',
};

export type Options = typeof options;

let parseRegexp = generateParseRegexp(options.prefix);
export function set<T extends Options = Options>(opt: Partial<T>) {
    if (opt.prefix) {
        parseRegexp = generateParseRegexp(opt.prefix);
    }
    return Object.assign(options, opt);
}

function generateParseRegexp(prefix: string) {
    // escape special characters
    prefix = prefix.replace(/([$\-.*?])/g, '\\$1');
    return new RegExp(`^\\[(${prefix}:([^\\]]*))\\](.*)`);
}

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

export function getSdk(uri = options.uri, token?: string) {
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