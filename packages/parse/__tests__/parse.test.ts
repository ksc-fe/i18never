import { i18nparse, i18nTrans } from '../src/index';
import fs from 'fs';
import path from 'path';

// test('parse pug template', async () => {
//     const file = path.resolve(__dirname, './assets/testpug.pug');
//     const tempsource = fs.readFileSync(file, 'utf8');
//     await i18nparse(tempsource, 'packages/parse/__tests__/assets/testpug.pug');
// });

test('parse vue template', async () => {
    const file = path.resolve(__dirname, './assets/testvue2.vue');
    const tempsource = fs.readFileSync(file, 'utf8');
    await i18nparse(tempsource, 'packages/parse/__tests__/assets/testvue2.vue');
});

// test('parse js', async () => {
//     const file = path.resolve(__dirname, './assets/test.js');
//     const tempsource = fs.readFileSync(file, 'utf8');
//     await i18nTrans(tempsource, 'packages/parse/__tests__/assets/test.js');
// });

// test('parse jsx', async () => {
//     const file = path.resolve(__dirname, './assets/react.jsx');
//     const tempsource = fs.readFileSync(file, 'utf8');
//     await i18nparse(tempsource, 'packages/parse/__tests__/assets/react.jsx');
// });

// test('parse jsx', async () => {
//     const file = path.resolve(__dirname, './assets/react.jsx');
//     const tempsource = fs.readFileSync(file, 'utf8');
//     await i18nTrans(tempsource, 'packages/parse/__tests__/assets/react.jsx');
// });
