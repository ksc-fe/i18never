import { Plugin, OutputAsset } from 'rollup';
import {
    initOptions,
    PluginOptions,
    queryVersion,
    generateScript,
} from '@i18never/shared';
import { KeyItem, transform } from '@i18never/transform';
import { createFilter } from '@rollup/pluginutils';

export default function i18never(options: PluginOptions = {}): Plugin {
    initOptions(options);

    const allKeys: KeyItem[] = [];
    const filter = createFilter(options.include, options.exclude);

    return {
        name: 'i18never',

        transform: {
            order: 'post',
            async handler(code: string, id: string) {
                if (!filter(id)) return;

                const { code: output, keys } = transform(code);
                allKeys.push(...keys);

                return { code: output, map: null };
            },
        },

        generateBundle: {
            order: 'post',
            async handler(_, bundle) {
                const version = await queryVersion(allKeys);
                for (const entryFile in bundle) {
                    if (entryFile.endsWith('.html')) {
                        const entryHtmlFile = bundle[entryFile] as OutputAsset;
                        const html = entryHtmlFile.source.toString();

                        const newHtml = html.replace(
                            '</head>',
                            `<script>${generateScript(
                                version,
                                options
                            )}</script></head>`
                        );
                        entryHtmlFile.source = newHtml;
                    }
                }
            },
        },
    };
}
