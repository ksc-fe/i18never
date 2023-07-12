import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import options from '../config';
import { parseString, parseTags } from '../utils';
import { JsContext } from '../types';

export function TemplateLiteral(
    this: JsContext,
    path: NodePath<t.TemplateLiteral>
) {
    const node = path.node;
    const expressions = node.expressions as t.Expression[];
    const strings: string[] = [];

    let index = 0;
    // let tags: Tags | null = null;
    // let allIsDefault = false;
    // if this is the first quasi, check whether it has tag or not
    const firstKey = node.quasis[0].value?.raw || '';
    const { tags = null, key, allIsDefault } = parseString(firstKey);
    if (options.matchIgnoreRE.test(firstKey)) {
        node.quasis[0].value.raw = key;
        path.replaceWith(t.templateLiteral(node.quasis, node.expressions));
        path.skip();
        return;
    }

    node.quasis.forEach((elem, idx) => {
        let raw = elem.value.raw;
        if (raw) {
            if (idx === 0) {
                raw = key;
            }
            strings.push(raw);
        }
        if (index < expressions.length) {
            strings.push(`{${index++}}`);
        }
    });

    const finalKey = strings.join('');
    if (!finalKey || !options.matchChineseRE.test(finalKey)) return;
    const params: t.Expression[] = [
        t.stringLiteral(finalKey),
        t.arrayExpression(expressions),
    ];
    if (tags !== null && !allIsDefault) {
        const newParams = parseTags(tags);
        params.push(t.objectExpression(newParams));
    }
    const newExpression = t.callExpression(t.identifier('$_'), params);
    // @ts-ignore
    path.replaceWith(newExpression);
    path.skip();

    this.keys.push({
        key: finalKey,
        prefix: '',
        filename: this.filename,
        loc: node.loc?.start || {
            line: -1,
            column: -1,
        },
        tags,
    });
}
