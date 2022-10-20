import { ModuleInfo, TransformPluginContext, PluginContext } from 'rollup';
import { manipulate } from '../../i18never/src';

export default function i18never() {
    return {
        name: 'i18never',

        resolverId(source: string) {
            console.log('source', source);
            if (source === 'virtual-module') {
                return source;
            }
            return null;
        },

        load(this: PluginContext, id: string) {
            console.log('id', id);
            console.log(this.getModuleInfo(id));
            if (id === 'virtual-module') {
                return 'export default "This is virtual!"';
            }
            return null;
        },

        async transform(
            this: TransformPluginContext,
            code: string,
            id: string
        ) {
            console.log(code, id);
            console.log(this.getCombinedSourcemap());
            const results = await manipulate(code);
            console.log(results);
            return { code: results.code, meta: { sourceMap: this.getCombinedSourcemap() } };
        },

        moduleParsed(moduleInfo: ModuleInfo) {
            console.log(moduleInfo, this);
        },
    };
}
