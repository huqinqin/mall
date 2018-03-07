<template>
    <div class="receiveAddress">
        <h3 class="title">{{$t("main.personal.receiveAdd.mainPerReNewCreate")}}</h3>
        <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="100px" label-position="top"
                 class="demo-ruleForm">
            <el-form-item label="name" required style="margin-top: 20px;">
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
            <el-form-item :label='$t("main.personal.receiveAdd.mainPerReTeleNum")' prop="phone"
                          style="margin-top: 20px;">
                <el-input v-model="ruleForm.mobile"></el-input>
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
            <el-form-item :label='$t("main.personal.card.mainPerCarState")' prop="state" style="margin-top: 20px;">

            </el-form-item>
            <br>
            <el-form-item :label='$t("main.personal.card.mainPerCarZip")' prop="zipcode" style="margin-top: 20px;">
                <el-input v-model="ruleForm.zipCode"></el-input>
            </el-form-item>
            <br>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" class="submitBtn">
                    {{$t("main.personal.card.mainPerCarSave")}}
                </el-button>
            </el-form-item>
        </el-form>

        <h3 class="title">地址信息</h3>
        <el-table
            :data="tableData"
            style="width: 100%"
            ref="itemTable">
            <el-table-column
                prop="user_name"
                label="receiver"
                width="100">
            </el-table-column>
            <el-table-column
                prop="address"
                label="address"
                width="150">
            </el-table-column>
            <el-table-column
                prop="city"
                label="city"
                width="80">
            </el-table-column>
            <el-table-column
                prop="state"
                label="state"
                width="80">
            </el-table-column>
            <el-table-column
                prop="country"
                label="country"
                width="80">
            </el-table-column>
            <el-table-column
                prop="zip_code"
                label="zip code"
                width="100">
            </el-table-column>
            <el-table-column
                prop="mobile"
                label="mobile"
                width="120">
            </el-table-column>
            <el-table-column
                prop=""
                label=""
                width="140">
                <template slot-scope="scope">
                    <el-dropdown @command="getDialog">
                        <el-button class="el-dropdown-link">
                            {{$t("main.order.list.mainOrLiHanlde")}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="{'type': 'edit','params':{'uid': scope.row.uid}}">
                                {{$t("main.order.list.mainOrLiHanlde")}}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <!--<el-dialog
                        :title="dialog.title"
                        :visible.sync="dialog.dialogVisible"
                        :show-close="false"
                        width="400px"
                        center>
                    </el-dialog>-->
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import addressService from '@/services/AddressService'

    export default {
        name: "receiveAddress",
        data() {
            return {
                ruleForm: {
                    name: '',
                    mobile: '',
                    rank: '',
                    phone: '',
                    address: '',
                    city: '',
                    country: '',
                    state: '',
                    zipCode: ''
                },
                tableData: [],
                rules: {
                    name: [
                        {
                            required: true,
                            message: this.$t("main.personal.personalMsg.mainPerPerEnterName"),
                            trigger: 'blur'
                        }
                    ],
                    telephone: [
                        {
                            required: true,
                            message: this.$t("main.personal.receiveAdd.mainPerReEnterPhone"),
                            trigger: 'blur'
                        }
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
        mounted() {
            this.getAddressList();
        },
        methods: {
            getAddressList() {
                addressService.getAddressListByUserId().then((resp) => {
                    this.tableData = resp.datalist;
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
            },
            addAdress() {
                let address = {
                    mobile: ruleForm.mobile,
                    userName: ruleForm.name,
                    address: ruleForm.address + form.building,
                    building: ruleForm.building,
                    status: ruleForm.setDefault ? 1 : 0,//默认1，有效0
                    rank: ruleForm.rank,
                    zip_code: ruleForm.zipCode
                };
                addressService.addItem(address).then((resp) => {
                    this.getAddressList();
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
            },
            getDialog(item) {
                switch (item.type) {
                    case 'edit':
                        break;
                    case 'delete':
                        break;
                }
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
        .address textarea {
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
