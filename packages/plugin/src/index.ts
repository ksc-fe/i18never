import { TransformPluginContext } from 'rollup';
import { manipulate } from '@i18never/transform';
import { SourceMapConsumer } from 'source-map';
import { writeFile, readFile } from 'fs/promises';

export default function i18never() {
    return {
        name: 'i18never',

        async load(id: string) {
            console.log('load id', id);
            const content = await readFile(id, 'utf8');
            console.log(content);
            return content.replace('翻译', '[i18never:en,kr]翻译');
        },

        async transform(
            this: TransformPluginContext,
            code: string,
            id: string
        ) {
            console.log(code);
            const results = await manipulate(code);
            const sourceMap = this.getCombinedSourcemap();
            console.log(sourceMap);

            if (results.keys.length && sourceMap.sourcesContent.length) {
                const lines = sourceMap.sourcesContent[0].split('\n');
                const consumer = await new SourceMapConsumer(sourceMap);
                const offsetMap: number[] = [];
                let shouldModify = false;
                results.keys.forEach(
                    ({ loc, newIdentifier, oldIndentifer, key }) => {
                        if (newIdentifier === oldIndentifer) return;

                        const { line, column } = consumer.originalPositionFor(
                            loc.start
                        );

                        if (line === null || column === null) {
                            return;
                            // throw new Error(
                                // `Can not find the original position for key: ${key} in file: ${id}`
                            // );
                        }

                        const code = lines[line - 1];
                        if (offsetMap[line] === undefined) {
                            offsetMap[line] = 0;
                        }
                        const offset = column + 1 + offsetMap[line];
                        const displacement = `[${newIdentifier}]`;
                        const oldIndentiferLength =
                            oldIndentifer === null
                                ? 0
                                : oldIndentifer.length + 2;
                        const newCode =
                            code.substring(0, offset) +
                            displacement +
                            code.substring(offset + oldIndentiferLength);

                        lines[line - 1] = newCode;
                        offsetMap[line] +=
                            displacement.length - oldIndentiferLength;
                        shouldModify = true;
                    }
                );

                if (shouldModify) {
                    await writeFile(removeQueryString(id), lines.join('\n'));
                }
            }

            return { code: results.code, map: null };
        },
    };
}

/**
 * Vue will add querystring to path
 */
function removeQueryString(file: string) {
    const index = file.indexOf('?');
    if (index > -1) {
        return file.substring(0, index);
    }
    return file;
}
