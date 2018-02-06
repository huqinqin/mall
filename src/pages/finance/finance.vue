<template>
    <div class="finance">
        <header>
            <div><i class="iconfont icon-qian1"></i>账户余额：<span class="red"><lts-money :money="1234565" /></span></div>
            <div><i class="iconfont icon-qian"></i>信用余额：<span class="red"><lts-money :money="1234565" /></span></div>(已用信用<span class="red"><lts-money :money="1234"></lts-money>)</span>
        </header>
        <main>
            <el-form :inline="true">
                <el-form-item label="账户类型">
                    <el-select v-model="searchForm.type">
                        <el-option label="账户余额" value="amount"></el-option>
                        <el-option label="账期余额" value="credit"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期">
                    <el-date-picker
                        v-model="searchForm.daterange"
                        type="daterange"
                        unlink-panels
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item><el-button type="primary" @click="getlist">查询</el-button></el-form-item>
            </el-form>
            <el-table :data="tableData">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="time" label="操作时间"></el-table-column>
                <el-table-column prop="type" label="账户类型"></el-table-column>
                <el-table-column prop="sum" label="变动金额"></el-table-column>
                <el-table-column prop="balance" label="当前金额"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
            </el-table>
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="changePage"
                :current-page="pagination.page"
                :page-size="pagination.pageSize"
                :total="pagination.total">
            </el-pagination>
        </main>
    </div>
</template>
<script>
    export default {
        name : 'finance',
        data(){
            return{
                seachForm:{
                    type:'',
                    daterange:''
                },
                pagination:{
                    page:1,
                    pageSize:10,
                    total:124
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                tableData:[{time:'123456',type:'账期额度',sum:'13212',balance:'123456',remark:'备注-假装备注-假装是备注'
                    },{time:'123456',type:'账期额度',sum:'13212',balance:'123456',remark:'备注-假装备注-假装是备注'
                    },{time:'123456',type:'账户余额',sum:'13212',balance:'123456',remark:'备注-假装备注-假装是备注'
                    },{time:'123456',type:'账期额度',sum:'13212',balance:'123456',remark:'备注-假装备注-假装是备注'
                    }]
            }
        },
        methods:{
            // 选择分页
            changePage(page){
                this.pagination.page = page
                this.getlist()
            },
            getlist(){

            }
        },
        mounted(){
            this.getlist()
        }
    }
</script>



<style lang="less">
    .finance{
        span.red{color:#ff3b41;}
        span.bold{font-weight: bold}
        header{
            border-bottom: 1px solid #ddd;
            display: flex;
            div{
                width:200px;
                font-size: 16px;
            }
            div:first-child{margin-right: 48px;}
        }
        main{
            .el-select{width:300px;}
            .el-date-picker{width:300px;}
            .el-table{
                thead tr th{
                    background: #ecf5ff;
                    font-weight: normal;
                }
                td{
                    vertical-align: top;
                }
            }
            .el-pagination{
                text-align: end;
            }
        }
    }
</style>

