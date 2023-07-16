import { TranslationDetail, InquireResultItem } from './inquire';
import { options } from '@i18never/shared';
import { KeyItem } from './visitors';

// const supportExts = ['.vue', '.js', 'ts', 'tsx', 'jsx', 'mjs', '.pug', '.jade'];
// export function isSupportExt(ext: string) {
//     return supportExts.includes(ext);
// }

export type UnTranslatedKeyItem = {
    keyItem: KeyItem;
    translationDetail: TranslationDetail;
};

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

export function getUnTranslatedKeys(
    keys: KeyItem[],
    translations: InquireResultItem[]
) {
    const unTranslatedKeys: UnTranslatedKeyItem[] = [];
    keys.forEach((item, index) => {
        const translationDetails = translations[index].translationDetails;
        translationDetails.forEach((translationDetail) => {
            if (!translationDetail.tag.value) {
                unTranslatedKeys.push({
                    keyItem: item,
                    translationDetail,
                });
            }
        });
    });

    return unTranslatedKeys;
}
