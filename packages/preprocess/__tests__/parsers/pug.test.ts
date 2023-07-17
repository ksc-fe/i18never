import { parse } from '../../src/parsers/pug';

function toMatchSnapshot(source: string) {
    const keys = parse(source);
    // remove entity property
    keys.forEach((key) => {
        // @ts-ignore
        delete key.entity;
    });
    expect(keys).toMatchSnapshot();
}

test('with vue expression', () => {
    toMatchSnapshot(`div {{ a + '测试' }}`);
});

test('with text', () => {
    toMatchSnapshot(`div 测试`);
});

test('with props', () => {
    toMatchSnapshot(`div(a="测试")`);
});

test('with expression props', () => {
    toMatchSnapshot(`div(:a="'测试' + a")`);
});
