import { i18nparse, i18nTrans } from '../src/index';
import fs from 'fs';
import path from 'path';

test('parse pug template', async () => {
    const file = path.resolve(__dirname, './assets/testPug.pug');
    const tempsource = fs.readFileSync(file, 'utf8');
    await i18nparse(tempsource, 'packages/parse/__tests__/assets/testPug.pug');
});

test('parse vue template', async () => {
    const file = path.resolve(__dirname, './assets/testVue.vue');
    const tempsource = fs.readFileSync(file, 'utf8');
    await i18nparse(tempsource, 'packages/parse/__tests__/assets/testVue.vue');
});

test('parse pug in vue template', async () => {
    const file = path.resolve(__dirname, './assets/testPugInVue.vue');
    const tempsource = fs.readFileSync(file, 'utf8');
    await i18nparse(
        tempsource,
        'packages/parse/__tests__/assets/testPugInVue.vue'
    );
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
