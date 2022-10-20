import { manipulate } from './helpers';
import { Program } from '../src/visitors/Program';

test('should import _$ automatically', () => {
    manipulate('', { Program }).toBe(`import { _$ } from "i18never/client";`);
});
