import { parseString } from '../src/helpers';

test('should extract tag from string', () => {
    expect(parseString('[i18never:en=v]购买')).toStrictEqual({
        key: '购买',
        tags: { en: 'v' },
    });
    expect(parseString('[i18never:]购买')).toStrictEqual({
        key: '购买',
        tags: {},
    });
    expect(parseString('[i18never:en]购买')).toStrictEqual({
        key: '购买',
        tags: { en: '' },
    });
});

test('should get null if string does not contain tag', () => {
    expect(parseString('购买')).toStrictEqual({ key: '购买', tags: null });
});
