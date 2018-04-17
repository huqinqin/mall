<template>
    <div class="waitAuthing">
        <header>
            <!--<div class="line"></div>
            <div class="title">Submission Successful</div>
            <div class="line"></div>-->
            <div class="iconfont icon-LTS-LOGO- LTSLogo"></div>
        </header>
        <main>
            <div class="info1">Account Registration Submission Successful</div>
            <div class="info2">You account registration information has been received by LTS successfully.</div>
            <div class="info2">An initial password will be sent to your email address once your account has been approved.</div>
            <div class="info2">Thank you for your support to LTS.</div>
            <div class="buttons">
                <el-button class="back" @click="back">BACK TO THE MALL</el-button>
            </div>
        </main>
    </div>
</template>

<script>
    export default {
        name: "waitAuthing",
        data(){
            return{}
        },
        methods:{
            back(){
                window.location.href = '/'
            },
            myself(){
                window.location.href = '/'
            },
        }
    }
</script>

<style lang="less">
    .waitAuthing{
        .LTSLogo{
            margin:120px auto 50px;
            font-size: 100px;
            color: #ce2127;
        }
        main{
            width:100%;
            height: 100%;
            margin:0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            color:#585858;
            .info1{
                line-height: 60px;
                font-size: 30px;
                font-weight: bold;
                margin-bottom: 30px;
                color:#ff3b41;
            }
            .info2{
                font-size: 20px;
                line-height: 34px;
            }
            .buttons{
                margin:60px 0;
                button.back{
                    width:200px;
                    color:#f13a40;
                    border:1px solid #f13a40;
                }
                button.back:hover,button.back:focus{
                    background: #fff;
                }
                button.myself{
                    width:260px;
                    background: #f13a40;
                    border:1px solid #f13a40;
                }
            }
        }
    }
</style>
