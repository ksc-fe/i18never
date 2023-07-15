import { parse, ParseResult } from '@babel/parser';
import generate from '@babel/generator';
import * as t from '@babel/types';
import traverse from '@babel/traverse';
import {
    Tags,
    options,
    Context,
    isIgnore,
    KeyItem,
} from '@i18never/shared';
import { visitors } from './visitors';

export function transform(source: string) {
    const ast = parse(source, { sourceType: 'module' });
    const context = getContext(ast);
    const keys = context.keys;
    let hasImportedClient = context.hasImportedModule;

    keys.forEach((item) => {
        if (transformKey(item) && !hasImportedClient) {
            importClient(ast);
            hasImportedClient = true;
        }
    });

    const code = generate(ast, {
        // concise: true,
        jsescOption: { minimal: true },
        retainLines: true,
    }).code;

    return { code, keys };
}

function transformKey(item: KeyItem): boolean {
    const { identifier, path, tags, key } = item;
    if (!identifier) return false;

    const node = path.node;

    if (isIgnore(identifier)) {
        if (t.isTemplateLiteral(node)) {
            node.quasis[0].value.raw = key;
        } else {
            path.replaceWith(t.stringLiteral(key));
        }
        return false;
    }

    const params: t.Expression[] = [t.stringLiteral(key)];
    if (t.isTemplateLiteral(node)) {
        params.push(t.arrayExpression(node.expressions as t.Expression[]));
    }

    const tagsParam = getTagsParam(tags);
    if (tagsParam) {
        params.push(tagsParam);
    }

    path.replaceWith(
        t.callExpression(t.identifier(options.clientFunction), params)
    );

    return true;
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

function getContext(ast: ParseResult<t.File>) {
    const context: Context = {
        keys: [],
        hasImportedModule: false,
    };

    traverse(ast, visitors, undefined, context);

    return context;
}

function importClient(ast: ParseResult<t.File>) {
    const identifier = t.identifier(`{ ${options.clientFunction} }`);
    const importDefaultSpecifier = t.importDefaultSpecifier(identifier);
    const importDeclaration = t.importDeclaration(
        [importDefaultSpecifier],
        t.stringLiteral(options.clientModule)
    );
    ast.program.body.unshift(importDeclaration);
}
