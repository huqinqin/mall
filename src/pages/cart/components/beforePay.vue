<template>
    <div class="beforePay">
        <h5>支付</h5>
        <div class="info" v-if="form.moneyPay !== ''">
            <p>订单编号：{{formData.number}}</p>
            <p>待支付：<span class="red"><lts-money :money="form.moneyPay" /></span></p>
            <div>
                <el-checkbox v-model="form.useBalance" :disabled="!form.balance">工程商账户余额</el-checkbox><span>（余额</span><lts-money v-if="form.balance !== ''" :money="form.balance"></lts-money><span>）</span>
                <div style="display: inline-block" v-show="form.useBalance"><span>本次余额支付</span><el-input v-model="form.used" ></el-input><span>美元</span>
                    <span class="error" v-show="form.used > form.balance">(不可超过余额)</span>
                    <span class="error" v-show="form.used*100 > form.moneyPay">(不可超过待支付金额)</span>
                </div>
            </div>
        </div>
        <div class="payment">
            <p>应付余额：<lts-money :money="form.moneyPay - form.used*100" /></p>
            <el-radio v-model="form.payBank" label="CREDIT"  class="first" :disabled="form.moneyPay-form.used*100 > form.credit">使用账期</el-radio>
            <!--<el-input placeholder="请输入金额"></el-input>-->
            <span v-if="form.credit">(余额<lts-money  :money="form.credit"></lts-money>)</span>
            <el-radio class="second" v-model="form.payBank" label="OFFLINE">信用卡支付</el-radio>
        </div>
        <div class="goPay">
            <el-button @click="confirmPay" :disabled="form.used > form.moneyPay || form.used > form.balance">去支付</el-button>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    import orderService from '@/services/OrderService.js'
    import config from 'config'
    export default {
        name: "beforePay",
        data(){
            return{
                tid:'',
                fileList: [{
                    name:'09a7fc1066ec0bdcec2b8b014c4422af.png',
                    value: "09a7fc1066ec0bdcec2b8b014c4422af.png",
                    url:"http://res.500mi.com/item/09a7fc1066ec0bdcec2b8b014c4422af.png"
                }],
                form:{
                    useBalance: false,
                    balance:'',
                    moneyPay:'',
                    credit:'',
                    used:'',
                    payBank:'BALANCE',
                },
                // balance:'',
                // moneyPay:'',
                // credit:'',
                // used:'',
                // payBank:'offline',
                offData:{
                    pay_time:'',
                    content:'',
                    pay_type:'CASH',
                    urls:[]
                },
                formData: {
                    number: '',
                    amount: '',
                },
            }
        },
        methods:{
            // 上传图片
            handleRemove(file, fileList) {

            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleUrlChange(file, fileList) {
                this.fileList = fileList;
            },
            handleCheckLength(file) {
                if (this.fileList.length <= 5) {
                    this.$ltsMessage.show({type: 'success', message: '上传图片成功'});
                    return true;
                } else {
                    this.$ltsMessage.show({type: 'error', message: '您只能上传五张图片'});
                    return false;
                }
            },
            handlePreview(response, file, fileList){
                console.log(response, file, fileList)
            },
            // 模拟支付
            simulatePay(){
                let param = {
                    tid: this.tid,
                    payBank: 'ALIPAY',
                    paySource: 'ALIPAY',
                }
                orderService.simulatePay(param).then((data) => {
                    console.log(data)
                    this.form.balance = data.data.balance;
                    this.form.moneyPay = data.data.money_pay;
                    this.form.credit = data.data.credit_blance;
                },(msg) => {
                    this.$ltsMessage.show({type:'error',message:msg.error_message})
                })
            },
            payTotalPrice(){
                this.formData.amount = this.$route.params.item[0];
                this.formData.number = this.$route.params.item[1];
                this.tid = this.$route.params.item[1];
            },
            // 确认支付
            confirmPay(){
                this.offData.pay_time = new Date(this.offData.pay_time).getTime()
                this.fileList.forEach((val) => {
                    this.offData.urls.push(val.url)
                })
                this.form.offData = this.offData
                if(this.form.used > 0){
                    this.form.useBalance = true
                }else{
                    this.form.useBalance = false
                }
                orderService.pay_confirm(this.tid,this.form).then((data) => {
                    this.$router.push({name:"finish",params:{tid:this.tid}});
                },(msg) => {
                    this.$ltsMessage.show({type:'error',message:msg.error_message})
                    this.$router.push({name:"fail",params:{tid:this.tid}});
                    // this.$ltsMessage.show({type:'error',message:msg.error_message})
                })

                // if(this.useBalance === true && this.balance >= this.moneyPay){
                //     this.enoughBalance()
                // }else{
                //     this.goPay()
                // }
            },
            // goPay(){
            //     let return_url = '/customerorder#/finish';
            //     let fail_url = '/customerorder#/fail';
            //
            //     this.$confirm('正在支付。。。', '提示', {
            //         confirmButtonText: '支付完成',
            //         type: 'warning',
            //         showClose: false,
            //         showCancelButton: false
            //     }).then(() => {
            //         this.checkOrder(this.tid);
            //     }).catch(() => {
            //     });
            //     window.open(config.url.main + '/gateway/base/pay/alipay/create_pay?use_balance=' + this.form.useBalance + '&tid=' + this.tid + '&return_url=' + config.url.main + return_url + '&fail_url='+ config.url.main + fail_url + '');
            // },
            // checkOrder(tid){
            //   orderService.checkOrder(tid).then((data)=>{
            //       if(data.data.pay_status == 2){//已支付
            //           this.$router.push({name:"finish",params:{tid:tid}});
            //       }else{//未支付
            //           this.$router.push({name:"fail",params:{tid:tid}});
            //       }
            //   },(msg)=>{
            //       this.$router.push({name:"fail",params:{tid:tid}});
            //   });
            // },
            // enoughBalance(){
            //     orderService.pay_confirm(this.tid).then((data) => {
            //         this.$router.push({name:"finish",params:{tid:this.tid}});
            //     },(msg) => {
            //         this.$ltsMessage.show({type:'error',message:msg.error_message})
            //     })
            // }
        },
        mounted(){
            this.payTotalPrice();
            this.simulatePay();
        }
    }
</script>

<style lang="less">
    .beforePay{
        color:#737373;
        .el-radio:focus:not(.is-focus):not(:active) .el-radio__inner{
            box-shadow:none;
        }
        h5{
            color: #585858;
            font-size: 16px;
            border-bottom:1px solid #ddd;
            line-height: 36px;
            margin:0;
            margin-bottom: 12px;
        }
        &>div{
        }
        p,span{
            line-height: 26px;
            font-size: 14px;
            margin:0;
        }
        .info{
            border-bottom:1px solid #ddd;
            span.red{
                color:#ff3b41;
                font-weight: bold;
            }
            span.error{
                color:#ff3b41;
            }
            label{
                margin-right: 12px;
            }
            .el-input{
                width:80px;
                margin:0 12px;
            }
            &>div{
                padding-bottom: 16px;
            }
            .el-checkbox{
                line-height: 40px;
            }
        }
        .payment{
            padding-top: 12px;
            .el-input{
                width:140px;
                margin-right: 12px
            }
            .el-radio{
                margin-top: 12px;
                width: 90px;
                margin-left: 0;
            }
            .el-radio.first.is-disabled::after{
                content: '若余额不足则不能使用账期支付';
                position: relative;
                top: 16px;
                font-size: 12px;
                left: -55px;
                color: #f13a40;
            }
            .el-radio.second{
                margin-top: 12px;
                display: block;
            }
            .el-form{
                padding:12px;
                width:430px;
                border:1px solid #ddd;
                .el-radio{
                    width: auto;
                    line-height: 40px;
                    margin-right: 12px;
                    margin-top: 0;
                    .el-radio__label{
                        margin-left: 0;
                    }
                }
                .el-date-picker{
                    .el-input{
                        width:160px;
                    }
                }
                .el-date-editor{
                    width:220px;
                }
                .el-textarea{
                    width:360px;
                }
                .el-upload__tip {
                    font-size: 12px;
                    margin-top: -20px;
                }
            }
            border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .goPay{
            margin: 60px 24px;
            text-align: right;
            .el-button{
                width: 160px;
                height: 40px;
                line-height: 40px;
                background-color: #f13a40;
                span{
                    font-size: 16px;
                    line-height: 16px;
                    display: block;
                    color: #fff;
                    letter-spacing: 1px;
                    font-weight: bold;
                }
            }
        }
    }

</style>
