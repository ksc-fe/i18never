import pugParse from 'pug-parser';
import { Lexer } from 'pug-lexer';
import pugWalk from 'pug-walk';
import {
    parseString,
    SourceLocation,
    getLoc,
    isString,
} from '@i18never/shared';
import { KeyItem } from './';
import { parseTemplate, parseSimpleExpression } from './vue';
import { parse as jsParse } from './js';

type BaseNode = { line: number; column: number };
type TextNode = BaseNode & { val: string; type: 'Text' };
type TagNode = BaseNode & { attrs: AttrNode[]; type: 'Tag' };
type AttrNode = BaseNode & { name: string; val: string | boolean };
type Node = TextNode | TagNode;
export type Entity = TextNode | AttrNode;

export function parse(source: string, rootLoc?: SourceLocation) {
    const lexer = new Lexer(source);
    const tokens = lexer.getTokens();
    const ast = pugParse(tokens);
    const keys: KeyItem[] = [];

    pugWalk(ast, function before(node: Node) {
        switch (node.type) {
            case 'Text': {
                const value = node.val;
                if (!value.trim()) return;
                keys.push(...parseTemplate(value, getLoc(node, rootLoc, 1)));
                break;
            }
            case 'Tag':
                node.attrs.forEach((node: AttrNode) => {
                    let value = node.val;
                    if (
                        (isString(value) && !value.trim()) ||
                        typeof value === 'boolean'
                    ) {
                        return;
                    }

                    // should remove quotes
                    value = value.slice(1, -1);

                    const name = node.name;
                    const firstChar = name[0];
                    const loc = {
                        line: node.line,
                        column: node.column + name.length + 2, // `${node.name}="`.length,
                    };
                    if (firstChar === ':' || firstChar === '@' || name.startsWith('v-')) {
                        keys.push(
                            ...parseSimpleExpression(value, loc, rootLoc)
                        );
                    } else {
                        keys.push({
                            ...parseString(value),
                            loc: getLoc(loc, rootLoc, 1),
                            entity: node,
                        });
                    }
                });
                break;
        }
    });

    return keys;
}
