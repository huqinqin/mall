<template>
    <div class="orderDetail">
        <el-row type="flex" justify="center">
            <el-col :span="12">
                <el-steps :space="400" :active="order.status" align-center>
                    <el-step title="创建"></el-step>
                    <el-step title="付款"></el-step>
                    <el-step title="发货"></el-step>
                    <el-step title="完成"></el-step>
                </el-steps>
            </el-col>
        </el-row>




        <el-card class="box-card base-info">
            <div slot="header" class="clearfix">
                <span>基本信息</span>
            </div>
            <el-form label-position="left" inline class="form-row">
                <el-form-item label="订单号">
                    {{order.tid}}
                </el-form-item>
                <el-form-item label="创建时间">
                    {{order.cdate | timestamp2str}}
                </el-form-item>
                <el-form-item label="订单状态">
                    {{order.status_title}}
                </el-form-item>
            </el-form>
        </el-card>


        <!--<el-card class="box-card base-info">-->
            <!--<div slot="header" class="clearfix">-->
                <!--<span>基本信息</span>-->
            <!--</div>-->
            <!--<div class="text item">-->
                <!--<span>订单号: </span>{{order.tid}}-->
            <!--</div>-->
            <!--<div class="text item">-->
                <!--<span>创建时间: </span>{{order.cdate | timestamp2str}}-->
            <!--</div>-->
            <!--<div class="text item">-->
                <!--<span>订单状态: </span>{{order.status_title}}-->
            <!--</div>-->
        <!--</el-card>-->
        <el-card class="box-card base-info">
            <div slot="header" class="clearfix">
                <span>收货信息</span>
            </div>
            <el-form label-position="left" inline class="form-row">
                <el-form-item label="预计收货时间">
                    {{order.book_time | timestamp2str}}
                </el-form-item>
                <el-form-item label="收货人">
                    {{order.user_name}}
                </el-form-item>
                <el-form-item label="电话">
                    {{order.receiver_mobile}}
                </el-form-item>
                <el-form-item label="地址">
                    {{order.user_addr}}
                </el-form-item>
            </el-form>
        </el-card>


        <!--<el-card class="box-card hd-info">-->
            <!--<div slot="header" class="clearfix">-->
                <!--<span>收货信息</span>-->
            <!--</div>-->
            <!--<div class="text item">-->
                <!--<span>预计收货时间: </span>{{order.book_time | timestamp2str}}-->
            <!--</div>-->
            <!--<div class="text item">-->
                <!--<span>收货人: </span>{{order.user_name}}-->
            <!--</div>-->
            <!--<div class="text item">-->
                <!--<span>电话: </span>{{order.receiver_mobile}}-->
            <!--</div>-->
            <!--<div class="text item">-->
                <!--<span>地址: </span>{{order.user_addr}}-->
            <!--</div>-->
        <!--</el-card>-->
        <el-card class="box-card base-info">
            <div slot="header" class="clearfix">
                <span>支付信息</span>
            </div>
            <el-form label-position="left" inline class="form-row">
                <el-form-item label="支付类型">
                    {{order.pay_info.pay_type_title}}
                </el-form-item>
                <el-form-item label="应付">
                    {{order.pay | money2str}}
                </el-form-item>
                <el-form-item label="运费">
                    {{order.fee_hd_all | money2str}}
                </el-form-item>
                <el-form-item label="实付">
                    {{order.fee_total | money2str}}
                </el-form-item>
                <el-form-item label="支付状态">
                    {{order.pay_info.pay_status_title}}
                </el-form-item>
                <el-form-item label="支付时间"  v-if="order.pay_time">
                    {{order.pay_time|timestamp2str}}
                </el-form-item>
            </el-form>
        </el-card>


        <!--<el-card class="box-card hd-info">-->
            <!--<div slot="header" class="clearfix">-->
                <!--<span>支付信息</span>-->
            <!--</div>-->
            <!--<div class="text item">-->
                <!--<span>支付类型: </span>{{order.pay_info.pay_type_title}}-->
            <!--</div>-->
            <!--<div class="text item">-->
                <!--<span>应付: </span>{{order.pay | money2str}}-->
            <!--</div>-->
            <!--<div class="text item">-->
                <!--<span>运费: </span>{{order.fee_hd_all | money2str}}-->
            <!--</div>-->
            <!--<div class="text item">-->
                <!--<span>实付: </span>{{order.fee_total | money2str}}-->
            <!--</div>-->
            <!--<div class="text item">-->
                <!--<span>支付状态: </span>{{order.pay_info.pay_status_title}}-->
            <!--</div>-->
            <!--<div class="text item" v-if="order.pay_time">-->
                <!--<span>支付时间: </span>{{order.pay_time|timestamp2str}}-->
            <!--</div>-->
        <!--</el-card>-->

        <el-card class="box-card base-info">
            <div slot="header" class="clearfix">
                <span>订单商品</span>
            </div>
            <el-table :data="order.wholesale_order_items" style="width: 100%">
                <el-table-column
                    prop="wholesale_item_d_o.item_name"
                    label="商品"
                >
                </el-table-column>
                <el-table-column
                    label="单价"
                    width="80">
                    <template slot-scope="scope">{{scope.row.wholesale_item_d_o.price | money2str}}</template>
                </el-table-column>
                <el-table-column
                    prop="num"
                    label="数量"
                    width="80">
                </el-table-column>
                <el-table-column
                    label="应付"
                    width="80">
                    <template slot-scope="scope">{{scope.row.pay | money2str}}</template>
                </el-table-column>
                <el-table-column
                    label="实付"
                    width="80">
                    <template slot-scope="scope">{{scope.row.pay_real | money2str}}</template>
                </el-table-column>
                <el-table-column
                    prop="hd_status_title"
                    label="物流状态"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="status_title"
                    label="订单状态"
                    width="80">
                </el-table-column>
            </el-table>
        </el-card>
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
                color: #99a9bf;
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
