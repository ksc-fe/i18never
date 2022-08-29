import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import { skipStringLiteral } from './Program';
import { parseString, getTagsParam, Tags } from '../helpers';

export function TemplateLiteral(path: NodePath<t.TemplateLiteral>) {
    const node = path.node;
    const expressions = node.expressions as t.Expression[];
    const strings: string[] = [];

    let index = 0;
    let tags: Tags | null = null;
    node.quasis.forEach((elem, idx) => {
        let raw = elem.value.raw;
        if (raw) {
            if (idx === 0) {
                // if this is the first quasi, check whether it has tag or not
                const { key, tags: _tags } = parseString(raw);
                if (_tags !== null) {
                    raw = key;
                    tags = _tags;
                }
            }
            strings.push(raw);
        }
        if (index < expressions.length) {
            strings.push(`{${index++}}`);
        }
    });

    const params: t.Expression[] = [
        skipStringLiteral(strings.join('')),
        t.arrayExpression(expressions),
    ];

    if (tags) {
        const tagsParam = getTagsParam(tags);
        if (tagsParam) {
            params.push(tagsParam);
        }
    }

    path.replaceWith(t.callExpression(t.identifier('_$'), params));
}
