<template>
    <div class="beforePay">
        <div class="mark"><p>您的订单已经生成，请尽快完成支付，防止商品被抢光</p></div>
        <div class="info">
            <p>订单编号：{{formData.number}}</p>
            <p><span>物流方式：{{formData.deliveryType}}</span></p>
            <p><span>应付金额：<lts-money :money="moneyPay"></lts-money></span></p>
            <el-checkbox v-model="useBalance">使用账户余额</el-checkbox><span> (您的账户余额为<lts-money :money="balance"></lts-money>)</span>
        </div>
        <div class="payment">
            <div class="realPay">应付余额：
                <span v-if="useBalance === false"><lts-money :money="moneyPay"></lts-money></span>
                <span v-else-if="balance >= moneyPay"><lts-money :money="0"></lts-money></span>
                <span v-else><lts-money :money="moneyPay - balance"></lts-money></span>
            </div>
            <h5 v-show="!(useBalance === true && balance >= moneyPay)">支付方式</h5>
            <el-radio-group v-model="howPay" v-show="!(useBalance === true && balance >= moneyPay)">
                <el-radio label="remain" disabled>使用信用余额</el-radio>
                <el-radio label="credit" disabled>使用信用卡</el-radio>
                <el-radio label="ALIPAY">使用支付宝</el-radio>
            </el-radio-group>
        </div>
        <div class="goPay">
            <el-button @click="confirmPay">立即支付</el-button>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery'
    import config from 'config'
    import orderService from '@/services/OrderService.js'
    export default {
        name: "beforePay",
        data(){
            return{
                useCredit: false,
                howPay: 'ALIPAY',
                useBalance: false,
                tid:'',
                balance:0,
                moneyPay:0,
                formData: {
                    number: '',
                    amount: '',
                    deliveryType:'快递',
                },
            }
        },
        methods:{
            // 模拟支付
            simulatePay(){
              let param = {
                  tid: this.tid,
                  payBank: this.howPay,
                  paySource: this.howPay,
              }
                orderService.simulatePay(param).then((data) => {
                    this.balance = data.data.balance;
                    this.moneyPay = data.data.money_pay;
                },(msg) => {
                    this.$ltsMessage.show({type:'error',message:msg.error_message})
                })
            },

            payTotalPrice(){
                console.log(this.$route.query)
                this.formData.number = this.$route.query.tid;
                this.tid = this.$route.query.tid;
                switch(this.$route.query.delivery){
                    case 'SHSM':
                        this.formData.deliveryType = '快递';
                        break
                    case 'ZITI':
                        this.formData.deliveryType = '自提';
                }

                this.simulatePay();


            },
            confirmPay(){
                if(this.useBalance === true && this.balance >= this.moneyPay){
                    this.enoughBalance()
                }else{
                    this.goPay()
                }
            },
            goPay(){
                let return_url = '/cart#/finish';
                let fail_url = '/cart#/fail';
                this.$confirm('正在支付。。。', '提示', {
                    confirmButtonText: '支付完成',
                    type: 'warning',
                    showClose: false,
                    showCancelButton: false
                }).then(() => {
                    this.checkOrder(this.tid);
                }).catch(() => {
                });
                window.open(config.url.main + '/gateway/base/pay/alipay/create_pay?use_balance='+ this.useBalance + '&tid=' + this.tid + '&return_url=' + config.url.main + return_url + '&fail_url='+ config.url.main + fail_url + '');
            },
            checkOrder(tid){
                orderService.checkOrder(tid).then((data)=>{
                    if(data.data.pay_status === 2){//已支付
                        this.$router.push({name:"finish",params:{tid:tid}});
                    }else{//未支付
                        this.$router.push({name:"fail",params:{tid:tid}});
                    }
                },(msg)=>{
                    this.$router.push({name:"fail",params:{tid:tid}});
                });
            },
            enoughBalance(){
                orderService.pay_confirm(this.tid).then((data) => {
                    this.$router.push({name:"finish",params:{tid:this.tid}});
                },(msg) => {
                    this.$ltsMessage.show({type:'error',message:msg.error_message})
                })
            }
        },
        mounted(){
           this.payTotalPrice();
        }
  }
</script>

<style lang="less">
    .beforePay{
        .mark{
            margin: 24px 0 20px;
            width: 100%;
            height: 40px;
            background-color: rgba(0, 0, 0, 0.05);
            color: rgba(0,0,0,0.8);
            line-height: 40px;
            font-size: 12px;
            p{
                margin-left: 24px;
                span{
                    color: rgba(0,0,0,0.5);
                }
            }
        }
        .info{
            border-bottom:1px solid rgba(0,0,0,0.05);
            padding-left: 24px;
            padding-bottom: 6px;
            vertical-align: middle;
            font-size: 14px;
            color: #777777;
            p{
                line-height: 32px;
                span+span{
                    margin-left: 24px;
                }
            }
            .el-checkbox{
                font-size: 14px;
                line-height: 32px;
            }
        }
        h5{
            color: #777777;
            font-size: 16px;
        }
        .payment{
            margin-top: 12px;
            padding-left: 24px;
            .realPay{
                color: #777777;
                font-size: 14px;
                span{
                    color:#f13a40;
                }
                margin-bottom: 48px;
            }
            .el-radio-group{
                padding: 24px 0;
                .el-radio{
                    display: block;
                    margin-left: 0;
                }
                .el-radio+.el-radio{
                    margin-top: 12px;
                }
                .el-radio:focus{
                    .el-radio__inner{
                        box-shadow: none;
                    }
                }
            }
            border-bottom: 1px solid rgba(0,0,0,0.05);

        }
        .goPay{
            margin: 60px 24px;
            text-align: right;
            .el-button{
                line-height: 10px;
                width: 160px;
                height: 40px;
                background-color: #f13a40;
                border-radius: 4px;
                color: #fff;
                font-size: 18px;
                font-weight: bold;
            }

        }
    }

</style>
