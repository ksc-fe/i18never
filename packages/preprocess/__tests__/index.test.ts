import { process } from '../src';
import path from 'path';
import inquirer from 'inquirer';
import fs from 'fs/promises';
import { writeFileSync } from 'fs';
import { QueryOrCreateDictsQuery } from '@i18never/shared';

function MockGraphQLClient() {
    // emtpy
}
MockGraphQLClient.prototype.request =
    function (): Promise<QueryOrCreateDictsQuery> {
        return Promise.resolve(require('./assets/data.json'));
    };
jest.mock('graphql-request', () => {
    return {
        GraphQLClient: MockGraphQLClient,
    };
});

fs.writeFile = jest.fn().mockImplementation((source: string, file: string) => {
    const extname = path.extname(file);
    writeFileSync(
        `${file.slice(0, -extname.length)}.result${extname}`,
        source,
        'utf-8'
    );
});

function resolvePath(p: string) {
    return path.resolve(__dirname, p);
}

test('process js', async () => {
    await process(resolvePath('./assets/test.js'));
});

test('process jsx', async () => {
    await process(resolvePath('./assets/react.jsx'));
});

test('process tsx', async () => {
    await process(resolvePath('./assets/testTsx.tsx'));
});

test('process pug', async () => {
    await process(resolvePath('./assets/testPug.pug'));
});

test('process vue', async () => {
    await process(resolvePath('./assets/testVue.vue'));
});

test('process pug in vue', async () => {
    await process(resolvePath('./assets/testPugInVue.vue'));
});
