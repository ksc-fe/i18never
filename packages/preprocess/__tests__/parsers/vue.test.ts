import { parse } from '../../src/parsers/vue';
import { getToMatchSnapshot } from './toMatchSnapshot';

const toMatchSnapshot = getToMatchSnapshot(parse);

// test('static template', () => {
//     toMatchSnapshot(`<template><div>测试</div></template>`);
// });

// test('interpolation', () => {
//     toMatchSnapshot(`<template><div>{{ '测试' + a }}</div></template>`);
// });

// test('template with props', () => {
//     toMatchSnapshot(`<template><div a="测试"></div></template>`);
// });

// test('template with expression props', () => {
//     toMatchSnapshot(`<template><div :a="'测试' + a"></div></template>`);
// });

// test('pug template', () => {
//     toMatchSnapshot(`<template lang="pug">div 测试</template>`);
// });

// test('script', () => {
//     toMatchSnapshot(`<script>const a = "测试"</script>`);
// });

// test('script setup', () => {
//     toMatchSnapshot(`<script setup>const a = "测试"</script>`);
// });

test(`template with newline`, () => {
    toMatchSnapshot(`<template>
        <div>测试</div>
    </template>`);
});
