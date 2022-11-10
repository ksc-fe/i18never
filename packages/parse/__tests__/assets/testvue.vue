<template>
    <div>
        <p>{{ aaa + '我不好'}}</p>
        <p>你好吗</p>
        <Form ref="createKafka" starOnRequired labelWidth="150">
            <FormItem
                label="目标Kafka："
                v-model="model.TargetId"
                :rules="{ required: true }"
            >
                <Input
                    placeholder="请输入目标kafka"
                ></Input>
            </FormItem>
            <span>我很好</span>
            </div>
        </Form>
    </div>
</template>
<style src="./_vue.styl" lang="stylus"></style>
<script src="./_vue.js"></script>
