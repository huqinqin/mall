<template>
    <div class="pay">
        <div class="mark"><p>您的订单已经生成，请尽快完成支付，防止商品被抢光</p></div>
        <div class="info">
            <p>订单编号：2389498484950043</p>
            <p><span>商品名称：摄像头</span><span>应付金额：$500</span><span>物流方式：快递</span></p>
        </div>
        <div class="payment">
            <h5>支付方式</h5>
            <div class="credit">
                <h6>信用卡：</h6>
                <ul>
                    <li><img src="../img/xinyongk1_html.png" alt="credit"></li>
                    <li><img src="../img/xinyongk1_html.png" alt="credit"></li>
                    <li><img src="../img/xinyongk1_html.png" alt="credit"></li>
                    <li><img src="../img/xinyongk1_html.png" alt="credit"></li>
                    <li><img src="../img/xinyongk1_html.png" alt="credit"></li>
                    <li class="addCredit" @click="addCredit">
                        <i class="iconfont icon-add"></i>
                        <div>添加信用卡</div>
                    </li>
                </ul>
            </div>
            <div class="online">
                <h6>在线支付：</h6>
                <ul>
                    <li><img src="../img/xinyongk1_html.png" alt="credit"></li>
                    <li><img src="../img/xinyongk1_html.png" alt="credit"></li>
                    <li><img src="../img/xinyongk1_html.png" alt="credit"></li>
                </ul>
            </div>
        </div>
        <div class="goPay">
            <el-button @click="pay">去支付</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pay",
        data(){
            return{}
        },
        methods:{
            addCredit(){
                alert('add credit')
            },
            pay(){
                alert('pay')
            }
        }
  }
</script>

<style scoped lang="less">
    .mark{
        margin: 24px 0;
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
        height: 143px;
        border-bottom:1px solid rgba(0,0,0,0.05);
        margin-left: 24px;
        vertical-align: middle;
        font-size: 14px;
        color: #777777;
        p{
            line-height: 48px;
            span+span{
                margin-left: 24px;
            }
        }
    }
    .payment{
        margin: 64px 24px 0 24px;
        h5{
            color: #777777;
            font-size: 16px;
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
                width: 84px;
                height: 52px;
                background-color: #ffffff;
                border-radius: 4px;
                border: solid 2px #eaeaea;
                margin-left: 12px;
            }
            li.addCredit{
                border: 1px solid rgba(0,0,0,0.1);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: rgba(0,0,0,0.1);
                font-family: MicrosoftYaHei-Bold;
                font-size: 12px;
                i{
                    font-size: 17px;
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
                border-radius: 4px;
                border: solid 2px #eaeaea;
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
            width: 180px;
            height: 50px;
            background-color: #f13a40;
            border-radius: 4px;
            color: #fff;
            font-size: 26px;
        }

    }
</style>
