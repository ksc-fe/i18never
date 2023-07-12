import { getSdk } from '@i18never/graphql';
import { GraphQLClient } from 'graphql-request';
import { prompt } from 'inquirer';
import options from './config';
import { KeyItem, TranslationDetail, TagFragment } from './types';
import { deepCopy } from './utils';

type ResultItem = {
    key: string;
    translation: TranslationDetail[];
};

type Dict = Pick<KeyItem, 'key' | 'tags' | 'loc'>;

export async function inquire(dicts: Dict[], filename: string) {
    try {
        const copyDicts = deepCopy(dicts);
        const data = await queryTranslations(copyDicts);
        const result: ResultItem[] = [];
        const noTranslations: any = [];
        for (const { key, tags, loc } of dicts) {
            const translation: TranslationDetail[] = [];
            const translations = (
                data as Record<string, Record<string, TagFragment[]>>
            )[key];

            result.push({
                key,
                translation,
            });

            const languages = Object.keys(translations);
            if (!tags) {
                for (const language of languages) {
                    const tags = translations[language];

                    // if the language's translation has multiple entries,
                    // we should show inquirer for user to select the correct item
                    if (tags.length > 1) {
                        await prompt([
                            {
                                type: 'rawlist',
                                name: 'tag',
                                message: `Which translation do you need for string: "${key}" in '${language}' ?`,
                                choices: tags.map((tag) => {
                                    return {
                                        name: `Tag: "${tag.name}", Translation: "${tag.value}"`,
                                        value: tag,
                                    };
                                }),
                            },
                        ]).then((answers) => {
                            if (!answers.tag.value) {
                                noTranslations.push({
                                    'untranslated sentence': key,
                                    'untranslated language': language,
                                    loc,
                                    'file path': filename,
                                });
                            }
                            translation.push({
                                language,
                                tag: answers.tag,
                                isAnswer: true,
                            });
                        });
                    } else if (tags.length === 1) {
                        // use the only one translation as the result
                        if (!tags[0].value) {
                            noTranslations.push({
                                'untranslated sentence': key,
                                'untranslated language': language,
                                loc,
                                'file path': filename,
                            });
                        }
                        translation.push({
                            language,
                            tag: tags[0],
                            isAnswer: true,
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
        if (noTranslations.length !== 0) {
            console.table(noTranslations);
        }
        return result;
    } catch (error) {
        throw new Error(`i18never inquire error: ${error}`);
    }
}

async function queryTranslations(dicts: Dict[]) {
    const client = new GraphQLClient(options.uri, {
        headers: {
            Authorization: process.env.I18NEVER_TOKEN as string,
        },
    });
    const sdk = getSdk(client);
    const optionss = {
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
    };
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
