import { transform } from '../src';
import { options } from '@i18never/shared';

const { clientFunction, clientModule, prefix } = options;
const client = `import { ${clientFunction} } from "${clientModule}";`;
function manipulate(source: string) {
    return expect(transform(source).code);
}

test('should not transform untagged text', () => {
    manipulate(`const a = '测试'`).toBe(`const a = '测试';`);
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
    manipulate(`${client}const a = '[${prefix}:]测试'`).toBe(
        `${client}const a = ${clientFunction}("测试");`
    );
});

test('should transform string in function', () => {
    manipulate(`function foo() { const name = '[${prefix}:]函数' }`).toBe(
        `${client}function foo() {const name = ${clientFunction}("函数");}`
    );
});

test("should transform string even if it doesn't contains chinese", () => {
    manipulate(`const a = '[${prefix}:]123'`).toBe(
        `${client}const a = ${clientFunction}("123");`
    );
    manipulate(`const a = '[${prefix}:]abc'`).toBe(
        `${client}const a = ${clientFunction}("abc");`
    );
});

test('should transform tag string correctly', () => {
    manipulate(`const a = '[${prefix}:en=v,jp=n]测试'`).toBe(
        `${client}const a = ${clientFunction}("测试", { "en": "v", "jp": "n" });`
    );
});

test('empty tag string should be considered as default tag string and should be ignored', () => {
    manipulate(`const a = '[${prefix}:]测试'`).toBe(
        `${client}const a = ${clientFunction}("测试");`
    );

    manipulate(`const a = '[${prefix}:en]测试'`).toBe(
        `${client}const a = ${clientFunction}("测试");`
    );

    manipulate(`const a = '[${prefix}:en,jp=n]测试'`).toBe(
        `${client}const a = ${clientFunction}("测试", { "jp": "n" });`
    );
});

test('should ignore chinese in tag', () => {
    manipulate(`const a = '[${prefix}:en=动词]测试'`).toBe(
        `${client}const a = ${clientFunction}("测试", { "en": "动词" });`
    );
});

test('should transform value in object', () => {
    manipulate(`const o = {'键': '[${prefix}:]值'}`).toBe(
        `${client}const o = { '键': ${clientFunction}("值") };`
    );
});

test('should transform escaped unicode', () => {
    manipulate(`const a = '[${prefix}:]\\u{4F60}\\u597D'`).toBe(
        `${client}const a = ${clientFunction}("\u{4F60}\u597D");`
    );
});

test('should transform escaped unicode for template', () => {
    manipulate(`const a = \`[${prefix}:]\\u{4F60}\\u597D \${true ? "[${prefix}:]测试" : ""}\``).toBe(
        `${client}const a = ${clientFunction}("\u{4F60}\u597D {0}", [true ? ${clientFunction}("测试") : ""]);`
    );
});

describe('template literal', () => {
    test('should obtain parameters', () => {
        manipulate(`\`[${prefix}:]\${a}测试\${a.b}\``).toBe(
            `${client}${clientFunction}("{0}测试{1}", [a, a.b]);`
        );

        manipulate(`\`[${prefix}:]\${a}\``).toBe(
            `${client}${clientFunction}("{0}", [a]);`
        );

        manipulate(`\`[${prefix}:]购买\${a}台\``).toBe(
            `${client}${clientFunction}("购买{0}台", [a]);`
        );
    });

    test('should handle string literal as parameter in template correctly', () => {
        manipulate(`\`[${prefix}:]\${'[${prefix}:]测试'}\``).toBe(
            `${client}${clientFunction}("{0}", [${clientFunction}("测试")]);`
        );

        manipulate(`\`[${prefix}:]\${a}\${'[${prefix}:]测试'}\``).toBe(
            `${client}${clientFunction}("{0}{1}", [a, ${clientFunction}("测试")]);`
        );
    });

    test('should ignore template string without tag', () => {
        manipulate('`购买${a}台`').toBe('`购买${a}台`;');
    });
});

describe('ignore', () => {
    test('should ignore string with ignore tag', () => {
        manipulate(`const a = '[${prefix}:ignore]忽略'`).toBe(
            `const a = "忽略";`
        );
    });

    test('should ignore template string with ignore tag', () => {
        manipulate(`const a = \`[${prefix}:ignore]\${a}忽略\``).toBe(
            `const a = \`\${a}忽略\`;`
        );

        manipulate(`const a = \`[${prefix}:ignore]忽略\${a}忽略\``).toBe(
            `const a = \`忽略\${a}忽略\`;`
        );

        manipulate(
            `const a = \`[${prefix}:ignore]忽略\${a}\${'[${prefix}:ignore]忽略'}\``
        ).toBe(`const a = \`忽略\${a}\${"忽略"}\`;`);
    });

    test('should transform string with tag in template string even if it has ignore tag', () => {
        manipulate(
            `const a = \`[${prefix}:ignore]忽略\${a}\${'[${prefix}:]不忽略'}\``
        ).toBe(
            `${client}const a = \`忽略\${a}\${${clientFunction}("不忽略")}\`;`
        );
    });
});

describe('keys', () => {
    test('should get all tagged keys', () => {
        expect(transform(`const a = \`[${prefix}:]测试\`;`).keys).toHaveLength(
            1
        );
    });

    test('should not get un-tagged keys', () => {
        expect(transform(`const a = \`测试\`;`).keys).toHaveLength(0);
    });

    test('should not get ignored keys', () => {
        expect(
            transform(`const a = \`[${prefix}:ignore]测试\`;`).keys
        ).toHaveLength(0);
    });
});

// should not exist jsx file
// describe('jsx', () => {
//     test('should transform tsx correctly', async () => {
//         manipulate(
//             `const a = <div prop="[${prefix}:]测试">[${prefix}:]测试</div>`
//         ).toBe('`购买${a}台`;');
//     });
// });
