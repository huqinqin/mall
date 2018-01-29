<template>
    <div class="beforePay">
        <div class="mark"><p>您的订单已经生成，请尽快完成支付，防止商品被抢光</p></div>
        <div class="info">
            <p>订单编号：{{formData.number}}</p>
            <p><span>应付金额：${{formData.amount}}</span></p>
            <p><span>账户余额：${{(balance/100).toFixed(2)}}</span></p>
        </div>
        <div class="balance">
            <h5>是否使用账户余额</h5>
            <el-radio-group v-model="useBalance" @change="qwert">
                <el-radio-button label="true" :disabled="balance < moneyPay">是</el-radio-button>
                <el-radio-button label="false">否</el-radio-button>
            </el-radio-group>
            <p v-show="balance < moneyPay">账户余额不足，请选择其他支付方式</p>
        </div>
        <div class="payment">
            <h5>支付方式</h5>
            <el-radio-group v-model="howPay">
                <el-radio label="remain" disabled>使用信用余额</el-radio>
                <el-radio label="credit" disabled>使用信用卡</el-radio>
                <el-radio label="ALIPAY">使用支付宝</el-radio>
            </el-radio-group>
        </div>
        <div class="goPay">
            <el-button @click="gogogo">立即支付</el-button>
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
                balance:'',
                moneyPay:'',
                formData: {
                    number: '',
                    amount: ''
                },
                creditData: {
                    src: '../../../assets/img/credit.png',
                    alt: 'credit'
                },
                onlineData: {
                    src: '../../../assets/img/aplipay.png',
                    alt: 'alipay'
                },
            }
        },
        methods:{
            qwert(val){
                console.log(this.useBalance)
                console.log(val)
            },
            // 模拟支付
            simulatePay(){
              let param = {
                  tid: this.tid,
                  payBank: this.howPay,
                  paySource: this.howPay,
              }
                orderService.simulatePay(param).then((data) => {
                    console.log(data)
                    this.balance = data.data.balance;
                    this.moneyPay = data.data.money_pay;
                },(msg) => {
                    this.$ltsMessage.show({type:'error',message:msg.error_message})
                })
            },

            payTotalPrice(){
                console.log(this.$route.params)
                this.formData.amount = this.$route.params.item[0];
                this.formData.number = this.$route.params.item[1];
                this.tid = this.$route.params.item[1];
            },
            gogogo(){
                if(this.useBalance === true.toString() && this.balance >= this.moneyPay){
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
           this.simulatePay();
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
            padding-left: 48px;
            vertical-align: middle;
            font-size: 14px;
            color: #777777;
            p{
                line-height: 36px;
                span+span{
                    margin-left: 24px;
                }
            }
        }
        h5{
            color: #777777;
            font-size: 16px;
        }
        .balance{
            margin-top: 24px;
            margin-left: 24px;
            .el-radio-group{
                margin-left: 24px;
                margin-top: 24px;
            }
            .el-radio-button{
                span{
                    width:120px;
                }
            }
            .el-radio-button:focus{
                box-shadow: none;
            }
            p{
                padding-left: 24px;
                line-height: 12px;
                color:red;
                font-size: 12px;
            }
        }
        .payment{
            margin-top: 24px;
            padding-left: 24px;

            .el-radio-group{
                margin-left: 24px;
                padding: 24px 0;
                .el-radio{
                    display: block;
                    margin-left: 0;
                }
                .el-radio+.el-radio{
                    margin-top: 12px;
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
