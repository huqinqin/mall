<template>
    <div class="reset">
        <header>
            <div class="line"></div>
            <div class="title">RETRIEVE THE PASSWORD</div>
            <div class="line"></div>
        </header>
        <main>
            <el-form label-position="top" :model="resetForm" :rules="rules">
                <el-form-item label="EMAIL" prop="email">
                    <el-input v-model="resetForm.email" placeholder="PLEASE ENTER THE EMAIL ACCOUNT"></el-input>
                </el-form-item>
                <el-form-item label="VERIFICATION CODE" prop="code" width="260" class="inline">
                    <el-input v-model="resetForm.code" placeholder="ENTER CONFIRMATION CODE"></el-input>
                    <el-button @click="getCode">
                        <span v-if="send">SEND</span>
                        <span v-else-if="sendAgain">SEND AGAIN</span>
                        <span v-else>{{countdown + 's'}}</span>
                    </el-button>
                </el-form-item>
                <el-form-item label="NEW PASSWORD" prop="pass">
                    <el-input v-model="resetForm.pass" placeholder="ENTER A NEW PASSWORD"></el-input>
                </el-form-item>
                <el-form-item label="CONFIRM PASSWORD" prop="checkPass">
                    <el-input v-model="resetForm.checkPass" placeholder="ENTER THE NEW PASSWORD AGAIN"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="confirm" @click="submitFrom">SAVE</el-button>
                </el-form-item>
            </el-form>
        </main>
    </div>
</template>

<script>
    export default {
        name: "forget",
        data(){
            return{
                send:true,
                sendAgain:false,
                countdown:3,
                resetForm:{
                    email:'',
                    code:'',
                    pass:'',
                    checkPass:'',
                },
                rules:{
                    email: [
                        { required: true, message: 'E-MAIL FORMAT ERROR OR REGISTERED', trigger: 'blur' },
                    ],
                    pass: [
                        { required: true, message: 'CODE IS INCORRECT', trigger: 'blur' },
                    ],
                    checkPass: [
                        { required: true, message: 'WRONG PASSWORD FORMAT', trigger: 'blur' },
                    ],
                    code: [
                        { required: true, message: 'THE PASSWORD IS INCONSISTENT TWICE', trigger: 'blur' },
                    ],
                }
            }
        },
        methods: {
            submitFrom(){
                console.log(this.resetForm)
                this.$router.push('/signupFinish')
            },
            getCode(){
                let self = this;
                self.countdown = 3;
                this.send = false;
                self.sendAgain = false;
                setInterval(function count() {
                    if(self.countdown > 0){
                        self.countdown--;
                    }else{
                        self.sendAgain = true;
                    }
                },1000)
            }
        }
    }
</script>

<style lang="less">
    .reset{
        main{
            width:800px;
            margin: 45px auto;
            padding:48px 200px;
            box-shadow: 0px 6px 30px 0px #d6d6d6;
            border:1px solid #ccc;
            .el-form{
                label{
                    line-height: 26px;
                    margin-left: 10px;
                    position: relative;
                    padding:0;

                }
                label::before{
                    position: absolute;
                    right:100%;
                }

                .el-input{
                    margin-bottom: 18px;

                }
                .el-form-item__content{
                    line-height: 30px;
                    .el-form-item__error{
                        top:30px;
                        left: 8px;
                    }
                }
                .el-form-item.inline{
                    .el-form-item__content{
                        display: flex;
                        justify-content: space-between;
                        .el-input{
                            width:260px;
                            margin-left: -16px;
                        }
                        .el-button{
                            width:116px;
                            background: #3b98ff;
                            margin-right: -18px;
                        }
                    }
                }
                .el-form-item:last-child{
                    text-align: center;
                }
                .el-button.confirm{
                    margin-top: 16px;
                    background: #ff3b41;
                    width:116px;
                }
            }
        }
    }
</style>
