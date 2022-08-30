import { inquire } from '../inquire';

test('test', async () => {
    await inquire([
        {key: '测试', tags: null},
    ]);
});
