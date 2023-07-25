import Component from './test.vue';

const a = '[$_:en]测试';
const b = '[$_:ignore]测试';
const c = `[$_:en,jp=v]购买${a}台`;

console.log(a, b, c, Component);
