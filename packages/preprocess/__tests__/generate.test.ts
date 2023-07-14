import pugParse from 'pug-parser';
import { Lexer } from 'pug-lexer';
import pugGenerate from 'pug-code-gen';
import path from 'path';
import fs from 'fs';
import wrap from 'pug-runtime/wrap';
import { parse as babelParse } from '@babel/parser';
import babelGenerate from '@babel/generator';

function parse(source: string) {
    const lexer = new Lexer(source);
    const tokens = lexer.getTokens();
    const ast = pugParse(tokens);

    const funcStr = pugGenerate(ast, {
        pretty: true,
    });
    const func = wrap(funcStr);
    func();
}

test('test', () => {
    const file = path.resolve(__dirname, './assets/testPug.pug');
    const tempsource = fs.readFileSync(file, 'utf8');

    parse(tempsource);
});

test('test js', () => {
    const file = path.resolve(__dirname, './assets/test.js');
    const tempsource = fs.readFileSync(file, 'utf8');

    const codeAst = babelParse(tempsource, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
    });

    const code = babelGenerate(codeAst, {
        // jsescOption: { minimal: true },
        retainLines: true,
    }).code;

    console.log(code);
});
