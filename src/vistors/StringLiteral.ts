import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import { SkipStringLieteral } from './Program';
import { matchRegexp } from '../constants';

export function StringLiteral(
    path: NodePath<t.StringLiteral | SkipStringLieteral>
) {
    const node = path.node;

    if (node.extra?.skip) return;

    const value = path.node.value.trim();
    if (!value || !matchRegexp.test(value)) return;

    let params = [node];
    const [tag, str] = parseString(value);
    if (tag !== null) {
        params = [t.stringLiteral(str!)];
        if (tag) {
            params.push(t.stringLiteral(tag));
        }
    }

    path.replaceWith(t.callExpression(t.identifier('_$'), params));
    path.skip();
}

const parseRegexp = /^\[i18never:([^\]]*)\](.*)/;
export function parseString(str: string) {
    const matches = str.match(parseRegexp);
    if (!matches) return [null, str];

    return [matches[1], matches[2]];
}
