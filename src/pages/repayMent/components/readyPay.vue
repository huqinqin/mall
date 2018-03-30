<template>
   <div class="wrapperBox">
       <h3 style="font-size: 16px;color: rgba(0,0,0,0.8)">{{$t("main.repayMent.readyPay.mainReReRepayment")}}</h3>
       <hr>
       <div class="numMony"><span>{{$t("main.repayMent.readyPay.mainReReRepayAmount")}}:</span><span style="color: #ff3d41">${{shouldPayMoney}}</span></div>
       <div class="numMony">
           <el-checkbox v-model="checked" :disabled="flag"></el-checkbox>
           <span>{{$t("main.repayMent.readyPay.mainReReUseBala")}}({{$t("main.repayMent.readyPay.mainReReYourBala")}}：<span style="color: #ff3d41">{{data.balanceMoney}}{{$t("main.repayMent.readyPay.mainReReDollar")}}</span>)
           </span>
       </div>
       <hr>
       <div class="numMony"><span>{{$t("main.repayMent.readyPay.mainReReRepayBala")}}:</span><span style="color: #ff3d41">${{payBalanceMoney}}</span></div>
       <h3 style="font-size: 16px;color: rgba(0,0,0,0.8);margin-top: 20px">{{$t("main.repayMent.readyPay.mainReRePayType")}}</h3>
       <div class="payMethod"><el-radio v-model="radio" label="1" :disabled="checked">{{$t("main.repayMent.readyPay.mainReReCard")}}</el-radio></div>
       <div class="payMethod" style="display: none"><el-radio v-model="radio" label="2" :disabled="checked">{{$t("main.repayMent.readyPay.mainReReOnlinePay")}}</el-radio></div>
       <div class="goPay" style="display: none"><el-button type="danger">{{$t("main.repayMent.readyPay.mainReReGoPay")}}</el-button></div>
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
    import orderService from '@/services/OrderService.js'
  export default {
      data(){
          return{
              param:[],
              checked: false,
              radio:'',
              data:'',
              info:[],
              payBalanceMoney:0,
              shouldPayMoney:0,
              flag: false
          }
      },
      methods:{
          oddMoneyPay(){
              this.param = JSON.parse(this.$route.query.data)
              console.log(this.param);
              this.param.forEach((item) => {
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
              if(this.shouldPayMoney > this.data.balanceMoney){
                  this.flag = true;
              }else{
                  this.flag = false;
              }
          },
          balance() {

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
              console.log(this.payBalanceMoney,this.checked);
          }
      }
  };
</script>

