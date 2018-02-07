<template>
    <div class="cart">
        <div class="header">
            <a href="/"><img src="../../assets/img/LOGO_html.png" alt="LTS-logo"></a>
            <el-steps :active=active align-center finish-status="success">
                <el-step title="购物车"></el-step>
                <el-step title="确认订单信息"></el-step>
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
      data() {
          return {
              active: 0,
          }
      },
      methods:{
          changeActive(value){
              this.active = value
          }
      }
  }
</script>

<style lang="less">
    *{box-sizing: border-box;}
    .cart{
        .header{
            height: 140px;
            margin: 0 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            overflow: hidden;
            img{
                width:140px;
                height: 50px;
            }
            .el-steps{
                width:800px;
                margin-right: -45px;
                .el-step{
                    color:#777777;
                }
            }
        }
        p{
            word-break: normal
        }
    }
</style>
