export const options = {
    // match the text that will be translated
    matchRegexp: /[\u4E00-\u9FFF]+/,

    // the graphql api for getting translations
    uri: 'http://localhost:3003',

    // the source to distinguish clients
    source: 'i18never',
};

export function set(opt: Partial<typeof options>) {
    return Object.assign(options, opt);
}
