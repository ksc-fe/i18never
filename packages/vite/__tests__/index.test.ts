import i18never from '../src';
import { CreateVersionQuery } from '@i18never/shared';
import { createServer, build } from 'vite';
import vue from '@vitejs/plugin-vue';

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

test('build', async () => {
    const result = await build({
        configFile: false,
        root: __dirname,
        plugins: [vue(), i18never({ injectScript: false })],
    });
    console.log(result);
});
