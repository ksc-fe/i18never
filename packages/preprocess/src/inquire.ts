import { getSdk, TagFragment, options } from '@i18never/shared';
import inquirer from 'inquirer';
import { KeyItem } from './parsers';

export type TranslationDetail = {
    language: string;
    tag: TagFragment;
};

export type InquireResultItem = {
    key: string;
    translationDetails: TranslationDetail[];
};

type Dict = Pick<KeyItem, 'key' | 'tags'> & {
    loc?: KeyItem['loc'];
};

export async function inquire(dicts: Dict[]) {
    const data = await queryTranslations(dicts);
    const result: InquireResultItem[] = [];

    for (const { key, tags } of dicts) {
        const translationDetails: TranslationDetail[] = [];
        const translations = data[key];

        if (!translations) {
            throw new Error(`Cannot find any translation for key: "${key}".`);
        }

        result.push({
            key,
            translationDetails,
        });

        const languages = Object.keys(translations);
        if (!tags) {
            for (const language of languages) {
                const tags = translations[language];

                // if the language's translation has multiple entries,
                // we should show inquirer for user to select the correct item
                if (tags.length > 1) {
                    await inquirer
                        .prompt<{ tag: TagFragment }>([
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
                        ])
                        .then((answers) => {
                            translationDetails.push({
                                language,
                                tag: answers.tag,
                            });
                        });
                } else if (tags.length === 1) {
                    translationDetails.push({
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

                translationDetails.push({
                    language,
                    tag,
                });
            }
        }
    }

    return result;
}

async function queryTranslations(dicts: Dict[]) {
    const sdk = getSdk(options.uri);
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
