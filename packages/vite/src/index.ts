import { Plugin } from 'vite';
import {
    initOptions,
    PluginOptions,
    queryVersion,
    generateScript,
    supportExts,
} from '@i18never/shared';
import { createFilter } from '@rollup/pluginutils';
import { KeyItem, transform } from '@i18never/transform';
import { extname } from 'path';

const concat = Array.prototype.concat;

export default function i18never(options: PluginOptions = {}): Plugin {
    initOptions(options);

    const idKeysMap: Record<string, KeyItem[]> = {};
    const filter = createFilter(options.include, options.exclude);

    return {
        name: 'i18never',

        transform: {
            // order: 'post',
            async handler(code, id) {
                if (
                    !filter(id) ||
                    !(supportExts as ReadonlyArray<string>).includes(
                        getExtname(id)
                    )
                ) {
                    return;
                }

                const { code: output, keys } = transform(code);
                if (keys.length) {
                    idKeysMap[id] = keys;
                }

                return { code: output, map: null };
            },
        },

        transformIndexHtml: {
            order: 'post',
            async handler(html) {
                if (options.injectScript === false) return html;

                const version = await queryVersion(
                    concat.apply([], Object.values(idKeysMap))
                );
                return {
                    html,
                    tags: [
                        {
                            tag: 'script',
                            children: generateScript(version, options),
                        },
                    ],
                };
            },
        },
    };
}

/**
 * Vue will add querystring to path
 * e.g. /home/javey/Workspaces/i18never/packages/vite/__tests__/assets/test.vue?vue&type=style&index=0&lang.css
 */
function getExtname(id: string) {
    let ext = extname(id);

    const index = id.indexOf('?');
    if (index > -1) {
        const realExt = extname(id.substring(0, index));
        if (realExt !== '.vue') {
            ext = realExt;
        }
    }

    return ext;
}
