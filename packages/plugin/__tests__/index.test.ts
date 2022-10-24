import i18never from '../src';
import { RollupOptions, rollup } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import { resolve } from 'path';
import path from 'path';

const config: RollupOptions = {
    input: path.resolve(__dirname, './assets/entry.ts'),
    plugins: [
        typescript({
            tsconfig: resolve(__dirname, '../../../tsconfig.json'),
            tsconfigOverride: {
                compilerOptions: {
                    module: 'ESNext',
                    sourceMap: true,
                },
            },
        }),
        i18never(),
    ],
};

test('should handle typescript correctly', async () => {
    try {
        const buddle = await rollup(config);
        await buddle.write({
            file: path.resolve(__dirname, './dist/buddle.js'),
            format: 'es',
            interop: 'esModule',
        });
    } catch (e) {
        console.log(e);
    }
});
