import { parse } from '@babel/parser';
import generate from '@babel/generator';
import * as t from '@babel/types';
import traverse from '@babel/traverse';
import { visitors, Tags, options, KeyItem } from '@i18never/shared';
import { ParseResult } from '@babel/parser';

export function transform(source: string) {
    const ast = parse(source, { sourceType: 'module', plugins: ['jsx'] });
    const keys = getAllKeys(ast);

    keys.forEach((item) => {
        const { identifier, path, tags, key } = item;
        if (!identifier) return;

        const params: t.Expression[] = [t.stringLiteral(key)];
        const expressions = (path.node as t.TemplateLiteral).expressions;
        if (expressions) {
            params.push(t.arrayExpression(expressions as t.Expression[]));
        }

        const tagsParam = getTagsParam(tags);
        if (tagsParam) {
            params.push(tagsParam);
        }

        path.replaceWith(
            t.callExpression(t.identifier(options.clientFunction), params)
        );
    });

    const code = generate(ast, {
        // concise: true,
        jsescOption: { minimal: true },
        retainLines: true,
    }).code;

    return { code, keys };
}

function getTagsParam(tags: Tags | null) {
    if (!tags) return;

    const properties = [] as t.ObjectProperty[];
    for (const language in tags) {
        const tagName = tags[language];
        if (!tagName || tagName === 'default') continue;

        properties.push(
            t.objectProperty(
                t.stringLiteral(language),
                t.stringLiteral(tagName)
            )
        );
    }

    if (properties.length) {
        return t.objectExpression(properties);
    }
}

function getAllKeys(ast: ParseResult<t.File>) {
    const allKeys: KeyItem[] = [];

    traverse(ast, visitors, undefined, {
        keys: allKeys,
    });

    return allKeys;
}
