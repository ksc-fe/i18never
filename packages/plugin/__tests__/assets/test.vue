<script>
    // import TestComponent from "./testComponent.vue";
    import config from "./test"
    export default {
        data() {
            return {
                test: config.a
            }
        },
        components: {
            TestComponent
        },
    }
</script>

<template>
    <div>{{ test }}</div>
    <div>{{ `[i18never:jp=n,en=n,ko=n]购买${a}台` }}</div>
    <div>购买{{ a }}台</div>
    <TestComponent :a="`[i18never:jp=n,en,ko]购买${a}台`" :b="{a: '[i18never:jp,en,ko]购买'}" />
</template>
