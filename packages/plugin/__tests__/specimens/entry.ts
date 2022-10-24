import * as a from 'rollup';
import { a as b } from './module';

type A = {
    a: string;
};

const c: A = { a: '[i18never:en,kr]翻译' };
const d: unknown = { a: '[i18never:en,kr]翻译1', b: '[i18never:en,kr]翻译2' };

console.log(a, b, c, d);
