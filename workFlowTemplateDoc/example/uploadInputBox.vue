<template>
    <ffitm-upload-input-box>
        <ffitm-enclosure-tip enclosureName="测试报告报告报告报告报告报告.xls" @delete="deleteCallBack" @addEnclosure="addEnclosureCallBack" v-for="index in 5" :key="index">
        </ffitm-enclosure-tip>
    </ffitm-upload-input-box>
</template>

<script>
    export default {
        name: 'hello',
        data() {
            return {
                toggle: true
            }
        },
        methods: {
            deleteCallBack(item) {
                //附件删除回调
            },
            addEnclosureCallBack() {
                //添加附件回调
            },
        },
        mounted() {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>