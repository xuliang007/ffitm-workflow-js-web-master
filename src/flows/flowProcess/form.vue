<template>
  <div class="flow-process">
    <fi-collapse-card>
      <template slot="header">
        <span>审核过程</span>
        <fi-process-legend></fi-process-legend>
      </template>
      <div class="flow-process__content">
        <fi-workflow-process url-param type="complete"></fi-workflow-process>
      </div>
    </fi-collapse-card>
  </div>
</template>

<script>
export default {
  name: 'flowProcess'
};
</script>

<style scoped lang="scss">
  .flow-process{
    background: #fff;
    margin: 5px;
    &__content {
      padding-top: 5px;
      max-height: calc(100vh - 80px);
      overflow: auto;
    }
  }
</style>
