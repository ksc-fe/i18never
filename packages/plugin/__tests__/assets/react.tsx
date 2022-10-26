export default function Component() {
    const a = '翻译';
    const b = `购买${a}台`;

    return () => (
        <>
            <div>{a}</div>
            <div>{`购买${a}台`}</div>
            <div>购买{a}台</div>
            <Test prop="翻译" a={`购买${a}台`} b={{a: '购买'}} />
        </>
    );
}

function Test(props: any) {
    return <div></div>;
}
