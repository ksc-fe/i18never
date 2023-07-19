import i18never from '../src';
import { RollupOptions, rollup } from 'rollup';
import path from 'path';

test('should generate file correctly', async () => {
    const config: RollupOptions = {
        input: path.resolve(__dirname, './assets/entry.js'),
        plugins: [i18never()],
    };
    const buddle = await rollup(config);

    console.log(buddle);
});
