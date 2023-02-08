// import { getSdk } from './graphql';
// import { GraphQLClient } from 'graphql-request';
// import { KeyItem, options } from './helpers';
// import { TagFragment } from './graphql';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { KeyItem, TranslationDetail, TagFragment } from './types';

type ResultItem = {
    key: string;
    translation: TranslationDetail[];
};

type Dict = Pick<KeyItem, 'key' | 'tags' | 'loc'>;

// const client = new GraphQLClient(options.uri);
// export const sdk = getSdk(client);

export async function inquire(dicts: Dict[], filename: string) {
    // const data = await queryTranslations(dicts);
    const data = {
        测试: {
            en: [
                { name: 'v', value: 'test' },
                { name: 'adj.', value: 'test adj.' },
            ],
            kr: [{ name: 'default', value: '' }],
        },
        翻译: {
            en: [{ name: 'v', value: 'translation' }],
            kr: [{ name: 'default', value: 'krtrans' }],
        },
        '购买{0}台': {
            en: [
                { name: 'v', value: '' },
                { name: 'n', value: '' },
            ],
        },
        请输入目标kafka: {
            en: [{ name: 'n', value: 'buy' }],
        },
        购买: {
            en: [
                { name: 'v', value: 'buy' },
                { name: 'adj.', value: 'test adj.' },
            ],
        },
        暂停任务: {
            en: [
                { name: 'n', value: 'test' },
                { name: 'v', value: 'test adj.' },
            ],
        },
    };
    const result: ResultItem[] = [];
    const noTranslations: any = [];
    // console.log(chalk.green(filename));
    for (const { key, tags, loc } of dicts) {
        const translation: TranslationDetail[] = [];
        const translations = (
            data as Record<string, Record<string, TagFragment[]>>
        )[key];

        result.push({
            key,
            translation,
        });

        if (!translations) {
            noTranslations.push({
                'untranslated sentence': key,
                loc,
                'file path': filename,
            });
        } else {
            const languages = Object.keys(translations);
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
                                    isAnswer: true,
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
    }
    if (noTranslations.length !== 0) {
        // const chalkTag = (msg) => chalk.bgBlackBright.white.dim(` ${msg} `);
        // const message = `There are untranslated statements under the ${filename} file`;
        // console.log(chalk.bgYellow.black(' WARN ') + chalkTag(message));
        console.table(noTranslations);
    }
    return result;
}
