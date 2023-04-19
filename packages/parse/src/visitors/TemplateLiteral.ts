import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import { parseString, parseTags } from '../utils';
import { Tags, JsContext } from '../types';

export function TemplateLiteral(
    this: JsContext,
    path: NodePath<t.TemplateLiteral>
) {
    const node = path.node;
    const expressions = node.expressions as t.Expression[];
    const strings: string[] = [];

    let index = 0;
    let tags: Tags | null = null;
    let allIsDefault = false;
    node.quasis.forEach((elem, idx) => {
        let raw = elem.value.raw;
        if (raw) {
            if (idx === 0) {
                // if this is the first quasi, check whether it has tag or not
                const {
                    tags: _tags,
                    key,
                    allIsDefault: _allIsDefault,
                } = parseString(raw);
                if (_tags !== null) {
                    tags = _tags;
                    raw = key;
                    allIsDefault = _allIsDefault;
                }
            }
            strings.push(raw);
        }
        if (index < expressions.length) {
            strings.push(`{${index++}}`);
        }
    });

    const key = strings.join('');
    const params: t.Expression[] = [
        t.stringLiteral(key),
        t.arrayExpression(expressions),
    ];
    if (tags !== null && !allIsDefault) {
        const newParams = parseTags(tags);
        params.push(t.objectExpression(newParams));
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
