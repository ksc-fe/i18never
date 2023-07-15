import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import { parseString, isIgnore } from '../helpers';
import type { Tags, Context } from '.';
import { ObjectProperty } from './ObjectProperty';
import { Text } from './Text';

export function TemplateLiteral(
    this: Context,
    path: NodePath<t.TemplateLiteral>
) {
    const node = path.node;
    const expressions = node.expressions as t.Expression[];
    const quasis = node.quasis;
    const strings: string[] = [];

    let index = 0;
    let tags: Tags | null = null;
    let identifier: string | null = null;
    for (let i = 0; i < quasis.length; i++) {
        const elem = quasis[i];
        let raw = elem.value.raw;
        if (raw) {
            if (i === 0) {
                // if this is the first quasi, check whether it has tag or not
                const {
                    key,
                    tags: _tags,
                    identifier: _identifier,
                } = parseString(raw);
                if (_identifier) {
                    raw = key;
                    tags = _tags;
                    identifier = _identifier;
                    if (isIgnore(_identifier)) {
                        strings.push(raw);
                        break;
                    }
                }
            }
            strings.push(raw);
        }
        if (index < expressions.length) {
            strings.push(`{${index++}}`);
        }
    }

    const key = strings.join('');

    path.traverse(
        { ObjectProperty, StringLiteral: Text, TemplateLiteral },
        this
    );

    path.skip();

    this.keys.push({
        key,
        tags,
        identifier,
        loc: node.loc!,
        path,
    });
}
