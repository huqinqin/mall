<template>
    <div class="settle">
        <div class="address">
            <h5>收货地址：</h5>
            <ul>
                <li class="default">
                    <header>
                        <div><p>{{defaultAddressData.name}} （{{defaultAddressData.city}}）</p></div>
                        <div><span>默认地址</span></div>
                    </header>
                    <main>
                        <p>{{defaultAddressData.address}}</p>
                        <p>电话：{{defaultAddressData.mobile}}</p>
                    </main>
                    <footer>
                        <button @click="setDefault">设为默认</button>
                        <button @click="editAddress">修改</button>
                    </footer>
                </li>
                <li v-for="item in addressData">
                    <header>
                        <div><p>{{item.name}} （{{item.city}}）</p></div>
                    </header>
                    <main>
                        <p>{{item.address}}</p>
                        <p>电话：{{item.mobile}}</p>
                    </main>
                    <footer>
                        <button @click="setDefault">设为默认</button>
                        <button @click="editAddress">修改</button>
                    </footer>
                </li>
                <li class="addAddress" @click="addAddress">
                    <i class="iconfont icon-add"></i>
                    <div>添加地址</div>
                </li>
            </ul>
        </div>
        <div class="bill">
            <h5>账单地址：</h5>
            <ul>
                <li class="default">
                    <header>
                        <div><p>{{defaultBillressData.name}} （{{defaultBillressData.city}}）</p></div>
                        <div><span>默认地址</span></div>
                    </header>
                    <main>
                        <p>{{defaultBillressData.address}}</p>
                        <p>电话：{{defaultBillressData.mobile}}</p>
                    </main>
                    <footer>
                        <button @click="setDefault">设为默认</button>
                        <button @click="editAddress">修改</button>
                    </footer>
                </li>
                <li v-for="item in billData">
                    <header>
                        <div><p>{{item.name}} （{{item.city}}）</p></div>
                    </header>
                    <main>
                        <p>{{item.address}}</p>
                        <p>电话：{{item.mobile}}</p>
                    </main>
                    <footer>
                        <button @click="setDefault">设为默认</button>
                        <button @click="editAddress">修改</button>
                    </footer>
                </li>
                <li class="addBill" @click="addBill">
                    <i class="iconfont icon-add"></i>
                    <div>添加地址</div>
                </li>
            </ul>
        </div>
        <div class="delivery">
            <h5>配送方式： </h5>
            <el-button>快递</el-button>
            <el-button>自提</el-button>
        </div>
        <div class="order">
            <h5>订单信息： </h5>
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
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
                            <el-input-number :min='0' size="small" v-model="scope.row.num" @change="inputNumberChange" label="描述文字"></el-input-number>
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
            <div class="remark"><span>买家留言：</span><el-input></el-input></div>
        </div>
        <div class="coupon" @click="useCoupon"><p><i class="iconfont icon-icon-test1"></i>使用优惠券 <span>（没有优惠券可以使用）</span></p></div>
        <div class="submitOrder">
            <div>商品价格：500.00 + 运费：0.00 + 税额：0.00 + 红包：0.00 = 总计：$500.00</div>
            <div>应付金额：<span>$500.00</span></div>
            <el-button @click="settle">提交订单</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "settle",
        data(){
            return{
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
                defaultAddressData: {
                    name: '抹茶',
                    city: '浙江省杭州市',
                    address: '西湖区三墩镇振华路西城博司12楼1201',
                    mobile: '183 **** 5921'
                },
                defaultBillressData: {
                    name: '抹茶',
                    city: '浙江省杭州市',
                    address: '西湖区三墩镇振华路西城博司12楼1201',
                    mobile: '183 **** 5921'
                },
                addressData:[{
                    name: '抹茶',
                    city: '浙江省杭州市',
                    address: '西湖区三墩镇振华路西城博司12楼1201',
                    mobile: '183 **** 5921'
                }],
                billData: [{
                    name: '抹茶',
                    city: '浙江省杭州市',
                    address: '西湖区三墩镇振华路西城博司12楼1201',
                    mobile: '183 **** 5921'
                }],
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
                    handle: 'iconfont icon-shanchu',
                }],
                multipleTable: [],
                num: 10,
            }
        },
        methods: {
            setDefault(){
                alert('set default')
            },
            editAddress(){
                alert('edit address')
            },
            addAddress(){
                alert('add address')
            },
            editBill(){
                alert('edit bill')
            },
            addBill(){
                alert('add bill')
            },
            handleSelectionChange(){
                alert('handleSelectionChange')
            },
            inputNumberChange(){
                alert('input numeber change')
            },
            settle(){
                this.$emit('submit',2)
                this.$router.push({path: '/beforePay'})
            },
            deleteHandle(){
                alert('asf')
            },
            useCoupon(){
                alert('使用优惠券')
            }
        }
  }
