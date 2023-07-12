import { i18nTrans } from '../src/index';
import options from '../src/config';

test('should generate object code based on tags', async () => {
    const source = 'const a = "[$_:en=n]测试"';
    const { transCode, allKeys } = await i18nTrans(source, 'test');
    expect(transCode).toBe(
        `import { $_ } from "${options.clientModule}";const a = $_("测试", { en: "n" });`
    );
    expect(allKeys.map((item) => item.tags)).toStrictEqual([{ en: 'n' }]);
});

test('should generate object code based on tags', async () => {
    const source =
        'const a = ref(`[$_:jp,en=n]满${count.value}个月减${discount}个月`)';
    const { transCode, allKeys } = await i18nTrans(source, 'test');
    expect(transCode).toBe(
        `import { $_ } from "${options.clientModule}";const a = ref($_("满{0}个月减{1}个月", [count.value, discount], { en: "n" }));`
    );
    expect(allKeys.map((item) => item.tags)).toStrictEqual([
        { en: 'n', jp: '' },
    ]);
    expect(allKeys.map((item) => item.key)).toStrictEqual([
        '满{0}个月减{1}个月',
    ]);
});
