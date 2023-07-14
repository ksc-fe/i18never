import { parseString } from '../src/utils';

test('should extract tag from string', () => {
    expect(parseString('[$_:en=v]购买')).toStrictEqual({
        allIsDefault: false,
        key: '购买',
        tags: { en: 'v' },
    });
    expect(parseString('[$_:]购买')).toStrictEqual({
        allIsDefault: true,
        key: '购买',
        tags: {},
    });
    expect(parseString('[$_:en]购买')).toStrictEqual({
        allIsDefault: true,
        key: '购买',
        tags: { en: '' },
    });
    expect(parseString('[$_:en,jp]购买')).toStrictEqual({
        allIsDefault: true,
        key: '购买',
        tags: { en: '', jp: '' },
    });
});

test('should get null if string does not contain tag', () => {
    expect(parseString('购买')).toStrictEqual({
        allIsDefault: true,
        key: '购买',
        tags: null,
    });
});
