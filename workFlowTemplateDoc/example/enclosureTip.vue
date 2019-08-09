<template>
    <ffitm-enclosure-tip :enclosure-name="curStep" @delete="deleteCallBack">
    </ffitm-enclosure-tip>
</template>

<script>
    export default {
        name: "ffitmWorkFlow",
        data() {
            return {
                enclosureName: '暂无信息测试测试测试报告.xls'
            }
        },
        mounted() {
        },
        methods: {
             deleteCallBack(item){
                //附件删除回调
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>