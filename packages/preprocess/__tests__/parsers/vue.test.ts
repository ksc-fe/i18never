import { parse } from '../../src/parsers/vue';
import { getToMatchSnapshot } from './toMatchSnapshot';

const toMatchSnapshot = getToMatchSnapshot(parse);

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

test('script', () => {
    toMatchSnapshot(`<script>const a = "测试"</script>`);
});

test('script setup', () => {
    toMatchSnapshot(`<script setup>const a = "测试"</script>`);
});

test(`template with newline`, () => {
    toMatchSnapshot(`<template>
        <div>测试</div>
    </template>`);
});

test(`multiple lines with props`, () => {
    toMatchSnapshot(`<template>
    <div>
        <Form a="测试"></Form>
    </div>
</template>`);
});

test('prop with object value', () => {
    toMatchSnapshot(
        `<template><div :a="{a: '测试', b: true}"></div></template>`
    );
});

test('Multi line coordinate actual value verification', () => {
    let keys =  parse(
        `<script setup>
            const a = test
        </script>
        <template>
            <div :a="{a: '测试', b: true}"></div>
        </template>`
    );
    expect(keys[0].loc).toStrictEqual({
        'line': 5,
        'column': 26
    })
});
