<template>
  <div class="beforePay">
    <h5>{{ $t("main.cart.beforePay.mainCartBefPay") }}</h5>
    <div class="info">
      <p>{{ $t("main.cart.beforePay.mainCartBefOrderNum") }}：{{tid}}</p>
      <p>{{ $t("main.cart.beforePay.mainCartBefWaitPay") }}：<span class="red" v-if="form.moneyPay"><lts-money :money="form.moneyPay"/></span>
      </p>
      <div v-if="!frozened">
        <el-checkbox
          v-model="form.useBalance"
          :disabled="!form.balance"
          @change="selectBalance">
          {{ $t("main.cart.beforePay.mainCartBefEngineerAccount") }}
        </el-checkbox>
        <span>（{{ $t("main.cart.beforePay.mainCartBefBalance") }}</span>
        <lts-money v-if="form.balance !== ''" :money="form.balance"></lts-money>
        <span>）</span>
      </div>
        <div v-else-if="frozened"><span >{{ $t("main.cart.beforePay.mainCartBefEngineerAccount") }}{{ $t("main.cart.beforePay.mainCartBefPay") }}：<lts-money :money="form.useBalance" /></span></div>
    </div>
    <div class="payment" v-if="!form.useBalance || form.balance <= form.moneyPay">
      <p>{{ $t("main.cart.beforePay.mainCartBefShouldPay") }}：
        <lts-money :money="form.moneyPay - form.used" />
      </p>
      <el-radio
        v-model="form.payBank"
        label="CREDIT"
        class="first"
        :disabled="form.moneyPay - form.used > form.credit">
        <!--:disabled="form.moneyPay - form.used * 100 > form.credit">-->
        {{ $t("main.cart.beforePay.mainCartBefUseAccount") }}
      </el-radio>
      <span v-if="form.credit">({{ $t("main.cart.beforePay.mainCartBefBalance") }}<lts-money
        :money="form.credit"></lts-money>)</span>
      <div class="termInfo">{{$t('main.cart.beforePay.mainCartBefTermInfo')}}</div>
      <el-radio class="second" v-model="form.payBank" label="ANET_CREDIT_CARD">{{
        $t("main.cart.beforePay.mainCartBefcartPay") }}
      </el-radio>
    </div>
    <div class="goPay">
      <el-button @click="confirmPay" :disabled="((form.moneyPay - form.used > 0)&& (form.payBank == 'BALANCE'))">{{
        $t("main.cart.beforePay.mainCartBefgoPay") }}
      </el-button>
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
          <el-button @click="creditFormVisible = false;$refs['form'].clearValidate();$refs['form'].resetFields();">{{$t("main.order.list.mainOrLiCanle")}}</el-button>
          <el-button type="primary" @click="submitCreditForm" style="margin-right: 24px;">{{$t("main.order.list.mainOrLiConfirm")}}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import orderService from '@/services/OrderService.js'

  export default {
    name: 'beforePay',
    data () {
      return {
        form: {
          useBalance: false,
          balance: '',
          moneyPay: '',
          credit: '',
          used: 0,
          payBank: 'BALANCE'
        },
        formData: {
          number: '',
          amount: ''
        },
        tid: '',
        statement:'',
        creditFormVisible:false,
        creditFrom:{
          num: '',
          date: '',
          pay_no: '',
          zipCode:'',
          cardCode:''
        },
        frozened:false,
          formRule:{
            num:[{ required: true, message: this.$t('main.cart.beforePay.mainCartBefInputDate'), trigger: 'blur' }],
            date:[{ required: true, message: this.$t('main.cart.beforePay.mainCartBefInputDate'), trigger: 'blur' }],
            zipCode:[{ required: true, message: this.$t('main.cart.beforePay.mainCartBefInputzipCode'), trigger: 'blur' }],
            cardCode:[{ required: true, message: this.$t('main.cart.beforePay.mainCartBefInputCVV'), trigger: 'blur' }],
        }
      }
    },
    methods: {
      // 勾选账户余额
      selectBalance (value) {
        if (value) {
          if (this.form.balance >= this.form.moneyPay) {
            this.form.used = this.form.moneyPay
          } else {
            this.form.used = this.form.balance
          }
        } else {
          this.form.used = 0
        }
      },
      // 模拟支付
      simulatePay () {
        let param = {
          tid: this.tid,
          payBank: 'ALIPAY',
          paySource: 'ALIPAY'
        }
        orderService.simulatePay(param).then((data) => {
          this.form.balance = data.data.balance
          this.form.moneyPay = data.data.money_pay
          this.form.credit = data.data.credit_blance
            if(data.data.balance_frozened){
              this.frozened = true
              this.form.useBalance = data.data.balance_pay
              this.form.used = data.data.balance_pay
            }
        }, (msg) => {
          this.$ltsMessage.show({type: 'error', message: msg.error_message})
        })
      },
      payTotalPrice () {
        this.formData.number = this.$route.query.tid
        this.tid = this.$route.query.tid
        switch (this.$route.query.delivery) {
          case 'SHSM':
            this.formData.deliveryType = this.$t('main.cart.beforePay.mainCartBefExpress')
            break
          case 'ZITI':
            this.formData.deliveryType = this.$t('main.cart.beforePay.mainCartBefSelfFetch')
        }
        this.simulatePay()
      },
        /*埋点*/
        placeOrder(id,totalPrice){
            ga('set', 'currencyCode', 'USD');
            ga('ec:addProduct', {
                'id': id,
                'price': totalPrice / 100,
                'option': this.form.useBalance ? "余额" : this.form.payBank === 'CREDIT' ? '账期' : 'Visa'
            });
            // Transaction level information is provided via an actionFieldObject.
            ga('ec:setAction', 'purchase', {
                'id': id,
                'revenue': totalPrice / 100
            });
            ga('send', 'pageview');     // Send transaction data with initial pageview.
        },
        // 确认支付
      confirmPay () {
        this.placeOrder(this.formData.number,this.form.moneyPay);
        if (this.form.payBank === 'ANET_CREDIT_CARD' && (this.form.moneyPay - this.form.used) > 0) {
          // 信用卡支付弹框
          orderService.pay_confirm(this.tid, this.form).then((data) => {
            this.statement = data.data.statement
            this.creditFormVisible = true
          }, (msg) => {
            this.$ltsMessage.show({type: 'error', message: msg.error_message})
            this.$router.push({name: 'fail', params: {tid: this.tid}})
          })
        } else {
          orderService.pay_confirm(this.tid, this.form).then((data) => {
            this.$router.push({name: 'finish', params: {tid: this.tid}})
          }, (msg) => {
            this.$ltsMessage.show({type: 'error', message: msg.error_message})
            this.$router.push({name: 'fail', params: {tid: this.tid}})
          })
        }
      },
      closeCreditForm(){
        this.creditFrom.num = ''
        this.creditFrom.date = ''
        this.creditFrom.pay_no = ''
      },
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
                      this.$router.push({name: 'finish', params: {tid: this.tid}})
                  }, (msg) => {
                      this.$ltsLoading.close()
                      this.$ltsMessage.show({type: 'error', message: msg.error_message})
                      this.$router.push({name: 'fail', params: {tid: this.tid}})
                  })
              }else{
                  return false
              }
          })
      }
    },
    mounted () {
      this.payTotalPrice()
    }
  }
