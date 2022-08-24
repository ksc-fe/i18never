import { manipulate } from './helpers';
import { Program } from '../vistors/Program';

test('should import _$ automatically', () => {
    manipulate('', { Program }).toBe(`import { _$ } from "i18never";`);
});
