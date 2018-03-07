<template>
    <div class="receiveAddress">
        <h3 class="title">{{$t("main.personal.card.mainPerCarNewCreate")}}</h3>
        <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="100px" label-position="top"
                 class="demo-ruleForm">
            <el-form-item :label='$t("main.personal.card.mainPerCarDisPic")' required style="margin-top: 20px;">
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
            <el-form-item :label='$t("main.personal.card.mainPerCarDisProveNum")' prop="number"
                          style="margin-top: 20px;" class="telephone">
                <el-input v-model="ruleForm.number"></el-input>
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
                    <el-option :label='$t("main.personal.card.mainPerCarChina")'
                               :value='$t("main.personal.card.mainPerCarChina")'></el-option>
                    <el-option :label='$t("main.personal.card.mainPerCarUsa")'
                               :value='$t("main.personal.card.mainPerCarUsa")'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label='$t("main.personal.card.mainPerCarState")' prop="state" style="margin-top: 20px;">
                <!--<lts-location v-model="ruleForm.location" :labels.sync="locationLabel" style="width: 400px"/>-->
            </el-form-item>
            <br>
            <el-form-item :label='$t("main.personal.card.mainPerCarZip")' prop="zipcode" style="margin-top: 20px;">
                <el-input v-model="ruleForm.zipcode"></el-input>
            </el-form-item>
            <br>
            <el-form-item :label='$t("main.personal.card.mainPerCarFromDate")' prop="date" style="margin-top: 20px;">
                <el-date-picker
                    v-model="ruleForm.invalid_time"
                    type="daterange"
                    value-format="timestamp"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']"
                    class="common-width">
                </el-date-picker>
            </el-form-item>
            <br>
            <el-form-item>
                <el-button type="primary" @click="addCard" class="submitBtn">
                    {{$t("main.personal.card.mainPerCarSave")}}
                </el-button>
            </el-form-item>
        </el-form>

        <h3 class="title">分销证信息</h3>
        <el-table
            :data="tableData"
            style="width: 100%"
            ref="itemTable">
            <el-table-column
                prop="picture"
                label=""
                align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.picture" alt="" style="width: 40px;height: 40px;">
                </template>
            </el-table-column>
            <el-table-column
                prop="distribute_num"
                label="分销证号"
                width="100">
            </el-table-column>
            <el-table-column
                prop="address"
                label="详细地址"
                width="150">
            </el-table-column>
            <el-table-column
                prop="city"
                width="80"
                label="城市">
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
                prop="postcode"
                label="邮编">
            </el-table-column>
            <el-table-column
                prop="invalid_time"
                label="有效期至">
                <template slot-scope="scope">
                    {{scope.row.invalid_time | timestamp2str}}
                </template>
            </el-table-column>
            <el-table-column
                prop="valid_time"
                label="上传时间">
                <template slot-scope="scope">
                    {{scope.row.valid_time | timestamp2str}}
                </template>
            </el-table-column>
            <el-table-column
                prop="status"
                label="分销证状态"
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
                            操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="{'type': 'edit','params':{'uid': scope.row.uid}}">编辑
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
    import personalService from '@/services/PersonalService'
    import {request, commonUtils} from 'ltsutil'
    import {ltsLocation} from 'ui'

    export default {
        name: "receiveAddress",
        data() {
            return {
                ruleForm: {
                    uid: '',
                    cardPicUrl: '',
                    number: '',
                    address: '',
                    location: [],
                    city: '',
                    country: '',
                    state: '',
                    zipcode: '',
                    date: '',
                    invalid_time: []
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
            this.getUserMessage();
        },
        methods: {
            getUserMessage() {
                personalService.getUserMessage().then((resp) => {
                    this.ruleForm.uid = resp.data.shop_d_o.uid;
                    this.getCardList(this.ruleForm.uid);
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
            },
            getCardList(uid) {
                personalService.getSaleCard(uid).then((resp) => {
                    this.tableData = resp.data.distribute_certificate_d_o_list;
                }, (error) => {
                    this.$ltsMessage.show({type: 'error', message: error.error_message});
                });
            },
            addCard() {
                let params = {
                    address: '',
                    //address: this.locationLabel[0] + ' ' + this.locationLabel[1] + '' + this.form.address,
                    city: this.ruleForm.city,
                    country: this.ruleForm.country,
                    distributeNum: this.ruleForm.number,
                    validTime: this.ruleForm.invalid_time[0],//start
                    invalidTime: this.ruleForm.invalid_time[1],//end
                    picture: this.ruleForm.cardPicUrl,
                    postcode: this.ruleForm.zipcode,
                    remark: "",
                    shopUid: this.ruleForm.uid,
                    state: "",
                    status: 0,
                    type: ''//设为默认，0，有效
                };

                if (this.tableData == '') {
                    params.type = 1;
                } else {
                    params.type = 0;
                }

                personalService.addSaleCard(params).then((resp) => {

                }, (error) => {
                    this.$ltsMessage.show({type: 'error', message: error.error_message});
                });
            },
            updateCard() {
                let params = {
                    id: 2,
                    address: "bianji",
                    city: "dd",
                    company: "bianji",
                    country: "china",
                    distributeNum: "0002",
                    invalidTime: 1519904223000,
                    picture: "http://www.baidu.com",
                    postcode: '00002365',
                    remark: "",
                    shopUid: this.uid,
                    state: "ff",
                    status: 0,
                    validTime: 1522496223000
                };
                installerService.updateSaleCard(params).then((resp) => {

                }, (error) => {
                    this.$ltsMessage.show({type: 'error', message: error.error_message});
                });
            },
            checkStatus(item) {
                if (item == '0') {
                    return '待审核'
                } else if (item == '1') {
                    return '未通过'
                } else if (item == '2') {
                    return '通过'
                }
            },
            getDialog(item) {
                switch (item.type) {
                    case 'edit':
                        break;
                    case 'delete':
                        break;
                }
            },
            handleAvatarSuccess(res, file) {
                this.ruleForm.cardPicUrl = res.data.url;
            },
            beforeAvatarUpload(file) {

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
    }
</style>
