<template>
    <div class="receiveAddress">
        <el-button type="text" @click="dialogShow = true;editFlag = false;">
            <el-button type="primary">{{$t("main.personal.receiveAdd.mainPerReNewCreate")}}</el-button>
        </el-button>
        <el-dialog :title='$t("main.personal.receiveAdd.mainPerReAddInfo")' :visible.sync="dialogShow"
                   :close-on-click-modal="false" @close="emptyData">
            <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="100px"
                     label-position="top"
                     prop="ruleForm"
                     class="demo-ruleForm">
                <el-form-item :label='$t("main.cart.settle.mainCartSeFirstName")' prop="first">
                    <el-input v-model="ruleForm.first" style="width: 400px"/>
                </el-form-item>
                <br>
                <el-form-item :label='$t("main.cart.settle.mainCartSeLastName")' prop="last">
                    <el-input v-model="ruleForm.last" style="width: 400px"/>
                </el-form-item>
                <br>
                <el-form-item :label='$t("main.personal.receiveAdd.mainPerReTeleNum")' prop="mobile"
                              style="margin-top: 5px;">
                    <lts-input-phone v-model="ruleForm.mobile" class="commonWidth"/>
                </el-form-item>
                <br>
                <el-form-item :label='$t("main.personal.card.mainPerCarAddress")' prop="address"
                              style="margin-top: 5px;">
                    <el-input v-model="ruleForm.address" class="commonWidth"></el-input>
                </el-form-item>
                <br>
                <el-form-item :label='$t("main.personal.card.mainPerCarCity")' prop="city" style="margin-top: 5px;">
                    <el-input v-model="ruleForm.city" class="commonWidth"></el-input>
                </el-form-item>
                <br>
                <el-form-item :label='$t("main.personal.card.mainPerCarCountry")' prop="country"
                              style="margin-top: 5px;">
                    <el-select v-model="ruleForm.country" :placeholder='$t("main.personal.card.mainPerCarEnterCoun")'
                               class="commonWidth">
                        <el-option :label='$t("main.personal.card.mainPerCarUsa")'
                                   :value='$t("main.personal.card.mainPerCarUsa")'></el-option>
                    </el-select>
                </el-form-item>
                <br>
                <el-form-item :label='$t("main.personal.card.mainPerCarState")' prop="location"
                              style="margin-top: 5px;">
                    <lts-location v-model="ruleForm.location" :labels.sync="locationLabel" class="commonWidth"/>
                </el-form-item>
                <br>
                <el-form-item :label='$t("main.personal.card.mainPerCarZip")' prop="zipCode" style="margin-top: 5px;">
                    <el-input v-model="ruleForm.zipCode" class="commonWidth"></el-input>
                </el-form-item>
                <br>
                <el-form-item>
                    <el-checkbox v-model="ruleForm.setDefaultFlag">{{$t("main.cart.settle.mainCartSeFitDefaultAddr")}}
                    </el-checkbox>
                </el-form-item>
                <br>
                <el-form-item v-show="!editFlag">
                    <el-button type="primary" @click="addAdress" class="submitBtn">
                        {{$t("main.personal.card.mainPerCarSave")}}
                    </el-button>
                </el-form-item>
                <el-form-item v-show="editFlag">
                    <el-button type="primary" @click="updateAdress" class="submitBtn">
                        {{$t("main.personal.card.mainPerCarSave")}}
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <h3 class="title">{{$t("main.personal.receiveAdd.mainPerReAddInfo")}}</h3>
        <el-table
            :data="tableData"
            style="width: 100%"
            ref="itemTable">
            <el-table-column
                prop="user_name"
                :label='$t("main.personal.receiveAdd.mainPerReConsigee")'
                width="100">
            </el-table-column>
            <el-table-column
                prop="street"
                :label='$t("main.personal.card.mainPerCarAddress")'
                width="200">
                <!--<template slot-scope="scope">-->
                    <!--{{scope.row.street}}-->
                <!--</template>-->
            </el-table-column>
            <el-table-column
                prop="city"
                :label='$t("main.personal.card.mainPerCarCity")'
                width="80">
                <!--<template slot-scope="scope">-->
                    <!--{{scope.row.building.split('-')[0]}}-->
                <!--</template>-->
            </el-table-column>
            <el-table-column
                prop="location_d_o.province"
                :label='$t("main.personal.card.mainPerCarState")'
                width="80">
            </el-table-column>
            <!--<el-table-column
                prop="country"
                :label='$t("main.personal.card.mainPerCarCountry")'
                width="80">
            </el-table-column>-->
            <el-table-column
                prop="zip_code"
                :label='$t("main.personal.card.mainPerCarZip")'
                width="100">
            </el-table-column>
            <el-table-column
                prop="mobile"
                :label='$t("main.cart.settle.mainCartSeContactPhone")'
                width="140">
            </el-table-column>
            <el-table-column
                prop=""
                label=""
                width="150">
                <template slot-scope="scope">
                    <el-dropdown @command="getDialog">
                        <el-button type="primary">
                            {{$t("main.order.list.mainOrLiHanlde")}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="{type: 'edit',row: scope.row}">
                                {{$t("main.cart.settle.mainCartSeAlert")}}
                            </el-dropdown-item>
                            <el-dropdown-item :command="{type: 'delete',row: scope.row}">
                                {{$t("main.cart.settle.mainCartSeDel")}}
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
    import {ltsLocation, ltsInputPhone} from 'ui'
    import ValidatorConfig from 'config/ValidatorConfig'

    export default {
        components: {ltsLocation, ltsInputPhone},
        name: "receiveAddress",
        data() {
            return {
                dialogShow: false,
                editFlag: false,
                ruleForm: {
                    id: '',
                    name: '',
                    first: '',
                    last: '',
                    mobile: '',
                    address: '',
                    building: '',
                    location: [],
                    city: '',
                    country: this.$t("main.personal.card.mainPerCarUsa"),
                    state: '',
                    zipCode: '',
                    setDefaultFlag: false
                },
                locationLabel: [],
                tableData: [],
                rules: {
                    first: [
                        {
                            required: true,
                            message: this.$t("main.personal.personalMsg.mainPerPerEnterName"),
                            trigger: 'blur'
                        }
                    ],
                    last: [
                        {
                            required: true,
                            message: this.$t("main.personal.personalMsg.mainPerPerEnterName"),
                            trigger: 'blur'
                        }
                    ],
                    mobile: [
                        {
                            required: true,
                            message: this.$t("validate.valiEnterNum"),
                            trigger: 'blur'
                        }
                    ],
                    //mobile: ValidatorConfig.mobile(true),
                    address: [
                        {required: true, message: this.$t("main.personal.card.mainPerCarEnterAddr"), trigger: 'blur'}
                    ],
                    city: [
                        {required: true, message: this.$t("main.personal.card.mainPerCarEnterCity"), trigger: 'blur'}
                    ],
                    country: [
                        {required: true, message: this.$t("main.personal.card.mainPerCarSeleCount"), trigger: 'change'}
                    ],
                    location: [
                        {required: true, message: this.$t("main.personal.card.mainPerCarSeleState"), trigger: 'blur'}
                    ],
                    zipCode: [
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
                    address: this.locationLabel[0],
                    street: this.ruleForm.address,
                    building: this.ruleForm.building,
                    rank: this.ruleForm.rank,
                    city: this.ruleForm.city,
                    country: this.ruleForm.country,
                    first: this.ruleForm.first,
                    last: this.ruleForm.last,
                    //state: this.locationLabel[0],
                    setDefault: this.ruleForm.setDefaultFlag,
                    status: this.ruleForm.setDefaultFlag ? 1 : 0,//1设为默认，0有效
                    zipCode: this.ruleForm.zipCode,
                    lcCode: this.ruleForm.location[0],
                };

                if (this.tableData == '') {
                    this.ruleForm.setDefaultFlag = true;
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
            updateAdress() {
                let address = {
                    id: this.ruleForm.id,
                    mobile: this.ruleForm.mobile,
                    address: this.locationLabel[0],
                    street: this.ruleForm.address,
                    building: this.ruleForm.building,
                    rank: this.ruleForm.rank,
                    city: this.ruleForm.city,
                    country: this.ruleForm.country,
                    first: this.ruleForm.first,
                    last: this.ruleForm.last,
                    //state: this.locationLabel[0],
                    setDefault: this.ruleForm.setDefaultFlag,
                    status: this.ruleForm.setDefaultFlag ? 1 : 0,//1设为默认，0有效
                    zipCode: this.ruleForm.zipCode,
                    lcCode: this.ruleForm.location[0],
                };

                addressService.updateItem(address).then((resp) => {
                    if (resp.success) {
                        this.dialogShow = false;
                        this.emptyData();
                        this.getAddressList();
                    }
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
            },
            deleteAdress(id) {
                let params = {
                    id: id
                };
                addressService.deleteItem(params).then((resp) => {
                    if (resp.success) {
                        this.getAddressList();
                    }
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
            },
            makeSure(id) {
                this.$confirm(this.$t("main.personal.card.mainPerCarDeleteSure"), this.$t("main.order.list.mainOrLiIsDelTip"), {
                    confirmButtonText: this.$t("main.order.list.mainOrLiConfirm"),
                    cancelButtonText: this.$t("main.order.list.mainOrLiCanle"),
                    type: 'warning'
                }).then(() => {
                    this.deleteAdress(id);
                    this.$message({type: 'success', message: this.$t("main.order.list.mainOrLiDeleteSucc")});
                }).catch(() => {
                    this.$message({type: 'info', message: 'cancel'});
                });
            },
            getDialog(item) {
                switch (item.type) {
                    case 'edit':
                        this.ruleForm = {
                            id: item.row.id,
                            first: item.row.user_name.split('-')[0],
                            last: item.row.user_name.split('-')[1],
                            mobile: item.row.mobile,
                            address: item.row.street,
                            location: [item.row.lc_code],
                            state:item.row.state,
                            city: item.row.city,
                            zipCode: item.row.zip_code,
                            setDefaultFlag: item.row.status == 1 ? true : false,
                            country: this.$t("main.personal.card.mainPerCarUsa"),
                        };
                        this.editFlag = true;
                        this.dialogShow = true;
                        break;
                    case 'delete':
                        this.makeSure(item.row.id);
                        break;
                }
            },
            emptyData() {
                this.ruleForm = {
                    id: '',
                    name: '',
                    first: '',
                    last: '',
                    mobile: '',
                    address: '',
                    building: '',
                    location: [],
                    city: '',
                    country: this.$t("main.personal.card.mainPerCarUsa"),
                    state: '',
                    zipCode: '',
                    setDefaultFlag: false
                };
            }
        }
    }
</script>

<style lang="less">
    .location-Popover {
        width: 400px;
        height: 200px;
    }

    html .location-Popover .el-cascader-menu {
        width: 100%;
        height: 100%;
    }

    .receiveAddress {
        margin-left: 60px;
        .el-table .cell{
            padding-left: 0;
        }
        .title {
            font-weight: bold;
            font-size: 16px;
            color: #777;
        }
        .el-form--label-top .el-form-item__label {
            padding: 0;
            line-height: 0;
            margin: 18px 0 10px 0;
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
        .input-with-select .el-input-group__prepend {
            background-color: #fff;
        }
        .commonWidth {
            width: 400px;
        }
        .input-with-select .el-input__inner {
            width: 100%;
        }
        .inputPhone .el-select .el-input__inner{
            width: 80px;
        }
        .inputPhone .input-with-select .el-input__inner{
            width: 320px;
        }
    }
</style>
