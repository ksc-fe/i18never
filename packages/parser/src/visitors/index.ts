import { StringLiteral } from './StringLiteral';
import { TemplateLiteral } from './TemplateLiteral';
import { Program } from './Program';
import { JSXText } from './JSXText';
import { TraverseOptions } from '@babel/traverse';
import { JsContext } from '../types';

const visitor: TraverseOptions<JsContext> = {
    JSXText,
    Program,
    StringLiteral,
    TemplateLiteral,
};

export { StringLiteral, TemplateLiteral, JSXText };
export default visitor;
