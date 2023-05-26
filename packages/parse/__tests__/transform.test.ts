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
