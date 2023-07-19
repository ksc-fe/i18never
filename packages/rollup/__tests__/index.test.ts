import i18never from '../src';
import { RollupOptions, rollup } from 'rollup';
import path from 'path';
import { CreateVersionQuery } from '@i18never/shared';

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
        plugins: [i18never()],
    };
    const buddle = await rollup(config);

    await buddle.write({
        file: path.resolve(__dirname, './dist/buddle.js'),
        format: 'es',
        interop: 'esModule',
    });
});
