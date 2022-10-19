import { parse } from '@babel/parser';
import traverse, { TraverseOptions } from '@babel/traverse';
import generate from '@babel/generator';
import { Context, KeyItem, getTagsParam } from '../helpers';

export function manipulate(source: string, visitors: TraverseOptions<Context>) {
    const ast = parse(source, { sourceType: 'module' });
    const allKeys: KeyItem[] = [];

    traverse(ast, visitors, undefined, {
        keys: allKeys,
    });

    allKeys.forEach(({ tags, params, callback }) => {
        if (tags) {
            const languages = Object.keys(tags);
            const translations = languages.map((language) => {
                return { language, tag: { name: tags[language], value: '' } };
            });
            const tagsParam = getTagsParam(translations);

            if (tagsParam) {
                params.push(tagsParam);
            }
        }
        callback();
    });

    return expect(
        generate(ast, { concise: true, jsescOption: { minimal: true } }).code
    );
}
