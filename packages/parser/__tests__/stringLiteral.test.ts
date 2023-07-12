import { i18nTrans } from './helpers';
import { StringLiteral } from '../src/visitors/StringLiteral';
import { Program } from '../src/visitors/Program';
import options from '../src/config';

// test('should wrap chinese with $_', () => {
//     expect(
//         i18nTrans("const a = '测试'", 'filename', { StringLiteral }).transCode
//     ).toBe(`const a = $_("测试");`);
// });

// test('should ignore empty string', () => {
//     expect(
//         i18nTrans("const a = ''", 'filename', { StringLiteral }).transCode
//     ).toBe(`const a = ''`);
// });

// test('should not manipulate string that is created by i18never', () => {
//     expect(
//         i18nTrans(`import { $_ } from "${options.clientModule};`, 'filename', {
//             Program,
//             StringLiteral,
//         }).transCode
//     ).toBe(`import { $_ } from "${options.clientModule};`);
// });

// test('should wrap string in function', () => {
//     expect(
//         i18nTrans("function foo() { const name = '函数' }", 'filename', {
//             StringLiteral,
//         }).transCode
//     ).toBe(`function foo() {const name = $_("函数");}`);
// });

// test("should ignore string which doesn't contains chinese", () => {
//     expect(
//         i18nTrans(`const a = '123';`, 'filename', { Program, StringLiteral })
//             .transCode
//     ).toBe(`const a = '123';`);

//     expect(
//         i18nTrans(`const a = 'abc';`, 'filename', { Program, StringLiteral })
//             .transCode
//     ).toBe(`const a = 'abc';`);
// });

// test('should wrap tag string correctly', () => {
//     expect(
//         i18nTrans(`const a = '[$_:en=v,jp=n]测试'`, 'filename', {
//             StringLiteral,
//         }).transCode
//     ).toBe(`const a = $_("测试", { en: "v", jp: "n" });`);
// });

// test('empty tag string should be considered as default tag string and should be ignored', () => {
//     expect(
//         i18nTrans(`const a = '[$_:]测试'`, 'filename', {
//             StringLiteral,
//         }).transCode
//     ).toBe(`const a = $_("测试");`);

//     expect(
//         i18nTrans(`const a = '[$_:en]测试'`, 'filename', {
//             StringLiteral,
//         }).transCode
//     ).toBe(`const a = $_("测试");`);

//     expect(
//         i18nTrans(`const a = '[$_:en,jp=n]测试'`, 'filename', {
//             StringLiteral,
//         }).transCode
//     ).toBe(`const a = $_("测试", { jp: "n" });`);
// });

// test('should ignore tag even if it is chinese', () => {
//     expect(
//         i18nTrans(`const a = '[$_:en=动词]测试'`, 'filename', {
//             StringLiteral,
//         }).transCode
//     ).toBe(`const a = $_("测试", { en: "动词" });`);
// });

// test('should ignore Chinese characters containing ignore markers', () => {
//     expect(
//         i18nTrans(`const a = '[$_:ignore]测试'`, 'filename', {
//             StringLiteral,
//         }).transCode
//     ).toBe(`const a = "测试";`);
// });

// test('should wrapped correctly the jsx attributes', () => {
//     expect(
//         i18nTrans(`<Test prop="[$_:jp,en]你好" />`, 'filename', {
//             StringLiteral,
//         }).transCode
//     ).toBe(`<Test prop={$_("你好")} />;`);
// });

test('should wrap tag string correctly', () => {
    expect(
        i18nTrans(`const a = '[$_:ko,jp,en]翻译'`, 'filename', {
            StringLiteral,
        }).transCode
    ).toBe(`const a = $_("翻译");`);
});
