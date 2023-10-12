<template>
    <div>
        <p>{{ aaa + '测试' + bbb + '购买' }}</p>
        <p>{{ `购买${a}台` }}</p>
        <p>测试</p>
        <Form>
            <FormItem
                :label="istest ? '测试一次' : '购买'"
                :test="`购买${a}台`"
                v-if="showColumn('test', '测试', 200)"
            >
                <Input placeholder="购买"></Input>
            </FormItem>
            <span>[$_:ignore]测试</span>
        </Form>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: String,
            default: '测试',
        },
    },
    data() {
        return {
            test: '测试' + aaa + '测试' + bbb + '购买',
        };
    },
};
</script>
