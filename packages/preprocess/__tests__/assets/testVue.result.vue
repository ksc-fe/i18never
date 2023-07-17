<template>
    <div>
       [$_:en] <p>{{ aaa + [$_:en]'测试' + bbb + '购买' }}</p>
 [$_:en,jp=v]       <p>{{ `购买${a}台` }}</p>
        <p>[$_:en]测试</p>
        <Form>
            <FormItem
          [$_:en]      :la[$_:en]bel="istest ? '测试一次' : '购买'"
 [$_:en,jp=v]               :test="`购买${a}台`"
            >
                <Input placeholder=[$_:en]"购买"></Input>
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
            default: '[$_:en]测试',
        },
    },
    data() {
        return {
            test: '[$_:en]测试' + aaa + '[$_:en]测试' + bbb + '[$_:en]购买',
        };
    },
};
</script>
