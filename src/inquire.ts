import { getSdk } from './graphql';
import { GraphQLClient } from 'graphql-request';
import { KeyItem } from './helpers';
import { options } from './options';
import { TagFragment } from './graphql';

const client = new GraphQLClient(options.uri);
export const sdk = getSdk(client);

export async function inquire(dicts: Omit<KeyItem, 'callback'>[]) {
    const data = await queryTranslations(dicts);
    dicts.forEach(({ key, tags }) => {
        if (!tags) {
            const translations = data[key];
            Object.keys(translations).forEach((language) => {
                const tags = translations[language];

                // if the language's translation has multiple entries,
                // we should show inquirer for user to select the correct item
                if (tags.length > 1) {
                    console.log('Please select the item', language, tags);
                }
            });
        }
    });
    console.dir(data, { depth: null });
}

async function queryTranslations(dicts: Omit<KeyItem, 'callback'>[]) {
    const { dicts: data } = await sdk.QueryOrCreateDicts({
        source: options.source,
        values: dicts.map(({ key, tags }) => {
            return {
                key,
                tags: tags
                    ? Object.keys(tags).map((language) => {
                          const name = tags[language];
                          return { language, name };
                      })
                    : undefined,
            };
        }),
    });

    return data.reduce((memo, item) => {
        memo[item.key] = item.translations.reduce((memo, item) => {
            memo[item.language] = item.tags;

            return memo;
        }, {} as Record<string, TagFragment[]>);

        return memo;
    }, {} as Record<string, Record<string, TagFragment[]>>);
}
