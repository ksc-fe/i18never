<script setup lang="ts">
import { ref } from 'vue'
const count = ref(5)
const discount = 1

const msg = ref(`[$_:jp,en,ko]满${count.value}个月减${discount}个月`)
</script>

<template>
  <h1>{{ `[$_:jp,en,ko]翻译${count}` }}</h1>
  <h3>{{ msg }}</h3>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
