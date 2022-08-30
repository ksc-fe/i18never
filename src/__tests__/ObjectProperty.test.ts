import { manipulate } from './helpers';
import { ObjectProperty } from '../visitors/ObjectProperty';
import { StringLiteral } from '../visitors/StringLiteral';

test('should wrap value in object', () => {
    manipulate(`const o = {'键': '值'}`, {
        StringLiteral,
        ObjectProperty,
    }).toBe(`const o = { '键': _$('值') };`);
});
