import { process } from '../src';
import path from 'path';
import inquirer from 'inquirer';
import fs from 'fs/promises';
import { writeFileSync } from 'fs';
import { QueryOrCreateDictsQuery } from '@i18never/shared';

function MockGraphQLClient() {
    // emtpy
}
jest.mock('graphql-request', () => {
    return {
        GraphQLClient: MockGraphQLClient,
    };
});

function mockData(file: string) {
    MockGraphQLClient.prototype.request =
        function (): Promise<QueryOrCreateDictsQuery> {
            return Promise.resolve(require(file));
        };
}

fs.writeFile = jest.fn().mockImplementation((source: string, file: string) => {
    console.log(file, source);
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
    mockData('./assets/test.json');
    await process(resolvePath('./assets/test.js'));
});

test('process jsx', async () => {
    mockData('./assets/react.json');
    await process(resolvePath('./assets/react.jsx'));
});

test('process tsx', async () => {
    mockData('./assets/react.json');
    await process(resolvePath('./assets/testTsx.tsx'));
});

test('process pug', async () => {
    await process(resolvePath('./assets/testPug.pug'));
});