</script>

<style lang="less">
  .beforePay {
      .el-dialog__body{
          padding: 20px 20px 0 20px;
      }
    color: #737373;
    .el-radio:focus:not(.is-focus):not(:active) .el-radio__inner {
      box-shadow: none;
    }
    h5 {
      color: #585858;
      font-size: 16px;
      border-bottom: 1px solid #ddd;
      line-height: 36px;
      margin: 0;
      margin-bottom: 12px;
    }
    & > div {
    }
    p, span {
      line-height: 26px;
      font-size: 14px;
      margin: 0;
    }
    .info {
      border-bottom: 1px solid #ddd;
      span.red {
        color: #ff3b41;
        font-weight: bold;
      }
      span.error {
        color: #ff3b41;
      }
        &>div{
            margin-bottom: 12px;
        }
      label {
        margin-right: 12px;
      }
      .el-input {
        width: 80px;
        margin: 0 12px;
      }
      .el-checkbox {
        line-height: 40px;
      }
    }
    .payment {
      padding-top: 12px;
      .el-input {
        width: 140px;
        margin-right: 12px
      }
      .el-radio {
        margin-top: 12px;
        margin-left: 0;
      }
        .termInfo{
            position: relative;
            color: #f13a40;
            font-size: 12px;
            top:-8px;
            left: 28px;
            width: 400px;
        }
      .el-radio.second {
        margin-top: 0px;
        display: block;
      }
      .el-form {
        padding: 12px;
        width: 430px;
        border: 1px solid #ddd;
        .el-radio {
          width: auto;
          line-height: 40px;
          margin-right: 12px;
          margin-top: 0;
          .el-radio__label {
            margin-left: 0;
          }
        }
        .el-date-picker {
          .el-input {
            width: 160px;
          }
        }
        .el-date-editor {
          width: 220px;
        }
        .el-textarea {
          width: 360px;
        }
        .el-upload__tip {
          font-size: 12px;
          margin-top: -20px;
        }
      }
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }
    .goPay {
      margin: 60px 24px;
      text-align: right;
      &>.el-button {
        width: 160px;
        height: 40px;
        line-height: 40px;
        background-color: #f13a40;
        span {
          font-size: 16px;
          line-height: 16px;
          display: block;
          color: #fff;
          letter-spacing: 1px;
          font-weight: bold;
        }
      }
      .creditDialog{
        .el-dialog{
          width:410px;
        }
        .el-dialog__header{
          text-align: left;
        }
        .el-form{
          .el-input{
            width:250px;
          }
            .el-form-item__error{
                left:120px;
            }
        }
        .dialog-footer{
          .el-button{
            width:160px;
            height: 40px;
            padding:0;
            span{
              line-height: 30px;
              font-weight: bold;
              font-size: 16px;
            }
          }
        }
      }
    }
  }

</style>
