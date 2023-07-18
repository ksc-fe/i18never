import { process } from '../src';
import path from 'path';
import fs from 'fs/promises';
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
    // const extname = path.extname(file);
    // writeFileSync(
    //     `${file.slice(0, -extname.length)}.result${extname}`,
    //     source,
    //     'utf-8'
    // );
});

async function toMatchSnapshot(file: string) {
    expect(await process(path.resolve(__dirname, file))).toMatchSnapshot();
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
