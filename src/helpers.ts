import * as t from '@babel/types';
import { TranslationDetail } from './inquire';

type KeyWithTags = {
    key: string;
    tags: Tags | null;
};

export type Tags = Record<string, string>;

export type KeyItem = {
    key: string;
    tags: Tags | null;
    params: t.Expression[]; 
    callback: () => void;
};

export type Context = {
    keys: KeyItem[];
};

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
