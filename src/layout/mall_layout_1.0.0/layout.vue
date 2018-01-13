<template>
    <el-container class="main">
        <el-header height="auto">
            <lts-header @showLogin="login"></lts-header>
        </el-header>
        <el-container class="lts-main">
            <el-main class="s-span-page">
                <lts-content @showLogin="login"/>
            </el-main>
            <el-footer height="300px">
                <lts-footer></lts-footer>
            </el-footer>
        </el-container>
        <!--登录弹框-->
        <el-dialog :visible.sync="loginVisible">
            <el-form :model="form" :rules="loginRules">
                <el-form-item class="head">
                    <i class="iconfont icon-turnoff" @click="loginVisible = false"></i>
                    <img src="@/assets/img/denglu.tou.png" alt="顶部图片">
                </el-form-item>
                <el-form-item label="用户名/邮箱：" prop="acount">
                    <el-input v-model="form.acount" placeholder="请输入您的用户名或邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password" class="password">
                    <el-input type="password" v-model="form.password" placeholder="请输入您的密码">
                    </el-input>
                    <i class="iconfont icon-yanjing" @click="showPassword" ref="eye"></i>
                </el-form-item>
                <el-form-item>
                    <div class="aboutPassword">
                        <el-checkbox v-model="form.checked">记住密码</el-checkbox>
                        <!--<el-radio v-model="form.radio" label="1">备选项</el-radio>-->
                        <div><a href="#">忘记密码?</a></div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <button>登录</button>
                </el-form-item>
                <el-form-item>
                    <button class="signup">注册</button>
                </el-form-item>
                <el-form-item>
                    <div class="otherLogin">第三方登录</div>
                    <div class="icons">
                        <a href="#"><img src="@/assets/img/icon1.png" alt="icon1"></a>
                        <a href="#"><img src="@/assets/img/icon2.png" alt="icon2"></a>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
            </div>
        </el-dialog>
    </el-container>
</template>
<script>
    import {store} from 'ltsutil'
    import config from 'config'
    import userService from '@/services/UserService'
    import session from '@/library/Session'
    import $ from 'jquery'
    import {ltsTable,ltsSearchForm} from 'ui'
    export default {
        name: 'Layout',
        props: [
            'isWhite'
        ],
        data() {
            return {
                loginVisible:false,
                signupVisible:false,
                homePage: config.homePage,
                account: '',
                isUniqueOpened: true,
                unread: 100,
                form: {
                    acount:'',
                    password:'',
                    checked: '',
                    radio: '',
                },
                loginRules:{
                    acount:[{required: true, message: '请输入用户名或邮箱'}],
                    password:[{required: true, message: '请输入密码'}]
                }
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            logout(){
                userService.logout().then((resp)=>{
                    session.logout();
                },(err)=>{
                    this.$ltsMessage.show({type: "error", message: err.error_message});
                })
            },
            login(data){
                this.loginVisible = true
            },
            showPassword(){
                console.log(this.$refs.eye)
            }
        },
        watch: {
            open: function () {
                consoel.log(this.open)
            }
        },
        created(){
          config.isWhite ? $("html").attr('class','white') : $("html").attr('class','gray');
          $(document).ready(function(){
            resize();
          })
          $(window).resize(function(){
            resize();
          });
          function resize(){
            var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            // $('body').attr('class','fullscreen');
            if(width <= 1500){
              $('body').attr('class','b1200');
            }else{
              $('body').attr('class','b1500');
            }
          }
        },
        mounted() {

//            session.checkLogin();
            this.account = store.getItem('account');
        }
    }
</script>
<style lang="less">
    @import "//at.alicdn.com/t/font_516449_35f23m4ei4hlrf6r.css";
    html, body {
        margin: 0;
        padding: 0;
        height:100%;
        min-width: 1200px;
    }
    .white{
        background-color: white;
    }
    .gray{
        background-color: #eeeeee;
    }
    body,
    ol,
    ul,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    th,
    td,
    dl,
    dd,
    form,
    fieldset,
    legend,
    input,
    textarea,
    select,
    td,
    figure {
      margin: 0;
      padding: 0;
    }
    li {
      list-style: none;
    }
    .s-span-page{
      margin: auto;
      width: 1200px;
    }
    .b1500{
      .s-span-page{
        width:1500px;
      }
    }
    .fullscreen{
      .s-span-page{
        width:100%;
      }
    }
    .el-header {

    }
    .lts-main {
        .el-main{
          padding: 0;
          min-height:800px;
          background-color: white;
        }
        .el-footer {
            margin-top: 48px;
            font-size: 12px;
            line-height: 30px;
            text-align: center;
            background-color: white;
            color: #999;
        }
    }
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
                        top: -4px;
                        left: 352px;
                        cursor: pointer;
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
</style>
