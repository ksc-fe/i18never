<template>
    <div>
        <p>{{ aaa + '测试' + bbb + '购买' }}</p>
        <p>{{ `购买${a}台` }}</p>
        <p>测试</p>
        <Form>
            <FormItem
                :label="istest ? '测试一次' : '购买'"
                :test="`购买${a}台`"
            >
                <Input placeholder="请输入"></Input>
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
            default: '测试结果',
        },
    },
    data() {
        return {
            test: '测试1' + aaa + '测试2' + bbb + '购买',
        };
    },
};
</script>
