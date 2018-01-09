<template>
    <div class="cart">
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
        <router-view @submit="changeActive" />
    </div>
</template>

<script>
  export default {
    name: "cart",
      data(){
        return {
            active: 1,
        }
      },
      methods:{
          changeActive(value){
              this.active = value
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
