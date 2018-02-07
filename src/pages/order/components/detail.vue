<template>
    <div class="orderDetail">
        <el-alert
            :title="'订单状态   '+order.tid+'   22小时自动确认收货'"
            :closable="false"
            type="info">
        </el-alert>
        <el-card class="box-card base-info">
            <div slot="header" class="clearfix">
                <span>订单信息</span>
            </div>
            <el-form label-position="left" inline class="form-row">
                <el-form-item label="买家信息">
                    {{order.user_name}} {{order.receiver_mobile}}
                </el-form-item>
                <el-form-item label="收货地址">
                    {{order.user_addr}}
                </el-form-item>
                <el-form-item label="买家留言">
                    {{order.user_addr}}
                </el-form-item>
                <el-form-item label="订单编号">
                    {{order.tid}}
                </el-form-item>
                <el-form-item label="创建时间">
                    {{order.cdate | timestamp2str}}
                </el-form-item>
                <el-form-item label="付款时间">
                    {{order.cdate | timestamp2str}}
                </el-form-item>
                <el-form-item label="支付信息">
                    <div>信用卡支付$700</div>
                    <div>账期支付$700</div>
                </el-form-item>
                <el-form-item label="支付状态">
                    {{order.pay_status_title}}
                </el-form-item>
            </el-form>
        </el-card>
        <div class="detail-item" v-for="(shop,index) in order.sell_order_list">
            <div class="info-box">
                <div class="info">
                    <span>包裹:</span>
                    <span>{{shop.shop.shop_name}}</span>
                </div>
                <div class="info">
                    <span>物流信息:</span>
                    <span>{{order.user_name}}</span>
                </div>
                <div class="info">
                    <span>发货时间:</span>
                    <span>无</span>
                </div>
                <div class="info">
                    <span>收货时间:</span>
                    <span>无</span>
                </div>
            </div>
            <div class="item-info">
                <el-table :data="shop.wholesale_order_items" style="width: 100%">
                    <el-table-column label="商品信息" header-align="left" align="left">
                        <template slot-scope="scope">
                            <div class="order-item-detail">
                                <img :src="scope.row.wholesale_item_d_o.image_value + '@30w_2e'" class="item" />
                                <div>{{scope.row.wholesale_item_d_o.item_name}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="单价" width="100" header-align="left" align="left">
                        <template slot-scope="scope">
                            <del class="text-secondary" v-if="scope.row.price > scope.row.price_real">
                                <lts-money :money="scope.row.price"></lts-money>
                            </del>
                            <div>
                                <lts-money :money="scope.row.price_real"></lts-money>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="num" label="数量" width="200" header-align="left" align="left">
                        <template slot-scope="scope">
                            {{scope.row.num}}{{scope.row.wholesale_item_d_o.unit}}
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" width="150" header-align="left" align="left">
                        <template slot-scope="scope">
                            <del class="text-secondary" v-if="scope.row.pay > scope.row.pay_real">
                                <lts-money :money="scope.row.pay"></lts-money>
                            </del>
                            <div>
                                <lts-money :money="scope.row.pay_real"></lts-money>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="info-bottom">
            <div class="text">
                <label>应付金额</label>
                <span><lts-money :money="order.pay"></lts-money></span>
            </div>
            <div class="text">
                <label>活动优惠</label> <span><lts-money :money="order.fee_hd_all"></lts-money></span>
            </div>
            <div class="text">
                <label>+运费</label> <span><lts-money :money="order.fee_hd_all"></lts-money></span>
            </div>
            <div class="text">
                <label>+税费</label> <span><lts-money :money="order.fee_hd_all"></lts-money></span>
            </div>
            <div class="text">
                <label>应付总额</label><span class="large"><lts-money :money="order.fee_total"></lts-money></span>
            </div>
        </div>
    </div>
</template>
<script>
    import orderService from '@/services/OrderService'
    export default {
        props: {},
        components: {
        },
        data() {
            return {
                order: {
                    tid: '',
                    pay_info: {
                        pay_type_title: ''
                    },
                    status: 0
                },
                stepActive : 0
            }
        },
        methods: {
            get () {
                orderService.get(this.order.tid).then((resp) => {
                    this.order = resp.data;
                },(err) => {

                });
            }
        },
        mounted(){
            this.order.tid = this.$route.params.tid;
            this.get();
        }
    }
</script>
<style lang="less">
    .orderDetail{
        .base-info {
            margin-top: 20px;
        }

        /*.hd-info {*/
            /*margin-top: 20px;*/
        /*}*/
        /*.text {*/
            /*font-size: 14px;*/
            /*color: #666;*/
        /*}*/
        /*.item {*/
            /*margin-bottom: 18px;*/
            /*min-width:300px;*/
            /*span{*/
                /*display:inline-block;*/
                /*width:100px;*/
            /*}*/
        /*}*/
        .form-row {
            font-size: 0;
            label {
                width: 100px;
                color: #a3a3a3;
            }
            .el-form-item {
                width: 100%;
                color: #666;
                margin-right: 0;
                margin-bottom: 0;
            }
        }
        .el-card{
            border-radius: 4px;
            background-color: #fff;
            overflow: hidden;
            color: #303133;
            box-shadow: none;
            border: solid 1px #ddd;
        }
        .el-card__header{
            padding: 9px 20px;
            background-color: #f6f6f6;
            font-size: 16px;
            color: #585858;
        }
        .el-alert--info{
            background-color: #f2f8fe;
            .el-alert__content{
                font-size: 14px;
                color: #737373;
            }
        }
        .el-form-item__label{
            color: #737373;
        }
        .detail-item{
            margin-top: 24px;
            .info-box{
                display: flex;
                justify-content: space-between;
                color: #737373;
                background-color: #f2f8fe;
                height: 40px;
                align-items: center;
                padding: 0 10px;
                margin-bottom: 12px;
                .info{
                    font-size: 14px;
                    color: #737373;
                    div{
                        line-height: 28px;
                    }
                }
            }
            th{
                background-color: #f6f6f6;
            }
            td{
                border-bottom:solid 1px #dddddd;
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
        .info-bottom{
            margin-top: 24px;
            text-align: right;
            .text{
                margin-bottom: 12px;
            }
            label{
                width: 200px;
                text-align: right;
                display:inline-block;
                font-size: 14px;
                color: #737373;
            }
            span{
                width: 160px;
                text-align: right;
                display:inline-block;
                font-size: 14px;
                color: #ff3b41;
            }
            .large{

                span{
                    font-size: 20px;
                    font-weight: bold;
                }
            }
        }

    }

</style>
