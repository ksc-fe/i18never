import { process } from '../src';
import path from 'path';

function resolvePath(p: string) {
    return path.resolve(__dirname, p);
}

test('process js', async () => {
    await process(resolvePath('./assets/test.js'));
});
