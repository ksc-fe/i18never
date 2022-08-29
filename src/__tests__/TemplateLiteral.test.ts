import { manipulate } from './helpers';
import { TemplateLiteral } from '../vistors/TemplateLiteral';
import { StringLiteral } from '../vistors/StringLiteral';

test('should obtain parameters', () => {
    manipulate('`${a}测试${a.b}`', { TemplateLiteral }).toBe(
        `_$("{0}测试{1}", [a, a.b]);`
    );

    manipulate('`${a}`', { TemplateLiteral }).toBe(`_$("{0}", [a]);`);

    manipulate('`购买${a}台`', { TemplateLiteral }).toBe(
        `_$("购买{0}台", [a]);`
    );
});

test('should handle string literal as parameter in template correctly', () => {
    manipulate("`${'测试'}`", { TemplateLiteral, StringLiteral }).toBe(
        `_$("{0}", [_$('测试')]);`
    );

    manipulate("`${a}${'测试'}`", { TemplateLiteral, StringLiteral }).toBe(
        `_$("{0}{1}", [a, _$('测试')]);`
    );
});

test('should handle tag in template string', () => {
    manipulate('`[i18never:en=v]购买${a}台`', { TemplateLiteral }).toBe(
        `_$("购买{0}台", [a], { "en": "v" });`
    );
});
