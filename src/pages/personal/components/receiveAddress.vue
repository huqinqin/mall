<template>
    <div class="receiveAddress">
        <h3 class="title">{{$t("main.personal.receiveAdd.mainPerReNewCreate")}}</h3>
        <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="100px" label-position="top"
                 class="demo-ruleForm">
            <el-form-item label="last name" required style="margin-top: 20px;">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="first name" required style="margin-top: 20px;">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <br>
            <el-form-item :label='$t("main.personal.receiveAdd.mainPerRePhone")' prop="telephone" style="margin-top: 20px;" class="telephone">
                <div style="margin-top: 15px;">
                    <el-input :placeholder='$t("main.personal.receiveAdd.mainPerReEnterCont")' v-model="telephone" class="input-with-select">
                        <el-select v-model="ruleForm.selectTelephone" slot="prepend" :placeholder='$t("main.accountNew.register.mainAcReSelect")'>
                            <el-option :label='$t("main.personal.card.mainPerCarChina")' :value='$t("main.personal.card.mainPerCarChina")'></el-option>
                            <el-option :label='$t("main.personal.card.mainPerCarUsa")' :value='$t("main.personal.card.mainPerCarUsa")'></el-option>
                        </el-select>
                    </el-input>
                </div>
            </el-form-item>
            <br>
            <el-form-item :label='$t("main.personal.receiveAdd.mainPerReTeleNum")' prop="phone" style="margin-top: 20px;">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <br>
            <el-form-item :label='$t("main.personal.card.mainPerCarAddress")' prop="address" style="margin-top: 20px;">
                <el-input type="textarea" resize="none" v-model="ruleForm.address" class="address"></el-input>
            </el-form-item>
            <br>
            <el-form-item :label='$t("main.personal.card.mainPerCarCity")' prop="city" style="margin-top: 20px;">
                <el-input v-model="ruleForm.city"></el-input>
            </el-form-item>
            <br>
            <el-form-item :label='$t("main.personal.card.mainPerCarCountry")' prop="country" style="margin-top: 20px;">
                <el-select v-model="ruleForm.country" :placeholder='$t("main.personal.card.mainPerCarEnterCoun")'>
                    <el-option :label='$t("main.personal.card.mainPerCarChina")' :value='$t("main.personal.card.mainPerCarChina")'></el-option>
                    <el-option :label='$t("main.personal.card.mainPerCarUsa")' :value='$t("main.personal.card.mainPerCarUsa")'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label='$t("main.personal.card.mainPerCarState")' prop="state" style="margin-top: 20px;">
                <el-select v-model="ruleForm.state" :placeholder='$t("main.personal.card.mainPerCarEnterState")'>
                    <el-option :label='$t("main.personal.card.mainPerCarDeco")' :value='$t("main.personal.card.mainPerCarDeco")'></el-option>
                    <el-option :label='$t("main.personal.card.mainPerCarWashington")' :value='$t("main.personal.card.mainPerCarWashington")'></el-option>
                    <el-option :label='$t("main.personal.card.mainPerCarCali")' :value='$t("main.personal.card.mainPerCarCali")'></el-option>
                </el-select>
            </el-form-item>
            <br>
            <el-form-item :label='$t("main.personal.card.mainPerCarZip")' prop="zipcode" style="margin-top: 20px;">
                <el-input v-model="ruleForm.zipcode"></el-input>
            </el-form-item>
            <br>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" class="submitBtn">{{$t("main.personal.card.mainPerCarSave")}}</el-button>
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
                        {required: true, message: this.$t("main.personal.personalMsg.mainPerPerEnterName"), trigger: 'blur'}
                    ],
                    telephone: [
                        {required: true, message: this.$t("main.personal.receiveAdd.mainPerReEnterPhone"), trigger: 'blur'}
                    ],
                    address: [
                        {required: true, message: this.$t("main.personal.card.mainPerCarEnterAddr"), trigger: 'blur'}
                    ],
                    city: [
                        {required: true, message: this.$t("main.personal.card.mainPerCarEnterCity"), trigger: 'blur'}
                    ],
                    country: [
                        {required: true, message: this.$t("main.personal.card.mainPerCarSeleCount"), trigger: 'change'}
                    ],
                    state: [
                        {required: true, message: this.$t("main.personal.card.mainPerCarSeleState"), trigger: 'change'}
                    ],
                    zipcode: [
                        {required: true, message: this.$t("main.personal.card.mainPerCarPutZip"), trigger: 'blur'}
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
