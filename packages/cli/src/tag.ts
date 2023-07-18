import {
    process,
    extParserMap,
    KeyItem,
    InquireResultItem,
} from '@i18never/preprocess';
import ora from 'ora';
import chalk from 'chalk';
import { glob } from 'glob';
import { SourceLocation } from '@i18never/shared';

const supportExts = Object.keys(extParserMap);

export async function tag(dir: string) {
    const spinner = ora(`Starting process from directory: ${dir}`).start();

    try {
        const files = await glob(`${dir}/**/*{${supportExts.join(',')}}`);

        for (const file of files) {
            const { keys, translations, source } = await process(file);
            warnUnTranslatedKeys(keys, translations, source, file);
            spinner.succeed(`Successfully processed the file: ${file}.`);
        }
    } catch (e) {
        console.error(e);
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

function getSourceByLoc(source: string, loc: SourceLocation) {
    const lines = source.split('\n');
    const { line, column } = loc;
    const lineNumbers = getNearNumbers(line, lines.length);
    const numberWidth = String(lineNumbers[lineNumbers.length - 1]).length;

    return lineNumbers
        .map((num) => {
            let code = `${strPad(num, numberWidth)} | ${lines[num - 1]}`;
            if (num === line) {
                code += `\n${whitespaces(numberWidth)} | ${whitespaces(
                    column
                )}^`;
            }

            return code;
        })
        .join('\n');
}

function getNearNumbers(num: number, max: number) {
    const nums: number[] = [];

    for (let i = num - 1; i > Math.max(num - 3, 0); i--) {
        nums.unshift(i);
    }
    for (let i = num; i <= Math.min(num + 3, max); i++) {
        nums.push(i);
    }

    return nums;
}

function whitespaces(length: number) {
    return new Array(length + 1).join(' ');
}

function strPad(str: string | number, length: number) {
    const strLength = String(str).length;

    if (strLength >= length) return str;

    return `${whitespaces(length - strLength)}${str}`;
}
