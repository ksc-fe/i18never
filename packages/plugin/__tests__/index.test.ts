import i18never from '../src';
import { RollupOptions, rollup } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import { resolve } from 'path';
import path from 'path';
import fs from 'fs/promises';
import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';

const typescriptPlugin = typescript({
    tsconfig: resolve(__dirname, '../../../tsconfig.json'),
    tsconfigOverride: {
        compilerOptions: {
            module: 'ESNext',
            sourceMap: true,
        },
    },
});

// test('should handle typescript correctly', async () => {
    // const config: RollupOptions = {
        // input: path.resolve(__dirname, './assets/entry.ts'),
        // plugins: [
            // typescriptPlugin,
            // i18never(),
        // ],
    // };

    // const buddle = await rollup(config);
    // await buddle.write({
        // file: path.resolve(__dirname, './dist/buddle.js'),
        // format: 'es',
        // interop: 'esModule',
    // });

    // expect(await fs.readFile(config.input as string, 'utf8')).toBe(
        // await fs.readFile(path.resolve(__dirname, './specimens/entry.ts'), 'utf8')
    // );
    // expect(await fs.readFile(path.resolve(__dirname, './assets/module.ts'), 'utf8')).toBe(
        // await fs.readFile(path.resolve(__dirname, './specimens/module.ts'), 'utf8')
    // );
// });

// test('should handle vue correctly', async () => {
     // const config: RollupOptions = {
        // input: path.resolve(__dirname, './assets/test.vue'),
        // plugins: [
            // vue({
                // // template: {
                    // // compilerOptions: {
                        // // sourceMap: true,
                    // // },
                // // },
            // }) as any,
            // i18never(),
        // ],
    // };

    // const buddle = await rollup(config);
    // await buddle.write({
        // // dir: path.resolve(__dirname, './dist'),
        // file: path.resolve(__dirname, './dist/vue.js'),
        // sourcemap: true,
        // sourcemapFile: path.resolve(__dirname, './dist/vue.js.map'),
    // });
// });

test('should handle vue jsx correctly', async () => {
     const config: RollupOptions = {
        input: path.resolve(__dirname, './assets/vue.jsx'),
        plugins: [
            jsx(),
            vue({
                // template: {
                    // compilerOptions: {
                        // sourceMap: true,
                    // },
                // },
            }) as any,
            i18never(),
        ],
    };

    const buddle = await rollup(config);
    await buddle.write({
        // dir: path.resolve(__dirname, './dist'),
        file: path.resolve(__dirname, './dist/jsx.js'),
        sourcemap: true,
        sourcemapFile: path.resolve(__dirname, './dist/jsx.js.map'),
    });
});
