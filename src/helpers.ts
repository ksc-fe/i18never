import { getSdk } from './graphql';
import { GraphQLClient } from 'graphql-request';
import * as t from '@babel/types';

type KeyWithTags = {
    key: string;
    tags: Tags | null;
};

export type Tags = Record<string, string | null>;

export type KeyItem = {
    key: string;
    tags: Tags | null;
    callback: () => void;
};

export type Context = {
    keys: KeyItem[];
};

const client = new GraphQLClient(`http://localhost:3004`);
export const sdk = getSdk(client);

const parseRegexp = /^\[i18never:([^\]]*)\](.*)/;
export function parseString(str: string): KeyWithTags {
    const matches = str.match(parseRegexp);
    if (!matches) return { key: str, tags: null };

    const tagStr = matches[1].trim();
    const key = matches[2];
    const tags = !tagStr
        ? {}
        : tagStr.split(/\s*,\s*/).reduce((memo, item) => {
              const [language, name] = item.split('=');
              memo[language] = name || '';

              return memo;
          }, {} as Tags);

    return { key, tags };
}

export function getTagsParam(tags: Tags) {
    const languages = Object.keys(tags);
    if (languages.length) {
        const properties = languages.reduce((memo, language) => {
            const tagName = tags[language];
            if (!tagName) return memo;

            memo.push(
                t.objectProperty(
                    t.stringLiteral(language),
                    tagName === null
                        ? t.nullLiteral()
                        : t.stringLiteral(tagName)
                )
            );

            return memo;
        }, [] as t.ObjectProperty[]);

        if (properties.length) {
            return t.objectExpression(properties);
        }
    }
}
