<template>
    <div class="personalMessage">
        <h3 class="title">{{$t("main.personal.personalMsg.mainPerPerData")}}</h3>
        <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="100px" label-position="top"
                 class="demo-ruleForm">
            <el-form-item label="" prop="headerPic">
                <div>
                    <el-upload
                        class="avatar-uploader"
                        action="/cgi/upload/file/misc/image"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
            </el-form-item>
            <br>
            <el-form-item :label='$t("main.personal.personalMsg.mainPerPerEmail")' prop="email"
                          style="margin-top: 10px;">
                <el-input v-model="ruleForm.email" :disabled="true" style="width: 400px"></el-input>
            </el-form-item>
            <br>
            <el-form-item :label='$t("main.cart.settle.mainCartSeFirstName")' prop="firstName">
                <el-input v-model="ruleForm.firstName" style="width: 400px"/>
            </el-form-item>
            <el-form-item :label='$t("main.cart.settle.mainCartSeLastName")' prop="lastName">
                <el-input v-model="ruleForm.lastName" style="width: 400px"/>
            </el-form-item>
            <br>
            <el-form-item :label='$t("main.personal.personalMsg.mainPerPerContactPhone")' prop="mobile"
                          style="margin-top: 10px;">
                <lts-input-phone v-model="ruleForm.mobile" style="width: 400px"/>
            </el-form-item>
            <br>
            <el-form-item :label='$t("main.personal.personalMsg.mainPerPerCompany")' prop="companyName"
                          style="margin-top: 10px;">
                <el-input v-model="ruleForm.companyName" style="width: 400px"></el-input>
            </el-form-item>
            <br>
            <el-form-item :label='$t("main.personal.personalMsg.mainPerPerCompanyMode")' prop="companyPhone"
                          style="margin-top: 10px;">
                <lts-input-phone v-model="ruleForm.companyPhone" style="width: 400px"/>
            </el-form-item>
            <br>
            <el-form-item>
                <el-button type="primary" @click="updateUserMessage" class="submitBtn">
                    {{$t("main.personal.card.mainPerCarSave")}}
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import personalService from '@/services/PersonalService'
    import {ltsInputPhone} from 'ui'
    import ValidatorConfig from 'config/ValidatorConfig'

    export default {
        name: "personalMessage",
        components: {ltsInputPhone},
        data() {
            return {
                ruleForm: {
                    imageUrl: '',
                    email: '',
                    mobile: '',
                    companyName: '',
                    companyPhone: '',
                    firstName: '',
                    lastName: ''
                },
                rules: {
                    email: [
                        {
                            required: true,
                            message: this.$t("main.personal.personalMsg.mainPerPerEnterEmail"),
                            trigger: 'blur'
                        }
                    ],
                    name: [
                        {
                            required: true,
                            message: this.$t("main.personal.personalMsg.mainPerPerEnterName"),
                            trigger: 'blur'
                        }
                    ],
                    mobile: ValidatorConfig.mobile(false),
                    companyPhone: ValidatorConfig.mobile()
                }
            };
        },
        mounted() {
            this.getUserMessage();
        },
        methods: {
            getUserMessage() {
                personalService.getUserMessage().then((resp) => {
                    this.ruleForm = {
                        imageUrl: resp.data.user_d_o.ext,
                        email: resp.data.user_d_o.email,
                        firstName: resp.data.user_d_o.name.split('-')[0] ? resp.data.user_d_o.name.split('-')[0] : '',
                        lastName: resp.data.user_d_o.name.split('-')[1] ? resp.data.user_d_o.name.split('-')[1] : '',
                        mobile: resp.data.partner_d_o.contact_mobile,
                        companyName: resp.data.shop_d_o.shop_name,
                        companyPhone: resp.data.shop_d_o.contact_phone
                    };
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
            },
            updateUserMessage() {
                if (this.ruleForm.companyPhone == '' || this.ruleForm.companyPhone == '1-') {
                    this.$ltsMessage.show({type: 'error', message: 'Please input company phone'});
                    this.ruleForm.companyPhone = '';
                    return;
                } else if (this.ruleForm.mobile == '' || this.ruleForm.mobile == '1-') {
                    this.ruleForm.mobile = '';
                }
                let params = {
                    imageUrl: this.ruleForm.imageUrl,
                    email: this.ruleForm.email,
                    name: this.ruleForm.firstName + '-' + this.ruleForm.lastName,
                    mobile: this.ruleForm.mobile,
                    companyName: this.ruleForm.companyName,
                    companyPhone: this.ruleForm.companyPhone,
                    firstName: this.ruleForm.firstName,
                    lastName: this.ruleForm.lastName
                };
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        personalService.updateUserMessage(params).then((resp) => {
                            this.$ltsMessage.show({type: 'success', message: 'success'});
                            this.getUserMessage();
                        }, (msg) => {
                            this.$ltsMessage.show({type: 'error', message: msg.error_message})
                        });
                    } else {}
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleAvatarSuccess(res, file) {
                this.ruleForm.imageUrl = res.data.url;
            },
            beforeAvatarUpload(file) {

            }
        }
    }
</script>

<style lang="less" scoped>
    .personalMessage {
        .avatar-uploader {
            .avatar {
                float: left;
                width: 280px;
            }

            .avatar-uploader-icon {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                font-size: 28px;
                color: #8c939d;
                width: 178px;
                height: 178px;
                line-height: 178px;
                text-align: center;
            }
        }
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
        }
        .input-with-select .el-input__inner {
            width: 320px;
        }
    }
</style>
