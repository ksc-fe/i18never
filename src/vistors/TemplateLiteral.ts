import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import { skipStringLiteral } from './Program';
import { parseString } from './StringLiteral';

export function TemplateLiteral(path: NodePath<t.TemplateLiteral>) {
    const node = path.node;
    const expressions = node.expressions as t.Expression[];
    const strings: string[] = [];

    let index = 0;
    let tag = '';
    node.quasis.forEach((elem, idx) => {
        let raw = elem.value.raw;
        if (raw) {
            if (idx === 0) {
                // if this is the first quasi, check whether it has tag or not
                const [_tag, str] = parseString(raw);
                if (_tag !== null) {
                    raw = str!;
                    tag = _tag;
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

    if (tag) params.push(t.stringLiteral(tag));

    path.replaceWith(t.callExpression(t.identifier('_$'), params));
}
