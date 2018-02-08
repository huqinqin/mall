<template>
    <div class="password">
        <h3 class="title">密码设置</h3>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="left"
                 class="demo-ruleForm">
            <el-form-item label="" prop="headerPic">
                <div>
                    <img src="" alt="">
                </div>
            </el-form-item>
            <el-form-item label="旧密码" prop="oldPassword" style="margin-top: 24px;">
                <el-input v-model="ruleForm.oldPassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword" style="margin-top: 24px;">
                <el-input v-model="ruleForm.newPassword"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword" style="margin-top: 24px;">
                <el-input v-model="ruleForm.confirmPassword"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" class="submitBtn">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "password",
        data() {
            return {
                ruleForm: {
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                },
                rules: {
                    oldPassword: [
                        {required: true, message: '请输入旧密码', trigger: 'blur'}
                    ],
                    newPassword: [
                        {required: true, message: '请输入新密码', trigger: 'blur'}
                    ],
                    confirmPassword: [
                        {required: true, message: '请确认新密码', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style lang="less">
    .password {
        margin-left: 60px;
        .title {
            font-weight: bold;
            font-size: 16px;
            color: #777;
            margin-bottom: 36px;
        }
        .el-form--label-top .el-form-item__label {
            padding: 0;
            line-height: 0;
            margin-bottom: 10px;
        }
        .el-radio__input {
            margin-right: 10px;
        }
        .el-input__inner {
            width: 400px;
            height: 40px;
        }
        .submitBtn {
            width: 100px;
            height: 40px;
            margin-top: 36px;
        }
    }
</style>
