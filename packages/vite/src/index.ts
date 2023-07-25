import { Plugin } from 'vite';
import {
    initOptions,
    PluginOptions,
    queryVersion,
    generateScript,
} from '@i18never/shared';
import { createFilter } from '@rollup/pluginutils';
import { KeyItem, transform } from '@i18never/transform';

export default function i18never(options: PluginOptions = {}): Plugin {
    initOptions(options);

    const allKeys: KeyItem[] = [];
    const filter = createFilter(options.include, options.exclude);

    return {
        name: 'i18never',

        transform: {
            order: 'post',
            async handler(code, id) {
                if (!filter(id)) return;

                const { code: output, keys } = transform(code);
                allKeys.push(...keys);

                return { code: output, map: null };
            },
        },

        transformIndexHtml: {
            order: 'post',
            async handler(html) {
                const version = await queryVersion(allKeys);
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
