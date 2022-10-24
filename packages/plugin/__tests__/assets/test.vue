<script setup>
const a = '[i18never:en,kr]翻译'
</script>

<template>
    <div>{{ a }}</div>
    <div>{{ `购买${a}台` }}</div>
    <div>购买{{ a }}台</div>
    <Component prop="翻译" :a="`购买${a}台`" :b="{a: '购买'}" />
</template>
