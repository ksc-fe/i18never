const options = {
    // match the text that will be translated
    matchChineseRE: /[\u4E00-\u9FFF]+/,

    // match the text that will be ignore
    matchIgnoreRE: /.*\[\$_:ig\].*/,

    // match the text that will be tra
    matchQuoteRE: /^["|'](.*)["|']$/g,

    matchMustacheRE: /\{\{((?:.|\r?\n)+?)\}\}/g,

    matchPrefixRE: /^\[(\$_:([^\]]*))\](.*)/,

    // the graphql api for getting translations
    uri: 'http://localhost:3003/',

    // the source to distinguish clients
    source: 'i18never',

    // the prefix string of identifier
    prefix: '$_',

    // the module providing the translation function, namely $_
    clientModule: '@i18never/client',
};

export default options;
