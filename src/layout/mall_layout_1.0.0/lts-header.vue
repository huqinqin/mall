<template>
    <div class="mall-header">
        <div class="header-box">
          <ul class="s-span-page">
            <li class="sign">
              <span class="login" v-login v-if="!userInfo">{{ $t("main.index.mainInImmeLogin") }}</span>
              <a :href="'/someinfo?t=' + new Date().getTime() + '#/'" @click="toInfo"><span class="login"  v-if="userInfo && userInfo.account">{{ $t("comHeader.headerWelcom") }}，{{userInfo.account.user_name}}</span></a>
              <a :href="'/account?t=' + new Date().getTime() + '#/register'" v-if="!userInfo"><span class="register">{{ $t("comHeader.headerImmediatelySign") }}</span></a>
            </li>
            <li class="">
                <el-popover
                    placement="top-start"
                    width="200"
                    trigger="hover"
                >
                    <a :href="'/someinfo?t=' + new Date().getTime() + '#/coupon'" class="top-menu" slot="reference"><i class="iconfont icon-youhuijuan couponicon"></i>Coupon</a>
                    <div style="font-weight: bold;">you have {{len}} coupon</div>
                </el-popover>
              <a href="/" class="news top-menu" v-if="showToIndex">{{ $t("comHeader.headerIndex") }}</a>
              <a v-login :href="'/order?t=' + new Date().getTime() + '#/'" class="top-menu"  @click="toOrder">{{ $t("comHeader.headerMyOrder") }}</a>
                <el-popover
                    ref="popover1"
                    width="450"
                    trigger="hover"
                    placement="top"
                    @show="show"
                    popper-class="expert"
                    >
                    <myExperts></myExperts>
                </el-popover>
                <a href="javascript:void(0)" class="top-menu" v-login v-if="showToIndex && userInfo" v-popover:popover1>{{ $t("comHeader.headerMyExpert") }}</a>
              <a href="javascript:void(0)" class="top-menu"><i class="iconfont icon-shouji"></i>{{ $t("comHeader.headerPhoneOrder") }}</a>
              <a href="javascript:void(0)"  @click="logout" v-if="userInfo">{{ $t("comHeader.headerLogin") }}</a>
            </li>
          </ul>
        </div>
        <!--登录弹框-->
        <div class="login-dialog">
            <el-dialog :visible.sync="loginVisible" @close="closeDialog">
                <el-form :model="form" :rules="loginRules" ref="loginForm">
                    <el-form-item class="head">
                        <i class="iconfont icon-turnoff" @click="loginVisible = false"></i>
                        <img src="@/assets/img/loginImg.png" :alt='$t("comHeader.headerTopPic")'>
                    </el-form-item>
                    <el-form-item  prop="acount">
                        <div>
                            <el-popover
                                popper-class="loginNNote"
                                ref="popover1"
                                placement="bottom"
                                title=""
                                width="200"
                                trigger="hover"
                                :content='$t("comHeader.loginNote")'>
                            </el-popover>
                            <label>{{$t("comHeader.headerUserOrEmail")}}</label>
                            <el-button v-popover:popover1 class="accountInput"><span class="iconfont icon-yiwen"></span></el-button>
                        </div>
                        <!--<el-input type="text"  v-model="form.acount" :placeholder='$t("comHeader.headerInputUserOrEmail")' @input="checkCookie" @blur="checkCookie" @keyup.enter.native="submit"></el-input>-->
                        <el-input type="text"  v-model="form.acount" :placeholder='$t("comHeader.headerInputUserOrEmail")' @keyup.enter.native="submit"></el-input>
                    </el-form-item>
                    <el-form-item :label='$t("comHeader.headerPwd")' prop="password" class="password">
                        <el-input type="password" ref="password" v-model="form.password" :placeholder='$t("comHeader.headerInputPwd")' @keyup.enter.native="submit">
                        </el-input>
                        <i class="iconfont icon-yanjing" @click="showPassword" ref="eye"></i>
                    </el-form-item>
                    <el-form-item>
                        <div class="aboutPassword">
                            <el-checkbox v-model="form.checked">{{$t("comHeader.headerRemerberPsw")}}</el-checkbox>
                            <div @click="forgetPass" class="forgetButton">{{$t("comHeader.headerForgetPsw")}}</div>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <button type="button" @click="submit">{{$t("comHeader.headerLog")}}</button>
                    </el-form-item>
                    <el-form-item>
                        <button type="button" class="signup" @click="signup">{{$t("comHeader.headerRegis")}}</button>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                </div>
            </el-dialog>
        </div>
        <coupon-shade v-if="showShade" :dataList="bonusList"></coupon-shade>
    </div>
