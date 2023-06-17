const options = {
    // match the text that will be translated
    matchChineseRE: /[\u4E00-\u9FFF]+/,

    // match the text that will be ignore
    matchIgnoreRE: /.*\[\$_:ignore\].*/,

    // match the text that will be tra
    matchQuoteRE: /^["|'](.*)["|']$/g,

    matchMustacheRE: /\{\{((?:.|\r?\n)+?)\}\}/g,

    matchPrefixRE: /^\[(\$_:([^\]]*))\](.*)/,

    // match Chinese punctuation marks
    punctuationsRegEx: /[：，；！？。]/g,

    // the graphql api for getting translations
    uri: 'http://i18never.ksyun.com/graphql/',

    // the source to distinguish clients
    source: 'i18never',

    // the prefix string of identifier
    prefix: '$_',

    // the module providing the translation function, namely $_
    clientModule: '@i18never/client',
};

export default options;
