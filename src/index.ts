import { parse, ParseResult } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import { visitor } from './visitors';
import { KeyItem, getTagsParam } from './helpers';
import * as t from '@babel/types';
import { inquire } from './inquire';

export async function manipulate(source: string) {
    const ast = parse(source, { sourceType: 'module' });
    const allKeys = getAllKeys(ast);
    const allTranslations = await inquire(allKeys);

    allKeys.forEach(({ tags, params, callback }, index) => {
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

function getAllKeys(ast: ParseResult<t.File>) {
    const allKeys: KeyItem[] = [];

    traverse(ast, visitor, undefined, {
        keys: allKeys,
    });

    return allKeys;
}
