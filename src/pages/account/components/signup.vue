<template>
    <div class="signup">
        <header>
            <div class="line"></div>
            <div class="title">REGISTER AN ACCOUNT</div>
            <div class="line"></div>
        </header>
        <main>
            <el-form label-position="top">
                <el-form-item label="COMPANY NAME">
                    <el-input v-model="signupForm.companyName"></el-input>
                </el-form-item>
            </el-form>
            <el-form :inline="true" label-position="top">
                <el-form-item label="FISRT NAME">
                    <el-input v-model="signupForm.fisrtName"></el-input>
                </el-form-item>
                <el-form-item label="LAST NAME">
                    <el-input v-model="signupForm.lastName"></el-input>
                </el-form-item>
            </el-form>
            <el-form label-position="top">
                <el-form-item label="EMAIL">
                    <el-input v-model="signupForm.email"></el-input>
                </el-form-item>
            </el-form>
            <el-form :inline="true" label-position="top">
                <el-form-item label="CODE">
                    <el-input v-model="signupForm.code"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-button>SEND</el-button>
                </el-form-item>
            </el-form>
            <el-form label-position="top">
                <el-form-item label="PHONE NUMBER">
                    <el-input v-model="signupForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="PASSWORD">
                    <el-input v-model="signupForm.pass"></el-input>
                </el-form-item>
                <el-form-item label="CONFIRM PASSWORD">
                    <el-input v-model="signupForm.checkPass"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="signupForm.agree">AGREE《LTS USER AGREEMENT》</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button>CREATE AN ACCOUNT</el-button>
                </el-form-item>
            </el-form>
        </main>
    </div>
</template>

<script>
    export default {
        name: "signup",
        data(){
            return{
                signupForm:{
                    companyName:'',
                    fisrtName:'',
                    lastName:'',
                    email:'',
                    code:'',
                    phone:'',
                    pass:'',
                    checkPass:'',
                    time: 12
                }
            }
        }
    }
</script>

<style lang="less">
    .signup{
        header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title{
                padding:0 45px;
                font-weight: bold;
                font-size: 18px;
                line-height: 22px;
            }
            .line{
                height: 2px;
                width:auto;
                background: #f3bc39;
                flex:1;
                border-right: 2px;
            }
        }
        main{
            width:400px;
            margin:40px auto;
            font-size: 14px;
            .el-form{
                label{
                    line-height: 26px;
                    padding: 0;
                }
                .el-input{
                    margin-bottom: 18px;
                    input{
                        height:30px;
                    }
                }
                .el-form-item__content{
                    line-height: 30px;
                }
            }
            .el-form--inline{
                display: flex;
                justify-content: space-between;
            }
        }
    }

</style>
