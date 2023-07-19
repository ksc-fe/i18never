import i18never from '../src';
import { RollupOptions, rollup } from 'rollup';
import * as path from 'path';
import { CreateVersionQuery } from '@i18never/shared';
import html from '@rollup/plugin-html';
import * as fs from 'fs/promises';

function MockGraphQLClient() {
    // emtpy
}
MockGraphQLClient.prototype.request = function (): Promise<CreateVersionQuery> {
    return Promise.resolve({
        getVerionId: {
            Id: 'fake_id',
        },
    });
};
jest.mock('graphql-request', () => {
    return {
        GraphQLClient: MockGraphQLClient,
    };
});

test('should generate file correctly', async () => {
    const config: RollupOptions = {
        input: path.resolve(__dirname, './assets/entry.js'),
        plugins: [i18never(), html()],
    };
    const buddle = await rollup(config);

    const dist = path.resolve(__dirname, './dist');
    await fs.rm(dist, { recursive: true, force: true });
    await buddle.write({
        file: `${dist}/bundle.js`,
        format: 'es',
        interop: 'esModule',
    });

    expect(await fs.readFile(`${dist}/bundle.js`, 'utf-8')).toMatchSnapshot();
    expect(await fs.readFile(`${dist}/index.html`, 'utf-8')).toMatchSnapshot();
});
