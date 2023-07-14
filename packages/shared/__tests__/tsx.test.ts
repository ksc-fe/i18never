import { manipulate } from '../src/index';
import inquirer from 'inquirer';
import { options } from '../src/helpers';

test('should handle tsx correctly', async () => {
    (inquirer as any).prompt = jest
        .fn()
        .mockResolvedValue({ tag: { name: 'n', value: '' } });

    const source = 'const a = <div prop="测试">测试</div>';
    const result = await manipulate(source);
    // expect(result.code).toBe(
        // `import { _$ } from "${options.clientModule}";const a = _$("测试", { "en": "n" });`
    // );
    // expect(result.keys.map((item) => item.newIdentifier)).toStrictEqual([
        // `${options.prefix}:en=n,kr`,
    // ]);
});
