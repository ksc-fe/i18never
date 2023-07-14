import { manipulate } from './helpers';
import { Program } from '../src/visitors/Program';
import { options } from '../src/helpers';

test('should import _$ automatically', () => {
    manipulate('', { Program }).toBe(
        `import { _$ } from "${options.clientModule}";`
    );
});
