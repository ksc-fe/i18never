import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import options from '../config';
import { parseString, parseTags } from '../utils';
import { JsContext } from '../types';

export function JSXText(this: JsContext, path: NodePath<t.JSXText>) {
    const { node } = path;

    if (node.extra?.skip) return;

    const value = node.value.trim();
    if (!value || !options.matchChineseRE.test(value)) return;
    const { tags, key, allIsDefault } = parseString(value);

    if (options.matchIgnoreRE.test(value)) {
        path.replaceWith(t.stringLiteral(key));
        path.skip();
        return;
    }

    let params: t.Expression[];
    if (tags !== null && !allIsDefault) {
        const newParams = parseTags(tags);
        params = [t.stringLiteral(key), t.objectExpression(newParams)];
    } else {
        params = [t.stringLiteral(key)];
    }

    const newExpression = t.jsxExpressionContainer(
        t.callExpression(t.identifier('$_'), params)
    );
    // @ts-ignore
    path.replaceWith(newExpression);

    path.skip();

    this.keys.push({
        key,
        prefix: '',
        filename: this.filename,
        loc: node.loc?.start || {
            line: -1,
            column: -1,
        },
        jsx: true,
        tags,
    });
}
