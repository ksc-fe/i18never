import { GraphQLClient } from 'graphql-request';
import { getSdk as baseGetSdk } from './graphql';

export * from './graphql';

export const defaultURI = 'http://i18never.ksyun.com/graphql';

export function getSdk(uri = defaultURI, token?: string) {
    const client = new GraphQLClient(uri, {
        headers: token
            ? {
                  Authorization: token,
              }
            : undefined,
    });

    return baseGetSdk(client);
}
