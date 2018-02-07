<template>
    <div class="reverse-detail">
        <div class="reverse-header">
            <p class="title">请等待LTS处理</p>
            <p class="remark">您已经成功发起退款处理，请耐心等待lts处理</p>
        </div>
        <div class="detail-item">
            <div class="info-box">
                <div class="info">
                    <span>订单编号:</span>
                    <span>{{detail.wholesale_order.wholesale_order_items.tid}}</span>
                </div>
                <div class="info">
                    <span>申请时间:</span>
                    <span>{{detail.reverse.start_time | timestamp2str}}</span>
                </div>
                <div class="info">
                    <span>销售员:</span>
                    <span>{{detail.wholesale_order.wholesale_order_items.proxy_uid}}</span>
                </div>
            </div>
            <div class="item-info">
                <el-table :data="detail.wholesale_order.wholesale_order_items" border style="width: 100%">
                    <el-table-column label="商品信息" header-align="left" align="left">
                        <template slot-scope="scope">
                            <div class="order-item-detail">
                                <img :src="scope.row.wholesale_item_d_o.image_value + '@30w_2e'" class="item" />
                                <div>{{scope.row.wholesale_item_d_o.item_name}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="num" label="销售数量" width="80" header-align="center" align="center">
                        <template slot-scope="scope">
                            {{scope.row.num}}{{scope.row.wholesale_item_d_o.unit}}
                        </template>
                    </el-table-column>
                    <el-table-column label="单价" width="120" header-align="center" align="center">
                        <template slot-scope="scope">
                            <del class="text-secondary" v-if="scope.row.price > scope.row.price_real">
                                <lts-money :money="scope.row.price"></lts-money>
                            </del>
                            <div>
                                <lts-money :money="scope.row.price_real"></lts-money>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column label="总价" width="150" header-align="center" align="center">
                        <template slot-scope="scope">
                            <del class="text-secondary" v-if="scope.row.pay > scope.row.pay_real">
                                <lts-money :money="scope.row.pay"></lts-money>
                            </del>
                            <div>
                                <lts-money :money="scope.row.pay_real"></lts-money>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column  label="退货数量" width="200" header-align="center" align="center">
                        <template slot-scope="scope">
                            <div>{{detail.reverse.real_num}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column  label="退货金额" width="200" header-align="center" align="center">
                        <template slot-scope="scope">
                            <div><lts-money :money="detail.reverse.refund_real"></lts-money></div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-card class="box-card base-info">
            <div slot="header" class="clearfix">
                <span>订单信息</span>
            </div>
            <el-form label-position="left" inline class="form-row">
                <el-form-item label="收货信息">
                    <div>{{detail.wholesale_order.user_name}} {{detail.wholesale_order.receiver_mobile}}</div>
                    <div>{{detail.wholesale_order.user_addr}}</div>
                </el-form-item>
                <el-form-item label="支付信息">
                    <div>信用卡支付$700</div>
                    <div>账期支付$700</div>
                </el-form-item>
                <el-form-item label="订单状态">
                    {{detail.reverse.status_title}}
                </el-form-item>
                <el-form-item label="物流信息">
                    {{detail.reverse.express}}{{detail.reverse.express_num}}
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card base-info">
            <div slot="header" class="clearfix">
                <span>退货/退款信息</span>
            </div>
            <el-form label-position="left" inline class="form-row">
                <el-form-item label="退款类型">
                    <div v-if="detail.reverse.hd_status > 0">退货退款</div>
                    <div v-else>仅退款</div>
                </el-form-item>
                <el-form-item label="退款原因">
                    <div>{{detail.reverse.reverse_reason_title}}</div>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card base-info">
            <div slot="header" class="clearfix">
                <span>留言/沟通记录</span>
            </div>
            <div class="remark-box">
                <div class="remark-item" v-for="(value,index) in detail.reverse.remark" :class="[detail.reverse.user_id == value.uid ? 'left' : 'right' ]">
                    <div class="remark" v-if="detail.reverse.user_id == value.uid"><span>工程商:</span>{{value.remark}}</div>
                    <div class="remark" v-else>{{value.remark}}<span>:LTS</span></div>
                    <div class="remark-date">{{value.date}}</div>
                </div>
            </div>
        </el-card>
        <!--<el-card class="box-card base-info">-->
            <!--<div slot="header" class="clearfix">-->
                <!--<span>订单信息</span>-->
            <!--</div>-->
            <!--<el-form label-position="left" inline class="form-row">-->
                <!--<el-form-item label="订单编号">-->
                    <!--{{detail.oid}}-->
                <!--</el-form-item>-->
                <!--<el-form-item label="订单创建时间">-->
                    <!--{{detail.item_remark.order_cdate}}-->
                <!--</el-form-item>-->
                <!--<el-form-item label="付款时间">-->
                    <!--{{detail.item_remark.pay_time}}-->
                <!--</el-form-item>-->
                <!--<el-form-item label="出库时间">-->
                    <!--{{detail.item_remark.out_time}}-->
                <!--</el-form-item>-->
                <!--<el-form-item label="商品名称">-->
                    <!--{{detail.item_remark.item_name}}-->
                <!--</el-form-item>-->
                <!--<el-form-item label="规格">-->
                    <!--{{detail.item_remark.spec}}-->
                <!--</el-form-item>-->
                <!--<el-form-item label="单价">-->
                    <!--<lts-money :money="detail.item_remark.price"></lts-money>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
        <!--</el-card>-->
        <!--<el-card class="box-card base-info">-->
            <!--<div slot="header" class="clearfix">-->
                <!--<span>退款协议信息</span>-->
            <!--</div>-->
            <!--<el-form label-position="left" inline class="form-row">-->
                <!--<el-form-item label="退款工程商">-->
                    <!--{{detail.user_name}}-->
                <!--</el-form-item>-->
                <!--<el-form-item label="退款申请时间">-->
                    <!--{{detail.start_time | timestamp2str}}-->
                <!--</el-form-item>-->
                <!--<el-form-item label="赔付时间" v-if="detail.status == 4 || detail.status == 7">-->
                    <!--{{detail.tobuy_time | timestamp2str}}-->
                <!--</el-form-item>-->
                <!--<el-form-item label="退款完成时间" v-if="detail.status == 7">-->
                    <!--{{detail.end_time | timestamp2str}}-->
                <!--</el-form-item>-->
                <!--<el-form-item label="退款关闭时间" v-if="detail.status == 9">-->
                    <!--{{detail.end_time | timestamp2str}}-->
                <!--</el-form-item>-->
                <!--<el-form-item label="退款原因">-->
                    <!--{{detail.reverse_reason_title}}-->
                <!--</el-form-item>-->
                <!--<el-form-item label="退款类型">-->
                    <!--{{detail.refund_type_title}}-->
                <!--</el-form-item>-->
                <!--<el-form-item label="退款数量">-->
                    <!--<div v-if="detail.reverse_remark.stockout_item">-->
                        <!--缺货:{{detail.reverse_remark.stockout_item.num}}{{detail.reverse_remark.stockout_item.unit}}</div>-->
                    <!--<div v-if="detail.reverse_remark.return_item">-->
                        <!--退货:{{detail.reverse_remark.return_item.num}}{{detail.reverse_remark.return_item.unit}}</div>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="退款金额">-->
                    <!--{{detail.refund_real | money2str}}-->
                <!--</el-form-item>-->
                <!--<el-form-item label="留言记录">-->
                    <!--<div v-for="(remark, index) in detail.remark" :key="index">-->
                        <!--<span v-if="remark.uid == detail.user_id">工程商<i class="el-icon-caret-left" style="color: #909399"></i><el-tag type="info">{{remark.remark}} {{remark.date}}</el-tag></span>-->
                        <!--<span v-if="remark.uid == detail.carrier_uid"><el-tag>{{remark.remark}} {{remark.date}}</el-tag><i class="el-icon-caret-right" style="color: #409EFF"></i>门店</span>-->
                    <!--</div>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="操作记录">-->
                    <!--<div v-for="(remark, index) in detail.deal_remark" :key="index">-->
                        <!--<span v-if="remark.uid == detail.user_id">工程商<i class="el-icon-caret-left" style="color: #909399"></i><el-tag type="info">{{remark.remark}} {{remark.date}}</el-tag></span>-->
                        <!--<span v-if="remark.uid == detail.carrier_uid"><el-tag>{{remark.remark}} {{remark.date}}</el-tag><i class="el-icon-caret-right" style="color: #409EFF"></i>门店</span>-->
                    <!--</div>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
        <!--</el-card>-->
    </div>
</template>
<script>
    import revereService from '@/services/ReverseService'
    export default {
        props: {},
        components: {
        },
        data() {
            return {
                alertType: 'info',
                detail: {
                    id: '',
                    item_remark: {
                        order_cdate : ''
                    },
                    reverse_remark: {

                    },
                    status: 0
                }
            }
        },
        methods: {
            get () {
                revereService.get(this.detail.id).then((resp) => {
                    this.detail = resp.data;
                    if (this.detail.status == 7 || this.detail.status == 9) {
                        this.alertType = 'success';
                    } else if (this.detail.status == 0) {
                        this.alertType = 'warning';
                    }
                }, (err) => {

                });
            }
        },
        mounted(){
            this.detail.id = this.$route.params.id;
            this.get();
        }
    }
</script>
<style lang="less">
    .reverse-detail{
        .reverse-header{
            border-bottom:solid 1px #ddd;
            .title{
                font-size: 20px;
                font-weight: bold;
                color: #ff3b41;
                margin-top: 24px;
            }
            .remark{
                font-size: 14px;
                color: #a3a3a3;
                margin-top: 12px;
                margin-bottom:12px;
            }
        }
        .info-box{
            display: flex;
            justify-content: space-between;
            color: #737373;
            margin: 24px 0 12px 0;
            .info{
                font-size: 14px;
                color: #737373;
                div{
                    line-height: 28px;
                }
            }
        }
        .el-card{
            border-radius: 4px;
            background-color: #fff;
            overflow: hidden;
            color: #303133;
            box-shadow: none;
            border: none;
            margin-top: 12px;
        }
        .el-card__header{
            padding: 9px 20px;
            background-color: #f6f6f6;
            font-size: 14px;
            color: #585858;
            font-weight: bold;
        }
        .detail-item{
            td{
                .order-item-detail{
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    .item {
                        width: 30px;
                        height: 30px;
                    }
                    div{
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
            }
            td:last-child{
                border-right:solid 1px #dddddd;
            }
            td:first-child{
                border-left:solid 1px #dddddd;
            }
        }
        .remark-box{
            border:solid 1px #ddd;
            height: 384px;
            width: 700px;
            overflow-y: scroll;
            .left{
                text-align: left;
            }
            .right{
                text-align: right;
            }
            .remark-item:first-child{
                padding-top: 24px;
            }
            .remark-item{
                padding: 0px  48px 12px;
                .remark{
                    font-size: 14px;
                    color: #a3a3a3;
                    span{
                        color: #737373;
                    }
                }
                .remark-date{
                    font-size: 12px;
                    color: #a3a3a3;
                }
            }
        }
        .form-row {
            font-size: 0;
            color: #a3a3a3;
            label {
                width: 100px;
                font-size: 14px;
            }
            .el-form-item {
                width: 100%;
                color: #666;
                margin-right: 0;
                margin-bottom: 0;
            }
        }
    }

</style>
