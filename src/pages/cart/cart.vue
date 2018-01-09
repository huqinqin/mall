<template>
    <div class="cart">
        <router-link to="/list">购物车</router-link>
        <router-link to="settle">结算</router-link>
        <router-link to="/pay">支付</router-link>
        <router-link to="/finish">支付完成</router-link>
        <div class="header">
            <img src="./img/LOGO_html.png" alt="LTS-logo">
            <el-steps :active=active align-center>
                <el-step title="我的进货单"></el-step>
                <el-step title="填写/确认订单信息"></el-step>
                <el-step title="订单提交"></el-step>
                <el-step title="支付"></el-step>
                <el-step title="等待收货"></el-step>
            </el-steps>
        </div>
        <router-view />
    </div>
</template>

<script>
  export default {
    name: "cart",
      data(){
        return {
            active:0,
        }
      }
  }
</script>

<style scoped lang="less">
    *{box-sizing: border-box;}
    .cart{
        .header{
            height: 140px;
            margin: 0 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            img{
                width:140px;
                height: 50px;
            }
            .el-steps{
                width:800px;
            }
        }
    }
</style>
