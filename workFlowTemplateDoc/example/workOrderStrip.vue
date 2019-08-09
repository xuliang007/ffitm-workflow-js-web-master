<template>
    <ffitm-work-order-strip @updateMobile="updateMobile" :isFirstTache="isFirstTache">
        <span slot="order-number">CRM-HQ-01-2019-46136</span>
        <span slot="apply-time">2019-02-23 14:45:55</span>
        <fi-tooltip effect="light" content="ITSM测试部-admin（0）" placement="top" slot="apply-people">
          <span >ITSM测试部-admin（0）</span>
        </fi-tooltip>
    </ffitm-work-order-strip>
</template>

<script>
    export default {
        name: 'hello',
        data() {
            return {
                toggle: true,
                isFirstTache:true
            }
        },
        methods: {
            updateMobile(num){
                console.log(num)
            }
        },
        mounted() {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>