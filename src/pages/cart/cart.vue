<template>
  <div class="cart">
    <div class="header">
      <a href="/" class="img-wrapper">
          <!--<img src="../../assets/img/LOGO_html.jpg" alt="LTS-logo">-->
          <div class="img iconfont icon-logo1"></div>
      </a>
      <el-steps :active=active align-center finish-status="success">
        <el-step :title='$t("main.cart.other.mainCartOtCart")'></el-step>
        <el-step :title='$t("main.cart.other.mainCartOtConfimOrderInfo")'></el-step>
        <el-step :title='$t("main.cart.other.mainCartOtOrderSub")'></el-step>
        <el-step :title='$t("main.cart.other.mainCartOtPay")'></el-step>
        <el-step :title='$t("main.cart.other.mainCartOtWait")'></el-step>
      </el-steps>
    </div>
    <router-view @submit="changeActive"/>
  </div>
</template>

<script>
  export default {
    name: 'cart',
    data () {
      return {
        active: 0
      }
    },
    methods: {
      changeActive (value) {
        this.active = value
      }
    },
    mounted (){
      this.active = parseInt(this.$route.query.orderpay ? this.$route.query.orderpay : 0)
    }
  }
</script>

<style lang="less">
  * {
    box-sizing: border-box;
  }

  .cart {
    width: 100%;
    .header {
      height: 140px;
      margin: 0 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;
      .img {
          font-size: 160px;
          color: #cc242e;
          position: relative;
          top: 20px;
      }
      .el-steps {
        width: 800px;
        .el-step {
          color: #777777;
        }
      }
    }
    p {
      word-break: normal
    }
  }
</style>
