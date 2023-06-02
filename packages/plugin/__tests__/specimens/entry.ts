import * as a from 'rollup';
import { a as b } from './module';

type A = {
    a: string;
};

const c: A = { a: '[$_:en,kr]翻译' };
const d: unknown = { a: '[$_:en,kr]翻译1', b: '[$_:en,kr]翻译2' };

console.log(a, b, c, d);
