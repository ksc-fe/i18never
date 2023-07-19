import { parseString } from '../src/helpers';
import { options } from '../src/options';

const { prefix } = options;
test('should extract tag from string', () => {
    expect(parseString(`[${prefix}:en=v]购买`)).toStrictEqual({
        identifier: `${prefix}:en=v`,
        key: '购买',
        tags: { en: 'v' },
    });
    expect(parseString(`[${prefix}:]购买`)).toStrictEqual({
        identifier: `${prefix}:`,
        key: `购买`,
        tags: null,
    });
    expect(parseString(`[${prefix}:en]购买`)).toStrictEqual({
        identifier: `${prefix}:en`,
        key: `购买`,
        tags: { en: `` },
    });
});

test(`should get null if string does not contain tag`, () => {
    expect(parseString(`购买`)).toStrictEqual({
        identifier: null,
        key: `购买`,
        tags: null,
    });
});
