import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import { parseString } from '../helpers';
import type { Tags, Context } from '.';
import { ObjectProperty } from './ObjectProperty';
import { StringLiteral } from './StringLiteral';

export function TemplateLiteral(
    this: Context,
    path: NodePath<t.TemplateLiteral>
) {
    const node = path.node;
    const expressions = node.expressions as t.Expression[];
    const strings: string[] = [];

    let index = 0;
    let tags: Tags | null = null;
    let identifier: string | null = null;
    node.quasis.forEach((elem, idx) => {
        let raw = elem.value.raw;
        if (raw) {
            if (idx === 0) {
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
                }
            }
            strings.push(raw);
        }
        if (index < expressions.length) {
            strings.push(`{${index++}}`);
        }
    });

    const key = strings.join('');

    path.traverse({ ObjectProperty, StringLiteral, TemplateLiteral }, this);

    path.skip();

    this.keys.push({
        key,
        tags,
        identifier,
        loc: node.loc!,
        path,
    });
}
