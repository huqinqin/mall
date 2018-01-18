<template>
    <div class="beforePay">
        <div class="mark"><p>您的订单已经生成，请尽快完成支付，防止商品被抢光</p></div>
        <div class="info">
            <p>订单编号：{{formData.number}}</p>
            <p><span>商品名称：{{formData.name}}</span><span>应付金额：${{formData.amount}}</span><span>物流方式：{{formData.delivery}}</span></p>
        </div>
        <div class="payment">
            <h5>支付方式</h5>
            <div class="useCredit" @change="onlyCredit">
                <el-checkbox v-model="useCredit">使用信用余额</el-checkbox>
            </div>
            <div class="credit">
                <h6>信用卡：</h6>
                <ul>
                    <li v-for="item in creditData" :class="{chosen:chosenItem === item.alt}" @click="toggleChoose(item.alt)"><img :src=item.src :alt=item.alt></li>
                    <li class="addCredit" @click="addCredit">
                        <i class="iconfont icon-add"></i>
                        <div>添加信用卡</div>
                    </li>
                </ul>
            </div>
            <div class="online">
                <h6>在线支付：</h6>
                <ul>
                    <li v-for="item in onlineData" :class="{chosen:chosenItem === item.alt}" @click="toggleChoose(item.alt)"><img :src=item.src :alt=item.alt></li>
                </ul>
            </div>
        </div>
        <div class="goPay">
            <el-button @click="goPay">立即支付</el-button>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    export default {
        name: "beforePay",
        data(){
            return{
                useCredit: true,
                chosenItem:'',
                formData: {
                    number: 2389498484950043,
                    delivery: '快递',
                    name: '摄像头',
                    amount: 500
                },
                creditData: [{
                    src: require('@/assets/img/xinyongka02_html.png'),
                    alt: 'credit1'
                },{
                    src: require('@/assets/img/xinyongka02_html.png'),
                    alt: 'credit2'
                },{
                    src: require('@/assets/img/xinyongka02_html.png'),
                    alt: 'credit3'
                },{
                    src: require('@/assets/img/xinyongka02_html.png'),
                    alt: 'credit4'
                }],
                onlineData: [{
                    src: require('@/assets/img/xinyongka02_html.png'),
                    alt: 'online5'
                },{
                    src: require('@/assets/img/xinyongka02_html.png'),
                    alt: 'online6'
                },{
                    src: require('@/assets/img/xinyongka02_html.png'),
                    alt: 'online7'
                }]
            }
        },
        methods:{
            payTotalPrice(){
                this.formData.amount = this.$route.params.item[0];
                this.formData.number = this.$route.params.item[1];  
                console.log(this.$route.params.item[1]);
                console.log(this.formData.amount);
            },
            addCredit(){
                alert('add credit')
            },
            goPay(){
                this.$router.push({path: '/finish'})
                this.$emit('submit',4)
            },
            toggleChoose(key){
                this.chosenItem = key
                this.useCredit = false
            },
            onlyCredit(){
                this.chosenItem = ''
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
            color: rgba(0,0,0,0.7);
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
            height: 86px;
            border-bottom:1px solid rgba(0,0,0,0.05);
            margin-left: 24px;
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
        .payment{
            margin: 24px 24px 0 24px;
            h5{
                color: #777777;
                font-size: 16px;
            }
            .useCredit{
                margin-left: 24px;
                margin-top: 24px;

            }
            .credit{
                margin-top: 23px;
                margin-left: 24px;
                h6{
                    font-size: 14px;
                    color: #777777;
                }
                ul{
                    display: flex;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                }
                li{
                    border:2px solid #fff;
                    width: 84px;
                    height: 52px;
                    background-color: #ffffff;
                    margin-top: 12px;
                    border-radius: 4px;
                    img{
                        width: 80px;
                        height: 48px;
                        border-radius: 4px;
                    }
                }
                li.chosen{
                    border:2px solid red;
                    border-radius: 5px;
                }
                li+li{
                    margin-left: 12px;
                }
                li.addCredit{
                    width: 84px;
                    height: 52px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin-top: 14px;
                    color: #999999;
                    border:1px solid #eaeaea;
                    font-weight: bold;
                    i{
                        font-size: 18px;
                        color:#ccc;
                    }
                    div{
                        font-size: 11px;
                        margin-top: 2px;
                    }
                }
            }
            .online{
                margin: 23px 24px;
                h6{
                    font-size: 14px;
                    color: #777777;
                }
                ul{
                    display: flex;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                }
                li{
                    width: 84px;
                    height: 52px;
                    background-color: #ffffff;
                    margin-top: 12px;
                    border:2px solid #fff;
                    border-radius: 4px;
                    img{
                        width: 80px;
                        height: 48px;
                        border-radius: 4px;
                    }
                }
                li.chosen{
                    border:2px solid red;
                    border-radius: 5px;
                }
                li+li{
                    margin-left: 12px;
                }
            }
            padding-bottom: 54px;
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
