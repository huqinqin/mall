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
                <el-input v-model="ruleForm.email" :disabled="true"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="name" required style="margin-top: 10px;">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <br>
            <el-form-item :label='$t("main.personal.personalMsg.mainPerPerContactPhone")' prop="mobile"
                          style="margin-top: 10px;">
                <el-input v-model="ruleForm.mobile"></el-input>
            </el-form-item>
            <br>
            <el-form-item :label='$t("main.personal.personalMsg.mainPerPerCompany")' prop="companyName"
                          style="margin-top: 10px;">
                <el-input v-model="ruleForm.companyName"></el-input>
            </el-form-item>
            <br>
            <el-form-item :label='$t("main.personal.personalMsg.mainPerPerCompanyMode")' prop="companyPhone"
                          style="margin-top: 10px;">
                <el-input v-model="ruleForm.companyPhone"></el-input>
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

    export default {
        name: "personalMessage",
        data() {
            return {
                ruleForm: {
                    imageUrl: '',
                    email: '',
                    name: '',
                    mobile: '',
                    companyName: '',
                    companyPhone: ''
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
                    mobile: [
                        {
                            required: true,
                            message: this.$t("main.personal.personalMsg.mainPerPerEnterCont"),
                            trigger: 'change'
                        }
                    ]
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
                        name: resp.data.user_d_o.name,
                        mobile: resp.data.user_d_o.mobile,
                        companyName: resp.data.shop_d_o.shop_name,
                        companyPhone: resp.data.shop_d_o.contact_phone
                    };
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
            },
            updateUserMessage() {
                personalService.updateUserMessage(this.ruleForm).then((resp) => {
                    this.$ltsMessage.show({type: 'success', message: 'success'});
                    this.getUserMessage();
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
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

<style lang="less">
    .personalMessage {
        .avatar-uploader {
            .avatar {
                width: 100%;
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