</script>

<style lang="less">
    @import '//at.alicdn.com/t/font_516449_7rh4bqfshns1c3di.css';
    .settle{
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
                width:128px;
            }
        }
        h5{
            color: rgba(0,0,0,0.7);
            font-family: MicrosoftYaHei-Bold;
            font-size: 16px;
            margin-bottom: 23px;
            width:100%;
        }
        .address,.bill{
            margin: 0 24px;
            display: flex;
            flex-wrap: wrap;
            ul{
                display: flex;
                flex-wrap: wrap;
                margin-bottom: 48px;
                li{
                    width: 280px;
                    height: 122px;
                    box-shadow: 0px 3px 15px 0px #f1f1f1;
                    border-radius: 4px;
                    header{
                        border-top:2px solid rgba(0,0,0,0.2);
                        border-bottom: 1px solid rgba(0,0,0,0.05);
                        color: rgba(0,0,0,0.7);
                        padding: 0 12px;
                        p{
                            line-height: 40px;
                            font-size: 14px;
                        }
                        span{
                            font-size: 12px;
                            line-height: 40px;
                        }
                    }
                    main{
                        color: rgba(0,0,0,0.5);
                        font-size: 14px;
                        line-height: 24px;
                        padding: 0 12px;
                        margin-top: 6px;
                    }
                    footer{
                        display: flex;
                        justify-content: flex-end;
                        button{
                            font-size: 12px;
                            color: #3d98ff;
                            width:50px;
                            height: 12px;
                            margin:0;
                            padding:0;
                            background: #fff;
                            border: none;
                            visibility : hidden;
                            outline: none;
                        }
                    }
                }
                li+li{
                    margin-left: 12px;
                }
                li.default{
                    header{
                        border-top:2px solid #f81f22;
                        display: flex;
                        justify-content: space-between;
                    }
                }
                li.default:hover{
                    header{
                        border-top:2px solid #f81f22;
                    }
                    footer{
                        button+button{
                            visibility: visible;
                        }
                    }
                }
                li:hover{
                    cursor: pointer;
                    header{
                        border-top:2px solid #1f85f8;
                    }
                    footer{
                        button{
                            visibility: visible;
                        }
                    }
                }
                li.addAddress,li.addBill{
                    border: 1px solid rgba(0,0,0,0.1);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-family: MicrosoftYaHei-Bold;
                    color: rgba(0,0,0,0.5);
                    i{
                        font-size: 36px;
                    }
                    div{
                        margin-top: 10px;
                        font-size: 14px;
                    }
                }
            }
        }
        .delivery{
            margin: 0 24px;
            .el-button{
                width: 120px;
                height: 35px;
                margin-left: 12px;
                background-color: #f6f6f6;
                margin-bottom: 48px;
                line-height: 0px;
                border: 1px solid #f6f6f6;
                span{
                    line-height: 0px;
                    font-size: 16px;
                }
            }
            .el-button:focus{
                background-color: #1fa4f8;
                border:1px solid #1fa4f8;
                color:white;
            }
        }
        .order{
            h5{
                margin-left: 24px;
            }
            padding-bottom:24px;
            border-bottom:1px solid rgba(0,0,0,0.05);
            .remark{
                margin-top: 24px;
                margin-left: 24px;
                span{
                    font-size: 14px;
                    color:rgba(0,0,0,0.5);
                    line-height: 30px;
                }
                .el-input{
                    width:350px;
                    height: 30px;
                    input{
                        height: 30px;
                    }

                }
            }
        }
        .coupon{
            margin: 24px 0;
            width: 100%;
            height: 40px;
            background-color: rgba(0, 0, 0, 0.05);
            color: rgba(0,0,0,0.7);
            line-height: 40px;
            font-size: 12px;
            p{
                margin-left: 24px;
                i{
                    margin-right: 12px;
                    color:#f13a40;
                }
                span{
                    color: rgba(0,0,0,0.5);
                }
            }
        }
        .coupon:hover{
            cursor: pointer;
        }
        .submitOrder{
            margin-right: 24px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            line-height: 40px;
            margin-bottom: 100px;
            div{
                font-size: 12px;
                color:rgba(0,0,0,0.7);
                span{
                    color:#f81f22;
                    font-size: 26px;
                }
            }
            .el-button{
                width: 180px;
                height: 50px;
                background-color: #f13a40;
                border-radius: 4px;
                color: #fff;
                font-size: 26px;
            }
        }
    }

</style>
