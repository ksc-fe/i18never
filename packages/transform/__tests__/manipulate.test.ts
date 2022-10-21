import { manipulate } from '../src/index';
import inquirer from 'inquirer';
import { options } from '../src/helpers';

test('should generate code after user selection', async () => {
    (inquirer as any).prompt = jest
        .fn()
        .mockResolvedValue({ tag: { name: 'n', value: '' } });

    const source = 'const a = "测试"';
    const result = await manipulate(source);
    expect(result.code).toBe(
        `import { _$ } from "${options.clientModule}"; const a = _$("测试", { "en": "n" });`
    );
    expect(result.keys.map((item) => item.identifier)).toStrictEqual([
        `${options.prefix}:en=n,kr`,
    ]);
});
