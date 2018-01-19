<template>
    <div class="settle">
        <div class="address">
            <h5>收货地址</h5>
            <ul>
                <li  v-for="(item,key) in addressData" :class="{default:item.id === defaultId}" @click="checkAddress(item)">
                    <div v-if="item.status === 1"  >
                        <header>
                            <div><p>{{item.user_name}}({{item.address}}) </p></div>
                        </header>
                        <main>
                            <p>{{item.building}}</p>
                            <p>电话：{{item.mobile}}</p>
                        </main>
                        <footer>
                            <button class="default" @click="toggleDefault(item)">设为默认</button>
                            <button @click="deleteAddress(item,key)">删除</button>
                            <button @click="editAddress(item)">修改</button>
                        </footer>
                    </div>
                    <div v-else>
                        <header>
                            <div><p>{{item.user_name}}({{item.address}}) </p></div>
                        </header>
                        <main>
                            <p>{{item.building}}</p>
                            <p>电话：{{item.mobile}}</p>
                        </main>

                        <footer>
                            <button class="default" @click="toggleDefault(item)">设为默认</button>
                            <button @click="deleteAddress(item,key)">删除</button>
                            <button @click="editAddress(item)">修改</button>
                        </footer>
                    </div>
                </li>
                <li class="addAddress" @click="addAddress">
                    <i class="iconfont icon-add"></i>
                    <div>添加地址</div>
                </li>
            </ul>
            <el-dialog title="收货地址" :visible.sync="showAddAddress" center>
                <el-form :model="addForm">
                    <el-form-item label="地区" >
                        <el-cascader
                            :options="cityOptions"
                            @change="selectCity"
                            :placeholder="addForm.address">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="街道" >
                        <el-input v-model="addForm.building"></el-input>
                    </el-form-item>
                    <el-form-item label="邮编" >
                        <el-input v-model="addForm.lc_code"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人" >
                        <el-input v-model="addForm.user_name"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" >
                        <el-input v-model="addForm.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="" class="radio">
                        <el-checkbox v-model="setDefault">设为默认地址</el-checkbox>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitFrom">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="inPrice">
            <h5>送货单是否包含价格 </h5>
            <el-radio-group v-model="inPrice">
                <el-radio-button label="是"></el-radio-button>
                <el-radio-button label="否"></el-radio-button>
            </el-radio-group>

        </div>
        <div class="delivery">
            <h5>配送方式</h5>
            <el-radio-group v-model="deliver">
                <el-radio-button label="快递"></el-radio-button>
                <el-radio-button label="自提"></el-radio-button>
            </el-radio-group>
        </div>
        <div class="order">
            <h5>订单信息</h5>
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column label="商品信息" width="450" class="column-1"  align="center">
                    <template slot-scope="scope">
                        <div class="cart-item-info">
                            <img :src="scope.row.img" alt="商品">
                            <div class="content">
                                <p>{{scope.row.info}}</p>
                            </div>
                            <div class="other">
                                <p v-for="(value,key) in scope.row.more">{{key}}: {{value}}</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="单价" align="center">
                </el-table-column>
                <el-table-column label="数量" prop="num" align="center">
                </el-table-column>
                <el-table-column label="小计" align="center">
                    <template slot-scope="scope">
                        <div class="count" ref="count">{{scope.row.num*scope.row.price}}</div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="remark"><span>买家留言 </span><el-input></el-input></div>
        </div>
        <div class="balance">
            <el-checkbox v-model="useBalance">使用余额</el-checkbox>
        </div>

        <div class="someCount">
            <div class="count">
                <p>商品应付金额 <span>{{sum.amount.toFixed(2)}}</span></p>
                <p>运费 <span>+{{sum.express.toFixed(2)}}</span></p>
                <p>税费 <span>+{{sum.tax.toFixed(2)}}</span></p>
                <p>红包 <span>-{{sum.benefit.toFixed(2)}}</span></p>
                <p class="result">应付金额 <span>${{totalPrice.toFixed(2)}}</span></p>
            </div>
        </div>
        <div class="allInfo">
            <p>联系人 {{checkedAddress.user_name}}</p>
            <p>联系电话 {{checkedAddress.mobile}}</p>
            <p>收货地址 {{checkedAddress.address}}{{checkedAddress.building}}</p>
            <p>账单地址 {{checkedAddress.address}}{{checkedAddress.building}}</p>
            <p>资格证地址 {{checkedAddress.address}}{{checkedAddress.building}}</p>
        </div>
        <div class="submit">
            <el-button @click="settle">提交订单</el-button>
        </div>
    </div>
