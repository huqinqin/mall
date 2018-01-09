<template>
    <div class="settle">
        <div class="address">
            <h5>收货地址：</h5>
            <ul>
                <li class="default">
                    <header>
                        <div><p>抹茶 （浙江省杭州市）</p></div>
                        <div><span>默认地址</span></div>
                    </header>
                    <main>
                        <p>西湖区三墩镇振华路西城博司12楼1201</p>
                        <p>电话：183 **** 5921</p>
                    </main>
                    <footer>
                        <button @click="setDefault">设为默认</button>
                        <button @click="editAddress">修改</button>
                    </footer>
                </li>
                <li>
                    <header>
                        <div><p>抹茶 （浙江省杭州市）</p></div>
                    </header>
                    <main>
                        <p>西湖区三墩镇振华路西城博司12楼1201</p>
                        <p>电话：183 **** 5921</p>
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
                        <div><p>抹茶 （浙江省杭州市）</p></div>
                        <div><span>默认地址</span></div>
                    </header>
                    <main>
                        <p>西湖区三墩镇振华路西城博司12楼1201</p>
                        <p>电话：183 **** 5921</p>
                    </main>
                    <footer>
                        <button @click="setDefault">设为默认</button>
                        <button @click="editBill">修改</button>
                    </footer>
                </li>
                <li>
                    <header>
                        <div><p>抹茶 （浙江省杭州市）</p></div>
                    </header>
                    <main>
                        <p>西湖区三墩镇振华路西城博司12楼1201</p>
                        <p>电话：183 **** 5921</p>
                    </main>
                    <footer>
                        <button @click="setDefault">设为默认</button>
                        <button @click="editBill">修改</button>
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
            <div class="remark"><span>与卖家留言：</span><el-input></el-input></div>
        </div>
        <div class="coupon"><p>+使用优惠券 <span>（没有优惠券可以使用）</span></p></div>
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
            settle(){
                alert('提交订单')
            }
        }
  }
</script>

<style scoped lang="less">
    @import '//at.alicdn.com/t/font_516449_jhzz1yo9t19n3ik9.css';
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
                margin-left: 12px;
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
                        border:none;
                        visibility : hidden;
                    }
                }
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
                color: rgba(0,0,0,0.1);
                font-family: MicrosoftYaHei-Bold;
                i{
                    font-size: 36px;
                }
                div{
                    margin-top: 10px;
                }
            }
        }
    }
    .delivery{
        margin: 0 24px;
        .el-button{
            width: 120px;
            height: 35px;
            border-right: 4px;
            margin-left: 12px;
            background-color: #f6f6f6;
            margin-bottom: 48px;
            span{
                line-height: 30px;
                font-size: 16px;
            }
        }
        .el-button:focus{
            background-color: #1fa4f8;
            color:white;
        }
    }
    .order{
        margin-left: 24px;
        padding-bottom:24px;
        border-bottom:1px solid rgba(0,0,0,0.05);
        .remark{
            margin-top: 24px;
            span{
                font-size: 14px;
                color:rgba(0,0,0,0.5);
                line-height: 30px;
            }
            .el-input{
                width:350px;
                height: 30px;
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
            span{
                color: rgba(0,0,0,0.5);
            }
        }
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
</style>
