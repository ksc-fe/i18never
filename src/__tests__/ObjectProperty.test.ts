import { manipulate } from './helpers';
import { ObjectProperty } from '../vistors/ObjectProperty';
import { StringLiteral } from '../vistors/StringLiteral';

test('should wrap value in object', () => {
    manipulate(`const o = {'键': '值'}`, {
        StringLiteral,
        ObjectProperty,
    }).toBe(`const o = {\n  '键': _$('值')\n};`);
});
