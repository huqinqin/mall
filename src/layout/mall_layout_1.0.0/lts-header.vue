<template>
    <div class="mall-header">
        <div class="header-box">
          <ul class="s-span-page">
            <li class="sign">
              <span class="login" v-login v-if="!userInfo">立即登录</span>
              <span class="login"  v-if="userInfo">欢迎，{{userInfo.account.user_id}}</span>
            </li>
            <li class="">
              <a href="/reverse" class="news top-menu">快报</a>
              <a href="/order" class="top-menu" v-login>我的订单</a>
              <a href="" class="top-menu" v-login>收藏夹</a>
              <a href="javascript:void(0)" ><i class="iconfont icon-shouji"></i>手机下单更优惠</a>
              <a href="javascript:void(0)" @click="logout" v-if="userInfo">退出</a>
            </li>
          </ul>
        </div>
        <div class="product">
              <div class="menu-list s-span-page">
                <ul>
                    <li v-for="value in menuList">
                        <a :href="value.link" v-if="value.type == 'logo'" class="header-logo" :style="{backgroundImage : 'url('+value.icon+')'}"></a>
                        <a :href="value.link" v-else>
                            <span class="iconfont" :class="value.icon"></span>
                            <p>{{value.first}}</p>
                            <p>{{value.last}}</p>
                        </a>
                    </li>
                </ul>
              </div>
              <div class="s-span-page search-bar">
                  <el-input placeholder="请输入内容" v-model="input5" class="input-with-select ">
                      <el-select v-model="select" slot="prepend" placeholder="请选择">
                          <el-option label="餐厅名" value="1"></el-option>
                          <el-option label="订单号" value="2"></el-option>
                          <el-option label="用户电话" value="3"></el-option>
                      </el-select>

                      <!--<el-cascader slot="prepend" placeholder="请选择" :options="options" v-model="selectedOptions" @change="handleChange">-->
                      <!--</el-cascader>-->
                      <a slot="append" :href="'/search?cateId=' + select + '&keywords=' + input5"><el-button icon="el-icon-search"></el-button></a>
                  </el-input>
              </div>
        </div>
        <!--登录弹框-->
        <div class="login-dialog">
            <el-dialog :visible.sync="loginVisible">
                <el-form :model="form" :rules="loginRules">
                    <el-form-item class="head">
                        <i class="iconfont icon-turnoff"></i>
                        <img src="@/assets/img/denglu.tou.png" alt="顶部图片">
                    </el-form-item>
                    <el-form-item label="用户名/邮箱：" prop="acount">
                        <el-input v-model="form.acount" placeholder="请输入您的用户名或邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" prop="password" class="password">
                        <el-input type="password" ref="password" v-model="form.password" placeholder="请输入您的密码">
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
                        <button @click="login">登录</button>
                    </el-form-item>
                    <el-form-item>
                        <button class="signup">注册</button>
                    </el-form-item>
                    <!--<el-form-item>-->
                        <!--<div class="otherLogin">第三方登录</div>-->
                        <!--<div class="icons">-->
                            <!--<a href="#"><img src="@/assets/img/icon1.png" alt="icon1"></a>-->
                            <!--<a href="#"><img src="@/assets/img/icon2.png" alt="icon2"></a>-->
                        <!--</div>-->
                    <!--</el-form-item>-->
                </el-form>
                <div slot="footer" class="dialog-footer">
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import {store} from 'ltsutil'
    import session from '@/library/Session'
    import userService from '@/services/UserService.js'
    export default {
        name : "lts-header",
        data(){
          return{
             menuList : [
                 {
                     name : 'ip solution',
                     icon : 'icon-IPjiejuefangan',
                     first : 'IP',
                     last : 'SOLUTION',
                     link : '/detail#/?id=2101176'
                 },
                 {
                     name : 'hdtvi solution',
                     icon : 'icon-jiankong',
                     first : 'HD-TVI',
                     last : 'SOLUTION',
                     link : 'javascript:void(0)'
                 },
                 {
                     name : 'shopby scenario',
                     icon : 'icon-qiyejiejuefangan',
                     first : 'SHOP BY',
                     last : 'SCENARIO',
                     link : 'javascript:void(0)'
                 },
                 {
                     name : 'surveiliance system vulider',
                     icon : 'icon-jiatingjiejuefangan',
                     first : 'SURVEILANCE',
                     last : 'SYSTEM BULIDER',
                     link : 'javascript:void(0)'
                 },
                 {
                     name : 'logo',
                     icon :  require('../../assets/img/header-logo.png'),
                     type : 'logo',
                     link : '/'
                 },
                 {
                     name : 'call experts',
                     icon : 'icon-lianxixiaoshoukefu',
                     first : 'CALL',
                     last : 'EXPERTS',
                     link : 'javascript:void(0)'
                 },
                 {
                    name : 'support center',
                    icon : 'icon-zhichi',
                    first : 'SUPPORT',
                    last : 'CENTER',
                    link : 'javascript:void(0)'
                 },
                 {
                    name : 'my favorite',
                    icon : 'icon-wodezuiai',
                    first : 'MY',
                    last : 'FAVOURITE',
                    link : 'javascript:void(0)'
                 },
                 {
                    name : 'suopping cart',
                    icon : 'icon-gouwuche2',
                    first : 'SUOPPING',
                    last : 'CART',
                    link : '/cart'
                 }
                ],
             input5  : '',
             select : '',
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
                  acount:[{required: true, message: '请输入用户名或邮箱'}],
                  password:[{required: true, message: '请输入密码'}]
              }
          }
        },
        methods:{
            login(){
            },
            logout(){
                session.logout();
                this.userInfo = {};
                userService.logout().then((resp)=>{
                    session.logout();
                },(err)=>{
                    this.$ltsMessage.show({type: "error", message: err.error_message});
                })
            },
            login(data){
                userService.login(this.form.acount,this.form.password).then((data)=>{
                    this.loginVisible = false
                    this.getUserInfo();
                },(msg)=>{
                    this.$ltsMessage.show({type:'error',message:msg.error_message})
                })
            },
            getUserInfo(){
                userService.get().then((data)=>{
                    this.userInfo = data.data;
                    session.login({account: data.data});
                },(msg)=>{
                    this.$ltsMessage.show({type:'error',message:msg.error_message})
                });
            },
            getLocalUser(){
                this.userInfo = JSON.parse(store.getItem('SESSION_DATA'));
            },
            showLogin(data){
                this.loginVisible = true
            },
            showPassword(){
                this.$refs.password.type = this.$refs.password.type == "text" ? 'password' : 'text';
            },
            // 获取类目数据
            getLocalStorage(){
                let data = localStorage.getItem('categoryList')
                // data.forEach((value)=>{
                //     value.label = value.name
                //     value.value = value.name
                //     if(value.children){
                //         value.children.forEach((value1) => {
                //             value1.label = value1.name
                //             value1.value = value1.name
                //         })
                //     }
                // })
                console.log(data)
            },
        },
        created(){
            this.selfContext.$on("showLogin",this.showLogin)
            this.getLocalUser();
        },
        mounted(){
            this.getLocalStorage()
        }
    }
</script>
<style lang="less">
    .mall-header{
        a{
            color:inherit;
            text-decoration: none;
        }
        .el-header{
            padding: 0;
        }
        .el-select .el-input {
            width: 130px;
        }
        .input-with-select .el-input-group__prepend {
            background-color: #fff;
        }
        .product{
            background-color: white;
            .search-bar{
                padding-bottom: 24px;
            }
            .header-logo{
                width: 300px;
                height:74px;
                background-position: center;
                background-size: cover;
                display: flex;
            }
            .menu-list{
                padding: 24px 0;
                ul{
                    display: flex;
                    height: 100%;
                    align-items: center;
                    li{
                        flex:1;
                        text-align: center;
                        a{
                            text-decoration: none;
                            .iconfont{
                                font-size: 42px;
                                color: #4c4c4c;
                            }
                            p{
                                text-align: center;
                                color: #737373;
                                font-size: 12px;
                            }
                        }
                    }
                }
            }
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
