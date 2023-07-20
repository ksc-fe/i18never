import {
    process,
    extParserMap,
    KeyItem,
    InquireResultItem,
} from '@i18never/preprocess';
import ora from 'ora';
import chalk from 'chalk';
import { glob } from 'glob';
import { getSourceByLoc } from '@i18never/shared';
import fs from 'fs/promises';

const supportExts = Object.keys(extParserMap);

export async function tag(path: string) {
    const spinner = ora().start();
    const files: string[] = (await fs.stat(path)).isDirectory()
        ? await glob(`${path}/**/*{${supportExts.join(',')}}`)
        : [path];

    try {
        for (const file of files) {
            spinner.text = `Processing file: ${file}\n`;

            const { keys, translations, source } = await process(file);
            warnUnTranslatedKeys(keys, translations, source, file);

            spinner.text = `Processed file: ${file}\n`;
            spinner.succeed();
        }
    } catch (e) {
        console.error(e);
    } finally {
        spinner.stop();
    }
}

function warnUnTranslatedKeys(
    keys: KeyItem[],
    translations: InquireResultItem[],
    source: string,
    file: string
) {
    keys.forEach(({ key, loc }, index) => {
        const translationDetails = translations[index].translationDetails;
        translationDetails.forEach(({ language, tag }) => {
            if (!tag.value) {
                const info = [
                    chalk.yellow(
                        `There is no translation for key: "${key}" in language: "${language}" with tag: "${tag.name}".`
                    ),
                    '',
                    `File: ${chalk.gray(file)}`,
                    chalk.gray(getSourceByLoc(source, loc)),
                ];
                console.log(info.join('\n'));
            }
        });
    });
}
