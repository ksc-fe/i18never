import { generate } from '../helpers';
import { TemplateLiteral } from '../../src/visitors/TemplateLiteral';
import { StringLiteral } from '../../src/visitors/StringLiteral';

test('should obtain parameters', () => {
    generate('`${a}测试${a.b}`', { TemplateLiteral }).toBe(
        `$_("{0}测试{1}", [a, a.b]);`
    );

    generate('`购买${a}台`', { TemplateLiteral }).toBe(`$_("购买{0}台", [a]);`);
});

test('should obtain parameters only contain Chinese characters', () => {
    generate('`${a}`', { TemplateLiteral }).toBe('`${a}`');
});

// TODO
test('should handle string literal as parameter in template correctly', () => {
    generate("`${'测试'}`", { TemplateLiteral, StringLiteral }).toBe(
        `$_("{0}", [$_('测试')]);`
    );
    generate("`${a}${'测试'}`", { TemplateLiteral, StringLiteral }).toBe(
        `$_("{0}{1}", [a, $_('测试')]);`
    );
});

test('should handle tag in template string', () => {
    generate('`[$_:en=v]购买${a}台`', { TemplateLiteral }).toBe(
        '$_("购买{0}台", [a], { en: "v" });'
    );
});

test('should ignore Chinese characters containing ignore markers', () => {
    generate('`[$_:ignore]购买${a}台`', { TemplateLiteral }).toBe(
        '`购买${a}台`;'
    );
});
