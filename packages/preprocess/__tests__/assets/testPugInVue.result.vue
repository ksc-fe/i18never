<script>
  let aa = '[$_:en]测试'
  let bb = '[$_:ignore]测试'
  let cc = `[$_:en,jp=v]购买${aa}台`
</script>
<template lang="pug">
div[$_:en][$_:en]
 [$_:en,jp=v] | {{ [$_:en]aaa + '测试' + [$_:en]bbb + '购买' }}
 [$_:en,jp=v] | {{ `购买${a}台` }}
  Form(:hideOnSelect="true")
      FormItem(
          :label="istest ? '测试一次' : '购买'",
          :test="`购买${a}台`",
[$_:en]          name="[$_:en]测试") 测试一次
</template>

