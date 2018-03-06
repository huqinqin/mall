<template>
    <div class="receiveAddress">
        <h3 class="title">{{$t("main.personal.card.mainPerCarNewCreate")}}</h3>
        <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="100px" label-position="top"
                 class="demo-ruleForm">
            <el-form-item :label='$t("main.personal.card.mainPerCarDisPic")' required style="margin-top: 20px;">
                <div>
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="ruleForm.cardPicUrl" :src="ruleForm.cardPicUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
            </el-form-item>
            <br>
            <el-form-item :label='$t("main.personal.card.mainPerCarDisProveNum")' prop="number" style="margin-top: 20px;" class="telephone">
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
                <el-select v-model="country" :placeholder='$t("main.personal.card.mainPerCarEnterCoun")'>
                    <el-option :label='$t("main.personal.card.mainPerCarChina")' :value='$t("main.personal.card.mainPerCarChina")'></el-option>
                    <el-option :label='$t("main.personal.card.mainPerCarUsa")' :value='$t("main.personal.card.mainPerCarUsa")'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label='$t("main.personal.card.mainPerCarState")' prop="state" style="margin-top: 20px;">
                <el-select v-model="state" :placeholder='$t("main.personal.card.mainPerCarEnterState")'>
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
            <el-form-item :label='$t("main.personal.card.mainPerCarFromDate")' prop="date" style="margin-top: 20px;">
                <el-date-picker
                    v-model="value1"
                    type="date"
                    :placeholder='$t("main.personal.card.mainPerCarSelDate")'>
                </el-date-picker>
            </el-form-item>
            <br>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" class="submitBtn">{{$t("main.personal.card.mainPerCarSave")}}</el-button>
            </el-form-item>
        </el-form>

        <h3>分销证信息</h3>
        <el-table
            :data="tableData"
            style="width: 100%"
            v-loading="loading"
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
            </el-table-column>
            <el-table-column
                prop="valid_time"
                label="上传时间">
            </el-table-column>
            <el-table-column
                prop="status"
                label="分销证状态"
                align="center">
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
    export default {
        name: "receiveAddress",
        data() {
            return {
                ruleForm: {
                    cardPicUrl: '',
                    number: '',
                    address: '',
                    city: '',
                    country: '',
                    state: '',
                    zipcode: '',
                    date: ''
                },
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
        mounted(){

        },
        methods: {
            getCardList() {
                installerService.getSaleCard(this.uid).then((resp) => {
                    this.form = {
                        number: resp.data.shop.user.account,
                        grade: resp.data.shop.level,
                        shop: resp.data.shop.biz_shop.shop_name,
                        projectName: resp.data.shop.user.name,
                        companyName: resp.data.shop.shop_name
                    };
                    this.tableData = resp.data.distribute_certificate_d_o_list;
                }, (error) => {
                    this.$ltsMessage.show({type: 'error', message: error.error_message});
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
    }
</style>
