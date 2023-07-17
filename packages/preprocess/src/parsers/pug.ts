import pugParse from 'pug-parser';
import { Lexer } from 'pug-lexer';
import pugWalk from 'pug-walk';
import { parseString, SourceLocation, getLoc } from '@i18never/shared';
import { KeyItem } from './';
import { parseTemplate } from './vue';
import { parse as jsParse } from './js';

type BaseNode = { line: number; column: number };
type TextNode = BaseNode & { val: string; type: 'Text' };
type TagNode = BaseNode & { attrs: AttrNode[]; type: 'Tag' };
type AttrNode = BaseNode & { name: string; val: string };
type Node = TextNode | TagNode;
export type Entity = TextNode | AttrNode;

export function parse(source: string, rootLoc?: SourceLocation) {
    const lexer = new Lexer(source);
    const tokens = lexer.getTokens();
    const ast = pugParse(tokens);
    const keys: KeyItem[] = [];

    pugWalk(ast, function before(node: Node) {
        switch (node.type) {
            case 'Text':
                keys.push(...parseTemplate(node.val, getLoc(node, rootLoc, 1)));
                break;
            case 'Tag':
                node.attrs.forEach((node: AttrNode) => {
                    let value = node.val;
                    if (!value) return;

                    // should remove quotes
                    value = value.slice(1, -1);

                    const name = node.name;
                    const firstChar = name[0];
                    const loc = {
                        line: node.line,
                        column: node.column + name.length + 2, // `${node.name}="`.length,
                    };
                    if (firstChar === ':' || firstChar === '@') {
                        keys.push(...jsParse(value, loc));
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
