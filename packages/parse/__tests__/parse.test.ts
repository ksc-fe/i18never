import { i18nparse } from '../src/index';
import fs from 'fs';
import path from 'path';

test('parse pug template', async () => {
    const file = path.resolve(__dirname, './assets/testpug.pug');
    const tempsource = fs.readFileSync(file, 'utf8');
    const keys = await i18nparse(tempsource, 'assets/testpug.pug');
    console.log('keys', keys);
});

test('parse vue template', async () => {
    const file = path.resolve(__dirname, './assets/testvue.vue');
    const tempsource = fs.readFileSync(file, 'utf8');
    const keys = await i18nparse(tempsource, 'assets/testvue.vue');
    console.log('keys', keys);
});
