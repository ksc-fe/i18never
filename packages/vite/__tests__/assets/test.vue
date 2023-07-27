<template>
    <div>[$_:en]Vue-Template测试</div>
</template>
<script>
export default {
    props: {
        value: {
            type: String,
            default: '[$_:en]Vue-Script测试',
        },
    },
};
</script>
<style>
a {
    color: red;
}
</style>
