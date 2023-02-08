const options = {
    // match the text that will be translated
    matchChineseRE: /[\u4E00-\u9FFF]+/,

    matchQuoteRE: /^["|'](.*)["|']$/g,

    matchMustacheRE: /\{\{((?:.|\r?\n)+?)\}\}/g,

    matchPrefixRE: /^\[(i18never:([^\]]*))\](.*)/,

    // the graphql api for getting translations
    uri: 'http://localhost:3003',

    // the source to distinguish clients
    source: 'i18never',

    // the prefix string of identifier
    prefix: 'i18never',

    // the module providing the translation function, namely _$
    clientModule: '@i18never/client',
};

export default options;
