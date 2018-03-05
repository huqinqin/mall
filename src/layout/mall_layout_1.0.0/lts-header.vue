<template>
    <div class="mall-header">
        <div class="header-box">
          <ul class="s-span-page">
            <li class="sign">
              <span class="login" v-login v-if="!userInfo">{{ $t("comHeader.headerImmediatelyLog") }}</span>
              <span class="login"  v-if="userInfo">{{ $t("comHeader.headerWelcom") }}，{{userInfo.account.user_name}}</span>
              <a href="/account#/register" v-if="!userInfo"><span class="register">{{ $t("comHeader.headerImmediatelySign") }}</span></a>
            </li>
            <li class="">
              <a href="/" class="news top-menu" v-if="showToIndex">{{ $t("comHeader.headerIndex") }}</a>
              <a v-login href="/order" class="top-menu"  @click="toOrder">{{ $t("comHeader.headerMyOrder") }}</a>
              <el-tooltip placement="top" effect="light">
                <div slot="content"><myExperts></myExperts></div>
                <a href="javascript:void(0)" class="top-menu" v-login v-if="showToIndex">{{ $t("comHeader.headerMyExpert") }}</a>
              </el-tooltip>
              <a href="javascript:void(0)" ><i class="iconfont icon-shouji"></i>{{ $t("comHeader.headerPhoneOrder") }}</a>
              <a href="javascript:void(0)" @click="logout" v-if="userInfo">{{ $t("comHeader.headerLogin") }}</a>
            </li>
          </ul>
        </div>
        <!--登录弹框-->
        <div class="login-dialog">
            <el-dialog :visible.sync="loginVisible" @close="closeDialog">
                <el-form :model="form" :rules="loginRules" ref="loginForm">
                    <el-form-item class="head">
                        <i class="iconfont icon-turnoff" @click="loginVisible = false"></i>
                        <img src="@/assets/img/denglu.tou.png" alt="顶部图片">
                    </el-form-item>
                    <el-form-item label="用户名/邮箱：" prop="acount">
                        <el-input name="test"  v-model="form.acount" placeholder="请输入您的用户名或邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" prop="password" class="password">
                        <el-input type="password" ref="password" v-model="form.password" placeholder="请输入您的密码" @keyup.enter.native="login">
                        </el-input>
                        <i class="iconfont icon-yanjing" @click="showPassword" ref="eye"></i>
                    </el-form-item>
                    <el-form-item>
                        <div class="aboutPassword">
                            <el-checkbox v-model="form.checked">记住密码</el-checkbox>
                            <div @click="forgetPass" style="cursor: pointer">忘记密码?</div>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <button type="button" @click="login">登录</button>
                    </el-form-item>
                    <el-form-item>
                        <button type="button" class="signup" @click="signup">注册</button>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import {store} from 'ltsutil'
    import config from 'config'
    import session from '@/library/Session'
    import userService from '@/services/UserService.js'
    import myExperts from '@/common/components/myExperts'
    export default {
        name : "lts-header",
        data(){
          return{
              showToIndex:true,
              userInfo : {},
              //登录
              loginVisible:false,
              unread: 100,
              form: {
                  acount:'',
                  password:'',
                  checked: '',
                  radio: '',
              },
              loginRules:{
                  acount:[{required: true, message: this.$t("comHeader.headerInputUserOrEmail")}],
                  password:[{required: true, message: this.$t("comHeader.headerInputPwd")}]
              },
              isShowMenu : true,
              cart_num : -1,
          }
        },
        methods:{
            closeDialog(){
              this.$refs.loginForm.resetFields()
              console.log(this.$refs.loginForm)
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
            login(data){
                userService.login(this.form.acount,this.form.password).then((data)=>{
                    this.loginVisible = false;
                    this.getUserInfo();
                },(msg)=>{

                    this.$ltsMessage.show({type:'error',message:msg.error_message})
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
                store.setItem('selected', '我的订单');
            }

        },
        created(){
            this.selfContext.$on("showLogin",this.showLogin);
            this.isShowMenu = config.isCart;
            this.getLocalUser()
            this.showToIndex = !config.isWhite
        },
        components: {
            myExperts
        }
    }
</script>
<style lang="less">
    .el-loading-mask{
        z-index: 1000;
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
                                font-family: MicrosoftYaHei;
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


                    }
                }
                .el-dialog__footer{
                    padding:15px 0;
                }
            }
        }

    }
</style>
