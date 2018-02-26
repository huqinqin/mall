<template>
    <div class="cartlist">
        <el-table
            ref="multipleTable"
            :data="tableData"
            :default-expand-all="true"
            :stripe="false"
            tooltip-effect="dark"
            style="width: 100%" align="right">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <div v-if="scope.row.discount" class="discountTable subtable">
                        <div class="popover">
                            <div class="popTitle">折扣商品</div>
                            <div class="popDetail">dabazhe</div>
                        </div>
                        <el-table
                            :data="scope.row.discount"
                            :show-header="false"
                            @selection-change="handleSelectionChange"
                            style="width: 100%">
                            <el-table-column type="selection" align="right" @change="checkItem"></el-table-column>
                            <el-table-column align="center" width="600">
                                <template slot-scope="subscope">
                                    <a :href="'/detail#/?id=' + subscope.row.id" >
                                        <div class="item-img" :style="{backgroundImage : 'url(' + 'http://res.500mi.com/item/'+subscope.row.url+')'}"></div>
                                        <div class="content">
                                            <p :title="subscope.row.item_name">{{subscope.row.item_name}}</p>
                                        </div>
                                        <ul class="other">
                                            <li v-for="(item,index) in subscope.row.item_props">
                                                <p v-for="(val,key) in item.prop_value" :title="val">{{key}}:{{val}}</p>
                                            </li>
                                        </ul>
                                    </a>
                                </template>
                            </el-table-column>
                            <el-table-column prop="price" width="" label="单价" align="center">
                                <template slot-scope="subscope">
                                    <p class="oldPrice"><lts-money :money="subscope.row.price"></lts-money></p>
                                    <p><lts-money :money="subscope.row.price_real"></lts-money></p>
                                </template>
                            </el-table-column>
                            <el-table-column prop="" width="" label="库存" align="center">
                                <template slot-scope="subscope">
                                    <p v-if="subscope.row.item_props[0].storage >= subscope.row.num">有货</p>
                                    <p v-else>库存不足</p>
                                </template>
                            </el-table-column>
                            <el-table-column label="数量" width="200" prop="num" align="center">
                                <template slot-scope="subscope">
                                    <div class="inputNumber">
                                        <el-input-number :min='1' size="small" v-model="subscope.row.num" @change="inputNumeberChange(subscope.row)" label="描述文字"></el-input-number>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="小计" width="100" align="center">
                                <template slot-scope="subscope">
                                    <div class="count" ref="count">
                                        <lts-money :money="subscope.row.num*subscope.row.price_real"></lts-money>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="" align="center">
                                <template slot-scope="subscope">
                                    <div class="cart-delete" @click="deleteHandle(subscope.$index, subscope.row)">
                                        <i class="iconfont icon-shanchu"></i>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div v-else-if="scope.row.reduce" class="reduceTable subtable">
                        <div class="popover">
                            <div class="popTitle">减价商品</div>
                            <div class="popDetail">dabazhe</div>
                        </div>
                        <el-table
                            :data="scope.row.reduce"
                            :show-header="false"
                            @selection-change="handleSelectionChange"
                            style="width: 100%">
                            <el-table-column type="selection" align="right" @change="checkItem"></el-table-column>
                            <el-table-column align="center" width="600">
                                <template slot-scope="subscope">
                                    <a :href="'/detail#/?id=' + subscope.row.id" >
                                        <div class="item-img" :style="{backgroundImage : 'url(' + 'http://res.500mi.com/item/'+subscope.row.url+')'}"></div>
                                        <div class="content">
                                            <p :title="subscope.row.item_name">{{subscope.row.item_name}}</p>
                                        </div>
                                        <ul class="other">
                                            <li v-for="(item,index) in subscope.row.item_props">
                                                <p v-for="(val,key) in item.prop_value" :title="val">{{key}}:{{val}}</p>
                                            </li>
                                        </ul>
                                    </a>
                                </template>
                            </el-table-column>
                            <el-table-column prop="price" width="" label="单价" align="center">
                                <template slot-scope="subscope">
                                    <p class="oldPrice"><lts-money :money="subscope.row.price"></lts-money></p>
                                    <lts-money :money="subscope.row.price_real"></lts-money>
                                </template>
                            </el-table-column>
                            <el-table-column prop="" width="" label="库存" align="center">
                                <template slot-scope="subscope">
                                    <p v-if="subscope.row.item_props[0].storage >= subscope.row.num">有货</p>
                                    <p v-else>库存不足</p>
                                </template>
                            </el-table-column>
                            <el-table-column label="数量" width="200" prop="num" align="center">
                                <template slot-scope="subscope">
                                    <div class="inputNumber">
                                        <el-input-number :min='1' size="small" v-model="subscope.row.num" @change="inputNumeberChange(subscope.row)" label="描述文字"></el-input-number>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="小计" width="100" align="center">
                                <template slot-scope="subscope">
                                    <div class="count" ref="count">
                                        <lts-money :money="subscope.row.num*subscope.row.price_real"></lts-money>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="" align="center">
                                <template slot-scope="subscope">
                                    <div class="cart-delete" @click="deleteHandle(subscope.$index, subscope.row)">
                                        <i class="iconfont icon-shanchu"></i>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div v-else-if="scope.row.others" class="otherTable subtable">
                        <el-table
                            :data="scope.row.others"
                            :show-header="false"
                            @selection-change="handleSelectionChange"
                            style="width: 100%">
                            <el-table-column type="selection" align="right" @change="checkItem"></el-table-column>
                            <el-table-column align="center" width="600">
                                <template slot-scope="subscope">
                                    <a :href="'/detail#/?id=' + subscope.row.id" >
                                        <div class="item-img" :style="{backgroundImage : 'url(' + 'http://res.500mi.com/item/'+subscope.row.url+')'}"></div>
                                        <div class="content">
                                            <p :title="subscope.row.item_name">{{subscope.row.item_name}}</p>
                                        </div>
                                        <ul class="other">
                                            <li v-for="(item,index) in subscope.row.item_props">
                                                <p v-for="(val,key) in item.prop_value" :title="val">{{key}}:{{val}}</p>
                                            </li>
                                        </ul>
                                    </a>
                                </template>
                            </el-table-column>
                            <el-table-column prop="price" width="" label="单价" align="center">
                                <template slot-scope="subscope">
                                    <lts-money :money="subscope.row.price"></lts-money>
                                </template>
                            </el-table-column>
                            <el-table-column prop="" width="" label="库存" align="center">
                                <template slot-scope="subscope">
                                    <p v-if="subscope.row.item_props[0].storage >= subscope.row.num">有货</p>
                                    <p v-else>库存不足</p>
                                </template>
                            </el-table-column>
                            <el-table-column label="数量" width="200" prop="num" align="center">
                                <template slot-scope="subscope">
                                    <div class="inputNumber">
                                        <el-input-number :min='1' size="small" v-model="subscope.row.num" @change="inputNumeberChange(subscope.row)" label="描述文字"></el-input-number>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="小计" width="100" align="center">
                                <template slot-scope="subscope">
                                    <div class="count" ref="count">
                                        <lts-money :money="subscope.row.num*subscope.row.price"></lts-money>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="" align="center">
                                <template slot-scope="subscope">
                                    <div class="cart-delete" @click="deleteHandle(subscope.$index, subscope.row)">
                                        <i class="iconfont icon-shanchu"></i>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="商品信息" width="600"></el-table-column>
            <el-table-column width="" label="价格" align="center"></el-table-column>
            <el-table-column width="" label="库存" align="center"></el-table-column>
            <el-table-column label="数量" width="200" prop="num" align="center"></el-table-column>
            <el-table-column label="小计" width="100" align="center"></el-table-column>
            <el-table-column label="操作" width="" align="center"></el-table-column>
        </el-table>
        <div class="table-footer">
            <div class="choose">
                <p>
                    <!--<el-checkbox   v-model="chooseAll" @change="chooseAllSelect(chooseAll)">全选</el-checkbox>-->
                    <!--<span>删除选中商品</span>-->
                </p>
            </div>
            <div class="check">
                <p><span>应付金额&nbsp;&nbsp;<strong><lts-money :money="totalPrice"></lts-money></strong></span></p>
                <el-button @click="check" :disabled="multipleSelection.length <= 0 && tooManyItems">立即结算</el-button>
            </div>
        </div>
        <!--<div class="history">-->
            <!--<h5>购买记录</h5>-->
            <!--<ul class="items">-->
                <!--<li v-for="item in historyData">-->
                    <!--<img :src="item.img" :alt=item.disc>-->
                    <!--<p>{{item.name}}</p>-->
                    <!--<p><span>{{item.info}}</span></p>-->
                    <!--<p><span>{{item.model}}</span></p>-->
                    <!--<div class="price"><lts-money :money="item.price"></lts-money></div>-->
                <!--</li>-->
            <!--</ul>-->
        <!--</div>-->
    </div>
