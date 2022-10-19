import i18never from './src';
import { RollupOptions } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import { resolve } from 'path';

const config: RollupOptions = {
    input: './test.ts',
    plugins: [
        typescript({
            tsconfig: resolve(__dirname, '../../tsconfig.json'),
            tsconfigOverride: {
                compilerOptions: {
                    module: 'ESNext',
                    sourceMap: true,
                },
            },
        }),
        i18never(),
    ],
    output: [
        {
            file: 'buddle.js',
            format: 'es',
        },
    ],
};

export default config;
