<template>
    <div class="forgotPsw">
        <header>
            <div class="line"></div>
            <div class="title">Retrieve the Password</div>
            <div class="line"></div>
        </header>
        <main>
            <el-form label-position="top" :model="resetForm" :rules="rules" ref="formA">
                <el-form-item label="Email" prop="email">
                    <el-input v-model="resetForm.email" placeholder="Please Enter Email Address"></el-input>
                </el-form-item>
                <el-form-item label="Verification Code" prop="code" width="260" class="inline">
                    <el-input v-model="resetForm.code" placeholder="Enter Verification Code"></el-input>
                    <el-button @click="getCode" :disabled="!send && !sendAgain">
                        <span v-if="send">SEND</span>
                        <span v-else-if="sendAgain">SEND AGAIN</span>
                        <span v-else>{{countdown + 's'}}</span>
                    </el-button>
                </el-form-item>
                <el-form-item label="New Password" prop="pass">
                    <el-input v-model="resetForm.pass" placeholder="ENTER A NEW PASSWORD" type="password"></el-input>
                </el-form-item>
                <el-form-item label="Confirm Password" prop="checkPass">
                    <el-input v-model="resetForm.checkPass" placeholder="ENTER THE NEW PASSWORD AGAIN" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="confirm" @click="submitFrom('formA')" >RESET</el-button>
                </el-form-item>
            </el-form>
            <button @click="test">测试</button>
        </main>
        <div class="remark">
            <span class="red">Web support:</span><span>1 83-250-1292</span><span>Support.Newjersey@ltsecurityinc.com</span>
        </div>
    </div>
</template>

<script>
    import accountService from '@/services/AccountService.js'
    import validatorConfig from '@/config/ValidatorConfig.js'
    export default {
        name: "forget",
        data(){
            let self = this
            let checkPass = (rule,value,callback) => {
                let reg =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
                if(!reg.test(value)){
                    callback(new Error(this.$t("main.accountNew.reset.mainAcResetSyncDigit")))
                }else{
                    callback();
                }
            }
            // let checkCode = (rule,value,callback) => {
            //     accountService.checkCode(value).then((data) => {
            //         this.$ltsMessage.show({type: 'success', message: this.$t("main.accountNew.register.mainAcReValidateSuccess")})
            //     },(msg) => {
            //         this.$ltsMessage.show({type: 'error', message: msg.error_message})
            //     })
            // }
            let reCheckPass = (rule,value,callback) => {
                debugger
                if(self.resetForm.pass != self.resetForm.checkPass){
                    callback(new Error(this.$t("main.accountNew.reset.mainAcResetTwo")))
                }else{
                    callback()
                }
            }
            return{
                send:true,
                sendAgain:false,
                countdown:60,
                resetForm:{
                    email:'',
                    code:'',
                    pass:'',
                    checkPass:'',
                },
                rules:{
                    email: validatorConfig.emailReset(),
                    // pass: validatorConfig.password,
                    pass: [ { required: true, message:  this.$t("main.accountNew.register.mainAcReContentNotNull"), trigger: 'blur' },
                            {validator:checkPass,trigger: 'blur,change'}],

                    checkPass: [ { required: true, message:  this.$t("main.accountNew.register.mainAcReContentNotNull"), trigger: 'blur' },
                        {validator:reCheckPass,trigger: 'blur,change'}],
                    // checkPass: validatorConfig.passwordRepeat((rule, value, callback)=>{
                    //     validatorConfig.validatePasswordRepeat(rule, this.resetForm.pass, value, callback)
                    // }),
                    code: [
                        { required: true, message:  this.$t("main.accountNew.register.mainAcReContentNotNull"), trigger: 'blur' },
                        // {validator:checkCode,trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            test(){
                this.$ltsMessage.show({type: 'success', message: 'Reset the password success'});
                /*location.href = '/'*/
                setTimeout(() => {
                    this.$router.go(-1);
                },1000)
            },
            submitFrom(formName){
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        accountService.resetPass(this.resetForm).then((data) => {
                            this.$ltsMessage.show({type: 'success', message: 'Reset the password success'});
                            /*location.href = '/'*/
                            setTimeout(() => {
                                this.$router.go(-1);
                            },2000)
                        },(msg) => {
                            this.$ltsMessage.show({type: 'error', message: msg.error_message});
                        })
                    }else{
                        return false
                    }
                })
            },
            getCode(){
                accountService.getResetCode(this.resetForm.email).then((data) => {
                    this.countDown()
                },(msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
            },
            countDown(){
                let self = this;
                self.countdown = 60;
                this.send = false;
                self.sendAgain = false;
                let clock = setInterval(() => {
                    if(self.countdown > 1){
                        self.countdown--;
                        self.countDisable = true
                    }else{
                        clearInterval(clock)
                        self.sendAgain = true;
                        self.countDisable = false
                    }
                },1000)
            }
        }
    }
</script>

<style lang="less">
    .forgotPsw{
        main{
            width:800px;
            margin: 45px auto 0;
            padding:48px 200px 24px;
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
                            width:100px;
                            background: #3b98ff;
                            margin-right: -18px;
                        }
                        .el-button.is-disabled{
                            color:white;
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
        .remark{
            width:800px;
            margin: 12px auto;
            text-align: center;
            span{
                margin-right: 6px;
            }
            .red{
                color:#FF3B41;
            }
        }
    }
</style>
