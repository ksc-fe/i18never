// import {parse} from 'acorn';
// import {simple} from 'acorn-walk';
import {parse} from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';

function neverStringLiteral(value: string) {
    const node = t.stringLiteral(value);
    node.extra = { rawValue: value, raw: `'${value}'`, i18never: true };
    return node;
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
const a = '[tag:v]测试';
const b = \`\${a}变量\${b.c}\${'内变量'}\`;
const c = {
    '键': '值'
}
`;

console.log(source);
// const ast = parse(source, {ecmaVersion: 2020});

// simple(ast, {
    // Literal(node) {
        // console.log(node);
    // }
// });

const ast = parse(source);
console.dir(ast, {depth: null});
traverse(ast, {
    StringLiteral(path) {
        if ((path.node.extra as any).i18never) return;
        // console.log(path.node, path.node.value);
        path.replaceWith(t.callExpression(t.identifier('_$'), [path.node]));
        path.skip();
    },
    TemplateLiteral(path) {
        // console.dir(path.node, {depth: null});
        const node = path.node;
        let index = 0;
        const rawValue = node.quasis.map((quasi) => {
            return quasi.value.raw || `{${index++}}`;
        }).join('');
        const text = neverStringLiteral(rawValue);

        path.replaceWith(t.callExpression(t.identifier('_$'), [text, ...node.expressions as any]));
        // console.dir(path.node, {depth: null});
    }
});
console.log(generate(ast).code);

// console.dir(parse(`a(1)`), {depth: null});

// const callAst = t.callExpression(t.identifier('test'), []);
// console.log(callAst);
// console.log(generate(callAst));
