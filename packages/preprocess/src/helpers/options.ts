import { defaultURI } from '@i18never/shared';

const options = {
    // match the text that will be translated
    matchChineseRE: /[\u4E00-\u9FFF]+/,
    // /(?:\\u\{(?:(?:4[EF][\dA-F]{2})|(?:[5-9][\dA-F]{3}))\})+/

    // match the text that will be ignore
    matchIgnoreRE: /.*\[\$_:ignore\].*/,

    // match the text that will be translated
    matchQuoteRE: /^["|'](.*)["|']$/g,

    matchMustacheRE: /\{\{((?:.|\r?\n)+?)\}\}/g,

    matchPrefixRE: /^\[(\$_:([^\]]*))\](.*)/,

    // match Chinese punctuation marks
    punctuationsRegEx: /[：，；！？。]/g,

    // the graphql api for getting translations
    uri: defaultURI,

    // the source to distinguish clients
    source: 'i18never',

    // the prefix string of identifier
    prefix: '$_',

    // the module providing the translation function, namely $_
    clientModule: '@i18never/client',
};

export default options;
