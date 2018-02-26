<template>
    <div class="register">
        <header>
            <div class="line"></div>
            <div class="title">REGISTER AN ACCOUNT</div>
            <div class="line"></div>
        </header>
        <main>
            <el-form label-position="top" :model="signupForm" :rules="rules">
                <el-form-item label="Email address" prop="email">
                    <el-input v-model="signupForm.email" ></el-input>
                </el-form-item>
                <el-form-item label="FISRT NAME" prop="fisrtName" class="name">
                    <el-input v-model="signupForm.fisrtName" ></el-input>
                </el-form-item>
                <el-form-item label="LAST NAME" prop="lastName" class="name">
                    <el-input v-model="signupForm.lastName" ></el-input>
                </el-form-item>
                <el-form-item label="Company name" prop="companyName">
                    <el-input v-model="signupForm.companyName" @keyup.enter="getCode"></el-input>
                </el-form-item>
                <el-form-item label="Business phone" prop="phone">
                    <el-input v-model="signupForm.phone" ></el-input>
                </el-form-item>
                <el-form-item label="Mobile phone" prop="mobile">
                    <el-input v-model="signupForm.mobile" ></el-input>
                </el-form-item>
                <el-form-item label="Zip code" prop="address">
                    <el-input v-model="signupForm.address" ></el-input>
                </el-form-item>
                <el-form-item label="Federal Tax ID" prop="FTI">
                    <el-input v-model="signupForm.FTI" ></el-input>
                </el-form-item>
                <el-form-item label="Type of Business" prop="Business">
                    <!--<el-input v-model="signupForm.checkPass" ></el-input>-->
                    <el-select v-model="signupForm.Business" :placeholder= '$t("main.accountNew.register.mainAcReSelect")'>
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Upload distribution card" prop="pic">
                    <el-upload
                        :on-success="urlFileList"
                        class="upload-demo"
                        drag
                        action="/cgi/upload/file/misc/image">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">{{ $t("main.accountNew.register.mainAcReFileDragHere") }}<em>{{ $t("main.accountNew.register.mainAcReClickUpload") }}</em></div>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="checked">Sign-up now for exclusive discounts and news</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="submit" class="confirm" :class="{canClick:signupForm.agree === true}" @click="submitFrom" ><span>CREATE AN ACCOUNT</span></el-button>
                </el-form-item>
            </el-form>
        </main>
    </div>
</template>

<script>
    import accountService from '@/services/AccountService.js'
    import validatorConfig from '@/config/ValidatorConfig.js'
    export default {
        name: "signup",
        data(){
            let checkCode = (rule,value,callback) => {
                accountService.checkCode(value).then((data) => {
                    this.$ltsMessage.show({type: 'error', message: this.$t("main.accountNew.register.mainAcReValidateSuccess")})
                },(msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
            }
            return{
                checked:false,
                send:true,
                sendAgain:false,
                countdown:3,
                signupForm:{
                    pic:'',
                    companyName:'',
                    fisrtName:'',
                    lastName:'',
                    email:'',
                    phone:'',
                    mobile:'',
                    address:'',
                    FTI:'',
                    Business:'',
                    url:[],
                },
                rules:{
                    Business: [
                        { required: true, message: this.$t("main.accountNew.register.mainAcReContentNotNull"), trigger: 'blur' },
                    ],
                    companyName: [
                        { required: true, message: this.$t("main.accountNew.register.mainAcReContentNotNull"), trigger: 'blur' },
                    ],
                    FTI: [
                        { required: true, message: this.$t("main.accountNew.register.mainAcReContentNotNull"), trigger: 'blur' },
                    ],
                    fisrtName: [
                        { required: true, message: this.$t("main.accountNew.register.mainAcReContentNotNull"), trigger: 'blur' },
                    ],
                    lastName: [
                        { required: true, message: this.$t("main.accountNew.register.mainAcReContentNotNull"), trigger: 'blur' },
                    ],
                    email:validatorConfig.email,
                    /*pass: [
                        { required: true, message: '内容不能为空', trigger: 'blur' },
                        { min: 8, max: 20, message: '密码长度为8到20个字符', trigger: 'blur' },
                    ],*/
                   /* checkPass: validatorConfig.passwordRepeat((rule, value, callback)=>{
                        validatorConfig.validatePasswordRepeat(this.resetForm.pass, value, callback)
                    }),*/
                    mobile:validatorConfig.mobile,
                    address:validatorConfig.address,
                },
                options: [{
                    value: 'Installer',
                    label: 'Installer'
                },{
                    value: 'Wholesale',
                    label: 'Wholesale'
                },{
                    value: 'Distributor',
                    label: 'Distributor'
                },{
                    value: 'Integrator',
                    label: 'Integrator'
                },{
                    value: 'Retailer',
                    label: 'Retailer'
                },{
                    value: 'Online Store',
                    label: 'Online Store'
                },{
                    value: 'Others',
                    label: 'Others'
                }],
                value: ''
            }
        },
        methods: {
            urlFileList(response, file, fileList){
                this.signupForm.url.push(response.data.url);
            },
            submitFrom(){
                let params = {
                    businessPhone:this.signupForm.phone,
                    zipCode:this.signupForm.address,
                    taxId:this.signupForm.FTI,
                    typeOfBusiness:this.signupForm.Business,
                    urls:this.signupForm.url
                };
                let obj = {
                    email: this.signupForm.email,
                    contractName:this.signupForm.fisrtName + this.signupForm.lastName,
                    companyName: this.signupForm.companyName,
                    mobile:this.signupForm.mobile,
                    type:3,
                    from:'PC_WEB',
                    ext:params
                }
                accountService.creatAccount(obj).then((data) => {
                    this.$ltsMessage.show({type: 'success', message: this.$t("main.accountNew.register.mainAcReCreateSuccess")})
                    this.$router.push('/signupFinish')
                },(msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
            },
            getCode(){
                accountService.getSignupCode().then((data) => {
                    console.log(data)
                    this.signupForm.code = ''
                },(msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
                let self = this;
                self.countdown = 5;
                this.send = false;
                self.sendAgain = false;
                let clock = setInterval(() => {
                    if(self.countdown > 1){
                        self.countdown--;
                    }else{
                        clearInterval(clock)
                        self.sendAgain = true;
                    }
                },1000)
            },
        }
    }
</script>

<style lang="less">
    .register{
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
                        top:34px;
                        left:8px;
                    }
                }
                .el-form-item.checkbox{
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
                        .el-button.is-disabled{
                            color:white;
                        }
                    }
                }
                .upload-demo .el-upload-dragger{
                    width: 400px !important;
                }
                .el-select .el-input{
                    width: 400px;
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
                    background: #ff3b41;
                    width:100%;
                    span{
                        line-height: 30px;
                    }
                }
                .el-button.canClick{
                    background: #ff3b41;
                }
                .el-checkbox__input.is-checked .el-checkbox__inner{
                    border-radius: 50%;
                    margin-right: 10px;
                }
                .el-checkbox__inner{
                    border-radius: 50%;
                    margin-right: 10px;
                }
                .circle{
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    border: 1px solid #a3a3a3;
                    border-radius: 50%;
                    margin-right: 10px;
                }
            }
        }
    }



</style>
