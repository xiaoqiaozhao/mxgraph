<style scoped lang="less">
  #app {
    width: 100%;
    padding: 0 24px 24px;
  }
</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import {} from "@/service/publicService"

  export default {
    name: 'App',
    data() {
      return {
        hire: false,
        menu: []
      }
    },
    created() {
      
    },
    methods: {
    },
    watch: {
      
    }
  }
</script>
