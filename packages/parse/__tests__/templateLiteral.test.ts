import { i18nTrans } from './helpers';
import { TemplateLiteral } from '../src/visitors/TemplateLiteral';
import { StringLiteral } from '../src/visitors/StringLiteral';

test('should obtain parameters', () => {
    expect(
        i18nTrans('`${a}测试${a.b}`', 'filename', { TemplateLiteral }).transCode
    ).toBe(`$_("{0}测试{1}", [a, a.b]);`);

    expect(
        i18nTrans('`购买${a}台`', 'filename', { TemplateLiteral }).transCode
    ).toBe(`$_("购买{0}台", [a]);`);
});

test('should obtain parameters only contain Chinese characters', () => {
    expect(i18nTrans('`${a}`', 'filename', { TemplateLiteral }).transCode).toBe(
        '`${a}`'
    );
});

// TODO
test('should handle string literal as parameter in template correctly', () => {
    // expect(
    //     i18nTrans("`${'测试'}`", 'filename', { TemplateLiteral }).transCode
    // ).toBe(`$_("{0}", [_$('测试')]);`);
    // expect(
    //     i18nTrans("`${a}${'测试'}`", 'filename', { TemplateLiteral }).transCode
    // ).toBe(`$_("{0}{1}", [a, _$('测试')]);`);
});

test('should handle tag in template string', () => {
    expect(
        i18nTrans('`[$_:en=v]购买${a}台`', 'filename', {
            TemplateLiteral,
        }).transCode
    ).toBe('$_("购买{0}台", [a], { en: "v" });');
});

test('should ignore Chinese characters containing ignore markers', () => {
    expect(
        i18nTrans('`[$_:ignore]购买${a}台`', 'filename', {
            TemplateLiteral,
        }).transCode
    ).toBe('`购买${a}台`;');
});
