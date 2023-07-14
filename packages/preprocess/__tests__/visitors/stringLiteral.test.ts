import { generate } from '../helpers';
import { StringLiteral } from '../../src/visitors/StringLiteral';
import { Program } from '../../src/visitors/Program';
import options from '../../src/helpers/options';

test('should wrap chinese with $_', () => {
    generate("const a = '测试'", { StringLiteral }).toBe(
        `const a = $_("测试");`
    );
});

test('should ignore empty string', () => {
    generate("const a = ''", { StringLiteral }).toBe(`const a = ''`);
});

test('should not manipulate string that is created by i18never', () => {
    generate(`import { $_ } from "${options.clientModule};`, {
        Program,
        StringLiteral,
    }).toBe(`import { $_ } from "${options.clientModule};`);
});

test('should wrap string in function', () => {
    generate("function foo() { const name = '函数' }", {
        StringLiteral,
    }).toBe(`function foo() {const name = $_("函数");}`);
});

test("should ignore string which doesn't contains chinese", () => {
    generate(`const a = '123';`, { Program, StringLiteral }).toBe(
        `const a = '123';`
    );

    generate(`const a = 'abc';`, { Program, StringLiteral }).toBe(
        `const a = 'abc';`
    );
});

test('should wrap tag string correctly', () => {
    generate(`const a = '[$_:en=v,jp=n]测试'`, {
        StringLiteral,
    }).toBe(`const a = $_("测试", { en: "v", jp: "n" });`);
});

test('empty tag string should be considered as default tag string and should be ignored', () => {
    generate(`const a = '[$_:]测试'`, {
        StringLiteral,
    }).toBe(`const a = $_("测试");`);

    generate(`const a = '[$_:en]测试'`, {
        StringLiteral,
    }).toBe(`const a = $_("测试");`);

    generate(`const a = '[$_:en,jp=n]测试'`, {
        StringLiteral,
    }).toBe(`const a = $_("测试", { jp: "n" });`);
});

test('should ignore tag even if it is chinese', () => {
    generate(`const a = '[$_:en=动词]测试'`, {
        StringLiteral,
    }).toBe(`const a = $_("测试", { en: "动词" });`);
});

test('should ignore Chinese characters containing ignore markers', () => {
    generate(`const a = '[$_:ignore]测试'`, {
        StringLiteral,
    }).toBe(`const a = "测试";`);
});

test('should wrapped correctly the jsx attributes', () => {
    generate(`<Test prop="[$_:jp,en]你好" />`, {
        StringLiteral,
    }).toBe(`<Test prop={$_("你好")} />;`);
});

test('should wrap tag string correctly', () => {
    generate(`const a = '[$_:ko,jp,en]翻译'`, {
        StringLiteral,
    }).toBe(`const a = $_("翻译");`);
});
