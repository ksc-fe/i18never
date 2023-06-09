import { TransformPluginContext, TransformResult } from 'rollup';
import { i18nTrans } from '@i18never/parse';
import { getSdk } from '@i18never/graphql';
import { GraphQLClient } from 'graphql-request';
import { TempKeyItem } from 'packages/parse/dist/types';
import { resolve } from 'path';

const client = new GraphQLClient('http://i18never.ksyun.com/graphql/');
const sdk = getSdk(client);

export default function i18never(options) {
    const allAppKeys: TempKeyItem[] = [];
    let i18nVersion = '';
    const defaultOptions = {
        root: 'src',
        langKey: '',
        storageType: '',
    };
    options = Object.assign({}, defaultOptions, options);
    const rootPath = resolve(process.cwd(), options.root);
    return {
        name: 'i18never',
        enforce: 'post',
        async transform(
            this: TransformPluginContext,
            code: string,
            id: string
        ) {
            if (
                !id.match(/\.(pug|vue|tsx|jsx|js|ts)$/) ||
                id.includes('@i18never/client') ||
                !id.startsWith(rootPath)
            ) {
                return;
            }
            const { transCode, allKeys } = await i18nTrans(code, id);
            allAppKeys.push(...allKeys);
            return { code: transCode, map: null } as
                | TransformResult
                | Promise<TransformResult>;
        },
        async buildEnd() {
            const version = await queryVersion(allAppKeys);
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

function generateScript(version, options) {
    let lang = '';
    switch (options.storageType) {
        case 'cookie':
            lang = `document.cookie.replace(/(?:(?:^|.*;\\s*)${options.langKey}\\s*\=\\s*([^;]*).*$)|^.*$/, "$1");`;
            break;
        case 'localStorage':
        case 'sessionStorage':
            lang = `${options.storageType}.getItem('${options.langKey}')`;
            break;
        default:
            lang = `document.cookie.replace(/(?:(?:^|.*;\\s*)ksc_lang\\s*\=\\s*([^;]*).*$)|^.*$/, "$1");`;
            break;
    }
    return `
    <script>
        let lang = ${lang};
        document.write('<scr'+'ipt src="http://i18never.ksyun.com/dict/'+lang+'/${version}"></scr'+'ipt>');
    </script>
    `;
}

async function queryVersion(allAppKeys) {
    const { getVerionId: data } = await sdk.CreateVersion({
        source: 'i18never',
        values: _sortKeys(allAppKeys),
    });
    return data.Id;
}

function _sortKeys(allAppKeys) {
    const targetValues = allAppKeys.map(({ key, tags }) => {
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
