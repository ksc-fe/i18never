import { transform } from '../src';
import { options } from '@i18never/shared';

const { clientFunction, clientModule, prefix } = options;
const client = `import { ${clientFunction} } from "${clientModule}";`;
function manipulate(source: string) {
    return expect(transform(source).code);
}

test('should not handle untagged text', () => {
    manipulate(`const a = '测试'`).toBe(`const a = "测试";`);
});

test('should transform value in object', () => {
    manipulate(`const o = {'键': '[${prefix}:]值'}`).toBe(
        `${client}const o = { '键': ${clientFunction}("值") };`
    );
});

test('should transform chinese', () => {
    manipulate(`const a = '[${prefix}:]测试'`).toBe(
        `${client}const a = ${clientFunction}("测试");`
    );
});

test('should ignore empty string', () => {
    manipulate(`const a = ''`).toBe(`const a = '';`);
});

test('should ignore empty file', () => {
    manipulate(``).toBe(``);
});

test('should not import client if we has imported it', () => {
    manipulate(`${client};const a = '[${prefix}:]测试'`).toBe(
        `${client};const a = '${clientFunction}("测试");`
    );
});

// test('should wrap string in function', () => {
//     manipulate(`function foo() { const name = '函数' }`, {
//         StringLiteral,
//     }).toBe(`function foo() { const name = _$('函数'); }`);
// });

// test("should ignore string which doesn't contains chinese", () => {
//     manipulate(`const a = '123'`, { StringLiteral }).toBe(`const a = '123';`);
//     manipulate(`const a = 'abc'`, { StringLiteral }).toBe(`const a = 'abc';`);
// });

// test('should wrap tag string correctly', () => {
//     manipulate(`const a = '[i18never:en=v,jp=n]测试'`, { StringLiteral }).toBe(
//         `const a = _$("测试", { "en": "v", "jp": "n" });`
//     );
// });

// test('empty tag string should be considered as default tag string and should be ignored', () => {
//     manipulate(`const a = '[i18never:]测试'`, { StringLiteral }).toBe(
//         `const a = _$("测试");`
//     );

//     manipulate(`const a = '[i18never:en]测试'`, { StringLiteral }).toBe(
//         `const a = _$("测试");`
//     );

//     manipulate(`const a = '[i18never:en,jp=n]测试'`, { StringLiteral }).toBe(
//         `const a = _$("测试", { "jp": "n" });`
//     );
// });

// test('should ignore tag even if it is chinese', () => {
//     manipulate(`const a = '[i18never:en=动词]测试'`, { StringLiteral }).toBe(
//         `const a = _$("测试", { "en": "动词" });`
//     );
// });
