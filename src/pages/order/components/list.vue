<template>
    <div class="orderList">
        <lts-search-form @get-from="getParameter" :form-fileds="form.formFileds" :form-inlines="form.formInline" ref="searchForm"/>
        <el-table :data="datalist" v-loading="loading" default-expand-all style="width: 100%" class="orderItem">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-table :data="scope.row.wholesale_order_items" style="width: 100%" class="goodsItem">
                        <el-table-column type="index" label="" width="30"/>
                        <el-table-column label="商品" header-align="center" align="left" :show-overflow-tooltip="true" width="400">
                            <template slot-scope="subscope">
                                <div class="goods">
                                    <div class="img" :style="{backgroundImage : 'url(' + subscope.row.wholesale_item_d_o.image_value +')'}"></div>
                                    <!--<img :src="subscope.row.wholesale_item_d_o.image_value + '@100w_2e'" class="item" />-->
                                    <div class="content">
                                        <p>{{subscope.row.wholesale_item_d_o.item_name}}</p>
                                        <p>{{subscope.row.wholesale_item_d_o.spec}}</p>
                                    </div>
                                </div>

                            </template>
                        </el-table-column>
                        <el-table-column prop="num" label="数量" align="center" >
                            <template slot-scope="subscope">{{subscope.row.num}}{{subscope.row.wholesale_item_d_o.unit}}</template>
                        </el-table-column>
                        <el-table-column label="应付" align="center" >
                            <template slot-scope="subscope">
                                <p>${{subscope.row.pay_real | money2str}}</p>
                                <p class="fakePay">${{subscope.row.pay | money2str}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="hd_status_title" label="配送状态" align="center" />
                        <el-table-column prop="status_title" label="状态" align="center">
                            <template slot-scope="subscope">
                                <span v-if="subscope.row.status == 9">
                                    {{subscope.row.closed_reason_title}}
                                </span>
                                <span v-else>
                                    <span v-if="subscope.row.last_refund_status == 1">
                                        退款申请中
                                    </span>
                                    <span v-else-if="subscope.row.last_refund_status == 3">
                                        退款已驳回
                                    </span>
                                    <span v-else-if="subscope.row.last_refund_status == 7">
                                        已退{{subscope.row.refund_num}}{{subscope.row.wholesale_item_d_o.unit}}{{subscope.row.refund_real | money2str}}元
                                    </span>
                                    <span v-else-if="subscope.row.last_refund_status == 9">
                                        退款已关闭
                                    </span>
                                    <span v-else>
                                        {{subscope.row.status_title}}
                                    </span>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="80" align="center" >
                            <template slot-scope="subscope">
                                <el-dropdown @command="handleMenuItemClick">
                                    <span class="el-dropdown-link">
                                        操作<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="refund" :data="subscope.row" v-if="isCanRefund(subscope.row)">退货退款</el-dropdown-item>
                                        <el-dropdown-item command="refund" :data="subscope.row" v-if="isCanRefund(subscope.row)">退货退款</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column type="index" label=""/>
            <el-table-column prop="tid" label="订单编号" align="center" width="120" />
            <el-table-column prop="user_name" label="工程商" header-align="center" align="center" width="160" :show-overflow-tooltip="true" />
            <el-table-column prop="receiver_mobile" label="手机" header-align="center" align="center" width="120" />
            <el-table-column  label="地址" header-align="center" align="center" :show-overflow-tooltip="true" >
                <template slot-scope="scope">
                    <div>{{scope.row.user_addr}}</div>
                </template>
            </el-table-column>
            <el-table-column label="合计" align="center" width="80">
                <template slot-scope="scope">
                    <el-tooltip placement="top">
                        <div slot="content">
                            运费: {{scope.row.fee_hd_all | money2str}}
                        </div>
                        <div>{{scope.row.fee_total | money2str}}</div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="pay_info.pay_type_title" label="付款类型" align="center" width="80" />
            <el-table-column prop="pay_info.pay_status_title" label="付款状态" align="center" width="80" />
            <el-table-column prop="status_title" label="状态" align="center" width="100">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.status == 7 || scope.row.status == 9">
                        {{scope.row.status_title}}
                    </el-tag>
                    <span v-else>{{scope.row.status_title}}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center" width="160">
                <template slot-scope="scope">{{scope.row.cdate | timestamp2str}}</template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="80">
                <template slot-scope="scope">
                    <el-dropdown @command="handleMenuItemClick">
                        <span class="el-dropdown-link">
                            操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><router-link :to="'/detail/' + scope.row.tid">详情</router-link></el-dropdown-item>
                            <el-dropdown-item command="pay" :data="scope.row" v-if="isCanPay(scope.row)">去支付</el-dropdown-item>
                            <el-dropdown-item command="close" :data="scope.row" v-if="isCanPay(scope.row)">关闭订单</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            style="text-align: right;margin-top:20px"
            :current-page="pagination.page"
            :page-sizes="pagination.sizes"
            :page-size="pagination.pageSize"
            :layout="pagination.layout"
            :total="pagination.total">
        </el-pagination>
        <reverse-apply :visible.sync="dialogVisible" v-bind:order-item="refundOrder" v-bind:installer="refundInstaller" v-bind:item="refundItem" />
    </div>
</template>
<script>
    import {dateUtils} from 'ltsutil'
    import {ltsSearchForm} from 'ui'
    import reverseApply from './reverse-apply'
    import orderService from '@/services/OrderService'
    import config from 'config'
    export default {
        components: {
            ltsSearchForm, reverseApply
        },
        data() {
            return {
                loading: true,
                dialogVisible: false,
                datalist: [],
                refundOrder: {},
                refundInstaller:{},
                refundItem:{},
                params: {
                  /*  tid: '',
                    status: '',
                    start_time: '',
                    end_time: '',*/
                },
                form: {
                    formFileds: [
                        {
                            search: {
                                tid: {
                                    label: '订单号',
                                    type: 'input',
                                    bindValue : 'tid',
                                    bindPlaceholder: '订单号'
                                },
                                date: {
                                    label: '创建时间',
                                    type: 'datetimerange',
                                    bindValue: 'date'
                                },
                                status: {
                                    label: "状态",
                                    type: "select",
                                    bindValue: "status",
                                    bindPlaceholder: "请选择",
                                    children: [
                                        {label: "所有状态", bindValue: ""},
                                        {label: "等待付款", bindValue: "0"},
                                        {label: "已付款", bindValue: "1"},
                                        {label: "已完成", bindValue: "7"},
                                        {label: "已关闭", bindValue: "9"}
                                    ]
                                },
                                search: {bindValue: "搜索", type: "submitbutton"}
                            }
                        }
                    ],
                    // 若需要把form参数供其他组件使用。需要把这些参数传给使用的组件
                    formInline: {
                        tid: '',
                        status: '',
                        date: dateUtils.getNearMonth(),
                    },
                },
                pagination: {
                    page: 1,
                    pagesize: 10,
                    total: 0,
                    sizes: [10, 20, 30,40],
                    layout: "total, sizes, prev, pager, next, jumper" // total 总条目数  prev 上一页 next 下一页 sizes 支持分组
                },
            }
        },
        methods: {
            handleMenuItemClick(command, data) {
                let order;

                switch (command) {
                    case "accept":
                        order = data.$vnode.data.attrs.data;
                        orderService.accept(order.tid).then((resp)=>{
                            this.$ltsMessage.show({type: 'success', message: "受理成功"});
                        }, (err) => {
                            this.$ltsMessage.show({type: 'success', message: "受理失败：" + err.error_message});
                        });
                        break;
                    case "reject":
                        order = data.$vnode.data.attrs.data;
                        this.$ltsMessage.show({type: 'success', message: "拒绝" + order.tid});
                        break;
                    case "refund":
                        const orderItem = data.$vnode.data.attrs.data;
                        this.showRefundOrderItem(orderItem);
                        break;
                    case "pay":
                        let return_url = '/customerorder#/finish';
                        let fail_url = '/customerorder#/fail';
                        order = data.$vnode.data.attrs.data;
                        window.open(config.url.main + '/cart#/beforePay?tid=' + order.tid + '');
                        break;
                    case "close":
                        this.$confirm('是否删除订单?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() =>{
                            order = data.$vnode.data.attrs.data;
                            orderService.close_by_tid(order.tid).then((data)=>{
                                this.$ltsMessage.show({type:'success',message:'删除成功'});
                                this.search();
                            },(msg)=>{
                                this.$ltsMessage.show({type:'error',message:msg.error_message})
                            })
                        });
                        break;
                    default:
                        break;
                }
            },
            showRefundOrderItem(orderItem){
                this.dialogVisible = true;
                this.refundOrder = orderItem;
                this.refundInstaller = orderItem.customer;
                this.refundItem = orderItem.wholesale_item_d_o;
            },
            onSubmitRefund(){
                this.$ltsMessage.show({type: 'success', message: "退货退款申请成功"});
            },
            isCanRefund(orderItem){
                return (orderItem.status == 2 || orderItem.status == 7)
                    && (orderItem.hd_status == 5 || orderItem.hd_status == 10)
                    && ((orderItem.refund_status & 4) == 0 && (orderItem.refund_status & 256) == 0);
            },
            isCanDeal(order){
                return order.pay_type == 3 && order.status == 0;
            },
            isCanPay(order){
                return order.pay_status == 0;
            },
            search() {
                let param = {};
                for(let key in this.params){
                    if(this.params[key] == '' || this.params[key] == undefined || this.params[key] == null){

                    }else{
                        param[key] = this.params[key];
                    }
                }
                orderService.getList(param, this.pagination.page, this.pagination.page_size, 'cdate desc').then((resp) => {
                    this.loading = false;
                    this.datalist = resp.datalist;
                    this.pagination.total = resp.total;
                }, (err) => {
                    this.loading = false;
                    this.datalist = [];
                    this.pagination.total = 0;
                    this.$ltsMessage.show({type: 'error', message: '查询失败，请稍后重试:' + err.error_message})
                });
            },
            getParameter (val) {
                this.search()
            },
            syncFormParam() {
                if (this.form.formInline.date.length > 0) {
                    this.params.start_time = this.form.formInline.date[0];
                    this.params.end_time = this.form.formInline.date[1];
                }
                if(this.form.formInline.tid){
                    this.params.tid = this.form.formInline.tid;
                }
                this.params.status = this.form.formInline.status;
                /*this.params.item_name = this.form.formInline.item_name;*/
            },
            handleSizeChange(val) {
                this.pagination.pageSize = val;
                this.search()
            },
            handleCurrentChange(val) {
                this.pagination.page = val;
                this.search()
            }
        },
        mounted() {
            this.search();
        },
        created() {
            this.syncFormParam();
        },
        watch: {
            form: {
                handler: function () {
                    this.syncFormParam();
                },
                deep: true
            }
        }
    }
</script>
<style lang="less">
    .orderList{
        position: relative;
        .el-dropdown-link {
            cursor: pointer;
            color: #409eff;
        }
        .el-table.orderItem{
            .has-gutter{
                tr{
                    th{
                        background-color: #f6f6f6;
                    }
                }
            }
            .el-table__row{
                background: #f2f8fe;

            }
            .el-table__expanded-cell{
                padding: 12px 0 48px 0;


            }

            // 订单列表hover 背景色变化覆盖
            .el-table__expanded-cell:hover{
                background: #fff!important;;

            }
        }

        .el-table.goodsItem{

            .el-table__header-wrapper{
                display: none;
            }
            .el-table__row{
                background: #fff;

            }

            .goods{
                display: flex;
                justify-content: space-around;
                .img{
                    width:80px;
                    height: 80px;
                    background-position: center center;
                    background-size: cover;
                }
                .content{
                    width:120px;
                    p{
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                }
            }
            p.fakePay{
                text-decoration: line-through;
            }
            .el-table__expanded-cell{
                padding-bottom: 36px;

            }

        }

    }

</style>
