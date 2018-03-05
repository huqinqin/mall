<template>
    <div class="reverseList">
        <lts-search-form @get-from="getParameter" :form-fileds="form.formFileds" :form-inlines="form.formInline"></lts-search-form>
        <el-table :data="datalist" v-loading="loading" style="width: 100%">
            <el-table-column type="selection"/>
            <el-table-column prop="tid" label="订单编号" align="left" header-align="left" width="120"/>
            <el-table-column prop="tid" label="商品信息" align="left" header-align="left">
                <template slot-scope="scope">
                    <div class="item-info">
                        <div class="order-item-detail">
                            <img :src="scope.row.item_remark.url + '@100w_2e'" class="item" />
                            <div>{{scope.row.item_remark.item_name}}</div>
                        </div>
                        <div class="prop-box">
                            <div v-for="(propObj,index) in scope.row.item_remark.propValue">
                                <div v-for="(prop,key) in propObj">
                                    <div>{{key}}:{{prop}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="退货金额" align="left" header-align="left" width="80">
                <template slot-scope="scope"><lts-money :money="scope.row.refund_real"></lts-money></template>
            </el-table-column>
            <el-table-column label="退货数量" align="left" header-align="left" width="80">
                <template slot-scope="scope">
                    <!--<el-tooltip placement="top">-->
                        <!--<div slot="content">-->
                            <!--<p v-if="scope.row.reverse_remark.stockout_item">-->
                                <!--缺货:{{scope.row.reverse_remark.stockout_item.num}}{{scope.row.reverse_remark.stockout_item.unit}}</p>-->
                            <!--<p v-if="scope.row.reverse_remark.return_item">-->
                                <!--退货:{{scope.row.item_remark.num}}{{scope.row.item_remark.unit}}</p>-->
                        <!--</div>-->
                        <!--<div>{{scope.row.total_num}}</div>-->
                    <!--</el-tooltip>-->
                    <div>{{scope.row.total_num}}</div>
                </template>
            </el-table-column>
            <el-table-column label="提交时间" align="left" header-align="left" width="105">
                <template slot-scope="scope">{{scope.row.start_time | timestamp2str}}</template>
            </el-table-column>
            <el-table-column prop="reverse_reason_title" label="退货类型" header-align="left" align="left" width="100">
                <template slot-scope="scope">
                    <div v-if="scope.row.hd_status > 0">
                        退货退款
                    </div>
                    <div v-else>仅退款</div>
                </template>
            </el-table-column>
            <el-table-column prop="reverse_reason_title" label="退货原因" header-align="left" align="left" width="150">
                <template slot-scope="scope">
                    <div>{{scope.row.reverse_reason_title}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="status_title" label="退款状态" align="left" header-align="left" width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 7 || scope.row.status == 9">
                        {{scope.row.status_title}}
                    </span>
                    <span v-else>{{scope.row.status_title}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" header-align="center" width="120">
                <template slot-scope="scope">
                    <el-button type="text" class="probtn" size="mini" ><router-link :to="'/detail/' + scope.row.id">退货详情</router-link></el-button>
                    <el-popover
                        placement="bottom"
                        width="220"
                        v-model="scope.row.visible2">
                        <p>确定撤销申请吗？</p>
                        <div class="popverbtn">
                            <el-button size="mini" type="text" @click="scope.row.visible2 = false">取消</el-button>
                            <el-button type="primary" size="mini" @click="closeOrder(scope.row)">确定</el-button>
                        </div>
                        <el-button type="text" class="probtn" size="mini" slot="reference" v-if="scope.row.status == 1 || scope.row.status == 2">撤销申请</el-button>
                    </el-popover>
                    <el-popover
                        placement="bottom"
                        title="填写物流信息"
                        width="360"
                        trigger="click"
                        v-model="scope.row.visible3">
                        <el-form ref="form"  label-width="80px">
                            <el-form-item label="物流公司">
                                <el-select v-model="express" placeholder="请选择物流公司">
                                    <el-option label="UPS" value="ups"></el-option>
                                    <el-option label="FEDEX" value="fedex"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="物流单号">
                                <el-input v-model="express_number"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" size="small" @click="submitExpress(scope.row)">确定</el-button>
                                <el-button @click="scope.row.visible3 = false">取消</el-button>
                            </el-form-item>
                        </el-form>
                        <el-button type="text" v-if="scope.row.status == 2 && (scope.row.hd_status == 1)" class="probtn" size="mini" slot="reference">填写物流</el-button>
                    </el-popover>
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
        <opt-dialog :visible.sync="dialogVisible" :opt-type="optType" v-bind:reverse="reverse" />
    </div>
</template>
<script>
    import {dateUtils} from 'ltsutil'
    import {ltsSearchForm} from 'ui'
    import optDialog from './opt-dialog'
    import reverseService from '@/services/ReverseService'
    export default {
        components: {
            ltsSearchForm, optDialog
        },
        data() {
            return {
                dialogVisible: false,
                loading: true,
                datalist: [],
                reverse: {
                    item_remark: {item_name:'',spec:'',price:'',num:0},
                    reverse_remark:{
                        stockout_item: {},
                        return_item: {},
                    }
                },
                visible2 : false,
                visible3 : false,
                optType: '',
                express : '',
                express_number : '',
                params: {
                   /* tid: '',
                    item_name: '',
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
                                    bindValue: 'tid',
                                    bindPlaceholder: '订单号'
                                },
                                item_name: {
                                    label: '商品名称',
                                    type: 'input',
                                    bindValue: 'item_name',
                                    bindPlaceholder: '商品名称'
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
                                    children: [
                                        {label: "所有状态", bindValue: ''},
                                        {label: "退款申请中", bindValue: 1},
                                        {label: "退款接受", bindValue: 2},
                                        {label: "退款驳回", bindValue: 3},
                                        {label: "卖家已赔", bindValue: 5},
                                        {label: "退款成功", bindValue: 7},
                                        {label: "退款关闭", bindValue: 9}
                                    ]
                                },
                                search: {bindValue: "搜索", type: "submitbutton"}
                            }
                        }
                    ],
                    // 若需要把form参数供其他组件使用。需要把这些参数传给使用的组件
                    formInline: {
                        tid: '',
                        item_name: '',
                        status: '',
                        date: dateUtils.getNearMonth(),
                    },
                },
                pagination: {
                    page: 1,
                    pagesize: 10,
                    total: 0,
                    sizes: [10, 20, 30],
                    layout: "total, sizes, prev, pager, next, jumper" // total 总条目数  prev 上一页 next 下一页 sizes 支持分组
                }
            }
        },
        methods: {
            handleMenuItemClick(command, data) {
                if (!command) return;
                this.reverse = data.$vnode.data.attrs.data;
                this.optType = command;
                this.dialogVisible = true;
            },
            search() {
                /*debugger;*/
                let param = {};
                for(let key in this.params){
                    if(this.params[key] == ''||this.params[key] == undefined || this.params[key] == null){

                    }else{
                        param[key] = this.params[key];
                    }
                }
                reverseService.getList(param, this.pagination.page, this.pagination.pageSize, 'cdate desc').then((resp) => {
                    this.loading = false;
                    resp.datalist.forEach((value,index,array)=>{
                        value.item_remark.propValue = JSON.parse(value.item_remark.props);
                        value.visible2 = false;
                        value.visible3 = false;
                    })
                    this.datalist = resp.datalist;
                    this.pagination.total = resp.total;
                }, (err) => {
                    this.loading = false;
                    this.datalist = [];
                    this.pagination.total = 0;
                    this.$ltsMessage.show({type: 'error', message: '查询失败，请稍后重试:' + err.error_message})
                });
            },
            getParameter(val) {
                this.search()
            },
            closeOrder(order){
                reverseService.cancel(order.id).then((resp) => {
                    this.$ltsMessage.show({type: 'success', message: '撤销成功'});
                    this.search();
                },(msg)=>{
                    this.$ltsMessage.show({type: 'error', message:msg.error_message})
                })
            },
            submitExpress(order){
                reverseService.set_express_number(order.id,this.express,this.express_number).then((resp) => {
                    this.$ltsMessage.show({type: 'success', message: '提交成功'})
                    this.search();
                },(msg)=>{
                    this.$ltsMessage.show({type: 'error', message:msg.error_message})
                })
            },
            syncFormParam() {
                if (this.form.formInline.date.length > 0) {
                    this.params.start_time = this.form.formInline.date[0];
                    this.params.end_time = this.form.formInline.date[1];
                }
                if(this.form.formInline.tid){
                    this.params.tid = this.form.formInline.tid;
                }
                if(this.form.formInline.item_name){
                    this.params.item_name = this.form.formInline.item_name;
                }
                this.params.status = this.form.formInline.status;
            },
            handleSizeChange(val) {
                this.pagination.pageSize = val;
                this.search()
            },
            handleCurrentChange(val) {
                this.pagination.page = val;
                this.search()
            },
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
    .reverseList{
        .el-table__body-wrapper{
            margin-top: 10px;
        }
        th{
            background-color: #f6f6f6;
            margin-bottom: 12px;
            padding: 9px 0;
        }
        td{
            padding: 4px 0;
            color: #585858;
            .item-info{
                display: flex;
                align-items: center;
                justify-content: flex-start;
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
                    min-width: 100px;
                    margin-left: 10px;
                }
            }

        }
        .probtn:hover{
            color: #fff;
            background-color: #409EFF;
            border-color: #409EFF;
            padding: 4px 12px;
        }
        .el-button+.el-button{
            margin-left: 0;
        }

    }
    .reverse-menu{
        position: relative;
    }
    .el-popover{
        padding: 0;
        p{
            text-align: center;
            margin: 30px 0;
            font-size: 14px;
            color: #737373;
            font-weight: bold;
        }
        .popverbtn{
            text-align: center;
            margin-bottom: 24px;
        }
        .el-popover__title{
            text-align: center;
            margin: 24px 0;
            font-weight: bold;
        }
        .el-form{
            padding: 0 40px;
        }
        .el-input,.el-select{
            width: 200px;
        }
    }
    .detail-table-expand {
        font-size: 0;
        label {
            width: 90px;
            color: #99a9bf;
        }
        .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 20%;
        }
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
    }
</style>

