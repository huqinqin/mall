<template>
    <div class="list">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" align="right" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="60" align="right"></el-table-column>
            <el-table-column label="商品信息" width="380">
                <template slot-scope="scope">
                    <img :src="scope.row.img" alt="商品">
                    <div class="content">
                        <p>{{scope.row.info}}</p>
                        <p>像素：{{scope.row.pixel}}</p>
                        <p>焦距：{{scope.row.focal}}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="pixel" label="像素" width="180" align="center">
            </el-table-column>
            <el-table-column prop="focal" label="焦距"  width="180" align="center">
            </el-table-column>
            <el-table-column prop="price" label="单价（美金）"  width="180" align="center">
            </el-table-column>
            <el-table-column label="数量" prop="num" align="center">
                <template slot-scope="scope">
                    <div class="inputNumber">
                        <el-input-number :min='0' size="small" v-model="scope.row.num" @change="inputNumeberChange" label="描述文字"></el-input-number>
                    </div>
                    </template>
            </el-table-column>
            <el-table-column label="小计" width="180" align="center">
                <template slot-scope="scope">
                    <div class="count">{{scope.row.count}}</div>
                </template>
            </el-table-column>
            <el-table-column label="操作"  width="180" align="center">
                <template slot-scope="scope">
                    <div class="cart-delete" @click="deleteHandle">
                        <i :class="scope.row.handle"></i>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="table-footer">
            <div class="choose">
                <p>
                    <el-checkbox v-model="tableData.chooseAllSelect">全选</el-checkbox>
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
                <li v-for="item in historyData">
                    <img :src="item.img" :alt=item.disc>
                    <p>{{item.name}}</p>
                    <p><span>{{item.info}}</span></p>
                    <p><span>{{item.model}}</span></p>
                    <div class="price">${{item.price}}</div>
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
                    img: require('@/assets/img/shangping_html.png'),
                    info: '海康威视DS-CD0DDDDDDDDDD',
                    pixel: '1200W',
                    focal: '4mm',
                    price: '$500.00',
                    num: 1,
                    count: '$500.00',
                    handle: 'iconfont icon-shanchu',
                },{
                    img: require('@/assets/img/shangping_html.png'),
                    info: '海康威视DS-CD0DDDDDDDDDD',
                    pixel: '1200W',
                    focal: '4mm',
                    price: '$500.00',
                    num: 1,
                    count: '$500.00',
                    handle: 'iconfont  icon-shanchu',
                }],
                multipleTable: [],
                num: 10,
                historyData: [{
                    img: require('@/assets/img/goods1.png'),
                    disc: '商品1',
                    name: '海康威视',
                    info: '200万4mm红外高清网络半球摄像机',
                    model: 'DS-2CD3325-I(C)',
                    price: '399.00'
                },{
                    img: require('@/assets/img/goods1.png'),
                    disc: '商品1',
                    name: '海康威视',
                    info: '200万4mm红外高清网络半球摄像机',
                    model: 'DS-2CD3325-I(C)',
                    price: '399.00'
                },{
                    img: require('@/assets/img/goods1.png'),
                    disc: '商品1',
                    name: '海康威视',
                    info: '200万4mm红外高清网络半球摄像机',
                    model: 'DS-2CD3325-I(C)',
                    price: '399.00'
                },{
                    img: require('@/assets/img/goods1.png'),
                    disc: '商品1',
                    name: '海康威视',
                    info: '200万4mm红外高清网络半球摄像机',
                    model: 'DS-2CD3325-I(C)',
                    price: '399.00'
                },{
                    img: require('@/assets/img/goods1.png'),
                    disc: '商品1',
                    name: '海康威视',
                    info: '200万4mm红外高清网络半球摄像机',
                    model: 'DS-2CD3325-I(C)',
                    price: '399.00'
                }]
            }
        },
        methods:{
            handleSelectionChange(){
                alert('handleSelectionChange')
            },
            chooseAllSelect(){
                alert('choose all')
            },
            check() {
                this.$emit('submit', 1)
                this.$router.push({path: '/settle'})
            },
            inputNumeberChange(){
                alert('input numeber change')
            },
            deleteHandle(){
                alert('asf')
            }
        }
  }
