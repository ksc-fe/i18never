import { manipulate } from './helpers';
import { StringLiteral } from '../src/visitors/StringLiteral';
import { Program } from '../src/visitors/Program';
import { ImportDeclaration } from '../src/visitors/ImportDeclaration';
import { options } from '../src/helpers';

test('should wrap chinese with _$', () => {
    manipulate(`const a = '测试'`, { StringLiteral }).toBe(
        `const a = _$('测试');`
    );
});

test('should ignore empty string', () => {
    manipulate(`const a = ''`, { StringLiteral }).toBe(`const a = '';`);
});

test('should not manipulate string that is created by i18never', () => {
    manipulate(``, { Program, StringLiteral }).toBe(
        `import { _$ } from "${options.clientModule}";`
    );
});

test('should ignore string in import sentence', () => {
    manipulate(`import {_$} from '${options.clientModule}';`, {
        ImportDeclaration,
        StringLiteral,
    }).toBe(`import { _$ } from '${options.clientModule}';`);
});

test('should wrap string in function', () => {
    manipulate(`function foo() { const name = '函数' }`, {
        StringLiteral,
    }).toBe(`function foo() { const name = _$('函数'); }`);
});

test("should ignore string which doesn't contains chinese", () => {
    manipulate(`const a = '123'`, { StringLiteral }).toBe(`const a = '123';`);
    manipulate(`const a = 'abc'`, { StringLiteral }).toBe(`const a = 'abc';`);
});

test('should wrap tag string correctly', () => {
    manipulate(`const a = '[i18never:en=v,jp=n]测试'`, { StringLiteral }).toBe(
        `const a = _$("测试", { "en": "v", "jp": "n" });`
    );
});

test('empty tag string should be considered as default tag string and should be ignored', () => {
    manipulate(`const a = '[i18never:]测试'`, { StringLiteral }).toBe(
        `const a = _$("测试");`
    );

    manipulate(`const a = '[i18never:en]测试'`, { StringLiteral }).toBe(
        `const a = _$("测试");`
    );

    manipulate(`const a = '[i18never:en,jp=n]测试'`, { StringLiteral }).toBe(
        `const a = _$("测试", { "jp": "n" });`
    );
});

test('should ignore tag even if it is chinese', () => {
    manipulate(`const a = '[i18never:en=动词]测试'`, { StringLiteral }).toBe(
        `const a = _$("测试", { "en": "动词" });`
    );
});
