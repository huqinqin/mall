<template>
    <div class="addressManage">
        <div class="info">
            <img src="@/assets/img/avatar.png" alt="avatar" class="avatar">
            <ul>
                <li v-for="item in info">{{item}}</li>
            </ul>
        </div>
        <div class="content">内容</div>
    </div>
</template>

<script>
    export default {
        name: "address",
        data(){
            return{
                info:['个人资料','分销资格认证','信用卡绑定','账单地址','密码设置','收货地址','分享好友']
            }
        }
    }
</script>

<style lang="less">
    .addressManage{
        box-sizing: border-box;
        *{box-sizing: border-box;}
        border:1px solid red;
        height: 1000px;
        width:100%;
        display: flex;
        .info{
            margin-right: 48px;
            width:190px;
            padding:5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-shadow: 0px 5px 25px 0px #e8e5e5;;
            .avatar{
                width:60px;
                height: 60px;
                border-radius: 50%;
                margin-top: 45px;
                box-shadow: 0px 5px 10px 0px #e2e2e2;

            }
            ul{
                border: 1px solid red;
                margin-top: 10px;
                li{
                    width:180px;
                    line-height: 40px;
                    text-align: center;
                    border-bottom: 1px solid #f6f6f6;
                    color:#737373;
                }
                li:last-child{
                    border-bottom: none;
                }
            }
        }
        .content{
            flex:1;
            border:1px solid red;
        }
    }
</style>
