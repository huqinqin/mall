<template>
    <div class="card">
        <el-button type="text" @click="dialogShow = true;editFlag = false;">
            <el-button type="primary">{{$t("main.personal.card.mainPerCarNewCreate")}}</el-button>
        </el-button>

        <el-dialog :title='$t("main.personal.card.mainPerCarTitle")' :visible.sync="dialogShow" :close-on-click-modal="false" @close="emptyData">
            <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="100px"
                     label-position="top"
                     class="demo-ruleForm">
                <el-form-item :label='$t("main.personal.card.mainPerCarDisPic")' required>
                    <div>
                        <el-upload
                            class="avatar-uploader"
                            action="/cgi/upload/file/misc/image"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="ruleForm.cardPicUrl" :src="ruleForm.cardPicUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </el-form-item>
                <br>
                <el-form-item :label='$t("main.personal.card.mainPerCarCompany")' prop="company"
                              style="margin-top: 5px;">
                    <el-input v-model="ruleForm.company" class="commonWidth"></el-input>
                </el-form-item>
                <br>
                <el-form-item :label='$t("main.personal.card.mainPerCarDisProveNum")' prop="number"
                              style="margin-top: 5px;">
                    <el-input v-model="ruleForm.number" class="commonWidth"></el-input>
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
                    <el-select v-model="ruleForm.country" :placeholder='$t("main.personal.card.mainPerCarEnterCoun")' class="commonWidth">
                        <el-option :label='$t("main.personal.card.mainPerCarUsa")'
                                   :value='$t("main.personal.card.mainPerCarUsa")'></el-option>
                    </el-select>
                </el-form-item>
                <br>
                <el-form-item :label='$t("main.personal.card.mainPerCarState")' prop="location" style="margin-top: 5px;">
                    <lts-location v-model="ruleForm.location" :labels.sync="locationLabel" class="commonWidth"/>
                </el-form-item>
                <br>
                <el-form-item :label='$t("main.personal.card.mainPerCarZip")' prop="zipcode" style="margin-top: 5px;">
                    <el-input v-model="ruleForm.zipcode" class="commonWidth"></el-input>
                </el-form-item>
                <br>
                <el-form-item :label='$t("main.personal.card.mainPerCarFromDate")' prop="" style="margin-top: 5px;">
                    <el-date-picker
                        v-model="ruleForm.invalid_time"
                        type="daterange"
                        value-format="timestamp"
                        start-placeholder="start date"
                        end-placeholder="end date"
                        :default-time="['00:00:00', '23:59:59']"
                        class="commonWidth">
                    </el-date-picker>
                </el-form-item>
                <!--<br>
                <el-form-item>
                    <el-checkbox v-model="ruleForm.setDefaultFlag">设为默认</el-checkbox>
                </el-form-item>-->
                <br>
                <el-form-item v-show="!editFlag">
                    <el-button type="primary" @click="addCard" class="submitBtn">
                        {{$t("main.personal.card.mainPerCarSave")}}
                    </el-button>
                </el-form-item>
                <el-form-item v-show="editFlag">
                    <el-button type="primary" @click="updateCard" class="submitBtn">
                        {{$t("main.personal.card.mainPerCarSave")}}
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!--<h3 class="title">{{$t("main.personal.card.mainPerCarTitle")}}</h3>-->
        <h3 class="title">{{$t("main.personal.card.mainPerCarTitle")}}</h3>
        <el-table
            :data="tableData"
            style="width: 100%"
            ref="itemTable">
            <el-table-column
                prop="picture"
                label=""
                align="center"
                width="100">
                <template slot-scope="scope">
                    <img :src="scope.row.picture" alt="" style="width: 40px;height: 40px;">
                </template>
            </el-table-column>
            <el-table-column
                prop="distribute_num"
                :label='$t("main.personal.card.mainPerCarDisProveNum")'
                width="100">
            </el-table-column>
            <el-table-column
                prop="address"
                :label='$t("main.personal.card.mainPerCarAddress")'
                width="150">
            </el-table-column>
            <el-table-column
                prop="city"
                width="80"
                :label='$t("main.personal.card.mainPerCarCity")'>
            </el-table-column>
            <el-table-column
                prop="state"
                :label='$t("main.personal.card.mainPerCarState")'
                width="100">
            </el-table-column>
            <!--<el-table-column
                prop="country"
                :label='$t("main.personal.card.mainPerCarCountry")'
                width="100">
            </el-table-column>-->
            <el-table-column
                prop="postcode"
                :label='$t("main.personal.card.mainPerCarZip")'
                width="100">
            </el-table-column>
            <el-table-column
                prop="invalid_time"
                :label='$t("main.personal.card.mainPerCarFromDate")'
                width="120">
                <template slot-scope="scope">
                    {{scope.row.invalid_time | timestamp2str}}
                </template>
            </el-table-column>
           <!-- <el-table-column
                prop="valid_time"
                :label='$t("main.personal.card.mainPerCarUpDate")'>
                <template slot-scope="scope">
                    {{scope.row.valid_time | timestamp2str}}
                </template>
            </el-table-column>-->
            <el-table-column
                prop="status"
                :label='$t("main.personal.card.mainPerCarDisStatus")'
                width="100"
                align="center">
                <template slot-scope="scope">
                    {{checkStatus(scope.row.status)}}
                </template>
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
                            <el-dropdown-item :command="{type: 'edit',row: scope.row}" v-if="scope.row.status != 2">
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
    import personalService from '@/services/PersonalService'
    import {request, commonUtils} from 'ltsutil'
    import {ltsLocation} from 'ui'

    export default {
        components: {ltsLocation},
        name: "card",
        data() {
            return {
                dialogShow: false,
                editFlag: false,
                ruleForm: {
                    id: '',
                    cardPicUrl: '',
                    number: '',
                    address: '',
                    location: [],
                    company: '',
                    city: '',
                    country: this.$t("main.personal.card.mainPerCarUsa"),
                    state: '',
                    zipcode: '',
                    invalid_time: [],
                    setDefaultFlag: false
                },
                locationLabel: [],
                tableData: [],
                rules: {
                    number: [
                        {required: true, message: this.$t("main.personal.card.mainPerCarEnterSale"), trigger: 'blur'}
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
                    location: [
                        {required: true, message: this.$t("main.personal.card.mainPerCarSeleState"), trigger: 'change'}
                    ],
                    zipcode: [
                        {required: true, message: this.$t("main.personal.card.mainPerCarPutZip"), trigger: 'blur'}
                    ]
                }
            };
        },
        mounted() {
            this.getCardList();
        },
        methods: {
            getCardList() {
                personalService.getSaleCard().then((resp) => {
                    this.tableData = resp.data.distribute_certificate_d_o_list;
                    this.tableData ? this.ruleForm.setDefaultFlag = false : this.ruleForm.setDefaultFlag = true;
                }, (error) => {
                    this.$ltsMessage.show({type: 'error', message: error.error_message});
                });
            },
            addCard() {
                let params = {
                    address: this.ruleForm.address,
                    lc_code: this.ruleForm.location[0],
                    company: this.ruleForm.company,
                    city: this.ruleForm.city,
                    country: this.ruleForm.country,
                    distributeNum: this.ruleForm.number,
                    validTime: this.ruleForm.invalid_time[0],//start
                    invalidTime: this.ruleForm.invalid_time[1],//end
                    picture: this.ruleForm.cardPicUrl,
                    postcode: this.ruleForm.zipcode,
                    remark: "",
                    state: this.locationLabel[0],//州
                    status: 0,//状态
                    type: ''//设为默认，0，有效
                };

                if (this.tableData == '' || this.ruleForm.setDefaultFlag) {
                    params.type = 1;
                } else {
                    params.type = 0;
                }

                personalService.addSaleCard(params).then((resp) => {
                    if (resp.success) {
                        this.dialogShow = false;
                        this.emptyData();
                        this.getCardList();
                    }
                }, (error) => {
                    this.$ltsMessage.show({type: 'error', message: error.error_message});
                });
            },
            updateCard() {
                let params = {
                    id: this.ruleForm.id,
                    address: this.ruleForm.address,
                    lc_code: this.ruleForm.location[0],
                    company: this.ruleForm.company,
                    city: this.ruleForm.city,
                    country: this.ruleForm.country,
                    distributeNum: this.ruleForm.number,
                    validTime: this.ruleForm.invalid_time[0],//start
                    invalidTime: this.ruleForm.invalid_time[1],//end
                    picture: this.ruleForm.cardPicUrl,
                    postcode: this.ruleForm.zipcode,
                    remark: "",
                    state: this.locationLabel[0],//州
                    status: 0,//状态
                    type: this.ruleForm.setDefaultFlag ? 1 : 0//设为默认，0，有效
                };
                personalService.updateSaleCard(params).then((resp) => {
                    if (resp.success) {
                        this.dialogShow = false;
                        this.emptyData();
                        this.getCardList();
                    }
                }, (error) => {
                    this.$ltsMessage.show({type: 'error', message: error.error_message});
                });
            },
            deleteSaleCard(id) {
                let params = {
                    id: id
                };
                personalService.deleteSaleCard(params).then((resp) => {
                    if (resp.success) {
                        this.getCardList();
                    }
                }, (error) => {
                    this.$ltsMessage.show({type: 'error', message: error.error_message});
                });
            },
            makeSure(id) {
                this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteSaleCard(id);
                    this.$message({type: 'success', message: '删除成功!'});
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消删除'});
                });
            },
            checkStatus(item) {
                if (item == '0') {
                    return this.$t("main.personal.card.mainPerCarDisAudited")
                } else if (item == '1') {
                    return this.$t("main.personal.card.mainPerCarDisNotPass")
                } else if (item == '2') {
                    return this.$t("main.personal.card.mainPerCarDisPass")
                }
            },
            getDialog(item) {
                switch (item.type) {
                    case 'edit':
                        this.editFlag = true;
                        this.ruleForm = {
                            id: item.row.id,
                            cardPicUrl: item.row.picture,
                            number: item.row.distribute_num,
                            address: item.row.address,
                            location: [],
                            company: item.row.company,
                            city: item.row.city,
                            country: this.$t("main.personal.card.mainPerCarUsa"),
                            state: item.row.state,
                            zipcode: item.row.postcode,
                            invalid_time: [item.row.valid_time,item.row.invalid_time],
                            setDefaultFlag: false
                        };
                        this.dialogShow = true;
                        break;
                    case 'delete':
                        this.makeSure(item.row.id);
                        break;
                }
            },
            handleAvatarSuccess(res, file) {
                this.ruleForm.cardPicUrl = res.data.url;
            },
            beforeAvatarUpload(file) {

            },
            emptyData() {
                this.$refs.ruleForm.resetFields();
                this.ruleForm.cardPicUrl = '';
                this.ruleForm.invalid_time = [];
                this.ruleForm.location = [];
                this.locationLabel = [];
            }
        }
    }
</script>

<style lang="less" scoped>
    .card {
        .avatar-uploader {
            .avatar {
                width: 100%;
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
        .input-with-select .el-input-group__prepend {
            background-color: #fff;
        }
        .commonWidth{
            width: 400px;
        }
    }
</style>
