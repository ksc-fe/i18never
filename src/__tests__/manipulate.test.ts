import { manipulate } from '../index';
import inquirer from 'inquirer';

// jest.mock('inquirer');

test('should generate code via user selection', async () => {
    (inquirer as any).prompt = jest
        .fn()
        .mockResolvedValue({ tag: { name: 'n', value: '' } });

    const source = 'const a = "测试"';
    const code = await manipulate(source);
    expect(code).toBe(
        'import { _$ } from "i18never"; const a = _$("测试", { "en": "n" });'
    );
});
