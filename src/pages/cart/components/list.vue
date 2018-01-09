<template>
    <div class="list">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="商品信息" width="300">
                <template slot-scope="scope">
                    <img :src="tableData.img" alt="商品" />

                    <p>{{tableData.info}}</p>
                    <p>{{scope.pixel}}</p>
                    <p>{{scope.focal}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="pixel" label="像素" width="120">
            </el-table-column>
            <el-table-column prop="focal" label="焦距" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="price" label="单价（美金）" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="数量" prop="num">
                <el-input-number v-model="tableData.num" label="描述文字"></el-input-number>
            </el-table-column>
            <el-table-column prop="count" label="小计" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="handle" label="操作">
            </el-table-column>
        </el-table>
        <div class="table-footer">
            <div class="choose">
                <p>
                    <el-checkbox v-model="tableData.chooseAll">全选</el-checkbox>
                    <span>删除选中商品</span>
                </p>
            </div>
            <div class="check">
                <p><span>应付金额：<strong>$500.00</strong></span></p>
                <el-button @click="check">去结算</el-button>
            </div>
        </div>
        <div class="history">
            <h5>购买记录</h5>
            <ul class="items">
                <li>
                    <img src="../img/goods1.png" alt="商品1">
                    <p>海康威视</p>
                    <p><span>200万4mm红外高清网络半球摄像机</span></p>
                    <p><span>DS-2CD3325-I(C) </span></p>
                    <div class="price">$399.00</div>
                </li>
                <li>
                    <img src="../img/goods1.png" alt="商品1">
                    <p>海康威视</p>
                    <p><span>200万4mm红外高清网络半球摄像机</span></p>
                    <p><span>DS-2CD3325-I(C) </span></p>
                    <div class="price">$399.00</div>
                </li>
                <li>
                    <img src="../img/goods1.png" alt="商品1">
                    <p>海康威视</p>
                    <p><span>200万4mm红外高清网络半球摄像机</span></p>
                    <p><span>DS-2CD3325-I(C) </span></p>
                    <div class="price">$399.00</div>
                </li>
                <li>
                    <img src="../img/goods1.png" alt="商品1">
                    <p>海康威视</p>
                    <p><span>200万4mm红外高清网络半球摄像机</span></p>
                    <p><span>DS-2CD3325-I(C) </span></p>
                    <div class="price">$399.00</div>
                </li>
                <li>
                    <img src="../img/goods1.png" alt="商品1">
                    <p>海康威视</p>
                    <p><span>200万4mm红外高清网络半球摄像机</span></p>
                    <p><span>DS-2CD3325-I(C) </span></p>
                    <div class="price">$399.00</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "list",
        data() {
            return {
                chooseAll: true,
                tableData: [{
                    img: './img/shangping_html.png',
                    info: '海康威视DS-CD0DDDDDDDDDD',
                    pixel: '1200W',
                    focal: '4mm',
                    price: '$500.00',
                    num: 1,
                    count: '$500.00',
                    handle: 'delete',
                },
                    {
                        img: './img/shangping_html.png',
                        info: '海康威视DS-CD0DDDDDDDDDD',
                        pixel: '1200W',
                        focal: '4mm',
                        price: '$500.00',
                        num: 1,
                        count: '$500.00',
                        handle: 'delete',
                    }],
                multipleTable: [],
                num: 10
            }
        },
        methods:{
            handleSelectionChange(){
                alert('handleSelectionChange')
            },
            check() {
                this.$emit('submit', '2')
                this.$router.push({path: '/settle'})
            }
        }
  }
</script>

<style scoped lang="less">
    .list{
        font-family: MicrosoftYaHei;
        .el-table{
        }
        .table-footer{
            margin:70px 24px;
            display: flex;
            justify-content: space-between;
            p{
                line-height: 49px;
                span{
                    font-size: 14px;
                }
                strong{
                    color:#f81f22;
                    font-size: 26px;
                }
            }
            .choose{
                .el-checkbox{
                    color: #777;
                }
                span{
                    color:#b1b1b1;
                    margin-left: 23px;
                }
            }
            .check{
                text-align: right;
                .el-button{
                    background-color: #f81f22;
                    border-radius: 4px;
                    width: 160px;
                    height: 50px;
                    font-size: 26px;
                    color: #fff;
                    font-family: MicrosoftYaHei-Bold;
                }
                span{
                    color: #999;
                    margin-right: 10px;
                }
            }
        }
        .history{
            h5{
                line-height: 49px;
                color: #777;
                margin-left: 24px;
            }
            .items{
                display: flex;
                justify-content: space-between;
                li{
                    width: 290px;
                    height: 448px;
                    background-color: #ffffff;
                    box-shadow: 0px 8px 18px 0px
                    rgba(0, 0, 0, 0.05);
                    border-top:2px solid #3d98ff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    img{
                        margin: 150px 0 96px;
                    }
                    p{
                        font-family: FZLTZHK--GBK1-0;
                        line-height: 22px;
                        font-size: 18px;
                        color: rgba(0,0,0,0.7);
                        text-align: center;
                        span{
                            font-size: 14px;
                            color: rgba(0,0,0,0.5);
                        }
                    }
                    .price{
                        line-height: 86px;
                        color: #ce2127;
                        font-size: 26px;
                        width: 266px;
                        height: 86px;
                        border-top: 1px solid rgba(0, 0, 0, 0.05);
                        text-align: center;
                        margin-top: 24px;
                    }
                }
            }
        }
    }
</style>
