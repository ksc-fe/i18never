import { getSdk } from './graphql';
import { GraphQLClient } from 'graphql-request';
import { KeyItem } from './helpers';
import { options } from './options';
import { TagFragment } from './graphql';
import inquirer from 'inquirer';

export type TranslationDetail = {
    language: string;
    tag: TagFragment;
};

type ResultItem = {
    key: string,
    translation: TranslationDetail[];
};

type Dict = Pick<KeyItem, 'key' | 'tags'>;

const client = new GraphQLClient(options.uri);
export const sdk = getSdk(client);

export async function inquire(dicts: Dict[]) {
    console.log('dict');
    console.dir(dicts, { depth: null });
    const data = await queryTranslations(dicts);
    const result: ResultItem[] = [];
    console.log('data');
    console.dir(data, { depth: null });

    for (const { key, tags } of dicts) {
        const translation: TranslationDetail[] = [];
        result.push({
            key,
            translation,
        });

        if (!tags) {
            const translations = data[key];
            for (let language of Object.keys(translations)) {
                const tags = translations[language];

                // if the language's translation has multiple entries,
                // we should show inquirer for user to select the correct item
                if (tags.length > 1) {
                    console.log('Please select the item', language, tags);
                    await inquirer.prompt([
						{
							type: 'rawlist',
							name: 'tag',
							message: 'Which translation do you need?',
                            choices: tags.map((tag) => {
                                return {
                                    name: `Tag: "${tag.name}", Translation: "${tag.value}"`,
                                    value: tag,
                                };
                            }),
						},
                    ]).then((answers) => {
                        console.log(answers.tag);
                        translation.push({
                            language,
                            tag: answers.tag,
                        });                              
                    });
                } else if (tags.length === 1) {
                    translation.push({
                        language,
                        tag: tags[0],
                    });
                } else {
                    throw new Error('Can not find any translation.');
                }
            }
        } else {
            const translations = data[key];
            for (let language of Object.keys(translations)) {
                const specifiedTag = tags[language] || 'default';
                const tag = translations[language].find((tag) => tag.name === specifiedTag);
                if (tag) {
                    translation.push({
                        language,
                        tag,
                    });              
                } else {
                    throw new Error(`Can not find translation for tag: "${language}: ${specifiedTag}"`);
                }
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
