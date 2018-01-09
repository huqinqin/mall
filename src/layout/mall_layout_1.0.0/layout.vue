<template>
    <el-container>
        <el-header height="30px">
            <lts-header></lts-header>
        </el-header>
        <el-container class="lts-main">
            <el-container class="content-container">
                <el-main>
                    <lts-content/>
                </el-main>
                <el-footer height="60px">
                    copyright 2000-2017
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>
<script>
    import {store} from 'ltsutil'
    import config from 'config'
    import userService from '@/services/UserService'
    import session from '@/library/Session'
    import {ltsTable,ltsSearchForm} from 'ui'
    export default {
        name: 'Layout',
        props: {},
        data() {
            return {
                homePage: config.homePage,
                account: '',
                test: "LTS底部标识",
                isUniqueOpened: true,
                unread: 100
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
            }
        },
        watch: {
            open: function () {
                consoel.log(this.open)
            }
        },
        mounted() {
//            session.checkLogin();
            this.account = store.getItem('account');
        }
    }
</script>
<style lang="less">
    html, body {
        margin: 0;
        padding: 0;
        height:100%;
    }

    a {
        text-decoration: none;
        color: inherit;
    }



    .content-container {
        background-color: #eeeeee;

        .el-main {
            background-color: white;
        }
    }

    .el-header {
        line-height: 60px;
        height: 60px;
        background-color: white;
        h1 {
            float: left;
            margin: 0;
            width: 120px;
            height: 60px;
            vertical-align: middle;
            img {
                margin: 10px 0 0;
                width: 115px;
                height: 40px;
            }
        }
        .nav {
            float: right;
            height: 100%;
            .notice .el-badge__content.is-fixed {
                top: 15px;
            }
        }
    }
    .is-vertical{
        height:100%;
    }
    .lts-main {
        .el-aside {
            color: #666;
            background-color: white;
            overflow: inherit;
            .el-submenu {
                .el-submenu_title {
                    line-height: 70px;
                    height: 70px;
                }
                .el-menu-item {
                    min-width: 100px;
                }
            }
            .iconfont {
                font-size: 18px;
            }
            .el-icon-arrow-down {
                font-size: 16px;
            }
        }
        .el-footer {
            font-size: 12px;
            line-height: 30px;
            text-align: center;
            background-color: white;
            color: #999;
        }
    }
</style>
