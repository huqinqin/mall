<template>
    <div class="password">
        <h3 class="title">{{$t("main.personal.password.mainPerPwdsetter")}}</h3>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="left"
                 class="demo-ruleForm">
            <el-form-item :label='$t("main.personal.password.mainPerPwdOldPwd")' prop="oldPassword" style="margin-top: 24px;">
                <el-input v-model="ruleForm.oldPassword" type="password"></el-input>
            </el-form-item>
            <el-form-item :label='$t("main.personal.password.mainPerPwdNewPwd")' prop="newPassword" style="margin-top: 24px;">
                <el-input v-model="ruleForm.newPassword"></el-input>
            </el-form-item>
            <el-form-item :label='$t("main.personal.password.mainPerPwdConfirmPwd")' prop="confirmPassword" style="margin-top: 24px;">
                <el-input v-model="ruleForm.confirmPassword"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="changePassword" class="submitBtn">{{$t("main.personal.card.mainPerCarSave")}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import personalService from '@/services/PersonalService'

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
                        {required: true, message: this.$t("main.personal.password.mainPerPwdEnterOldPwd"), trigger: 'blur'}
                    ],
                    newPassword: [
                        {required: true, message: this.$t("main.personal.password.mainPerPwdEnterNew"), trigger: 'blur'}
                    ],
                    confirmPassword: [
                        {required: true, message: this.$t("main.personal.password.mainPerPwdConfirmNew"), trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            changePassword() {
                let params = {
                    oldPassword: this.ruleForm.oldPassword,
                    newPassword: this.ruleForm.newPassword
                };
                if(this.ruleForm.newPassword == this.ruleForm.confirmPassword){
                    personalService.changePassword(params).then((resp) => {
                        this.$ltsMessage.show({type: 'success', message: 'Revise the password successfully'})
                    }, (msg) => {
                        this.$ltsMessage.show({type: 'error', message: msg.error_message})
                    })
                }else{
                    this.$ltsMessage.show({type: 'error', message: 'Confirm that the password is not consistent with the new password'})
                }
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
        }
    }
</style>
