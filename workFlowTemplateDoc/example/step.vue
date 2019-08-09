<template>
     <ffitm-steps :cur-step="curStep" :step-list="stepList">
     </ffitm-steps>
</template>

<script>
    export default {
        name: "step",
        data() {
            return {
                curStep: 1,
                stepList: [{
                    stepLable: '创建工单',
                    index: 1
                  }, {
                    stepLable: '领导审核',
                    index: 2
                  },
                  {
                    stepLable: '省内处理',
                    index: 3
                  },
                  {
                    stepLable: '工单完结',
                    index: 4
                  }
                ]
            }
        },
        mounted() {},
        methods: {}
    }
</script>

<style lang="scss" scoped>

</style>