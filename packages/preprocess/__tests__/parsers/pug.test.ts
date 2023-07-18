import { parse } from '../../src/parsers/pug';
import { getToMatchSnapshot } from './toMatchSnapshot';

const toMatchSnapshot = getToMatchSnapshot(parse);

test('with vue expression', () => {
    toMatchSnapshot(`div {{ a + '测试' }}`);
});

test('with text', () => {
    toMatchSnapshot(`div 测试`);
});

test('with props', () => {
    toMatchSnapshot(`div(a="测试")`);
    toMatchSnapshot('input(disabled)');
});

test('with expression props', () => {
    toMatchSnapshot(`div(:a="'测试' + a")`);
});
