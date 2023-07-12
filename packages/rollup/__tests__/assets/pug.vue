<script setup>
const a = '翻译'
</script>

<template lang="pug">
div {{ a }}
div {{ `购买${a}台`  }}
div 购买{{ a }}台
Component(prop="翻译", :a="`购买${a}台`", :b="{a: '购买'}")
</template>
