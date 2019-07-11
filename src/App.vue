<style scoped lang="less">
  #app {
    width: 100%;
    // height: 100%;
    padding: 0 24px 24px;
  }
</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import {updateAppli, updateHirer, permissionInit} from "@/service/publicService"

  export default {
    name: 'App',
    data() {
      return {
        hire: false,
        menu: []
      }
    },
    created() {
      // window.addEventListener('message', evt => {
      //   const data = JSON.parse(evt.data);
      //   if(data.path){
      //     this.$router.push({
      //       name:data.path
      //     });
      //   }
      //   if(data.menu){
      //     for(let i = 0; i < data.menu.length; i++){
      //       for(let j = 0; j < data.menu[i].subMenus.length; j++){
      //         this.menu.push(data.menu[i].subMenus[j].menuCode)
      //       }
      //     }
      //     sessionStorage.setItem('menus',JSON.stringify(this.menu));
      //   }
      //   if(data.auth){
      //     sessionStorage.setItem('auth',JSON.stringify(data.auth));
      //   }
      // });
    },
    methods: {
    },
    watch: {
      // $route(){
      //   if(this.$route.name === 'index' || this.$route.name === 'home'){
      //     // console.log('主页')
      //     this.hire = false
      //     this.tenantAndApplication = false
      //   }else{
      //     let menusArr = sessionStorage.getItem("menus")
      //     this.menu = JSON.parse(menusArr)
      //     if(this.menu.indexOf(this.$route.name) == -1){
      //       this.hire = true
      //       this.tenantAndApplication = true
      //     }else{
      //       this.hire = false
      //       this.tenantAndApplication = false
      //     }
      //   }
      // }
    }
  }
</script>
