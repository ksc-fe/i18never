import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import { skipStringLiteral } from './Program';

export function TemplateLiteral(path: NodePath<t.TemplateLiteral>) {
    const node = path.node;
    const expressions = node.expressions as t.Expression[];
    const strings: string[] = [];

    let index = 0;
    node.quasis.forEach((elem) => {
        const raw = elem.value.raw;
        if (raw) strings.push(raw);
        else if (index < expressions.length) {
            strings.push(`{${index++}}`);
        }
    });

    path.replaceWith(
        t.callExpression(t.identifier('_$'), [
            skipStringLiteral(strings.join('')),
            ...expressions,
        ])
    );
}
