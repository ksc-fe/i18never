import { generate as baseGenerate } from '../src/parser';
import { TraverseOptions } from '@babel/traverse';
import { Context } from '../src/visitors';

export function generate(source: string, visitors: TraverseOptions<Context>) {
    return expect(baseGenerate(source, '[fake filename]', visitors).code);
}
