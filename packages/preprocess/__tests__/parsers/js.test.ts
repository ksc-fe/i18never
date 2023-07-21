import { parse } from '../../src/parsers/js';
import { getToMatchSnapshot } from './toMatchSnapshot';

const toMatchSnapshot = getToMatchSnapshot(parse);

test('string literal', () => {
    toMatchSnapshot(`const a = "测试"`);
});

test('template literal', () => {
    toMatchSnapshot(`const a = \`测试\${b}\``);
});

test('jsx', () => {
    toMatchSnapshot(`const a = <div a="测试">测试</div>`);
});

test('should not treat property key path as key', () => {
    toMatchSnapshot(`const a = b['测试']`);
});
