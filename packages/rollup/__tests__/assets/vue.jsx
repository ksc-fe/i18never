import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        const a = '翻译';

        return () => (
            <>
                <div>{a}</div>
                <div>{`购买${a}台`}</div>
                <div>购买{a}台</div>
                <Component prop="翻译" a={`购买${a}台`} b={{a: '购买'}} />
            </>
        );
    }
});
