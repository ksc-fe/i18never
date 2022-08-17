import { manipulate } from './helpers';
import { StringLiteral } from '../vistors/StringLiteral';
import { Program } from '../vistors/Program';

test('should wrap chinese with _$', () => {
    manipulate(`const a = '测试'`, { StringLiteral }).toBe(
        `const a = _$('测试');`
    );
});

test('should ignore empty string', () => {
    manipulate(`const a = ''`, { StringLiteral }).toBe(`const a = '';`);
});

test('should not manipulate string that is created by i18never', () => {
    manipulate(``, { Program, StringLiteral }).toBe(
        `import {_$} from "i18never";`
    );
});
