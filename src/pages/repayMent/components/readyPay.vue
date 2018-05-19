<template>
   <div class="wrapperBox">
       <h3 style="font-size: 16px;color: rgba(0,0,0,0.8)">{{$t("main.repayMent.readyPay.mainReReRepayment")}}</h3>
       <hr>
       <div class="numMony"><span>{{$t("main.repayMent.readyPay.mainReReRepayAmount")}}:</span><span style="color: #ff3d41">${{shouldPayMoney}}</span></div>
       <div class="numMony">
           <el-checkbox v-model="checked" :disabled="flag || shouldPayMoney > data.balanceMoney" @change="selectBalance"></el-checkbox>
           <span>{{$t("main.repayMent.readyPay.mainReReUseBala")}}({{$t("main.repayMent.readyPay.mainReReYourBala")}}：<span style="color: #ff3d41">{{data.balanceMoney}}{{$t("main.repayMent.readyPay.mainReReDollar")}}</span>)
           </span>
       </div>
       <hr>
       <div class="numMony"><span>{{$t("main.repayMent.readyPay.mainReReRepayBala")}}:</span><span style="color: #ff3d41">${{payBalanceMoney}}</span></div>
       <h3 style="font-size: 16px;color: rgba(0,0,0,0.8);margin-top: 20px">{{$t("main.repayMent.readyPay.mainReRePayType")}}</h3>
       <div class="payMethod"><el-radio v-model="radio" label="1" :disabled="checked">{{$t("main.repayMent.readyPay.mainReReCard")}}</el-radio></div>
       <div class="payMethod" style="display: none"><el-radio v-model="radio" label="2" :disabled="checked">{{$t("main.repayMent.readyPay.mainReReOnlinePay")}}</el-radio></div>
       <div class="goPay" @click="pay"><el-button type="danger">{{$t("main.repayMent.readyPay.mainReReGoPay")}}</el-button></div>
       <el-dialog :title="$t('main.cart.beforePay.mainCartBefCreditInfo')" :visible.sync="creditFormVisible" class="creditDialog" @close="closeCreditForm">
           <el-form :model="creditFrom" label-position="left" ref="form" :rules="formRule">
               <el-form-item :label="$t('main.cart.beforePay.mainCartBefCreditNum')" prop="num">
                   <el-input v-model="creditFrom.num" :placeholder="$t('main.cart.beforePay.mainCartBefInputNum')" :clearable="true"></el-input>
               </el-form-item>
               <el-form-item :label="$t('main.cart.beforePay.mainCartBefCreditValid')" prop="date">
                   <el-date-picker
                       v-model="creditFrom.date"
                       type="month"
                       format="MM-yyyy"
                       placeholder="MM/YYYY">
                   </el-date-picker>
               </el-form-item>
               <el-form-item label="CVV" prop="cardCode">
                   <el-input v-model="creditFrom.cardCode"></el-input>
               </el-form-item>
               <el-form-item label="Zip code" prop="zipCode">
                   <el-input v-model="creditFrom.zipCode"></el-input>
               </el-form-item>
           </el-form>
           <div slot="footer" class="dialog-footer">
               <el-button @click="creditFormVisible = false;$refs['form'].clearValidate();">{{$t("main.order.list.mainOrLiCanle")}}</el-button>
               <el-button type="primary" @click="submitCreditForm" style="margin-right: 24px;">{{$t("main.order.list.mainOrLiConfirm")}}</el-button>
           </div>
       </el-dialog>
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
        .el-form-item{
            display: flex;
            align-items: center;
        }
        .el-form--label-left .el-form-item__label{
            width: 200px;
        }
        .el-input__inner{
            width: 300px;
        }
        .el-dialog{
            width: 40%;
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
              flag: false,
              creditFrom:{
                  num: '',
                  date: '',
                  pay_no: '',
                  zipCode:'',
                  cardCode:''
              },
              formRule:{
                  num:[{ required: true, message: this.$t('main.cart.beforePay.mainCartBefInputDate'), trigger: 'blur' }],
                  date:[{ required: true, message: this.$t('main.cart.beforePay.mainCartBefInputDate'), trigger: 'blur' }],
                  zipCode:[{ required: true, message: this.$t('main.cart.beforePay.mainCartBefInputzipCode'), trigger: 'blur' }],
                  cardCode:[{ required: true, message: this.$t('main.cart.beforePay.mainCartBefInputCVV'), trigger: 'blur' }],
              },
              creditFormVisible:false,
              uid: 0,
              statement: '',
              form: {
                  useBalance: false,
                  balance: '',
                  moneyPay: '',
                  credit: '',
                  used: 0,
                  payBank: 'BALANCE'
              }
          }
      },
      methods:{
          oddMoneyPay(){
              this.param = JSON.parse(this.$route.query.data)
              //console.log(this.param);
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
                  this.uid = this.data.uid;
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

          },

          /*利用信用卡还款*/
          submitCreditForm(){
              this.creditFrom.pay_no = this.statement
              if(this.creditFrom.date){
                  this.creditFrom.date = this.creditFrom.date.getTime() + 864000000
                  // this.creditFrom.date = this.creditFrom.date.getTime()
              }
              this.creditFrom.num = this.creditFrom.num.replace(/\s+/g,"")
              this.creditFrom.zipCode = this.creditFrom.zipCode.replace(/\s+/g,"")
              this.creditFrom.cardCode = this.creditFrom.cardCode.replace(/\s+/g,"")
              this.$refs['form'].validate((valid) => {
                  if(valid){
                      let option  ={
                          lock: true,
                          text: 'loading',
                          spinner: 'el-icon-loading',
                          background: 'rgba(0, 0, 0, 0.7)'
                      }
                      this.$ltsLoading.show(option)
                      orderService.credit_pay(this.creditFrom).then((data) => {
                          this.$ltsLoading.close()
                          //this.$router.push({name: 'finish', params: {tid: this.tid}})
                      }, (msg) => {
                          this.$ltsLoading.close()
                          this.$ltsMessage.show({type: 'error', message: msg.error_message})
                          //this.$router.push({name: 'fail', params: {tid: this.tid}})
                      })
                  }else{
                      return false
                  }
              })
          },

          /*点击“pay”进行还款*/
          pay(){
              if(this.checked){
                  /*余额支付*/
                  //MonyManageService.goPay(this.uid).then((data) => {});
                  orderService.pay_confirm(this.uid, this.form).then((data) => {
                      this.$ltsMessage.show({type: 'success', message: "Repayment success"})
                  }, (msg) => {
                      this.$ltsMessage.show({type: 'error', message: msg.error_message})
                  })
                  this.$ltsMessage.show({type: 'success', message: "Repayment success"})
              }else {
                  /*信用卡支付*/
                  orderService.pay_confirm(this.uid, this.form).then((data) => {
                      this.statement = data.data.statement
                      this.creditFormVisible = true
                  });
                  this.creditFormVisible = true;
              }
          },

          closeCreditForm(){
              this.creditFrom.num = ''
              this.creditFrom.date = ''
              this.creditFrom.pay_no = ''
          },

          // 勾选账户余额
          selectBalance (value) {
              if (value) {
                   this.form.used = this.shouldPayMoney;
                   this.form.useBalance = true;
              } else {
                  this.form.used = 0
              }
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

