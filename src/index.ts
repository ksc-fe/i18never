import { parse } from '@babel/parser';
import generate from '@babel/generator';
import { getTagsParam, getAllKeys } from './helpers';
import { inquire } from './inquire';
export { set } from './helpers';

export async function manipulate(source: string) {
    const ast = parse(source, { sourceType: 'module' });
    const allKeys = getAllKeys(ast);
    const allTranslations = await inquire(allKeys);

    allKeys.forEach(({ params, callback }, index) => {
        const translation = allTranslations[index].translation;
        const tagsParam = getTagsParam(translation);
        if (tagsParam) {
            params.push(tagsParam);
        }
        callback();
    });

    return generate(ast, { concise: true, jsescOption: { minimal: true } })
        .code;
}
