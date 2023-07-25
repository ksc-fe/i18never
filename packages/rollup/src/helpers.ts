import { getSdk, Options as BaseOptions } from '@i18never/shared';
import { KeyItem } from '@i18never/transform';
import { FilterPattern } from '@rollup/pluginutils';

export type Options = Partial<BaseOptions> & {
    include?: FilterPattern;
    exclude?: FilterPattern;
    langKey?: string;
    storageType?: 'cookie' | 'localStorage' | 'sessionStorage';
};

export function generateScript(version: string, options: Options) {
    const { langKey = 'ksc_lang', storageType = 'cookie' } = options;

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

export async function queryVersion(keys: KeyItem[]) {
    const sdk = getSdk();
    const { getVerionId: data } = await sdk.CreateVersion({
        source: 'i18never',
        values: sortKeys(keys),
    });

    return data.Id;
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
