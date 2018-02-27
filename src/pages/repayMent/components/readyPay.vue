<template>
   <div class="wrapperBox">
       <h3 style="font-size: 16px;color: rgba(0,0,0,0.8)">账期还款</h3>
       <hr>
       <div class="numMony"><span>还款金额:</span><span style="color: #ff3d41">${{shouldPayMoney}}</span></div>
       <div class="numMony"><el-checkbox v-model="checked">使用账户余额(您的账户余额为：<span style="color: #ff3d41">{{data.balanceMoney}}美元</span>)</el-checkbox></div>
       <hr>
       <div class="numMony"><span>还款余额:</span><span style="color: #ff3d41">${{payBalanceMoney}}</span></div>
       <h3 style="font-size: 16px;color: rgba(0,0,0,0.8);margin-top: 20px">支付方式</h3>
       <div class="payMethod"><el-radio v-model="radio" label="1">信用卡</el-radio></div>
       <div class="payMethod"><el-radio v-model="radio" label="2">在线支付</el-radio></div>
       <div class="goPay"><el-button type="danger">去支付</el-button></div>
   </div>
</template>

<style lang="less">
    .wrapperBox{
        margin-left: 24px;
        font-family: "Microsoft YaHei";
        font-size: 14px;
        color: #777;
        position: relative;
        .numMony{
            font-size: 14px;
            margin-top: 14px;
            span:nth-child(2){
                margin-left: 10px;
            }
        }
        .payMethod{
            margin-top: 20px;
        }
        hr{
            height:1px;
            border:none;
            border-top:1px solid #ddd;
            margin-top: 20px;
        }
        .goPay{
            position:absolute;
            right:15%;
            bottom: 0;
        }
    }
</style>

<script>
    import MonyManageService from '@/services/MonyManageService.js'
  export default {
      data(){
          return{
              checked: false,
              radio:'',
              data:'',
              info:[],
              payBalanceMoney:0,
              shouldPayMoney:0,
          }
      },
      methods:{
          oddMoneyPay(){
              this.$route.params.forEach((item) => {
                  if(item.status !== 2){
                      this.info.push(item);
                  }
              })
              let sum = 0;
              this.info.forEach((item) => {
                  sum += item.total;
              });
              this.shouldPayMoney = sum / 100;
              MonyManageService.oddMoney().then((data) => {
                  this.data = data.data;
                  this.data.balanceMoney = this.data.balance / 100;
              });
              this.payBalanceMoney = this.shouldPayMoney / 1;
          }
      },
      mounted(){
          this.oddMoneyPay();
      },
      watch:{
          checked(newValue){
              if(newValue){
                  this.payBalanceMoney = this.shouldPayMoney - this.data.balanceMoney;
                  if(this.payBalanceMoney < 0){
                      this.payBalanceMoney = 0;
                  }
              }else{
                  this.payBalanceMoney = this.shouldPayMoney / 1;
              }
              console.log(this.payBalanceMoney);
          }
      }
  };
</script>

