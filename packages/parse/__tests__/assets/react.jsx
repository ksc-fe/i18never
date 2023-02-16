export default function Component() {
    const a = '测试';

    return () => {
        <div>
            <div>{a}</div>
            <div>{`购买${a}台`}</div>
            <div>购买</div>
            <Test prop="你好" />
        </div>;
    };
}

function Test() {
    return <div>暂停任务</div>;
}
