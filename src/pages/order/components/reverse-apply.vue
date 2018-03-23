<template>
    <div class="reverse">
        <div class="reversebox">
            <el-form  :model="form" :rules="rules" ref="form" label-position="top" size="small" label-width="110px" class="detail-info">
                <el-form-item :label='$t("main.order.reverse.mainOrReGoods")'>
                    <el-table :data="orderItem.wholesale_item_d_o_list" border style="width: 100%">
                        <el-table-column :label='$t("main.cart.list.mainCartliGoodsInfo")' header-align="left" align="left">
                            <template slot-scope="scope">
                                <div class="order-item-detail">
                                    <img :src="scope.row.image_value + '!item_small'" class="item" />
                                    <div>{{scope.row.item_name}}</div>
                                    <div class="prop-box">
                                        <div v-for="(propObj,index) in scope.row.propValue">
                                            <div v-for="(prop,key) in propObj">
                                                <div>{{key}}:{{prop}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column :label='$t("main.order.reverse.mainOrRePriceAmount")' width="103" header-align="center" align="center">
                            <template slot-scope="scope">
                                <div>{{orderItem.num}}{{scope.row.unit}}</div>
                                <!--<del class="text-secondary" v-if="scope.row.price > scope.row.price_real">-->
                                    <!--<lts-money :money="scope.row.price"></lts-money>-->
                                <!--</del>-->
                                <div>
                                    <lts-money :money="orderItem.price_real"></lts-money>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item :label='$t("main.order.reverse.mainOrReCancleType")'>
                    <el-radio-group v-model="form.refundType" @change="changeRadio">
                        <el-radio label="0">{{$t("main.order.reverse.mainOrReRejectPrice")}}</el-radio>
                        <el-radio label="1">{{$t("main.order.reverse.mainOrReRejectGoods")}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label='$t("main.order.reverse.mainOrReRejectNum")' prop="num" v-if="form.refundType == 1">
                    <el-input-number v-model.number="form.num" @change="changeMoney" size="small" controls-position="right" :min="1" :max="form.maxRefund" />
                </el-form-item>
                <el-form-item :label='$t("main.order.reverse.mainOrReRejectTotalPay")' prop="refund" >
                    <el-input-number v-model="form.refund"  size="small" controls-position="right" :min="0" :max="orderItem.pay_real/100" />
                    <!--<lts-money :money="form.refund"></lts-money>-->
                </el-form-item>
                <el-form-item :label='$t("main.order.reverse.mainOrReRejectReason")' prop="reason">
                    <el-select v-model="form.reason" :placeholder='$t("main.order.reverse.mainOrReEnterReson")'>
                        <el-option
                            v-for="item in reasonList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label='$t("main.order.reverse.mainOrReRejectTalk")' prop="remark">
                    <el-input type="textarea" v-model="form.remark" />
                </el-form-item>
                <el-form-item :label='$t("main.order.reverse.mainOrReUpload")'>
                    <el-upload
                        action="/cgi/upload/file/item/image"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-change="handleUrlChange"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button type="primary" size="small" @click="onSubmitRefund">{{$t("main.order.reverse.mainOrReSubmit")}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    /**
     * 根据订单发起退货退款
     * @author Nation
     * @cdate 2018-01-13
     */
    import {dateUtils} from 'ltsutil'
    import reverseService from '@/services/ReverseService'
    import orderService from '@/services/OrderService'
    export default {
        name: 'reverse-apply',
        data() {
            return {
                show: this.visible,
                tid : '',
                form:{
                    reason: '',
                    num: 0,
                    maxRefund : 0,
                    refundMoney : 0,
                    refund: 0,
                    remark: '',
                    refundType : '1'
                },
                rules: {
                    reason: [
                        {required: true, message: this.$t("main.order.reverse.mainOrReEnterSomeReason"), trigger: 'change'},
                    ],
                    num: [
                        {required: true,message: this.$t("main.order.reverse.mainOrReEnterGoodsNum"), trigger: 'blur'},
                    ],
                    refund: [
                        {required: true, message: this.$t("main.order.reverse.mainOrReEnterMoney"), trigger: 'blur'},
                    ],
                    remark: [
                        {min: 5, max: 500, required: true, message: this.$t("main.order.reverse.mainOrReRemark"), trigger: 'blur'}
                    ],
                },
                reasonList: [
                    {
                        value: 'REFUND_STOCK_OUT',
                        label: this.$t("main.order.reverse.mainOrReBack")
                    },
                    {
                        value: 'REFUND_ERROR_NUM',
                        label: this.$t("main.order.reverse.mainOrReNumNot")
                    },
                    {
                        value: 'REFUND_BAD_PACKING',
                        label: this.$t("main.order.reverse.mainOrRePackDamage")
                    },
                    {
                        value: 'REFUND_BAD_QUALITY',
                        label: this.$t("main.order.reverse.mainOrReQulity")
                    },
                    {
                        value: 'REFUND_BAD_CDATE',
                        label: this.$t("main.order.reverse.mainOrReDateNot")
                    },
                    {
                        value: 'REFUND_ERROR_PROPS',
                        label: this.$t("main.order.reverse.mainOrReFlovarNot")
                    },
                    {
                        value: 'REFUND_CONSULT',
                        label: this.$t("main.order.reverse.mainOrReAgree")
                    },
                    {
                        value: 'REFUND_OTHER',
                        label: this.$t("main.order.reverse.mainOrReOtherReason")
                    }
                ],
                orderItem : [],

                dialogImageUrl: '',
                dialogVisible: false,
                fileList : [],
            }

        },
        methods: {
            onSubmitRefund(){
                this.$refs['form'].validate((valid) => {
                    if(valid){
                        debugger;
                        let imagesUrl = '';
                        this.fileList.forEach(function (value, index, array) {
                            imagesUrl = (imagesUrl == "") ? value.response.data.url : imagesUrl + "," + value.response.data.url;
                        });
                        if(this.form.refundType == 1 && !this.form.num){
                            this.$ltsMessage.show({type:'error',message:this.$t("main.order.reverse.mainOrReEnterGoodsNum")})
                            return false;
                        }
                        reverseService.apply(this.tid, this.form.reason, this.form.num, this.form.refund, this.form.refundType, imagesUrl, this.form.remark).then((resp) => {
                            this.$ltsMessage.show({type: 'success', message: this.$t("main.order.reverse.mainOrReSuccess")});
                            this.$router.back(-1);
                        }, (error) => {
                            this.$ltsMessage.show({type: 'error', message: this.$t("main.order.reverse.mainOrReError") + ":" + error.error_message});
                        });
                    }else{
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            get () {
                orderService.query_by_order_tid(this.tid).then((resp) => {
                    this.form.refundMoney = resp.data.price_real;
                    this.form.maxRefund = resp.data.num;
                    resp.data.wholesale_item_d_o.propValue = JSON.parse(resp.data.wholesale_item_d_o.props);
                    resp.data.wholesale_item_d_o_list = [resp.data.wholesale_item_d_o];
                    this.orderItem = resp.data;
                },(err) => {
                    this.$ltsMessage.show({type:'error',message:err.error_message})
                });
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleUrlChange(file, fileList) {
                this.fileList = fileList;
            },
            handleCheckLength(file) {
                if (this.fileList.length <= 5) {
                    this.$ltsMessage.show({type: 'success', message: this.$t("main.order.reverse.mainOrReUploadPicSucc")});
                    return true;
                } else {
                    this.$ltsMessage.show({type: 'error', message: this.$t("main.order.reverse.mainOrReFive")});
                    return false;
                }
            },
            getRefund(){
                this.form.refund = (this.form.num * this.form.refundMoney/100).toFixed(2);
            },
            changeMoney(){
                this.$nextTick(()=>{
                    this.getRefund();
                })
            },
            changeRadio(){
              if(this.form.refundType == 0){
                  this.form.num = this.form.maxRefund
                  this.getRefund();
              }
            },
        },
        mounted(){
            this.tid = this.$route.params.tid;
            this.get();
        },
        watch: {
            visible() {
                if (this.visible) {
                    this.show = this.visible;
                }
            },
            show() {
                if (!this.show) {
                    this.form.reason = '';
                    this.form.num = 1;
                    this.form.refund = 0;
                    this.form.remark = '';
                    this.$emit('update:visible', this.show);
                }
            },
            orderItem() {
                this.form.refund = this.orderItem.price_real_value * this.form.num
                console.log(this.form.refund);
            }
        }
    }
</script>
<style lang="less">
    .reverse{
        margin: auto;
        .el-form-item__label{
            font-size: 14px;
            color: #737373;
            font-weight: bold;
            line-height: 17px;
            padding: 24px 0 12px 0;
        }
        .el-select{
            width: 100%;
        }
        .el-table th{
            padding: 5px 0;
        }
        .el-upload{
            width: 100px;
            height: 100px;
            line-height: 100px;
        }
        .el-upload-list__item{
            width: 100px;
            height: 100px;
        }
        td{
            padding: 4px 0;
            color: #585858;
            .order-item-detail{
                display: flex;
                align-items: center;
                justify-content: flex-start;
                .item {
                    width: 80px;
                    height: 80px;
                    margin-right: 5px;
                }
                div{
                    width: 250px;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    word-break: normal;
                }
            }
            .prop-box{
                display: inline-block;
                width: 100px;
            }
        }
    }
    .detail-info {
        label {
            color: #99a9bf;
        }
        .el-form-item {
            margin-bottom: 5px;
        }
    }
</style>

