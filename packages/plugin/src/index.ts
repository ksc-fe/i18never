import { TransformPluginContext } from 'rollup';
import { manipulate } from '@i18never/transform';
import { SourceMapConsumer } from 'source-map';
import { writeFile } from 'fs/promises';

export default function i18never() {
    return {
        name: 'i18never',

        async transform(
            this: TransformPluginContext,
            code: string,
            id: string
        ) {
            const results = await manipulate(code);
            const sourceMap = this.getCombinedSourcemap();

            if (results.keys.length) {
                const lines = sourceMap.sourcesContent[0].split('\n');
                const consumer = await new SourceMapConsumer(sourceMap);
                const offsetMap: number[] = [];
                let shouldModify = false;
                results.keys.forEach(
                    ({ loc, newIdentifier, oldIndentifer, key }) => {
                        if (newIdentifier === oldIndentifer) return;
                        shouldModify = true;

                        const { line, column } = consumer.originalPositionFor(
                            loc.start
                        );

                        if (line === null || column === null) {
                            throw new Error(
                                `Can not find the original position for key: ${key} in file: ${id}`
                            );
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
                    }
                );

                if (shouldModify) {
                    await writeFile(id, lines.join('\n'));
                }
            }

            return { code: results.code };
        },
    };
}
