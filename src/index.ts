import {parse} from 'acorn';

console.log(parse('1 + 1', {ecmaVersion: 2020}));