</template>

<script>
    import  cartService from '@/services/CartService.js'
    import  addressService from '@/services/AddressService.js'
    import orderService from '@/services/OrderService.js'
    export default {
        name: "settle",
        props: ['items'],
        data(){
            return{
                totalPrice:0,
                // 送货单是否包含价格，配送方式
                inPrice:'否',
                deliver:'快递',
                // 是否使用余额
                useBalance: true,
                // 地址框
                showAddAddress: false,
                showEditAddress: false,
                cityOptions: [
                    {
                        value: '浙江省',
                        label: '浙江省',
                        children: [
                            {
                                value: '杭州市',
                                label: '杭州市',
                                children: [
                                    {
                                        value: '西湖区',
                                        label: '西湖区'
                                    },
                                    {
                                        value: '余杭区',
                                        label: '余杭区'
                                    },
                                    {
                                        value: '滨江区',
                                        label: '滨江区'
                                    }
                                ]
                            },
                            {
                                value: '宁波市',
                                label: '宁波市',
                                children: [
                                    {
                                        value: '江北区',
                                        label: '江北区'
                                    },
                                    {
                                        value: '北仑区',
                                        label: '北仑区'
                                    },
                                    {
                                        value: '奉化区',
                                        label: '奉化区'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: '江苏省',
                        label: '江苏省',
                        children: [
                            {
                                value: '南京市',
                                label: '南京市',
                                children: [
                                    {
                                        value: '玄武区',
                                        label: '玄武区'
                                    },
                                    {
                                        value: '雨花台区',
                                        label: '雨花台区'
                                    },
                                    {
                                        value: '江宁区',
                                        label: '江宁区'
                                    }
                                ]
                            },
                            {
                                value: '苏州市',
                                label: '苏州市',
                                children: [
                                    {
                                        value: '姑苏区',
                                        label: '姑苏区'
                                    },
                                    {
                                        value: '吴江区',
                                        label: '吴江区'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                setDefault: false,
                defaultId:'',
                addForm:{},
                // 点击的是修改还是新增
                editOrAdd: true,
                chooseAll: true,
                checkedAddress: {},
                addressData:[],
                tableData: [],
                multipleTable: [],
                num: 10,
                sum: {
                    amount: 500.00,
                    express: 0.00,
                    tax: 0.00,
                    benefit: 0.00,
                    result: 0
                },
                data:{
                    link: '',
                    datalist:[
                        {},
                        {},
                        {},
                    ]
                }
            }
        },
        methods: {

            // 设置默认地址
            toggleDefault(item){
                addressService.toggleDefault(item).then((data) => {
                    this.$ltsMessage.show({type:'success',message:'操作成功'})
                },(msg)=>{
                    this.$ltsMessage.show({type:'error',message:msg.errorMessage})
                })
            },

            // 选择地址
            checkAddress(item){
                this.checkedAddress = item
                this.defaultId = item.id


            },
            // 编辑地址
            editAddress(item){
                this.editOrAdd = true
                this.showAddAddress = true
                this.addForm = item
            },
            //选择城市
            selectCity(value){
                this.addForm.address = ''
                value.forEach((value)=>{
                    this.addForm.address += value
                })
            },
            // 添加地址
            addAddress(){
                this.editOrAdd = false
                this.showAddAddress = true
            },
            // 查询地址列表
            getAddressList(){
                addressService.getList('158716').then((data) => {
                    this.addressData = data.datalist
                    this.addressData.forEach((value,index)=>{
                        if(value.status === 1){
                            this.defaultId = value.id
                        }
                        let position = value.address.indexOf(value.building)
                        if(position !== 0){
                            value.address = value.address.slice(0,position)
                        }
                    })
                })
            },
            // 提交地址表单
            submitFrom(){
                this.addForm.setDefault = this.setDefault
                this.addForm.rank = this.addressData.length + 1
                if(!this.editOrAdd){
                    this.addressData.push(this.addForm)
                }
                let service = this.editOrAdd ? addressService.updateItem(this.addForm) : addressService.addItem(this.addForm)
                service.then((data) => {
                    this.$ltsMessage.show({type:'success',message:'操作成功'})
                },(msg)=>{
                    this.$ltsMessage.show({type:'error',message:msg.errorMessage})
                })
                this.showAddAddress = false
            },
            // 删除地址
            deleteAddress(item,key){
                this.addressData.splice(key,1)
                addressService.deleteItem(item).then((data) => {
                    this.$ltsMessage.show({type:'success',message:'删除成功'})
                })
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
                this.submitOrder();
            },
            deleteHandle(){
                alert('asf')
            },
            useCoupon(){
                alert('使用优惠券')
            },
            queryCartList(){
                this.tableData = cartService.queryCartList(158716).datalist;

            },
            /*正式下单*/
            submitOrder(){
                let items = [];
                this.tableData.forEach(function(value,index,array){
                    let item_prop_ids = [];
                    value.item_props.forEach(function (val,key,array) {
                        item_prop_ids.push(val.id)
                    })

                    let Obj = {
                        "id":value.id,
                        "num":value.num,
                        "puser_id":value.puser_id,
                        "spu_id":value.spu_id,
                        "item_prop_ids": item_prop_ids
                    }
                    items.push(Obj);
                })
                let params = {
                    user_id : this.user_id,
                    items : JSON.stringify(items),
                    hdMethod : this.deliveryType,
                    remarkList : this.remark,
                    payMethod: "online", //
                    source: "work.500mi.com.shop.pifa.market"
                };
                orderService.createTrade(params).then((data)=>{
                    console.log(data.data);
                    this.$emit('submit',2);
                    this.$router.push({name: 'beforePay',params:{item:[this.totalPrice,data.data]}});
                },(msg)=>{
                    this.$ltsMessage.show({type:'error',message:msg.error_message})
                })
            },
            /*模拟下单*/
            simulateCreateTrade(){
                let items = [];
                this.tableData.forEach(function(value,index,array){
                    let item_prop_ids = [];
                    item_prop_ids.push(value.item_props[0].id);
                    /* value.item_props.forEach(function (val,key,array) {
                         item_prop_ids.push(val.id)
                     })*/
                    console.log(item_prop_ids);
                    let Obj = {
                        "id":value.id,
                        "num":value.num,
                        "puser_id":value.puser_id,
                        "spu_id":value.spu_id,
                        "item_prop_ids": item_prop_ids
                    }
                    items.push(Obj);
                })
                let params = {
                    user_id : this.user_id,
                    items : JSON.stringify(items),
                    payMethod: "online", //
                    source: "work.500mi.com.shop.pifa.market"
                };
                orderService.simulateCreateTrade(params).then((data)=>{
                },(msg)=>{
                    this.$ltsMessage.show({type:'error',message:msg.error_message})
                })
            },
            /*计算价格*/
            calPrice() {
                setTimeout(() => {
                    let arr = [];
                    let len = document.getElementsByClassName("count").length;
                    console.log("len:"+ len);
                    for (let i = 0; i < len-1; i++) {
                        arr[i] = parseInt(document.getElementsByClassName("count")[i].innerHTML);
                    }
                    arr.forEach((value, index) => {
                        this.totalPrice += value;
                        // console.log(value);
                    });
                    // console.log(this.totalPrice);
                })
            },
            // 选择订单是否包含价格
            chooseInPrice(e){
                switch(e.target.innerText){
                    case '是':
                        this.inPrice = 0
                        break
                    case '否':
                        this.inPrice = 1
                }
            },

            // 选择配送方式
            chooseDeliver(e){
                switch(e.target.innerText){
                    case '快递':
                        this.deliver = 0
                        break
                    case '自提':
                        this.deliver = 1
                }
            },

        },
        mounted(){
            // console.log(this.$route.params.items);
            this.formData = this.$route.params.items
            this.sum.result = this.sum.amount + this.sum.express + this.sum.tax - this.sum.benefit;
            this.getAddressList()
            setTimeout(()=>{

                this.queryCartList();
                this.calPrice();
                this.simulateCreateTrade();
            },20)
        }
  }
</script>

<style lang="less">
    .settle{
        overflow: hidden;
        button{
            cursor: pointer;
        }

        .el-table__header-wrapper{
            height: 40px;
        }
        .has-gutter{
            tr{
                th{
                    background-color: rgba(0,0,0,0.05);
                    .cell{
                        margin-top: -4px;
                        margin-left: 24px;
                    }
                }
                th:nth-child(1){
                    .cell{
                        margin-left: 24px;
                    }
                }
            }
        }
        .el-table{
            font-size: 14px;
            .cell{
                .cart-item-info{
                    width:100%;
                    display: flex;
                    justify-content: space-between;
                    img{
                        width:80px;
                        height: 80px;
                        border: 1px solid #dadada;
                    }
                    div{
                        width:120px;
                        p{
                            line-height: 30px;
                            font-size: 12px;
                            text-align: left;
                        }
                        p:first-child{
                            margin-top: 12px;
                        }
                    }
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
        .address{
            margin: 0 24px;
            display: flex;
            flex-wrap: wrap;
            ul{
                display: flex;
                flex-wrap: wrap;
                margin-bottom: 24px;
                li{
                    width: 280px;
                    height: 122px;
                    box-shadow: 0px 3px 15px 0px #f1f1f1;
                    border-radius: 4px;
                    margin-right: 10px;
                    margin-bottom: 12px;

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
                        p{
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
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
                li.default{
                    header{
                        border-top:2px solid #f81f22;
                        display: flex;
                        justify-content: space-between;
                    }
                    button.default{
                        display: none;
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
                    font-weight: bold;
                    color: rgba(0,0,0,0.5);
                    i{
                        font-size: 32px;
                        color: #aaa;
                    }
                    div{
                        margin-top: 10px;
                        font-size: 14px;
                    }
                }
            }
            .el-dialog{
                width:488px;
                padding:40px;
                padding-bottom: 18px;
                overflow: hidden;
                .el-dialog__header{
                    padding-top: 0;
                    font-size: 16px;
                    font-weight: bold;
                    color: #585858;
                    button:hover{
                        i{
                            color:#ff3b41;
                        }
                    }
                }
                .el-dialog__body{
                    padding:0;
                    .el-cascader{
                        display: block;
                        .el-cascader__label{
                            top:24px;
                        }
                    }
                    .el-form-item{
                        margin-bottom: 11px;
                        .el-form-item__label{
                            color: #a3a3a3;
                            margin-left: 3px;
                            line-height: 24px;
                        }
                        .el-input{
                            input{
                                height: 30px;
                            }
                        }
                    }
                    .el-form-item.radio{
                        margin-top: -10px;

                    }
                }
                .dialog-footer{
                    .el-button{
                        background: #ff3b41;
                        width:160px;
                        height: 40px;
                        font-weight: bold;
                        border:none;
                        line-height: 1px;
                        font-size: 16px;

                    }
                }
            }
        }
        .delivery,.inPrice{
            margin: 0 24px;
            .el-radio-group{
                margin-bottom: 24px;
                label{
                    margin-right: 16px;
                    span{
                        width:120px;
                        height: 35px;
                        line-height: 8px;
                        border:none;
                        background: #f6f6f6;
                        border-radius: 4px;
                    }
                }
                label.is-active{
                    span{
                        background: #1fa4f8;
                    }
                }
            }
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

            .active{
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
        .balance{
            margin: 24px 0;
            padding-left: 24px;
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
                    font-size: 12px;
                }
                span{
                    color: rgba(0,0,0,0.5);
                }
            }
        }
        .someCount{
            margin-right: 24px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            line-height: 40px;
            border-bottom: 1px solid #f2f2f2;
            .count{
                p{
                    text-align: right;
                    font-size: 14px;
                    color:#737373;
                    line-height: 26px;
                }
                span{
                    display: inline-block;
                    width:100px;
                    color:#f13a40;

                }
                p.result{
                    font-size: 14px;
                    line-height: 50px;
                    color:#737373;;
                    span{
                        color:#f13a40;
                        font-size: 20px;
                        font-weight: bold;
                    }
                }
            }
        }
        .allInfo{
            text-align: right;
            color: #a3a3a3;
            font-size: 14px;
            margin-top: 12px;
            padding-right: 24px;
            letter-spacing: 0px;
            p{
                line-height: 26px;
            }
        }
        .submit{
            text-align: right;
            margin-right: 24px;
            margin-top: 24px;
            .el-button{
                width: 160px;
                height: 40px;
                background-color: #f13a40;
                border-radius: 4px;
                color: #fff;
                font-size: 18px;
                line-height: 0;
                font-weight: bold;

            }
        }
    }
</style>
