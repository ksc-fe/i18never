import fs from 'fs';
import path from 'path';

export const options = {
    // match the text that will be translated, inlucde escaped unicode
    matchRegexp:
        /([\u4E00-\u9FFF]+)|((\\u\{?((4[EF][\dA-F]{2})|([5-9][\dA-F]{3}))\}?)+)/,

    // the graphql api for getting translations
    uri: 'https://i18never.ksyun.com/graphql',

    // the source to distinguish clients
    source: 'i18never',

    // the prefix string of identifier
    prefix: '$_',

    // the ignore tag indicates we shouldn't translate this string
    ignore: 'ignore',

    // the module providing the translation function, namely $_
    clientModule: '@i18never/client',

    clientFunction: '$_',

    // the token to request graphql api
    token: '',

    configFile: '',
};

export type Options = typeof options;

export let parseRegexp = generateParseRegexp(options.prefix);
export function setOptions<T extends Options = Options>(opt: Partial<T>) {
    if (opt.prefix) {
        parseRegexp = generateParseRegexp(opt.prefix);
    }
    return Object.assign(options, opt);
}

function generateParseRegexp(prefix: string) {
    // escape special characters
    prefix = prefix.replace(/([$\-.*?])/g, '\\$1');
    return new RegExp(`^\\[(${prefix}:([^\\]]*))\\](.*)`);
}

export const defaultConfigFile = 'i18never.config.js';

export function initOptions(options: Partial<Options>) {
    const envOptions = getOptionFromEnv();
    const fileOptions = getOptionFromFile(options.configFile);
    return setOptions({ ...envOptions, ...fileOptions, ...options });
}

function getOptionFromFile(configFile?: string): Partial<Options> {
    if (configFile) return require(configFile);

    if (!configFile) {
        let currentDir = process.cwd();
        while (currentDir !== '/') {
            const file = path.join(currentDir, defaultConfigFile);
            if (fs.existsSync(file)) {
                return require(file);
            }
            currentDir = path.dirname(currentDir);
        }
    }

    return {};
}

function getOptionFromEnv(): Partial<Options> {
    const env = process.env;
    return {
        token: env.I18NEVER_TOKEN,
        source: env.I18NEVER_SOURCE,
    };
}
