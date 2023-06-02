import { $_, localize } from './helpers';

// mock i18n json
const I18NT = {
    翻译: {
        tags: [
            { name: 'n', value: '翻译-名词' },
            { name: 'v', value: '翻译-动词' },
        ],
    },
    '翻译{0}': {
        tags: [
            { name: 'n', value: '翻译{0}-名词' },
            { name: 'v', value: '翻译{0}-动词' },
        ],
    },
    '满{0}个月减{1}个月': {
        tags: [{ name: 'default', value: '满{0}个月减{1}个月' }],
    },
};

localize('en', I18NT);

test('test 1', async () => {
    expect($_('翻译', { en: 'n' })).toBe('翻译-名词');
});
test('test 2', async () => {
    expect($_('翻译{0}', ['好'])).toBe('翻译好-名词');
});
test('test 3', async () => {
    expect($_('翻译', { en: 'v' })).toBe('翻译-动词');
});
test('test 4', async () => {
    expect($_('满{0}个月减{1}个月', [1, 2])).toBe('满1个月减2个月');
});
test('test 5', async () => {
    expect($_('翻译说{0}', ['好的'])).toBe('翻译说好的');
});
