export default class test {
    test() {
        const a: { text: string; value: string }[] = [
            {
                text: '[$_:en]测试',
                value: 'test',
            },
        ];

        const b = <div id={`[$_:en,jp=v]购买${a}台` as string}>[$_:en]购买</div>;

        return [a, b];
    }
}