</template>
<script>
    import {store} from 'ltsutil'
    import config from 'config'
    import session from '@/library/Session'
    import userService from '@/services/UserService.js'
    import expertService from '@/services/MyexpertService.js'
    import checkService from '@/services/CheckService.js'
    import dateUtils from '@/utils/DateUtils.js'
    import timeService from '@/services/TimeService'
    import {couponShade, myExperts} from 'ui'
    import md5 from 'md5'
    export default {
        name : "lts-header",
        data(){
          return{
              showShade:false,
              len: 0,
              flag:true,
              showToIndex:true,
              userInfo : {},
              //登录
              loginVisible:false,
              unread: 100,
              form: {
                  acount:'',
                  password:'',
                  passwordMD5:'',
                  checked: false,
                  radio: '',
                  omsPassword:''
              },
              loginRules:{
                  acount:[{required: true, message: this.$t("comHeader.headerInputUserOrEmail")}],
                  password:[{required: true, message: this.$t("comHeader.headerInputPwd")}]
              },
              isShowMenu : true,
              cart_num : -1,
              language : 'en',
              test:0,
              hasMd5: false,
              hasPass: false,
              bonusList:[],
              now:'',
          }
        },
        mounted(){
            this.language = store.getItem('language') ?  store.getItem('language') : this.language
            this.selfContext.$on('closeShade',this.closeTheShade)
            this.showShade = store.getItem('newCoupons') && JSON.parse(store.getItem('newCoupons')).length ? true : false
            this.checkLogin();
            store.removeItem('newCoupons')
        },
        methods:{
            getNowTime(){
                timeService.getTimeAndZone().then(time => {
                    this.now = new Date(time.current_time).getTime()
                    this.getBonusList()
                },err => {
                    this.$ltsMessage({type:'error',message:err.error_message})
                })
            },
            checkLogin(){
                if(session.isLogin()){
                    this.getNowTime()
                }
            },
            getBonusList(){
                checkService.checkInfo().then((data) => {
                    data.data.acc_books.forEach( t => {
                        if(t.subject === 2010102 && t.bonus) {
                            t.bonus.datalist.forEach(v => {
                                this.len++;
                            })
                            if(this.showShade){
                                t.bonus.datalist.forEach(item => {
                                    item.rule_value = JSON.parse(item.rule)
                                    item.end = dateUtils.format(new Date(parseInt(item.end_time)), 'MM-dd-yyyy')
                                    item.start = dateUtils.format(new Date(parseInt(item.start_time)), 'MM-dd-yyyy')
                                    if((item.end_time - this.now) / 1000 / 3600 / 24 > 5){
                                        item.expire = false
                                    }else{
                                        item.expire = true
                                    }
                                })
                                this.bonusList = t.bonus.datalist.slice(0,6)
                            }
                        }else if(t.subject === 2010106){
                            store.setItem('hasCreditTerm', true)
                        }
                    })
                })
            },
            closeTheShade(){
                this.showShade = !this.showShade
            },
            submit(){
                userService.checkLogin(this.form.acount).then((t) => {
                    if(t.data){
                        this.form.omsPassword = md5(t.data + this.form.password) + ":" + t.data
                    }else{
                        this.form.omsPassword = ''
                    }
                    this.login()
                },(err) => {
                    this.$ltsMessage.show({type: "error", message: err.error_message});
                })
            },
            closeDialog(){
              this.$refs.loginForm.resetFields()
            },
            signup(){
                location.href = '/account#/register';
                this.loginVisible = false;
            },
            forgetPass(){
                location.href = '/account#/reset';
                this.loginVisible = false;
            },
            logout(){
                userService.logout().then((resp)=>{
                    session.logout();
                    this.userInfo = {};
                },(err)=>{
                    this.$ltsMessage.show({type: "error", message: err.error_message});
                })
            },
            // 查询工程商等级
            getInfo() {
                checkService.getInfo().then((data) => {
                    window.localStorage.setItem('userLevel',data.data.vip)
                }, (msg) => {
                    this.$ltsMessage({type: 'error', message: msg.error_message})
                })
            },
            login(data){
                userService.login(this.form).then((data)=>{
                    store.setItem('newCoupons',data.data.value)
                    this.getInfo();
                    this.loginVisible = false;
                    this.getUserInfo();
                },(msg)=>{
                    if(msg.error_code == 10100062){
                        this.$ltsMessage.show({type:'error',message:this.$t("comHeader.passErrorNote"),class:'errorMess'})
                    }else{
                        this.$ltsMessage.show({type:'error',message:msg.error_message})
                    }
                })
            },
            getUserInfo(){
                userService.get().then((data)=>{
                    this.userInfo = data.data;
                    session.login({account: data.data});
                    location.reload();
                },(msg)=>{
                    this.$ltsMessage.show({type:'error',message:msg.error_message})
                });
            },
            getLocalUser(){
                this.userInfo = JSON.parse(store.getItem(config.sessDataName));
            },
            showLogin(data){
                store.clear(); // 清空localstorage
                this.loginVisible = true
            },
            showPassword(){
                this.$refs.password.type = this.$refs.password.type == "text" ? 'password' : 'text';
            },

            searchToHref(){
                location.href = '/search#/?cateId=' + this.selectedOptions + '&keywords=' + this.keywords
                this.selfContext.$emit('getItemList')
            },
            toOrder(){
                store.setItem('selected', this.$t("common.ltsMenu.commLtsMyOrder"));
            },
            toInfo(){
                store.setItem('selected', this.$t("common.ltsMenu.commLtsPersonlPage"));
            },
            handleCommand(command){
                store.setItem('language', command);
                // location.reload();
            },
            show(){
                if(this.flag){
                    expertService.getExpert().then((data) => {
                        this.flag = false;
                        this.selfContext.$emit('checkExpert', data.data,this.flag);
                    })
                }
            },
            checkExpert(val,flag){
                this.flag = flag;
            }
        },
        created(){
            this.selfContext.$on("showLogin",this.showLogin);
            this.isShowMenu = config.isCart;
            this.getLocalUser()
            this.showToIndex = !config.isWhite
            this.selfContext.$on('checkExpert',this.checkExpert)
        },
        components: {
            myExperts,couponShade
        }
    }
