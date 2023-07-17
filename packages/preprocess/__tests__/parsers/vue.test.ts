import { parse } from '../../src/parsers/vue';

function toMatchSnapshot(source: string) {
    const keys = parse(source);
    // remove entity property
    keys.forEach((key) => {
        // @ts-ignore
        delete key.entity;
    });
    // expect(keys).toMatchSnapshot();
}

test('static template', () => {
    toMatchSnapshot(`<template><div>测试</div></template>`);
});

test('interpolation', () => {
    toMatchSnapshot(`<template><div>{{ '测试' + a }}</div></template>`);
});

test('template with props', () => {
    toMatchSnapshot(`<template><div a="测试"></div></template>`);
});

test('template with expression props', () => {
    toMatchSnapshot(`<template><div :a="'测试' + a"></div></template>`);
});

test('pug template', () => {
    toMatchSnapshot(`<template lang="pug">div 测试</template>`);
});
