export default function Component() {
    const a = '[$_:en]测试';
    const b = '[$_:en]English';

    return () => {
        <div>
            <div>{a}</div>
            <div>{`[$_:en,jp=v]购买${a}台`}</div>
            <div>[$_:en]购买</div>
            <Test prop="[$_:en]属性" />
        </div>;
    };
}

function Test() {
    return <div>[$_:en]暂停任务</div>;
}
