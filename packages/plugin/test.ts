import * as a from 'rollup';
import { a as b } from './virtual-module';

type A = {
    a: string;
};

const c: A = { a: '翻译' };

console.log(a, b, c);
