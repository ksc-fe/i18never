import { Plugin } from 'vite';
import {
    initOptions,
    PluginOptions,
    queryVersion,
    generateScript,
} from '@i18never/shared';
import { createFilter } from '@rollup/pluginutils';
import { KeyItem, transform } from '@i18never/transform';

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
                if (!filter(id) || id.endsWith('.html')) return;

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