</template>

<script>
    import  cartService from '@/services/CartService.js'
    export default {
        name: "list",
        data() {
            return {
                expands:[],//默认展开全部
                checked:false,
                tooManyItems:true,
                chooseAll: false,
                historyData: [],
                tableData: [
                    {discount:[]},
                    {reduce:[]},
                    {others:[]}],
                tableDataItem:{},
                multipleSelection : [],
                totalPrice:0,
                cart: {
                    cartTotal: 0,
                    cartPriceTotal: 0,
                },
                checkedItem: [{
                    info: '海康威视DS-CD0DDDDDDDDDD',
                    more: {
                        '像素': '1200W',
                        '焦距': '4mm',
                    },
                    price: '$500.00',
                    num: 1,
                    count: '$500.00',
                    handle: 'iconfont  icon-shanchu',
                },{
                    info: '海康威视DS-CD0DDDDDDDDDD',
                    more: {
                        '像素': '1200W',
                        '焦距': '4mm',
                    },
                    price: '$500.00',
                    num: 1,
                    count: '$500.00',
                    handle: 'iconfont  icon-shanchu',
                }],

            }
        },
        mounted(){
            setTimeout(()=>{
                this.queryCartList();
               /* this.putCartPlus();*/
            },20)

        },
        methods:{
           queryCartList(){
               cartService.queryCartList().then((data)=>{
                   console.log(data);
                   data.datalist.forEach((value) => {
                       value.item_props.forEach((item) => {
                           item.prop_value = JSON.parse(item.prop_value)
                       })
                       if(value.discount_type == 1){
                           this.tableData[0].discount.push(value)
                       }else if(value.discount_type == 2){
                           this.tableData[1].reduce.push(value)
                       }else{
                           this.tableData[2].others.push(value)
                       }
                   })
                   console.log(this.tableData)
                   // this.tableData.forEach((item)=>{
                   //     if(item.item_props[0].prop_value == ""||item.item_props[0].prop_value==null||item.item_props[0].prop_value==undefined){
                   //         item.item_props[0].prop_value = {};
                   //     }else{
                   //         item.item_props[0].prop_value = JSON.parse(item.item_props[0].prop_value);
                   //     }
                   // })
                   console.log(this.$refs)
               },(msg)=>{
                    this.$ltsMessage.show({type:'error',message:msg.errorMessage})
               });
           },
           putCartPlus(item){
                return new Promise((resolve, reject) => {
                    cartService.putCartPlus(item,item.item_props[0]).then((data)=>{
                        resolve(data);
                    },(msg)=>{
                        this.$ltsMessage.show({type:'error',message:msg.errorMessage})
                        reject(msg);
                    })
                })
           },
          /*  queryCartList(){
                this.tableData = cartService.queryCartList(158716).datalist;
            },*/
            // 单选框
            handleSelectionChange(value){
                    let total = 0;
                    this.multipleSelection = value;
                    this.multipleSelection.forEach((item) => {
                        total += item.num * item.item_props[0].price;
                    })
                    this.totalPrice = total;
                    this.chooseAll = false;
                    console.log(this.multipleSelection);
            },
            // 全选框 -- 选不上啊
            chooseAllSelect(val){
                if (val) {
                    this.tableData.forEach((val) => {
                        this.$refs.multipleTable.toggleRowSelection(val,true);
                    });
                    this.chooseAll = true;
                }else {
                    this.$refs.multipleTable.clearSelection();
                    this.chooseAll = false;
                }
            },
            // 购物车结算
            check() {
                this.$emit('submit', 1)
                this.$router.push({name: 'settle', params: { 'items': this.multipleSelection,"cartItems":this.cartItemList,"cartTotal":this.cart}})
            },
            // 修改购物车数量
            inputNumeberChange(row){
                let total = 0;
                this.$nextTick( ()=> {
                    this.putCartPlus(row).then((data)=>{
                        this.multipleSelection.forEach((item)=>{
                            setTimeout(()=>{
                                total += item.num   *  item.item_props[0].price;
                                this.totalPrice = total;
                            },20)
                        })
                    },(msg)=>{
                        console.log("加入购物车失败");
                    })
                })



               /* cartService.putCartPlus(params)*/
            },
            // 删除购物车条目
            deleteHandle(index, row){
                row.num = 0;
                this.putCartPlus(row).then((data)=>{
                    this.queryCartList();
                },(msg)=>{
                    this.$ltsMessage.show({type:'error',message:msg.errorMessage})
                })
            },
            // 购物车里选择条目
            checkItem(value){
                this.checkedItem = value
                console.log(this.checkedItem)
            }
        },
        watch: {
            tableData: {
                deep: true,
                handler(newval, oldval) {
                    this.cart.cartTotal = 0;
                    this.cart.cartPriceTotal = 0;
                    newval.forEach((value, index, array) => {
                        if (value.num === 0) {
                            array.splice(index, 1);
                        }
                        this.cart.cartTotal = parseInt(value.num) + parseInt(this.cart.cartTotal);
                        this.cart.cartPriceTotal += parseInt(value.num) * parseInt(value.price);
                    })
                }
            },
        }
  }
