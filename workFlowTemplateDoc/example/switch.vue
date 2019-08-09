<template>
  <div class="box">
    <ffitm-switch v-model="toggle"></ffitm-switch>
  </div>
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
    },
    mounted() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>