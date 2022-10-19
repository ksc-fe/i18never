import { getSdk } from './graphql';
import { GraphQLClient } from 'graphql-request';
import { KeyItem, options } from './helpers';
import { TagFragment } from './graphql';
import inquirer from 'inquirer';

export type TranslationDetail = {
    language: string;
    tag: TagFragment;
};

type ResultItem = {
    key: string;
    translation: TranslationDetail[];
};

type Dict = Pick<KeyItem, 'key' | 'tags'>;

const client = new GraphQLClient(options.uri);
export const sdk = getSdk(client);

export async function inquire(dicts: Dict[]) {
    const data = await queryTranslations(dicts);
    const result: ResultItem[] = [];

    for (const { key, tags } of dicts) {
        const translation: TranslationDetail[] = [];
        const translations = data[key];
        const languages = Object.keys(translations);

        result.push({
            key,
            translation,
        });

        if (!tags) {
            for (const language of languages) {
                const tags = translations[language];

                // if the language's translation has multiple entries,
                // we should show inquirer for user to select the correct item
                if (tags.length > 1) {
                    await inquirer
                        .prompt([
                            {
                                type: 'rawlist',
                                name: 'tag',
                                message: `Which translation do you need for string: "${key}" ?`,
                                choices: tags.map((tag) => {
                                    return {
                                        name: `Tag: "${tag.name}", Translation: "${tag.value}"`,
                                        value: tag,
                                    };
                                }),
                            },
                        ])
                        .then((answers) => {
                            translation.push({
                                language,
                                tag: answers.tag,
                            });
                        });
                } else if (tags.length === 1) {
                    // use the only one translation as the result
                    translation.push({
                        language,
                        tag: tags[0],
                    });
                } else {
                    throw new Error(
                        `Can not find any translation for string: "${key}" [${language}].`
                    );
                }
            }
        } else {
            for (const language of languages) {
                const specifiedTag = tags[language] || 'default';
                const tag = translations[language].find(
                    (tag) => tag.name === specifiedTag
                );

                if (!tag) {
                    throw new Error(
                        `Can not find translation for string: "${key}" [${language}=${specifiedTag}]`
                    );
                }

                translation.push({
                    language,
                    tag,
                });
            }
        }
    }

    return result;
}

async function queryTranslations(dicts: Dict[]) {
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
