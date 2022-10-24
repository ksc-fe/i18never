import { ModuleInfo, TransformPluginContext, PluginContext } from 'rollup';
import { manipulate } from '@i18never/transform';
import { SourceMapConsumer, NullableMappedPosition } from 'source-map';
import { writeFile } from 'fs/promises';

export default function i18never() {
    return {
        name: 'i18never',

        // resolverId(source: string) {
            // console.log('source', source);
            // if (source === 'virtual-module') {
                // return source;
            // }
            // return null;
        // },

        // load(this: PluginContext, id: string) {
            // console.log('id', id);
            // console.log(this.getModuleInfo(id));
            // if (id === 'virtual-module') {
                // return 'export default "This is virtual!"';
            // }
            // return null;
        // },

        async transform(
            this: TransformPluginContext,
            code: string,
            id: string
        ) {
            console.log(code, id);
            console.log(this.getCombinedSourcemap());

            const results = await manipulate(code);
            const sourceMap = this.getCombinedSourcemap();

            console.log(results);

            if (results.keys.length) {
                const lines = sourceMap.sourcesContent[0].split('\n');
                const consumer = await new SourceMapConsumer(sourceMap);
                const offsetMap: number[]  = [];
                results.keys.forEach(({ loc, identifier, key }) => {
                    const {line, column} = consumer.originalPositionFor(loc.start);

                    if (line === null || column === null) {
                        throw new Error(`Can not find the original position for key: ${key} in file: ${id}`);
                    }

                    const code = lines[line - 1];
                    if (offsetMap[line] === undefined) {
                        offsetMap[line] = 0;
                    }
                    const offset = column + 1 + offsetMap[line];
                    const displacement = `[${identifier}]`;
                    const newCode = code.substring(0, offset) + displacement + code.substring(offset);

                    lines[line - 1] = newCode;
                    offsetMap[line] += displacement.length;
                    console.log('newCode', code, newCode);
                    // await modifyOriginalFile(position);
                });

                const contents = lines.join('\n');
                console.log(contents);
                await writeFile(id, contents);
            }

            return { code: results.code };
        },

        // moduleParsed(moduleInfo: ModuleInfo) {
            // console.log(moduleInfo, this);
        // },
    };
}
