import { inquire } from '../inquire';
import { TempKeyItem, TranslationDetail } from '../types';

export default async function transform(keys, filename: string) {
    type SameRow = Record<number, TempKeyItem[]>;
    const sameRowObj: SameRow = {};
    const allTranslations = await inquire(keys, filename);
    for (const [index, item] of keys.entries()) {
        if (allTranslations[index]) {
            const translation = allTranslations[index].translation;
            if (translation.length != 0) {
                const targetPrefix = getIdentifier(translation);
                item.prefix = targetPrefix;
            }
            if (sameRowObj[item.loc.line]) {
                sameRowObj[item.loc.line].push(item);
            } else {
                sameRowObj[item.loc.line] = [item];
            }
        }
    }
    return Object.values(sameRowObj);
}

function getIdentifier(translation: TranslationDetail[]) {
    const identifierTags: string[] = [];
    translation.forEach(({ language, tag, isAnswer }) => {
        const tagName = tag.name;
        if (isAnswer) {
            if (!tagName || tagName === 'default') {
                identifierTags.push(`${language}`);
            } else {
                identifierTags.push(`${language}=${tagName}`);
            }
        }
    });

    return identifierTags.length !== 0
        ? `[$_:${identifierTags.join(',')}]`
        : '';
}
