import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import { parseString, isIgnore, getLoc } from '../helpers';
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
        let value = elem.value.cooked;
        if (value) {
            if (i === 0) {
                // if this is the first quasi, check whether it has tag or not
                const {
                    key,
                    tags: _tags,
                    identifier: _identifier,
                } = parseString(value);
                if (_identifier) {
                    value = key;
                    tags = _tags;
                    identifier = _identifier;
                    if (isIgnore(_identifier)) {
                        strings.push(value);
                        break;
                    }
                }
            }
            strings.push(value);
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

    const { line, column } = getLoc(node.loc!.start, this.rootLoc);
    this.keys.push({
        key,
        tags,
        identifier,
        loc: {
            line,
            column: column + 1 /* forward one column because of the mark: ` */,
        },
        entity: path,
    });
}
