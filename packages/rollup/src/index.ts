import { Plugin, OutputAsset } from 'rollup';
import {
    getSdk,
    Options as BaseOptions,
    initOptions,
    isString,
} from '@i18never/shared';
import { KeyItem, transform } from '@i18never/transform';
import { resolve } from 'path';

type MatchRule = string | RegExp;
type Options = Partial<BaseOptions> & {
    include?: MatchRule[]; // include has a higher priority than exclude
    exclude?: MatchRule[];
    langKey?: string;
    storageType?: 'cookie' | 'localStorage' | 'sessionStorage';
};

export default function i18never(options: Options = {}): Plugin {
    initOptions(options);

    const allKeys: KeyItem[] = [];
    const include = options.include || [];
    const exclude = options.exclude || [/node_modules/];

    return {
        name: 'i18never',

        async transform(code: string, id: string) {
            const isIncluded = isMatched(id, include);
            if (!isIncluded && isMatched(id, exclude)) return;

            const { code: output, keys } = transform(code);
            allKeys.push(...keys);

            return { code: output, map: null };
        },

        async generateBundle(_, bundle) {
            const version = await queryVersion(allKeys);
            const entryHtmlFile = bundle['index.html'] as OutputAsset;
            if (entryHtmlFile) {
                const html = entryHtmlFile.source.toString();

                const newHtml = html.replace(
                    '</head>',
                    `${generateScript(version, options)}</head>`
                );
                entryHtmlFile.source = newHtml;
            }
        },
    };
}

function generateScript(version: string, options: Options) {
    const { langKey = 'ksc_lang', storageType = '' } = options;

    let lang: string;
    switch (storageType) {
        case 'cookie':
            // lang = `document.cookie.replace(/(?:(?:^|.*;\\s*)${langKey}\\s*\=\\s*([^;]*).*$)|^.*$/, "$1");`;
            // @reference: https://stackoverflow.com/questions/10730362/get-cookie-by-name?page=1&tab=scoredesc
            lang = `('; '+document.cookie).split('; ${langKey}=').pop().split(';').shift();`;
            break;
        case 'localStorage':
        case 'sessionStorage':
            lang = `${storageType}.getItem('${langKey}')`;
            break;
        default:
            throw new Error(`storageType: ${storageType} is not supported`);
    }

    return `
    <script>
        var lang = ${lang};
        document.write('<scr'+'ipt src="//i18never.ksyun.com/dict/'+lang+'/${version}"></scr'+'ipt>');
    </script>
    `;
}

async function queryVersion(keys: KeyItem[]) {
    const sdk = getSdk();
    const { getVerionId: data } = await sdk.CreateVersion({
        source: 'i18never',
        values: sortKeys(keys),
    });

    return data.Id;
}

function isMatched(file: string, rules: MatchRule[]) {
    return rules.some((rule) => {
        if (isString(rule)) {
            const path = resolve(process.cwd(), rule);
            return file.startsWith(path);
        }

        return rule.test(file);
    });
}

function sortKeys(keys: KeyItem[]) {
    return sortBy(
        keys.map(({ key, tags }) => {
            return {
                key,
                tags: tags
                    ? sortBy(
                          Object.keys(tags).map((language) => {
                              const name = tags[language];
                              return { language, name };
                          }),
                          'language'
                      )
                    : undefined,
            };
        }),
        'key'
    );
}

function sortBy<T>(list: T[], key: keyof T) {
    return list.sort((a, b) => {
        if (a[key] < b[key]) {
            return -1;
        } else if (a[key] > b[key]) {
            return 1;
        } else {
            return 0;
        }
    });
}
