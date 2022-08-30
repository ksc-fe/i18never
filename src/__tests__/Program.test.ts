import { manipulate } from './helpers';
import { Program } from '../visitors/Program';

test('should import _$ automatically', () => {
    manipulate('', { Program }).toBe(`import { _$ } from "i18never";`);
});
