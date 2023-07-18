import { process } from '../src';
import path from 'path';
import fs from 'fs/promises';
import { QueryOrCreateDictsQuery } from '@i18never/shared';

function MockGraphQLClient() {
    // emtpy
}
jest.mock('graphql-request', () => {
    return {
        GraphQLClient: MockGraphQLClient,
    };
});

MockGraphQLClient.prototype.request =
    function (): Promise<QueryOrCreateDictsQuery> {
        return Promise.resolve(require('./assets/data.json'));
    };

fs.writeFile = jest.fn();

async function toMatchSnapshot(file: string) {
    expect(
        (await process(path.resolve(__dirname, file))).newSource
    ).toMatchSnapshot();
}

test('process js', async () => {
    await toMatchSnapshot('./assets/test.js');
});

test('process jsx', async () => {
    await toMatchSnapshot('./assets/react.jsx');
});

test('process tsx', async () => {
    await toMatchSnapshot('./assets/testTsx.tsx');
});

test('process pug', async () => {
    await toMatchSnapshot('./assets/testPug.pug');
});

test('process vue', async () => {
    await toMatchSnapshot('./assets/testVue.vue');
});

test('process pug in vue', async () => {
    await toMatchSnapshot('./assets/testPugInVue.vue');
});
