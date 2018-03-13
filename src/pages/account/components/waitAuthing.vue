<template>
    <div class="waitAuthing">
        <header>
            <div class="line"></div>
            <div class="title">Submission Successful</div>
            <div class="line"></div>
        </header>
        <main>
            <div class="info1">Your request has been submitted, awaiting approval</div>
            <div class="info2">Once your request has been approved, we will send you an initial password through Email</div>
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
        main{
            width:100%;
            height: 100%;
            margin:0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            color:#ff3b41;
            .info1{
                line-height: 60px;
                font-size: 30px;
                font-weight: bold;
                margin-top: 140px;
            }
            .info2{
                font-size: 34px;
                line-height: 34px;
                margin-bottom: 100px;
            }
            .buttons{
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