</script>

<style lang="less">

    /*.newTable{*/
        /*border-collapse: collapse;*/
        /*tr{*/
            /*display: flex;*/
            /*th,td{*/
                /*flex-grow: 1;*/
            /*}*/
        /*}*/

    /*}*/

    .cartlist{
        .el-table__header-wrapper{
            height: 40px;
        }
        .has-gutter{
            tr{
                th{
                    background-color: rgba(0,0,0,0.05);
                    .el-checkbox{
                        margin-left: -16px;
                    }
                    .cell{
                        margin-top: -4px;
                    }
                }
                th:nth-child(2){
                    .cell{
                        text-align: left;
                    }
                }
            }
        }
        .el-table{
            font-size: 14px;
            tbody tr td:nth-child(2){
                p{
                    line-height: 30px;
                    text-align: left;
                }
            }
            .el-table__row.expanded{
                display: none;
            }
            .el-table__expanded-cell{
                padding:0;
                .subtable{
                    margin-top: 40px;
                    border:1px solid #a3a3a3;
                    position: relative;
                    .popover{
                        position: absolute;
                        top:-40px;
                        height:40px;
                        left:20px;
                        font-size: 12px;
                        display: flex;
                        align-items: center;
                        .popTitle{
                            padding: 4px;
                            background: #f48719;
                            color:white;
                            border-radius: 4px 4px 4px 0;
                        }
                        .popTitle::before{
                            content:'';
                            position: absolute;
                            top:80%;
                            left:0;
                            width: 0;
                            height: 0;
                            border-top: 8px solid #f48719;
                            border-right: 8px solid transparent;
                        }
                        .popDetail{}
                    }
                    tbody{
                        tr:last-child{
                            td{
                                border-bottom:none;
                            }
                        }
                    }
                }
                .dicount{}
                .reduce{}
                .others{}
                a{
                    width:100%;
                    display: flex;
                    align-items: center;
                }
                .item-img{
                    width:80px;
                    height: 80px;
                    border: 1px solid #ddd;
                    background-position: center;
                    background-size: cover;
                    flex:0 0 80px;
                }
                .content{
                    width: 300px;
                    margin-left: 24px;
                }
                .other{
                    width:250px;
                    padding: 0 6px;
                    margin-left: 24px;

                }
                p.oldPrice{
                    text-decoration: line-through;
                }
            }

            .cart-delete{
                line-height: 40px;
                font-size: 22px;
                color: #cecece;
                cursor: pointer;
                i{font-size: 18px;}
            }
            .count{
                color:red;
                font-size: 16px;
            }
            .el-input-number--small{
                width:128px;
            }
        }

        .table-footer{
            margin:40px 24px;
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
                margin-left: 12px;
                .el-checkbox{
                    color: #777;
                    span.el-checkbox__label{
                        margin-left: 12px;
                        font-size: 14px;

                    }
                }
                span{
                    color: #b1b1b1;
                    font-size: 12px;
                }
            }
            .check{
                text-align: right;
                .el-button{
                    background-color: #f81f22;
                    border-radius: 4px;
                    width: 160px;
                    height: 40px;
                    line-height: 0px;
                    font-size: 18px;
                    font-weight: bold;
                    span{
                        color: #fff;
                    }
                }
                span{
                    color: #999;
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
                justify-content: flex-start;
                flex-wrap: wrap;
                padding-left: 4px;
                li{
                    width: 290px;
                    background-color: #ffffff;
                    border:1px solid #eee;
                    border-top:2px solid #3d98ff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 12px;
                    margin-right: 8px;
                    img{
                        margin: 150px 0 96px;
                    }
                    p{
                        line-height: 18px;
                        font-weight: bold;
                        font-size: 18px;
                        margin-top: 12px;
                        color: rgba(0,0,0,0.7);
                        text-align: center;
                        span{
                            font-size: 14px;
                            color: rgba(0,0,0,0.5);
                            font-weight: normal;
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
                        margin-left: 12px;
                    }
                }
                li:hover{
                    animation: floats 0.3s ease forwards;
                }
            }
            padding-bottom: 96px;
            border-bottom:1px solid rgba(0, 0, 0, 0.05);
        }

    }
    @keyframes floats {
        from {
            border:1px solid #eee;
            border-top:2px solid #3d98ff;
        }
        to {
            border:1px solid #fff;
            border-top:2px solid #3d98ff;
            box-shadow: 0px 6px 18px 6px rgba(0, 0, 0, 0.05);
        }
    }

</style>
