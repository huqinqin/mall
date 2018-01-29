<template>
    <div class="signup">
        <header>
            <div class="line"></div>
            <div class="title">REGISTER AN ACCOUNT</div>
            <div class="line"></div>
        </header>
        <main>
            <el-form label-position="top" :model="signupForm" :rules="rules">
                <el-form-item label="COMPANY NAME" prop="companyName">
                    <el-input v-model="signupForm.companyName" ></el-input>
                </el-form-item>
                <el-form-item label="FISRT NAME" prop="fisrtName" class="name">
                    <el-input v-model="signupForm.fisrtName" ></el-input>
                </el-form-item>
                <el-form-item label="LAST NAME" prop="lastName" class="name">
                    <el-input v-model="signupForm.lastName" ></el-input>
                </el-form-item>
                <el-form-item label="EMAIL" prop="email">
                    <el-input v-model="signupForm.email" ></el-input>
                </el-form-item>
                <el-form-item label="VERIFICATION CODE" prop="code" width="260" class="inline">
                    <el-input v-model="signupForm.code" ></el-input>
                    <el-button @click="getCode">
                        <span v-if="send">SEND</span>
                        <span v-else-if="sendAgain">SEND AGAIN</span>
                        <span v-else>{{countdown + 's'}}</span>
                    </el-button>
                </el-form-item>
                <el-form-item label="PHONE NUMBER" prop="phone">
                    <el-input v-model="signupForm.phone" ></el-input>
                </el-form-item>
                <el-form-item label="PASSWORD" prop="pass">
                    <el-input v-model="signupForm.pass" ></el-input>
                </el-form-item>
                <el-form-item label="CONFIRM PASSWORD" prop="checkPass">
                    <el-input v-model="signupForm.checkPass" ></el-input>
                </el-form-item>
                <el-form-item class="checkbox">
                    <el-checkbox v-model="signupForm.agree">AGREE《LTS USER AGREEMENT》</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button class="confirm" :class="{canClick:signupForm.agree === true}" @click="submitFrom"><span>CREATE AN ACCOUNT</span></el-button>
                </el-form-item>
            </el-form>
        </main>
    </div>
</template>

<script>
    import AccountService from '@/services/accountService.js'
    export default {
        name: "signup",
        data(){
            return{
                send:true,
                sendAgain:false,
                countdown:3,
                signupForm:{
                    companyName:'',
                    fisrtName:'',
                    lastName:'',
                    email:'',
                    code:'',
                    phone:'',
                    pass:'',
                    checkPass:'',
                },
                rules:{
                    fisrtName: [
                        { required: true, message: 'PLEASE ENTER', trigger: 'blur' },
                    ],
                    lastName: [
                        { required: true, message: 'PLEASE ENTER', trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: 'PLEASE ENTER THE E-MAIL', trigger: 'blur' },
                        { type: 'email', message: 'E-MAIL FORMAT ERROR OR REGISTERED', trigger: 'blur,change' }
                    ],
                    pass: [
                        { required: true, message: 'PLEASE ENTER THE PASSWORD', trigger: 'blur' },
                        { min: 8, max: 20, message: 'THE PASSWORD CHARACTER LENGTH IS 8-20 CHARACTERS', trigger: 'blur' }
                    ],
                    checkPass: [
                        { required: true, message: 'PLEASE ENTER THE PASSWORD AGAIN', trigger: 'blur' },
                    ],
                    code: [
                        { required: true, message: 'PLEASE ENTER THE CODE', trigger: 'blur' },
                    ],
                }
            }
        },
        methods: {
            submitFrom(){
                console.log(this.signupForm)
                this.$router.push('/signupFinish')
            },
            getCode(){
                AccountService.getCode()
                let self = this;
                self.countdown = 3;
                this.send = false;
                self.sendAgain = false;
                setInterval(function count() {
                    if(self.countdown > 1){
                        self.countdown--;
                    }else{
                        self.sendAgain = true;
                    }
                },1000)
            },
            checkCode(){
                AccountService.checkCode(this.signupForm.code).then((data) => {
                    condole.log(data)
                },(msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.msg.error_message });
                })
            }
        }
    }
</script>

<style lang="less">
    .signup{
        padding-bottom: 60px;
        border-bottom: 1px solid #f6f6f6;
        main{
            width:400px;
            margin:40px auto;
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
                .el-form-item.checkbox{
                    margin-top: -10px;
                    .el-checkbox__inner{
                        margin-bottom: 2px;
                        margin-right: 8px;
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
                .el-form-item.name{
                    display: inline-block;
                    width: 180px;
                }
                .el-form-item.name+.el-form-item.name{
                    margin-left: 34px;
                }
                .el-button.confirm{
                    margin-top: 16px;
                    background: #858585;
                    width:100%;
                    span{
                        line-height: 30px;
                    }
                }
                .el-button.canClick{
                    background: #ff3b41;
                }
            }
        }
    }



</style>