</script>

<style lang="less">
    @import '//at.alicdn.com/t/font_516449_jhzz1yo9t19n3ik9.css';
    .list{
        font-family: MicrosoftYaHei;
        .el-table__header-wrapper{
            height: 60px;
        }
        .has-gutter{
            tr th{
                background-color: rgba(0,0,0,0.05);
            }
        }
        .el-table{
            font-size: 14px;
            img{
                width: 116px;
                height: 116px;
                background-color: #ffffff;
                border: solid 1px #dadada;
                float: left;
            }
            .content{
                margin-left: 125px;
                padding: 15px 0;
                width:174px;
                p{
                    line-height: 30px;
                    font-size: 14px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow:hidden;
                }
            }
            .cart-delete{
                line-height: 40px;
                font-size: 22px;
                color: #cecece;
                i{font-size: 22px;}
            }
            .count{
                color:red;
                font-size: 16px;
            }
            .el-input-number--small{
                width:96px;
            }
        }

        .table-footer{
            margin:56px 24px;
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
                    font-family: MicrosoftYaHei-Bold;
                }
                span{
                    color: #fff;
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
                    background-color: #ffffff;
                    box-shadow: 0px 8px 18px 0px rgba(0, 0, 0, 0.05);
                    border-top:2px solid #3d98ff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    img{
                        margin: 150px 0 96px;
                    }
                    p{
                        line-height: 18px;
                        font-size: 18px;
                        margin-top: 12px;
                        color: rgba(0,0,0,0.7);
                        text-align: center;
                        span{
                            font-size: 14px;
                            color: rgba(0,0,0,0.5);
                        }
                    }
                    .price{
                        color: #ce2127;
                        font-size: 26px;
                        width: 266px;
                        line-height: 75px;
                        height: 75px;
                        border-top: 1px solid rgba(0, 0, 0, 0.05);
                        text-align: center;
                        margin-top: 24px;
                    }
                }
            }
            padding-bottom: 96px;
            border-bottom:1px solid rgba(0, 0, 0, 0.05);
        }
    }

    p{
        /*.el-table__header-wrapper{*/
        /*height: 60px;*/
        /*background-color: rgba(0, 0, 0, 0.05);*/
        /*}*/
        /*.el-table__header-wrapper{*/
        /*height: 60px;*/
        /*}*/
        /*.has-gutter{*/
        /*tr th{*/
        /*background-color: rgba(0,0,0,0.05);*/
        /*}*/
        /*}*/
        /*.el-table{*/
        /*font-size: 14px;*/
        /*.el-table__header-wrapper{*/
        /*background: #000;*/
        /*}*/
        /*img{*/
        /*width: 116px;*/
        /*height: 116px;*/
        /*background-color: #ffffff;*/
        /*border: solid 1px #dadada;*/
        /*float: left;*/
        /*}*/
        /*.content{*/
        /*margin-left: 125px;*/
        /*padding: 15px 0;*/
        /*width:174px;*/
        /*p{*/
        /*line-height: 30px;*/
        /*font-size: 14px;*/
        /*white-space: nowrap;*/
        /*text-overflow: ellipsis;*/
        /*overflow:hidden;*/
        /*}*/
        /*}*/
        /*.cart-delete{*/
        /*line-height: 40px;*/
        /*font-size: 22px;*/
        /*color: #cecece;*/
        /*i{font-size: 22px;}*/
        /*}*/
        /*.count{*/
        /*color:red;*/
        /*font-size: 16px;*/
        /*}*/
        /*.el-input-number--small{*/
        /*width:96px;*/
        /*}*/
        /*}*/
    }

</style>
