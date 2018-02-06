<template>
    <div class="reverse">
        <div class="reversebox">
            <el-form  :model="form" :rules="rules" ref="form" label-position="top" size="small" label-width="110px" class="detail-info">
                <el-form-item label="商品">
                    <el-table :data="orderItem.wholesale_item_d_o_list" border style="width: 100%">
                        <el-table-column label="商品信息" header-align="left" align="left">
                            <template slot-scope="scope">
                                <div class="order-item-detail">
                                    <img :src="scope.row.image_value + '@30w_2e'" class="item" />
                                    <div>{{scope.row.item_name}}</div>
                                </div>
                                <div class="prop-box">
                                    <div v-for="(propObj,index) in scope.row.propValue">
                                        <div v-for="(prop,key) in propObj">
                                            <i>{{prop}}/</i>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="单价/数量" width="103" header-align="center" align="center">
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
                <el-form-item label="退货类型">
                    <el-radio v-model="form.refundType" label="0">退款</el-radio>
                    <el-radio v-model="form.refundType" label="1">退货退款</el-radio>
                </el-form-item>
                <el-form-item label="退货数量" prop="num">
                    <el-input-number v-model.number="form.num" @change="changeMoney" size="small" controls-position="right" :min="0" :max="form.maxRefund" />
                </el-form-item>
                <el-form-item label="退货总金额" prop="refund" v-if="form.refund">
                    <lts-money :money="form.refund"></lts-money>
                </el-form-item>
                <el-form-item label="退货原因" prop="reason">
                    <el-select v-model="form.reason" placeholder="请选择退款原因">
                        <el-option
                            v-for="item in reasonList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="退货留言" prop="remark">
                    <el-input type="textarea" v-model="form.remark" />
                </el-form-item>
                <el-form-item label="上传凭证" prop="remark">
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
                    <el-button type="primary" size="small" @click="onSubmitRefund">提交</el-button>
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
                    refundType : '0'
                },
                rules: {
                    reason: [
                        {required: true, message: '请选择退货退款原因', trigger: 'change'},
                    ],
                    num: [
                        {required: true, message: '请输入退货退款数量', trigger: 'blur'},
                    ],
                    refund: [
                        {required: true, message: '请输入退款金额', trigger: 'blur'},
                    ],
                    remark: [
                        {min: 5, max: 500, message: '备注长度在 5 到 500 个字符', trigger: 'blur'}
                    ],
                },
                reasonList: [
                    {
                        value: 'REFUND_STOCK_OUT',
                        label: '未收到货 - 要求退'
                    },
                    {
                        value: 'REFUND_ERROR_NUM',
                        label: '已收到货 - 数量不对'
                    },
                    {
                        value: 'REFUND_BAD_PACKING',
                        label: '已收到货 - 包装缺损'
                    },
                    {
                        value: 'REFUND_BAD_QUALITY',
                        label: '已收到货 - 商品质量问题'
                    },
                    {
                        value: 'REFUND_BAD_CDATE',
                        label: '已收到货 - 生产日期不好'
                    },
                    {
                        value: 'REFUND_ERROR_PROPS',
                        label: '已收到货 - 口味/规格不对'
                    },
                    {
                        value: 'REFUND_CONSULT',
                        label: '协商一致退款'
                    },
                    {
                        value: 'REFUND_OTHER',
                        label: '其它原因'
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
                    let imagesUrl = '';
//                    this.fileList.forEach(function (value, index, array) {
//                        imagesUrl = (imagesUrl == "") ? value.response.data.value : imagesUrl + "," + value.response.data.value;
//                    });
                imagesUrl = 'http://res.500mi.com/item/63f7c57364e975f39f3a35e309d89a15.png';
                    reverseService.apply(this.tid, this.form.reason, this.form.num, this.form.refund, this.form.remark,imagesUrl).then((resp)=>{
                        this.$ltsMessage.show({type: 'success', message: "退货退款申请成功"});
                    },(error)=>{
                        this.$ltsMessage.show({type: 'error', message: "退货退款申请失败：" + error.error_message});
                    });
            },
            get () {
                orderService.query_by_order_tid(this.tid).then((resp) => {
                    this.form.refundMoney = resp.data.price_real;
                    this.form.maxRefund = resp.data.num;
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
                    this.$ltsMessage.show({type: 'success', message: '上传图片成功'});
                    return true;
                } else {
                    this.$ltsMessage.show({type: 'error', message: '您只能上传五张图片'});
                    return false;
                }
            },
            getRefund(){
                this.form.refund = this.form.num * this.form.refundMoney;
            },
            changeMoney(){
                this.$nextTick(()=>{
                    this.getRefund();
                })
            },
        },
        mounted(){
            this.tid = this.$route.params.tid;
            console.log(this.orderItem);
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
                this.form.refund = this.orderItem.price_real_value * this.form.num;
            }
        }
    }
</script>
<style lang="less">
    .reverse{
        width: 587px;
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
                    word-break: break-all;
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

