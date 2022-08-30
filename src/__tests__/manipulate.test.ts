import { manipulate } from '../index';

test('should generate code via user selection', async () => {
    const source = 'const a = "测试"';
    const code = await manipulate(source);
    expect(code).toBe('import { _$ } from "i18never"; const a = _$("测试", { "en": "n" });');
}, 100000);
