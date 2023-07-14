export default function Component() {
    const a = '[$_:en=n,ko=n,jp]测试';

    return () => {
        <div>
            <div>{a}</div>
            <div>{`[$_:en=t,ko=n,jp]购买${a}台`}</div>
            <div>[$_:en=t,ko=n,jp]购买</div>
            <Test prop="[$_:jp,en]你好" />
        </div>;
    };
}

function Test() {
    return <div>[$_:jp,en]暂停任务</div>;
}
