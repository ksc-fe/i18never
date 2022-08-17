// import {parse} from 'acorn';
// import {simple} from 'acorn-walk';
import { parse } from '@babel/parser';
import traverse, { NodePath } from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';
import { Program } from './vistors/Program';

type NeverStringLieteral = t.StringLiteral & {
    extra: t.StringLiteral['extra'] & { i18never: boolean };
};

function neverStringLiteral(value: string) {
    const node = t.stringLiteral(value);
    node.extra = { rawValue: value, raw: `'${value}'`, i18never: true };
    return node as NeverStringLieteral;
}

// const source = `
// const a = '测试';
// const b = \`\${a}变量\${b.c}\`
// const c = {
// '键': '值'
// };
// const d = 1;
// `
const source = `
import {_$} from 'i18never';

const a = '[i18never:v]测试';
const b = \`\${a}变量\${b.c}\${'内变量'}\`;

const c = {
    '键': '值'
};
function foo() {
    const name = '函数'
}
`;

console.log(source);
// const ast = parse(source, {ecmaVersion: 2020});

// simple(ast, {
// Literal(node) {
// console.log(node);
// }
// });

const ast = parse(source, { sourceType: 'module' });
// console.dir(ast, {depth: null});

traverse(ast, {
    Program,
    StringLiteral(path) {
        const node = path.node;
        if (node.extra && node.extra.i18never) return;

        console.log(path.node, path.node.value);
        path.replaceWith(t.callExpression(t.identifier('_$'), [node]));
        path.skip();
    },
    TemplateLiteral(path) {
        // console.dir(path.node, {depth: null});
        const node = path.node;

        let index = 0;
        const text = neverStringLiteral(
            node.quasis
                .map((quasi) => {
                    return quasi.value.raw || `{${index++}}`;
                })
                .join('')
        );

        path.replaceWith(
            t.callExpression(t.identifier('_$'), [
                text,
                ...(node.expressions as t.Expression[]),
            ])
        );
        // console.dir(path.node, {depth: null});
    },
    ObjectProperty(path) {
        path.skipKey('key');
    },
    ImportDeclaration(path) {
        path.skipKey('source');
    },
});

console.log(generate(ast, { retainLines: false }).code);

// console.dir(parse(`a(1)`), {depth: null});

// const callAst = t.callExpression(t.identifier('test'), []);
// console.log(callAst);
// console.log(generate(callAst));
