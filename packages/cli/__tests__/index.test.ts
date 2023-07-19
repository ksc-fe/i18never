import { tag } from '../src/tag';
import path from 'path';
import { QueryOrCreateDictsQuery } from '@i18never/shared';
import fs from 'fs/promises';
import { writeFileSync } from 'fs';
import { glob } from 'glob';

function MockGraphQLClient() {
    // emtpy
}
jest.mock('graphql-request', () => {
    return {
        GraphQLClient: MockGraphQLClient,
    };
});

function mock(data: QueryOrCreateDictsQuery) {
    MockGraphQLClient.prototype.request =
        function (): Promise<QueryOrCreateDictsQuery> {
            return Promise.resolve(data);
        };
}

mock(require('./assets/data.json'));

fs.writeFile = jest.fn().mockImplementation((file: string, source: string) => {
    writeFileSync(file.replace('/assets/', '/dist/'), source, 'utf-8');
});

test(`test`, async () => {
    const results = path.resolve(__dirname, './dist');
    await fs.rm(results, { recursive: true, force: true });
    await fs.mkdir(results, { recursive: true });

    await tag(path.resolve(__dirname, './assets'));

    const files = await glob(`${results}/**/*`);
    expect(files.length).toBeTruthy();
});
