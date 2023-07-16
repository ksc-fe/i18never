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
        {
            key: '翻译{0}',
            tags: null,
        },
        {
            key: '测试',
            tags: null,
        },
    ]);

    expect(data).toStrictEqual([
        {
            key: '翻译{0}',
            translation: [
                {
                    language: 'jp',
                    tag: { name: 'default', value: '' },
                    isAnswer: true,
                },
                {
                    language: 'en',
                    tag: { name: 'v', value: '' },
                    isAnswer: true,
                },
                {
                    language: 'ko',
                    tag: { name: 'default', value: '' },
                    isAnswer: true,
                },
            ],
        },
        {
            key: '测试',
            translation: [
                {
                    language: 'en',
                    tag: { name: 'n', value: 'lushasha00000121212' },
                    isAnswer: true,
                },
                {
                    language: 'ko',
                    tag: { name: 'n', value: '' },
                    isAnswer: true,
                },
                {
                    language: 'jp',
                    tag: { name: 'default', value: '' },
                    isAnswer: true,
                },
            ],
        },
    ]);
});

test('should get correct translation for dict with tags', async () => {
    const data = await inquire([
        {
            key: '翻译{0}',
            tags: { en: 'v' },
            loc: {
                start: { line: 1, column: 2 },
                end: { line: 1, column: 2 },
            },
        },
        {
            key: '测试',
            tags: { en: 'n', ko: '' },
            loc: {
                start: { line: 1, column: 2 },
                end: { line: 1, column: 2 },
            },
        },
    ]);

    expect(data).toStrictEqual([
        {
            key: '翻译{0}',
            translation: [
                { language: 'jp', tag: { name: 'default', value: '' } },
                { language: 'en', tag: { name: 'v', value: '' } },
                { language: 'ko', tag: { name: 'default', value: '' } },
            ],
        },
        {
            key: '测试',
            translation: [
                {
                    language: 'en',
                    tag: { name: 'n', value: 'lushasha00000121212' },
                },
                { language: 'ko', tag: { name: 'default', value: '' } },
                { language: 'jp', tag: { name: 'default', value: '' } },
            ],
        },
    ]);
});

test('should throw error if language does not exist', async () => {
    await expect(
        inquire([
            {
                key: '测试',
                tags: { xxx: 'xxxxx' },
                loc: {
                    start: { line: 1, column: 2 },
                    end: { line: 1, column: 2 },
                },
            },
        ])
    ).rejects.toThrowError();
});
