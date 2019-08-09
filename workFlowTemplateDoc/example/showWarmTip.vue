<template>

</template>

<script>
    export default {
        name: "showWarmTip",
        data() {
            return {}
        },
        mounted() {
            this.showWarmTip()
        },
        methods: {
            showWarmTip() {
                this.$ffitmWarmTip({
                    msg: '提示框提示框提示框提示框提示框提示框', //警告提示文字
                    autoClose: false, //是否自动关闭
                    time: 3000, //延迟关闭时间
                    offsetTop: 50 //距离top的偏移量
                }, () => {
                    console.log('我是关闭回调') //关闭
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>