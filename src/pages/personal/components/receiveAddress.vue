<template>
    <div class="receiveAddress">
        <h3 class="title">新增收获地址</h3>
        <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="100px" label-position="top"
                 class="demo-ruleForm">
            <el-form-item label="last name" required style="margin-top: 20px;">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="first name" required style="margin-top: 20px;">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="手机号码" prop="telephone" style="margin-top: 20px;" class="telephone">
                <div style="margin-top: 15px;">
                    <el-input placeholder="请输入内容" v-model="telephone" class="input-with-select">
                        <el-select v-model="selectTelephone" slot="prepend" placeholder="请选择">
                            <el-option label="中国" value="中国"></el-option>
                            <el-option label="美国" value="美国"></el-option>
                        </el-select>
                    </el-input>
                </div>
            </el-form-item>
            <br>
            <el-form-item label="电话号码" prop="phone" style="margin-top: 20px;">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="地址" prop="address" style="margin-top: 20px;">
                <el-input type="textarea" resize="none" v-model="ruleForm.address" class="address"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="城市" prop="city" style="margin-top: 20px;">
                <el-input v-model="ruleForm.city"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="国家" prop="country" style="margin-top: 20px;">
                <el-select v-model="country" placeholder="请选择国家">
                    <el-option label="中国" value="中国"></el-option>
                    <el-option label="美国" value="美国"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="州" prop="state" style="margin-top: 20px;">
                <el-select v-model="state" placeholder="请选择州">
                    <el-option label="得克萨斯州" value="得克萨斯州"></el-option>
                    <el-option label="华盛顿州" value="华盛顿州"></el-option>
                    <el-option label="加利福尼亚州" value="加利福尼亚州"></el-option>
                </el-select>
            </el-form-item>
            <br>
            <el-form-item label="邮编" prop="zipcode" style="margin-top: 20px;">
                <el-input v-model="ruleForm.zipcode"></el-input>
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
        name: "receiveAddress",
        data() {
            return {
                ruleForm: {
                    name: '',
                    selectTelephone: '',
                    telephone: '',
                    phone: '',
                    address: '',
                    city: '',
                    country: '',
                    state: '',
                    zipcode: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    telephone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'}
                    ],
                    address: [
                        {required: true, message: '请输入地址', trigger: 'blur'}
                    ],
                    city: [
                        {required: true, message: '请输入城市', trigger: 'blur'}
                    ],
                    country: [
                        {required: true, message: '请选择国家', trigger: 'change'}
                    ],
                    state: [
                        {required: true, message: '请选择州', trigger: 'change'}
                    ],
                    zipcode: [
                        {required: true, message: '请输入邮编', trigger: 'blur'}
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
            }
        }
    }
</script>

<style lang="less">
    .receiveAddress {
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
        .address textarea{
            width: 400px;
            height: 150px;
        }
        .input-with-select .el-input-group__prepend {
            background-color: #fff;
        }
        .telephone .el-input__inner {
            width: 200px;
        }
    }
</style>
