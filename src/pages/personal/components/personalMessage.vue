<template>
    <div class="personalMessage">
        <h3 class="title">个人资料</h3>
        <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="100px" label-position="top"
                 class="demo-ruleForm" >
            <el-form-item label="" prop="headerPic">
                <div>
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
            </el-form-item>
            <br>
            <el-form-item label="邮箱" prop="email" style="margin-top: 17px;">
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="性别" prop="sex" style="margin-top: 20px;">
                <el-radio-group v-model="ruleForm.sex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>
            <br>
            <el-form-item label="last name" required style="margin-top: 17px;">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="first name" required style="margin-top: 17px;">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="联系手机" prop="phone" style="margin-top: 20px;">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="公司名" prop="companyName" style="margin-top: 20px;">
                <el-input v-model="ruleForm.companyName"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="公司联系方式" prop="companyPhone" style="margin-top: 20px;">
                <el-input v-model="ruleForm.companyPhone"></el-input>
            </el-form-item>
            <br>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" class="submitBtn">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "personalMessage",
        data() {
            return {
                ruleForm: {
                    imageUrl: '',
                    email: '',
                    sex: '',
                    name: '',
                    phone: '',
                    companyName: '',
                    companyPhone: ''
                },
                rules: {
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'}
                    ],
                    sex: [
                        {required: true, message: '请选择性别', trigger: 'change'}
                    ],
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '请输入联系电话', trigger: 'change'}
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
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style lang="less">
    .personalMessage {
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
        .submitBtn{
            width: 100px;
            height: 40px;
            margin-top: 36px;
        }
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
