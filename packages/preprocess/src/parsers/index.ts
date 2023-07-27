import { KeyItem as BaseKeyItem } from '@i18never/shared';
import { Entity as JsEntity } from './js';
import { Entity as PugEntity } from './pug';
import { Entity as VueEntity } from './vue';
export { parse as jsParse } from './js';
export { parse as pugParse } from './pug';
export { parse as vueParse } from './vue';

export type KeyItem = BaseKeyItem<JsEntity | PugEntity | VueEntity>;
