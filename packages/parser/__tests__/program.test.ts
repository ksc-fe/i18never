import { i18nTrans } from './helpers';
import { Program } from '../src/visitors/Program';
import options from '../src/config';

test('Only files containing Chinese can be automatically imported $_', () => {
    expect(
        i18nTrans(`const a = '123';`, 'filename', { Program }).transCode
    ).toBe(`const a = '123';`);

    expect(i18nTrans(``, 'filename', { Program }).transCode).toBe(``);
});

test('should import $_ automatically', () => {
    const { transCode } = i18nTrans('const a = "测试"', 'test', {
        Program,
    });
    expect(transCode).toBe(
        `import { $_ } from "${options.clientModule}";const a = "测试";`
    );
});
