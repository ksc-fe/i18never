<script>
  let aa = '测试'
  let bb = '[$_:ignore]测试'
  let cc = `购买${aa}台`
</script>
<template lang="pug">
div
  | {{ aaa + '测试' + bbb + '购买' }}
  | {{ `购买${a}台` }}
  Form(:hideOnSelect="true")
      FormItem(
          :label="istest ? '测试一次' : '购买'",
          :test="`购买${a}台`",
          name="测试") 测试一次
</template>

