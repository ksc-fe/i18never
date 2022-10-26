import { parse } from '@babel/parser';
import generate from '@babel/generator';
import { getTagsParam, getAllKeys, getIdentifier, KeyItem } from './helpers';
import { inquire } from './inquire';
export { set } from './helpers';

export async function manipulate(source: string) {
    const ast = parse(source, { sourceType: 'module', plugins: ['jsx'] });
    console.log(ast);
    const allKeys = getAllKeys(ast);
    const allTranslations = await inquire(allKeys);

    allKeys.forEach((item, index) => {
        const { params, callback } = item;
        const translation = allTranslations[index].translation;
        const tagsParam = getTagsParam(translation);
        if (tagsParam) {
            params.push(tagsParam);
        }

        callback();

        item.newIdentifier = getIdentifier(translation);
    });

    const code = generate(ast, {
        // concise: true,
        jsescOption: { minimal: true },
        retainLines: true,
    }).code;

    return { code, keys: allKeys as Required<KeyItem>[] };
}
