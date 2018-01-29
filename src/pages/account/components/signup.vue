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
                    <el-input v-model="signupForm.companyName"></el-input>
                </el-form-item>
                <el-form-item label="FISRT NAME" prop="fisrtName">
                    <el-input v-model="signupForm.fisrtName"></el-input>
                </el-form-item>
                <el-form-item label="LAST NAME" prop="lastName">
                    <el-input v-model="signupForm.lastName"></el-input>
                </el-form-item>
                <el-form-item label="EMAIL" prop="email">
                    <el-input v-model="signupForm.email"></el-input>
                </el-form-item>
                <el-form-item label="VERIFICATION CODE" prop="code" width="260" class="inline">
                    <el-input v-model="signupForm.code"></el-input><el-button>SEND</el-button>
                </el-form-item>
                <el-form-item label="PHONE NUMBER" prop="phone">
                    <el-input v-model="signupForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="PASSWORD" prop="pass">
                    <el-input v-model="signupForm.pass"></el-input>
                </el-form-item>
                <el-form-item label="CONFIRM PASSWORD" prop="checkPass">
                    <el-input v-model="signupForm.checkPass"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="signupForm.agree">AGREE《LTS USER AGREEMENT》</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submitFrom">CREATE AN ACCOUNT</el-button>
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
                },
                rules:{
                    fisrtName: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                    ],
                    lastName: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                    ],
                    pass: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                    ],
                    checkPass: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                    ],
                    code: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                    ],
                }
            }
        },
        methods: {
            submitFrom(){
                console.log(this.signupForm)
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
            button{
                font-weight: bold;
            }
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
                    .el-form-item__error{
                        top:30px;
                    }
                }
                .el-form-item.inline{
                    .el-form-item__content{
                        display: flex;
                        justify-content: space-between;
                        .el-input{
                            width:260px;
                        }
                        .el-button{
                            width:116px;
                            height: 30px;
                            background: #3b98ff;
                            color:white;
                        }
                    }
                }
            }
        }
    }

</style>
