<template>
    <div class="registerPhone">
        <header>
            <div class="line"></div>
            <div class="title">Register an Account</div>
            <div class="line"></div>
        </header>
        <main>
            <el-form label-position="top" :model="signupForm" :rules="rules" ref="form">
                <el-form-item label="Email Address" prop="email">
                    <el-input v-model="signupForm.email" ></el-input>
                </el-form-item>
                <el-form-item label="First Name" prop="fisrtName" class="name">
                    <el-input v-model="signupForm.fisrtName" ></el-input>
                </el-form-item>
                <el-form-item label="Last Name" prop="lastName" class="name">
                    <el-input v-model="signupForm.lastName" ></el-input>
                </el-form-item>
                <el-form-item label="Company Name" prop="companyName">
                    <el-input v-model="signupForm.companyName" @keyup.enter="getCode"></el-input>
                </el-form-item>
                <el-form-item label="Business Phone" prop="phone" class="num">
                    <!--<el-select v-model="num" placeholder="请选择">
                        <el-option
                            v-for="item in globlaNum"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>-->
                   <InputPhone v-model="signupForm.phone"></InputPhone>
                </el-form-item>
                <!--<el-form-item label="Business phone" prop="phone" class="num">
                    <el-select v-model="num" placeholder="请选择">
                        <el-option
                            v-for="item in globlaNum"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input v-model="signupForm.phone" ></el-input>
                </el-form-item>-->
                <el-form-item label="Mobile Phone" prop="mobile" class="num">
                    <el-select v-model="num" placeholder="请选择">
                        <el-option
                            width="50px"
                            v-for="item in globlaNum"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input v-model="signupForm.mobile" @blur="validted"></el-input>
                </el-form-item>
                <el-form-item label="Zip Code" prop="address">
                    <el-input v-model="signupForm.address" ></el-input>
                </el-form-item>
                <!--<el-form-item label="Federal Tax ID" prop="FTI">
                    <el-input v-model="signupForm.FTI" ></el-input>
                </el-form-item>-->
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
                <el-form-item label="Upload Resale Certificate Photo" prop="pic">
                    <el-upload
                        :limit = 1
                        :on-success="urlFileList"
                        class="upload-demo"
                        drag
                        action="/cgi/upload/file/misc/image">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">{{ $t("main.accountNew.register.mainAcReFileDragHere") }}</div>
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
        <div class="s-span-page">
            <div class="footer-box">
                <ul class="partner">
                    <li v-for="link in partner">
                        <a :style="{backgroundImage: 'url('+link.img+')'}" :href="link.link" :key="link.value"
                           class="partner-img-box"></a>
                    </li>
                </ul>
                <div class="footer-menu-box">
                    <ul>
                        <li><a target="_blank" href="http://www.ltsecurityinc.com/about-lts">{{
                            $t("comFooter.footerAboutLts") }}</a></li>
                        <li><a target="_blank" href="http://www.ltsecurityinc.com/contact">{{
                            $t("comFooter.footerContactUs") }}</a></li>
                        <li><a target="_blank" href="http://www.ltsecurityinc.com/careers">{{
                            $t("comFooter.footerInvitePerson") }}</a></li>
                    </ul>
                    <ul>
                        <li><a target="_blank" href="https://www.ltsecurityinc.com/support">{{
                            $t("comFooter.footerFollowSupport") }}</a></li>
                        <li><a target="_blank" href="http://www.ltsecurityinc.com/news">{{ $t("comFooter.footerEvevtNews")
                            }}</a></li>
                        <li><a target="_blank" href="http://www.ltsecurityinc.com/events">{{
                            $t("comFooter.footerFollowEvent") }}</a></li>
                    </ul>
                    <ul>
                        <li><a target="_blank" href="https://www.ltsecurityinc.com/terms-of-use">{{
                            $t("comFooter.footerUseItem") }}</a></li>
                        <li><a target="_blank" href="https://www.ltsecurityinc.com/privacy-policy">{{
                            $t("comFooter.footerSecretItem") }}</a></li>
                        <li><a target="_blank" href="https://www.ltsecurityinc.com/terms-and-Conditions">{{
                            $t("comFooter.footerItemCondition") }}</a></li>
                    </ul>
                    <ul>
                        <li>{{ $t("comFooter.footerFollowUs") }}:</li>
                        <li>
                            <a target="_blank" v-for="link in footerLinkList"
                               :style="{backgroundImage: 'url('+link.img+')'}" :href="link.link" :key="link.value"
                               class="link-img-box"></a>
                        </li>
                    </ul>
                </div>
                <div class="footer-link-box">
                    <div>Copyright © 2018 LT Security Inc., All Rights Reserved</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import accountService from '@/services/AccountService.js'
    import validatorConfig from '@/config/ValidatorConfig.js'
    import InputPhone from '@/common/components/lts-input-phone'
    export default {
        name: "registerPhone",
        data(){
            let checkCode = (rule,value,callback) => {
                accountService.checkCode(value).then((data) => {
                    this.$ltsMessage.show({type: 'error', message: this.$t("main.accountNew.register.mainAcReValidateSuccess")})
                },(msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
            }
            let checkMobile = (rule, value, callback)=>{
                let reg = /^[2-9][0-9]{2}[2-9][0-9]{2}[0-9]{4}$/;
                if(!reg.test(value)){
                    callback(new Error("Mobile Phone Format Error"));
                }else{
                    callback();
                }
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
                    /*FTI:'',*/
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
                    /*FTI: [
                        { required: true, message: this.$t("main.accountNew.register.mainAcReContentNotNull"), trigger: 'blur' },
                    ],*/
                    fisrtName: [
                        { required: true, message: this.$t("main.accountNew.register.mainAcReContentNotNull"), trigger: 'blur' },
                    ],
                    lastName: [
                        { required: true, message: this.$t("main.accountNew.register.mainAcReContentNotNull"), trigger: 'blur' },
                    ],
                    email:validatorConfig.email(),
                    phone: [
                        { required: true, message:  "Required field", trigger: 'blur' }
                    ],
                   /* mobile: [
                        { required: false, message:  "Phone Number Can't Be Empty", trigger: 'blur' },
                        {required: false,validator:checkMobile,trigger: 'blur,change'}
                    ],*/
                    address:validatorConfig.address,
                },
                globlaNum: [{
                    value: '1',
                    label: '1'
                }],
                num:'1',
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
                value: '',
                partner: [
                    {
                        value: 'hikvision',
                        img: require('@/assets/img/hikvision.png'),
                        link: 'javascript:void(0)'
                    },
                    {
                        value: 'resolution',
                        img: require('@/assets/img/resolution.png'),
                        link: 'javascript:void(0)'
                    },
                    {
                        value: 'MD',
                        img: require('@/assets/img/MD.png'),
                        link: 'javascript:void(0)'
                    },
                    {
                        value: 'seagate',
                        img: require('@/assets/img/seagate.png'),
                        link: 'javascript:void(0)'
                    },
                    {
                        value: 'unisight',
                        img: require('@/assets/img/unisight.png'),
                        link: 'javascript:void(0)'
                    },
                    {
                        value: 'ubiquiti',
                        img: require('@/assets/img/ubiquiti.png'),
                        link: 'javascript:void(0)'
                    },
                    {
                        value: 'napco',
                        img: require('@/assets/img/napco.png'),
                        link: 'javascript:void(0)'
                    }
                ],
                footerLinkList: [
                    {
                        value: 'lts',
                        img: require('@/assets/img/blog_icon.png'),
                        link: 'http://www.ltsecurityinc.com/discussion'
                    },
                    {
                        value: 'facebook',
                        img: require('@//assets/img/facebook_icon.png'),
                        link: 'https://www.facebook.com/CCTV.LTS'
                    },
                    {
                        value: 'linkedin',
                        img: require('@//assets/img/linkedin_icon.png'),
                        link: 'https://www.linkedin.com/authwall?trk=ripf&trkInfo=AQF2vCAKaW1cEwAAAWIK65i4LRRHjbpidiEMDaFnJhLcB6_zhSeYEDqB3b9mc4xmhP_3zAdPE4HtT04IgpuU8I3tR46n1bBQKuStDQ39U1TvOUF7NoQLWkbgBjU0hAzqwWb49Xc=&originalReferer=http://www.ltsecurityinc.com/discussion&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2F894315'
                    },
                    {
                        value: 'twitter',
                        img: require('@//assets/img/twitter_icon.png'),
                        link: 'https://twitter.com/LTSecurityinc'
                    },
                    {
                        value: 'youtube',
                        img: require('@//assets/img/youtube_icon.png'),
                        link: 'https://www.youtube.com/user/LTSCCTV'
                    }
                ]
            }
        },
        methods: {
            /*print(arg){
                /!*this.signupForm.phone = arg;
                console.log(this.signupForm.phone);*!/
            },*/
            validted(){
                if(this.signupForm.mobile){
                    let reg = /^[2-9][0-9]{2}[2-9][0-9]{2}[0-9]{4}$/;
                    if(!reg.test(this.signupForm.mobile)){
                        this.$ltsMessage.show({type: "error", message: "Mobile phone: Format error"});
                        return false;
                    }else{
                    }
                }else{}
            },
            urlFileList(response, file, fileList){
                if(response.data){
                    this.signupForm.url.push(response.data.url);
                }else{
                    console.log("000");
                }
            },
            submitFrom(){
                this.$refs.form.validate((valid) => {
                    /*if(this.signupForm.mobile){
                        let reg = /^[2-9][0-9]{2}[2-9][0-9]{2}[0-9]{4}$/;
                        if(!reg.test(this.signupForm.mobile)){
                            this.$ltsMessage.show({type: "error", message: "Mobile phone: Format error"});
                            /!*callback(new Error("Mobile Phone Format Error"));*!/
                            return false;
                        }else{
                            callback();
                        }
                    }else{}*/
                    if(valid){
                        let params = {
                            businessPhone: this.signupForm.phone,
                            zipCode: this.signupForm.address,
                            /*taxId: this.signupForm.FTI,*/
                            typeOfBusiness: this.signupForm.Business,
                            urls: this.signupForm.url
                        };
                        let obj = {
                            email: this.signupForm.email,
                            contractName: this.signupForm.fisrtName + '-' + this.signupForm.lastName,
                            companyName: this.signupForm.companyName,
                            /*mobile: this.signupForm.mobile ? "1-" + this.signupForm.mobile : '',*/
                            type: 3,
                            from: 'PC_WEB',
                            ext: params
                        }
                        if(this.signupForm.mobile){
                            obj.mobile = "1-" + this.signupForm.mobile;
                        }else{}
                        accountService.creatAccount(obj).then((data) => {
                            this.$ltsMessage.show({
                                type: 'success',
                                message: this.$t("main.accountNew.register.mainAcReCreateSuccess")
                            })
                            this.$router.push('/waitAuthing')
                        }, (msg) => {
                            this.$ltsMessage.show({type: 'error', message: msg.error_message})
                        })
                    }

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
        },
        components:{
            InputPhone
        }
    }
</script>

<style lang="less">
    .registerPhone{
        width: 80% !important;
        margin: 0 5%;
        font-size: 5rem;
        .el-form--label-top input {
            height: 3rem;
        }
    }
    /*.registerPhone{
        padding-top: 30px;
        padding-bottom: 60px;
        border-bottom: 1px solid #f6f6f6;
        .el-form--label-top .el-form-item {
            margin-right: 0px!important;
        }
        .num{
            .el-form-item__content{
                display: flex;
                .el-select{
                    flex: 0 0 50px;
                    .el-input--suffix{
                        width: 50px!important;
                        margin-right: 10px;
                    }
                }
            }
        }
        main{
            //width:400px;
            margin:40px auto;
            .el-form{
                .el-form-item__label{
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
                    //width: 400px !important;
                }
                .el-select .el-input{
                    width: 70%;
                }
                .el-form-item.name{
                    display: inline-block;
                    width: 20%;
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
        .partner {
            margin: auto;
            margin-top: 24px;
            display: flex;
            justify-content: center;
            li {
                display: flex;
                margin-right: 24px;
            }
            li:last-child {
                margin-right: 0;
            }
            .partner-img-box {
                width: 140px;
                height: 30px;
                background-size: cover;

            }
        }

        .footer-box {
            width: 1124px;
            margin: auto;
            .footer-menu-box {
                padding-top: 35px;
                margin-bottom: 35px;
                display: flex;
                justify-content: space-between;
                text-align: left;
                li {
                    font-size: 14px;
                    color: #737373;
                    margin-top: 15px;
                    line-height: normal;
                    .email {
                        font-size: 14px;
                    }
                    .email-remark {
                        font-size: 12px;
                    }
                    .email-input input {
                        -webkit-appearance: none;
                        background-color: #fff;
                        border-radius: 4px;
                        border: 1px solid #dcdfe6;
                        -webkit-box-sizing: border-box;
                        box-sizing: border-box;
                        color: #606266;
                        display: inline-block;
                        font-size: inherit;
                        height: 30px;
                        line-height: 1;
                        outline: 0;
                        margin-top: 6px;
                        -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
                        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
                        width: 100%;
                    }
                    .el-button--default {
                        font-size: 12px;
                        width: 90px;
                        height: 24px;
                        line-height: 24px;
                        padding: 0;
                        margin-top: 6px;
                        background-color: red;
                        color: #fff;
                    }
                    .link-img-box {
                        display: inline-block;
                        width: 30px;
                        height: 30px;
                        background-size: cover;
                        margin-right: 12px;
                    }
                }
            }
            .footer-link-box {
                text-align: left;
                font-size: 14px;
                color: #737373;
                text-align: center;
            }

        }
    }*/



</style>
