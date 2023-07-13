import { generate } from '../helpers';
import { Program } from '../../src/visitors/Program';
import options from '../../src/helpers/options';

test('only files containing Chinese can be automatically imported $_', () => {
    generate(`const a = '123';`, { Program }).toBe("const a = '123';");
    generate(``, { Program }).toBe(``);
});

test('should import $_ automatically', () => {
    generate('const a = "测试"', { Program }).toBe(
        `import { $_ } from "${options.clientModule}";const a = "测试";`
    );
});
