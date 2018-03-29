<template>
    <div class="email">
        <h3 class="title">{{$t("main.personal.email.mainPerEmaTitle")}}</h3>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="top"
                 class="demo-ruleForm">
            <div v-show="currentFlag">
                <el-form-item :label='$t("main.personal.email.mainPerEmaCurrent")' prop="currentEmail"
                              style="margin-top: 24px;">
                    <el-input v-model="ruleForm.currentEmail" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item :label='$t("comHeader.headerPwd")' prop="code" style="margin-top: 24px;">
                    <el-input v-model="ruleForm.password" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="changeEmail" class="submitBtn">
                        {{$t("main.personal.email.mainPerEmaChange")}}
                    </el-button>
                </el-form-item>
            </div>
            <div v-show="newFlag">
                <el-form-item :label='$t("main.personal.email.mainPerEmaNew")' prop="currentEmail"
                              style="margin-top: 24px;">
                    <el-input v-model="ruleForm.newEmail"></el-input>
                    <el-button type="primary" @click="sendEmailCode(ruleForm.newEmail)" class="emailButton"
                               v-show="sendEmailCodeFlag">{{$t("main.personal.email.mainPerEmaPostCode")}}
                    </el-button>
                    <el-button type="primary" class="emailButton" v-show="!sendEmailCodeFlag">({{codeTime}}s)</el-button>
                </el-form-item>
                <el-form-item :label='$t("main.personal.email.mainPerEmaCode")' prop="code" style="margin-top: 24px;">
                    <el-input v-model="ruleForm.code"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="checkNewEmail" class="submitBtn">
                        {{$t("main.personal.email.mainPerEmaSave")}}
                    </el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
    import personalService from '@/services/PersonalService'

    export default {
        name: "email",
        data() {
            return {
                currentFlag: true,
                newFlag: false,
                sendEmailCodeFlag: true,
                codeTime: 60,
                ruleForm: {
                    currentEmail: '',
                    code: '',
                    newEmail: '',
                    password: ''
                },
                rules: {
                    /*currentEmail: [
                        {required: true, message: this.$t("main.personal.email.mainPerPwdEnterOldPwd"), trigger: 'blur'}
                    ],*/
                    code: [
                        {required: true, message: this.$t("comHeader.headerInputPwd"), trigger: 'blur'}
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
                        currentEmail: resp.data.user_d_o.email
                    };
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
            },
            setCodeTime() {
                let _this = this;
                let time = setInterval(function () {
                    if (_this.codeTime == 0) {
                        _this.sendEmailCodeFlag = true;
                        _this.codeTime = 60;
                        clearInterval(time);
                    } else {
                        _this.codeTime = _this.codeTime - 1;
                    }
                }, 1000);
            },
            sendEmailCode() {
                if (this.ruleForm.newEmail == '' || this.ruleForm.newEmail == undefined) {
                    this.$ltsMessage.show({type: 'error', message: 'Please input new email'});
                } else {
                    let params = {
                        newEmail: this.ruleForm.newEmail,
                        oldEmail: this.ruleForm.currentEmail
                    };
                    personalService.sendEmailCode(params).then((resp) => {
                        if (resp.success) {
                            this.sendEmailCodeFlag = false;
                            this.setCodeTime();
                            this.ruleForm.code = '';
                            this.$ltsMessage.show({type: 'success', message: 'Send verification code success'})
                        }
                    }, (msg) => {
                        this.$ltsMessage.show({type: 'error', message: msg.error_message})
                    })
                }
            },
            changeEmail() {
                if (this.ruleForm.password == '' || this.ruleForm.password == undefined) {
                    this.$ltsMessage.show({type: 'error', message: this.$t("comHeader.headerInputPwd")});
                } else {
                    let params = {
                        password: this.ruleForm.password,
                        email: this.ruleForm.currentEmail
                    };
                    personalService.changeEmail(params).then((resp) => {
                        if (resp.success) {
                            this.currentFlag = false;
                            this.newFlag = true;
                            this.ruleForm.password = '';
                        }
                    }, (msg) => {
                        this.$ltsMessage.show({type: 'error', message: msg.error_message})
                    })
                }
            },
            checkNewEmail() {
                let params = {
                    code: this.ruleForm.code,
                    newEmail: this.ruleForm.newEmail
                };
                personalService.checkNewEmail(params).then((resp) => {
                    if (resp.success) {
                        this.$ltsMessage.show({type: 'success', message: 'Replace email success'});
                        this.ruleForm.currentEmail = this.ruleForm.newEmail;
                        this.ruleForm.newEmail = '';
                        this.ruleForm.code = '';
                        this.currentFlag = true;
                        this.newFlag = false;
                    }
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
            }
        }
    }
</script>

<style lang="less">
    .email {
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
            padding: 0 20px;
            height: 40px;
        }
        .emailButton {
            position: absolute;
            top: 0;
            left: 430px;
            cursor: pointer;
        }
    }
</style>
