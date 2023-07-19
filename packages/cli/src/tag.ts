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
import * as fs from 'fs/promises';

const supportExts = Object.keys(extParserMap);

export async function tag(path: string) {
    let spinner: ora.Ora;
    let files: string[];

    if ((await fs.stat(path)).isDirectory()) {
        spinner = ora(`Starting process directory: ${path}`).start();
        files = await glob(`${path}/**/*{${supportExts.join(',')}}`);
    } else {
        spinner = ora(`Starting process file: ${path}`).start();
        files = [path];
    }

    try {
        for (const file of files) {
            const { keys, translations, source } = await process(file);
            warnUnTranslatedKeys(keys, translations, source, file);
            spinner.succeed(`Successfully processed the file: ${file}.`);
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
