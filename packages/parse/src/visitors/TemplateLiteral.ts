import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import { parseString } from '../utils';
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
    node.quasis.forEach((elem, idx) => {
        const raw = elem.value.raw;
        if (raw) {
            if (idx === 0) {
                // if this is the first quasi, check whether it has tag or not
                const { tags: _tags } = parseString(raw);
                if (_tags !== null) {
                    tags = _tags;
                }
            }
            strings.push(raw);
        }
        if (index < expressions.length) {
            strings.push(`{${index++}}`);
        }
    });

    const key = strings.join('');
    path.replaceWith(t.stringLiteral(key));
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
