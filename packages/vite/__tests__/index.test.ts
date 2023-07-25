import i18never from '../src';
import { CreateVersionQuery } from '@i18never/shared';
import { createServer } from 'vite';

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

test('vite test', async () => {
    // const server = await createServer({
    //     configFile: false,
    //     root: __dirname,
    //     server: {
    //         port: 1337,
    //     },
    //     plugins: [i18never()],
    // });
    // await server.listen();
    // server.printUrls();
});
