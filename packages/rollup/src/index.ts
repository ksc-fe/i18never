import { TransformResult } from 'rollup';
import { getSdk, Options as BaseOptions, initOptions } from '@i18never/shared';
import { KeyItem, transform } from '@i18never/transform';
import { resolve } from 'path';

type Options = Partial<BaseOptions> & {
    exclude?: string[];
    include?: string[];
    langKey?: string;
    storageType?: string;
};

export default function i18never(options: Options = {}) {
    initOptions(options);

    const allKeys: KeyItem[] = [];
    const include = options.include || [];
    const exclude = options.exclude || ['node_modules'];

    let i18nVersion = '';

    return {
        name: 'i18never',
        enforce: 'post',

        async transform(code: string, id: string) {
            const isIncluded = include.some((path) => {
                const rootPath = resolve(process.cwd(), path);
                return id.startsWith(rootPath);
            });
            if (
                !id.match(/\.(pug|vue|tsx|jsx|js|mjs|ts)$/) ||
                id.includes('@i18never/client') ||
                !isIncluded
            ) {
                return;
            }
            const { code: output, keys } = transform(code);
            allKeys.push(...keys);

            return { code: output, map: null };
        },

        async buildEnd() {
            const version = await queryVersion(allKeys);
            console.log(version);
            i18nVersion = version;
        },

        async generateBundle(_, bundle) {
            const entryHtmlFile = bundle['index.html'];
            if (entryHtmlFile) {
                const html = entryHtmlFile.source;

                const newHtml = html.replace(
                    '</head>',
                    `${generateScript(i18nVersion, options)}</head>`
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
        values: _sortKeys(keys),
    });

    return data.Id;
}

function _sortKeys(keys: KeyItem[]) {
    const targetValues = keys.map(({ key, tags }) => {
        return {
            key,
            tags: tags
                ? Object.keys(tags).map((language) => {
                      const name = tags[language];
                      return { language, name };
                  })
                : undefined,
        };
    });

    targetValues.sort((a, b) => {
        a.tags.sort((tagA, tagB) => {
            if (tagA.language < tagB.language) {
                return -1;
            } else if (tagA.language > tagB.language) {
                return 1;
            } else {
                return 0;
            }
        });

        b.tags.sort((tagA, tagB) => {
            if (tagA.language < tagB.language) {
                return -1;
            } else if (tagA.language > tagB.language) {
                return 1;
            } else {
                return 0;
            }
        });

        if (a.key < b.key) {
            return -1;
        } else if (a.key > b.key) {
            return 1;
        } else {
            return 0;
        }
    });

    return targetValues;
}
