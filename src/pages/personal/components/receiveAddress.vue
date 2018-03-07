<template>
    <div class="receiveAddress">
        <el-button type="text" @click="dialogShow = true;editFlag = false;">
            <el-button type="primary">新增</el-button>
        </el-button>
        <el-dialog title="地址信息" :visible.sync="dialogShow" :close-on-click-modal="false" @close="emptyData">
            <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="100px"
                     label-position="top"
                     class="demo-ruleForm">
                <el-form-item label="name" required style="margin-top: 5px;">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <br>
                <el-form-item :label='$t("main.personal.receiveAdd.mainPerReTeleNum")' prop="telephone"
                              style="margin-top: 5;">
                    <el-input v-model="ruleForm.mobile"></el-input>
                </el-form-item>
                <br>
                <el-form-item :label='$t("main.personal.card.mainPerCarAddress")' prop="address"
                              style="margin-top: 5px;">
                    <el-input type="textarea" resize="none" v-model="ruleForm.address" class="address"></el-input>
                </el-form-item>
                <br>
                <el-form-item :label='$t("main.personal.card.mainPerCarCity")' prop="city" style="margin-top: 5px;">
                    <el-input v-model="ruleForm.city"></el-input>
                </el-form-item>
                <br>
                <el-form-item :label='$t("main.personal.card.mainPerCarCountry")' prop="country"
                              style="margin-top: 5px;">
                    <el-select v-model="ruleForm.country" :placeholder='$t("main.personal.card.mainPerCarEnterCoun")'>
                        <el-option :label='$t("main.personal.card.mainPerCarUsa")'
                                   :value='$t("main.personal.card.mainPerCarUsa")'></el-option>
                    </el-select>
                </el-form-item>
                <br>
                <el-form-item :label='$t("main.personal.card.mainPerCarState")' prop="state" style="margin-top: 5px;">
                    <lts-location-select v-model="ruleForm.location" :labels.sync="locationLabel" style="width: 400px"/>
                </el-form-item>
                <br>
                <el-form-item :label='$t("main.personal.card.mainPerCarZip")' prop="zipcode" style="margin-top: 5px;">
                    <el-input v-model="ruleForm.zipCode"></el-input>
                </el-form-item>
                <br>
                <el-form-item>
                    <el-checkbox v-model="ruleForm.setDefaultFlag">设为默认</el-checkbox>
                </el-form-item>
                <br>
                <el-form-item v-show="!editFlag">
                    <el-button type="primary" @click="addAdress" class="submitBtn">
                        {{$t("main.personal.card.mainPerCarSave")}}
                    </el-button>
                </el-form-item>
                <el-form-item v-show="editFlag">
                    <el-button type="primary" @click="" class="submitBtn">
                        {{$t("main.personal.card.mainPerCarSave")}}
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <h3 class="title">地址信息</h3>
        <el-table
            :data="tableData"
            style="width: 100%"
            ref="itemTable">
            <el-table-column
                prop="user_name"
                label="收货人"
                width="100">
            </el-table-column>
            <el-table-column
                prop="address"
                label="详细地址"
                width="150">
            </el-table-column>
            <el-table-column
                prop="city"
                label="城市"
                width="80">
            </el-table-column>
            <el-table-column
                prop="state"
                label="州"
                width="80">
            </el-table-column>
            <el-table-column
                prop="country"
                label="国家"
                width="80">
            </el-table-column>
            <el-table-column
                prop="zip_code"
                label="邮编"
                width="100">
            </el-table-column>
            <el-table-column
                prop="mobile"
                label="联系电话"
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
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import addressService from '@/services/AddressService'
    import {request, commonUtils} from 'ltsutil'
    import {ltsLocationSelect} from 'ui'

    export default {
        components: {ltsLocationSelect},
        name: "receiveAddress",
        data() {
            return {
                dialogShow: false,
                editFlag: false,
                ruleForm: {
                    name: '',
                    mobile: '',
                    address: '',
                    location: [],
                    city: '',
                    country: this.$t("main.personal.card.mainPerCarUsa"),
                    state: '',
                    zipcode: '',
                    setDefaultFlag: false
                },
                locationLabel: [],
                tableData: [],
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
                    mobile: this.ruleForm.mobile,
                    userName: this.ruleForm.name,
                    address: this.locationLabel + ' ' + this.ruleForm.city + '' + this.ruleForm.address,
                    //building: this.ruleForm.building,
                    //rank: this.ruleForm.rank,
                    status: '',//1设为默认，0有效
                    zip_code: this.ruleForm.zipcode
                };

                if (this.tableData == '' || this.ruleForm.setDefaultFlag) {
                    address.status = 1;
                } else {
                    address.status = 0;
                }

                addressService.addItem(address).then((resp) => {
                    if (resp.success) {
                        this.dialogShow = false;
                        this.emptyData();
                        this.getAddressList();
                    }
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
            emptyData() {
                this.$refs['ruleForm'].resetFields();
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
        }
        .el-form--label-top .el-form-item__label {
            padding: 0;
            line-height: 0;
            margin-bottom: 10px;
        }
        .el-form-item {
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
        .address textarea {
            width: 400px;
            height: 150px;
        }
        .input-with-select .el-input-group__prepend {
            background-color: #fff;
        }
    }
</style>
