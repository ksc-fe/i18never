import { i18nparse } from '../src/index';
import fs from 'fs';
import path from 'path';

// test('parse pug template', async () => {
//     const file = path.resolve(__dirname, './assets/testpug.pug');
//     const tempsource = fs.readFileSync(file, 'utf8');
//     const keys = await i18nparse(
//         tempsource,
//         '../../__tests__/assets/testpug.pug'
//     );
// });

test('parse vue template', async () => {
    const file = path.resolve(__dirname, './assets/testvue.vue');
    const tempsource = fs.readFileSync(file, 'utf8');
    const keys = await i18nparse(
        tempsource,
        'packages/parse/__tests__/assets/testvue.vue'
    );
});

// test('parse jsx', async () => {
//     const file = path.resolve(__dirname, './assets/react.jsx');
//     const tempsource = fs.readFileSync(file, 'utf8');
//     const keys = await i18nparse(
//         tempsource,
//         '../../__tests__/assets/react.jsx'
//     );
// });

// test('parse Ts', async () => {
//     const file = path.resolve(__dirname, './assets/testts.ts');
//     const tempsource = fs.readFileSync(file, 'utf8');
//     const keys = await i18nparse(
//         tempsource,
//         '../../__tests__/assets/testts.ts'
//     );
// });
