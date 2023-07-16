export default class test {
    test() {
        const a: { text: string; value: string }[] = [
            {
                text: '测试',
                value: 'test',
            },
        ];

        const b = <div id={`购买${a}台` as string}>购买</div>;

        return [a, b];
    }
}