</script>
<style lang="less">
    .expert{
        padding: 0 !important;
    }
    .el-loading-mask{
        z-index: 1000;
    }
    .loginNNote{
        text-align: left;
        width:220px !important;
    }
    .el-message.errorMess{
        width:520px;
        p{
            line-height: 1.3;
        }
    }
    .mall-header{
        a{
            color:inherit;
            text-decoration: none;
        }
        .el-header{
            padding: 0 !important;
        }
        .el-select .el-input {
            width: 130px;
        }
        .input-with-select .el-input-group__prepend {
            background-color: #fff;
        }
        .header-box{
          color: white;
          height:30px;
          line-height: 26px;
          background-color: #181818;
          padding: 0;
          width: 100%;
          ul{
              display: flex;
              align-items: center;
              justify-content: space-between;
              height: 100%;
              .couponicon{
                  font-size: 24px;
                  vertical-align: middle;
                  color: #FFD800;
                  margin-right: 10px;
              }
          }
          li{
            align-self: center;
            a{
                color:white;
                font-size: 12px;
            }
            span{
                color: white;
                font-size: 12px;
                text-decoration: none;
                position: relative;
                display:inline-block;
                cursor:pointer;
            }
            span.login{
                color:#f13a40;
                margin-right: 18px;
                font-weight:bold;
            }
            span.register{
              font-weight:bold;
            }
            .news{
              /*margin-right: 14px;*/
            }
            .top-menu{
              padding-right: 12px;
              margin-left: 6px;
              position: relative;
              display:inline-block;
            }
            .top-menu:before{
              content: '';
              height:12px;
              width:1px;
              background-color: white;
              position: absolute;
              right:0;
              top:8px;
            }
            .icon-shouji{
              font-size: 12px;
              margin: 0 6px 0 3px;
            }
          }
        }
        // 登录
        .login-dialog{
            z-index: 10001;
            .el-dialog{
                width:380px;
                border-radius: 4px;
                .el-dialog__header{
                    padding:0;
                    position: relative;
                    button{
                        display: none;
                    }
                }
                .el-dialog__body{
                    padding:0;
                    .el-form{
                        .el-form-item.head{
                            position: relative;
                            height: 0;
                            i{
                                font-size: 20px;
                                display: block;
                                position: absolute;
                                top: 4px;
                                right: -30px;
                                cursor: pointer;
                                color: white;
                            }
                            i:hover{
                                color:white;
                            }
                        }
                        .el-form-item{
                            padding: 0 40px;
                            margin-bottom: 0;
                            img{
                                width:381px;
                                height: 80px;
                                margin-left: -41px;
                            }
                            label{
                                font-size: 14px;
                                line-height: 18px;
                                color: rgba(0,0,0,0.7);
                                margin-bottom: 6px;
                                margin-top: 38px;
                                margin-left: 5px;
                            }
                            label:before{
                                content: '';
                            }
                            .el-form-item__content{
                                .el-form-item__error{
                                    margin-left: 9px;
                                }
                            }
                            .el-input{
                                input{
                                    height: 30px;
                                    font-size: 12px;
                                }
                                .el-input__inner{
                                    padding: 0 9px;
                                }

                            }
                            .el-form-item__content{
                                line-height: 30px;
                            }
                            .aboutPassword{
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                margin-top: 4px;
                                margin-bottom: 16px;
                                padding: 0 9px;
                                label.el-checkbox{
                                    margin:0;
                                    .el-checkbox__label{
                                        padding-left: 6px;
                                    }
                                    .el-checkbox__inner{
                                        margin-bottom: 1px;
                                        width:10px;
                                        height: 10px;
                                    }
                                    .el-checkbox__inner::after{
                                        height: 6px;
                                        top: -1px;
                                        left: 2px;
                                    }
                                }
                                a{
                                    text-decoration: none;
                                    color:inherit;
                                }
                            }
                            .forgetButton{
                                color:#3d98ff;
                                cursor: pointer;
                                text-decoration: underline;
                            }
                            button:focus{
                                outline: none;
                            }
                            button{
                                width:100%;
                                height: 30px;
                                color:white;
                                background: #ff3b41;
                                letter-spacing: 2px;
                                vertical-align: middle;
                                font-size: 16px;
                                border:1px solid #ff3b41;
                                border-radius: 4px;
                                margin-bottom: 12px;
                                cursor: pointer;
                                line-height: 24px;
                            }
                            button.signup{
                                background: #fff;
                                color:#ff3b41;
                                border:1px solid #ff3b41;
                                margin-bottom: 15px;
                            }
                            .otherLogin{
                                width:100%;
                                text-align: center;
                                position: relative;
                                margin-bottom: 12px;
                                font-size: 12px;
                            }
                            .otherLogin::before{
                                content:'';
                                height: 1px;
                                background-color: rgba(0,0,0,0.1);
                                width:104px;
                                position: absolute;
                                left:0;
                                top:50%;
                                margin-top: -1px;
                            }
                            .otherLogin::after{
                                content: '';
                                height: 1px;
                                background-color: rgba(0,0,0,0.1);
                                width: 104px;
                                position: absolute;
                                top: 50%;
                                left: 196px;
                                margin-top: -1px;
                            }
                            .icons{
                                width: 94px;
                                margin: 0 auto;
                                display: flex;
                                justify-content: space-between;
                                a{
                                    display: block;
                                }
                                img{
                                    margin-left: 0px;
                                    display: block;
                                    width: 30px;
                                    height: 30px;
                                }
                            }
                        }
                        .el-form-item:nth-child(1){
                            height: 80px;
                        }
                        .el-form-item:nth-child(3){
                            label{
                                margin-top: 24px;
                            }
                        }
                        .el-form-item.password{
                            position: relative;
                            i{
                                display: block;
                                position: absolute;
                                top:50px;
                                right:10px;
                                cursor: pointer;
                                font-size: 12px;
                            }
                        }
                        .el-form-item.password.is-error{
                            margin-bottom: 12px;
                            transition: all ease .2s;
                        }
                        .el-form-item.is-success{
                            input{
                                border-color:#409EFF;
                            }
                        }
                        .el-button.accountInput{
                            width:0;
                            height: 0;
                            background: #fff;
                            color: #ffa03b;
                            font-size: 12px;
                            padding: 0;
                            border:none;
                            position: relative;
                            top: 12px;
                            left: 12px;
                            .icon-yiwen{
                                position: absolute;
                                top: -18px;
                                left: -9px;
                            }
                        }
                    }
                }
                .el-dialog__footer{
                    padding:15px 0;
                }
            }
        }
    }
</style>
