<template>
    <div class="box">
        <ffitm-layout>
            <ffitm-steps :cur-step="curStep" :step-list="stepList">
            </ffitm-steps>
            <ffitm-flow-title>{{flowTitle}}</ffitm-flow-title>
        </ffitm-layout>
    </div>
</template>

<script>
    export default {
        name: 'hello',
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
                ],
                flowTitle: '关于政企智能专线产品集约客户自助门户与省2级接口联调工作安排'
            }
        },
        methods: {},
        mounted() {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>