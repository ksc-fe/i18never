<template>
  <div>
    <p>{{ `购买${a}台` }}</p>
    <p>测</p>
    <Form ref="测试">
        <FormItem
            :label="istest ? '测试' : '购买'"
            :test="`购买${a}台`"
        >
            <Input
                placeholder="请输入"
            ></Input>
        </FormItem>
        <span>测试</span>
        </div>
    </Form>
  </div>
</template>
<script src="./index.js"></script>
