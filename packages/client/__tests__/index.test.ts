import { $_ } from '../src';

// mock i18n json
globalThis.I18NeverData = {
    翻译: [
        { name: 'default', value: 'default translation' },
        { name: 'n', value: 'translation' },
        { name: 'v', value: 'translate' },
    ],
    '翻译{0}': [{ name: 'n', value: 'translation {0}!' }],
    '满{0}个月减{1}个月': [
        { name: 'default', value: '{0} month(s) minus {1} month(s)' },
    ],
    空: [{ name: 'default', value: '' }],
};
globalThis.I18NeverLang = 'en';

test('should use default tag', () => {
    expect($_('翻译')).toBe('default translation');
});
test('error tag should throw error', () => {
    expect(() => $_('翻译', { en: 'xxx' })).toThrow();
    expect(() => $_('翻译{0}', ['good'])).toThrow();
});
test('should get translation with tag', () => {
    expect($_('翻译', { en: 'n' })).toBe('translation');
    expect($_('翻译', { en: 'v' })).toBe('translate');
});
test('should replace with data', () => {
    expect($_('翻译{0}', ['good'], { en: 'n' })).toBe('translation good!');
    expect($_('满{0}个月减{1}个月', [12, '1'])).toBe(
        '12 month(s) minus 1 month(s)'
    );
    expect($_('满{0}个月减{1}个月', [12])).toBe(
        '12 month(s) minus {1} month(s)'
    );
});
test('key does not exist', () => {
    expect($_('翻译说')).toBe('翻译说');
    expect($_('翻译说{0}', ['好的'])).toBe('翻译说好的');
});
test('key exists but its translation is empty', () => {
    expect($_('空')).toBe('空');
});
