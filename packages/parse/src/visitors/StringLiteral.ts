import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import options from '../config';
import { parseString, parseTags } from '../utils';
import { JsContext } from '../types';

export function StringLiteral(
    this: JsContext,
    path: NodePath<t.StringLiteral>
) {
    const { node } = path;

    if (node.extra?.skip) return;

    const value = node.value.trim();
    if (!value || !options.matchChineseRE.test(value)) return;

    let params: t.Expression[];
    const { key, tags } = parseString(value);
    if (tags !== null) {
        const newParams = parseTags(tags);
        params = [t.stringLiteral(key), t.objectExpression(newParams)];
    } else {
        params = [t.stringLiteral(key)];
    }

    const newExpression = t.callExpression(t.identifier('_$'), params);
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
        tags,
    });
}
