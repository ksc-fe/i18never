import { manipulate } from './helpers';
import { StringLiteral, parseString} from '../vistors/StringLiteral';
import { Program } from '../vistors/Program';
import { ImportDeclaration } from '../vistors/ImportDeclaration';

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
        `import { _$ } from "i18never";`
    );
});

test('should ignore string in import sentence', () => {
    manipulate(`import {_$} from 'i18never';`, {
        ImportDeclaration,
        StringLiteral,
    }).toBe(`import { _$ } from 'i18never';`);
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

test('should extract tag from string', () => {
    expect(parseString('[i18never:v]购买')).toStrictEqual(['v', '购买']);
    expect(parseString('[i18never:]购买')).toStrictEqual(['', '购买']);
});

test('should get null if string does not contain tag', () => {
    expect(parseString('购买')).toStrictEqual([null, '购买']);
});

test('should wrap tag string correctly', () => {
    manipulate(`const a = '[i18never:v]测试'`, { StringLiteral }).toBe(
        `const a = _$("测试", "v");`
    );
});

test('empty tag string should be considered as default tag string', () => {
    manipulate(`const a = '[i18never:]测试'`, { StringLiteral }).toBe(
        `const a = _$("测试");`
    );
});

test('should ignore tag even if it is chinese', () => {
    manipulate(`const a = '[i18never:动词]测试'`, { StringLiteral }).toBe(
        `const a = _$("测试", "动词");`
    );
});
