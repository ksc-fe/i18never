import { inquire } from '../src/inquire';
import inquirer from 'inquirer';

test('should get correct translation for dict without tags', async () => {
    let index = 0;
    (inquirer as any).prompt = jest.fn().mockImplementation(() => {
        return Promise.resolve({
            tag: { name: index++ === 0 ? 'v' : 'n', value: '' },
        });
    });

    const data = await inquire([
        { key: '测试', tags: null },
        { key: '测试', tags: null },
    ]);

    expect(data).toStrictEqual([
        {
            key: '测试',
            translation: [
                { language: 'en', tag: { name: 'v', value: '' } },
                { language: 'kr', tag: { name: 'default', value: '' } },
            ],
        },
        {
            key: '测试',
            translation: [
                { language: 'en', tag: { name: 'n', value: '' } },
                { language: 'kr', tag: { name: 'default', value: '' } },
            ],
        },
    ]);
});

test('should get correct translation for dict with tags', async () => {
    const data = await inquire([
        { key: '测试', tags: { en: 'v' } },
        { key: '测试', tags: { en: 'n', kr: '' } },
    ]);

    expect(data).toStrictEqual([
        {
            key: '测试',
            translation: [
                { language: 'en', tag: { name: 'v', value: '' } },
                { language: 'kr', tag: { name: 'default', value: '' } },
            ],
        },
        {
            key: '测试',
            translation: [
                { language: 'en', tag: { name: 'n', value: '' } },
                { language: 'kr', tag: { name: 'default', value: '' } },
            ],
        },
    ]);
});

test('should throw error if language does not exist', async () => {
    await expect(
        inquire([{ key: '测试', tags: { xxx: 'xxxxx' } }])
    ).rejects.toThrowError();
});
