<template>
    <div class="finish">
        <div class="mark"><p>您的订单已经生成，请尽快完成支付，防止商品被抢光</p></div>
        <div class="result">
            <img src="../../../assets/img/tup_html.png" alt="goods">
            <div class="content">
                <h3>支付成功</h3>
                <p>商品名称：摄像头</p>
                <p>商品编号：325462766383462</p>
                <p>收货人：抹茶   183 **** 5921</p>
                <p>收货地址：西湖区三墩镇振华路西城博司12楼1201</p>
                <p>物流方式：快递</p>
                <p>支付方式：信用卡</p>
                <div>
                    <el-button class="go" @click="gogogo">再逛逛</el-button>
                    <el-button class="back" @click="back">回首页</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "finish",
        data(){
            return{}
        },
        methods:{
            gogogo(){
                alert('再逛逛')
            },
            back(){
                alert('回首页')
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
        }
    }
    .result{
        width: 649px;
        height: 243px;
        margin:100px auto;
        display: flex;
        justify-content: space-between;
        img{
            width: 237px;
            height: 216px;
        }
        .content{
            width:330px;
            text-align: left;
            h3{
                font-size: 36px;
                color: #f13a40;
                line-height: 50px;
            }
            p{
                line-height: 24px;
                font-size: 14px;
                color: rgba(0,0,0,0.5);
            }
            div{
                margin-top: 10px;

                .el-button{
                    border-radius: 4px;
                    width: 100px;
                    height: 30px;
                    color: white;
                    font-size: 14px;
                    line-height: 0PX;
                }
                .el-button.go{
                    background-color: #f13a40;
                }
                .el-button.back{
                    background-color: rgba(0, 0, 0, 0.5);
                }
            }
            }
    }
</style>
