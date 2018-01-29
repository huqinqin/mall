<template>
    <div class="account">
        <router-view></router-view>
    </div>
</template>

<script>
  export default {
    name: "account",
      data() {
          return {

          }
      },
      methods:{

      }
  }
</script>

<style lang="less">
    .account{
        *{margin:0;padding:0;box-sizing: border-box;}
        a{text-decoration: none;color:inherit;}
        ol,ul{list-style: none;}
    }
</style>
