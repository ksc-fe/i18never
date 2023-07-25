import { TranslationDetail } from './inquire';
import { options, SupportExt } from '@i18never/shared';
import { jsParse, pugParse, vueParse } from './parsers';

export const extParserMap: {
    [key in SupportExt]: typeof jsParse | typeof pugParse | typeof vueParse;
} = {
    '.vue': vueParse,
    '.js': jsParse,
    '.ts': jsParse,
    '.mjs': jsParse,
    '.mts': jsParse,
    '.jsx': jsParse,
    '.tsx': jsParse,
    '.pug': pugParse,
    '.jade': pugParse,
};

export function getParserByExt(extname: string) {
    const parser = extParserMap[extname];
    if (!parser) {
        throw new Error(`${extname} file is not supported.`);
    }

    return parser;
}

export function getIdentifier(translationDetails: TranslationDetail[]) {
    const identifierTags: string[] = [];
    translationDetails.forEach(({ language, tag }) => {
        const tagName = tag.name;
        if (!tagName || tagName === 'default') {
            identifierTags.push(`${language}`);
        } else {
            identifierTags.push(`${language}=${tagName}`);
        }
    });

    return `${options.prefix}:${identifierTags.join(',')}`;
}
