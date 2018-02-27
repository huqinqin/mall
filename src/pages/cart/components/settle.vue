<template>
    <div class="settle">
        <div class="address">
            <h5>{{ $t("main.address.mainAddReceivingAddress") }}</h5>
            <ul>
                <li :class="[{checked:defaultAddress.id === checkedId},{default:defaultAddress.id === defaultId}]" v-show="defaultAddress.user_name" @click="checkAddress(defaultAddress)">
                    <header>
                        <div><p>{{defaultAddress.user_name}}({{defaultAddress.address}}) </p></div>
                    </header>
                    <main>
                        <p>{{defaultAddress.building}}</p>
                        <p>{{ $t("main.cart.settle.mainCartSePhone") }}：{{defaultAddress.mobile}}</p>
                    </main>
                    <footer>
                        <button class="default" @click.stop="toggleDefault(defaultAddress)">{{ $t("main.cart.settle.mainCartSeFitDefault") }}</button>
                        <button v-show="defaultAddress.id === defaultId">{{ $t("main.cart.settle.mainCartSeDefaultAdress") }}</button>
                        <button class="delete" @click="deleteAddress(defaultAddress,0)">{{ $t("main.cart.settle.mainCartSeDel") }}</button>
                        <button @click="editAddress(defaultAddress)">{{ $t("main.cart.settle.mainCartSeAlert") }}</button>
                    </footer>
                </li>
                <li  v-for="(item,key) in addressData" :class="[{checked:item.id === checkedId},{default:item.id === defaultId}]" @click="checkAddress(item)" v-if="item.status === 0">
                    <header>
                        <div><p>{{item.user_name}}({{item.address}}) </p></div>
                    </header>
                    <main>
                        <p>{{item.building}}</p>
                        <p>{{ $t("main.cart.settle.mainCartSePhone") }}：{{item.mobile}}</p>
                    </main>
                    <footer>
                        <button class="default" @click.stop="toggleDefault(item)">{{ $t("main.cart.settle.mainCartSeFitDefault") }}</button>
                        <button v-show="item.id === defaultId">{{ $t("main.cart.settle.mainCartSeDefaultAdress") }}</button>
                        <button class="delete" @click="deleteAddress(item,key)">{{ $t("main.cart.settle.mainCartSeDel") }}</button>
                        <button @click="editAddress(item)">{{ $t("main.cart.settle.mainCartSeAlert") }}</button>
                    </footer>
                </li>
                <li class="addAddress" @click="addAddress">
                    <i class="iconfont icon-add"></i>
                    <div>{{ $t("main.cart.settle.mainCartSeAddAdress") }}</div>
                </li>
            </ul>
            <el-dialog :title='$t("main.address.mainAddReceivingAddress")' :visible.sync="showAddAddress" center>
                <el-form :model="addForm">
                    <el-form-item :label='$t("main.cart.settle.mainCartSeRegion")' :rules="[{required: true, message: this.$t('main.cart.settle.mainCartSeEnterRegion'), trigger: 'blur' }]">
                        <el-cascader
                            :options="cityOptions"
                            @change="selectCity"
                            :placeholder="addForm.address">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item :label='$t("main.cart.settle.mainCartSeStreet")' :rules="[{required: true, message: this.$t('main.cart.settle.mainCartSeEnterStreet'), trigger: 'blur' }]">
                        <el-input v-model="addForm.building"></el-input>
                    </el-form-item>
                    <el-form-item :label='$t("main.cart.settle.mainCartSeZip")' :rules="[{required: true, message: this.$t('main.cart.settle.mainCartSeEnterZip'), trigger: 'blur' }]">
                        <el-input v-model="addForm.zipCode"></el-input>
                    </el-form-item>
                    <el-form-item :label='$t("main.cart.settle.mainCartSeContact")' :rules="[{required: true, message: this.$t('main.cart.settle.mainCartSeEnterContact'), trigger: 'blur' }]">
                        <el-input v-model="addForm.user_name"></el-input>
                    </el-form-item>
                    <el-form-item :label='$t("main.cart.settle.mainCartSeContactPhone")' :rules="[{required: true, message: this.$t('main.cart.settle.mainCartSeEnterConPhone'), trigger: 'blur' }]">
                        <el-input v-model="addForm.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="" class="radio">
                        <el-checkbox v-model="addForm.setDefault">{{ $t("main.cart.settle.mainCartSeFitDefaultAddr") }}</el-checkbox>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitFrom">{{ $t("main.cart.settle.mainCartSeSure") }}</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="inPrice">
            <h5>{{ $t("main.cart.settle.mainCartSeIsContainPrice") }} </h5>
            <el-radio-group v-model="inPriceType" class="selectButtons">
                <el-radio-button label="true">{{ $t("main.cart.settle.mainCartSeYes") }}</el-radio-button>
                <el-radio-button label="false">{{ $t("main.cart.settle.mainCartSeNo") }}</el-radio-button>
            </el-radio-group>
        </div>
        <div class="delivery">
            <h5>{{ $t("main.cart.settle.mainCartSeDistraType") }}： </h5>
            <div>
                <el-radio-group v-model="deliveryType" class="selectButtons">
                    <el-radio-button label="ZITI" value="">{{ $t("main.cart.beforePay.mainCartBefSelfFetch") }}</el-radio-button>
                    <el-radio-button label="SHSM" value="">{{ $t("main.cart.beforePay.mainCartBefExpress") }}</el-radio-button>
                </el-radio-group>
                <div class="selectExpress" v-if="deliveryType == 'SHSM'">
                    <el-form label-position="top">
                        <el-form-item label="LOGISTICS COMPANY:">
                            <el-radio-group v-model="expressForm.express" @change="selectCompany">
                                <el-radio label="UPS">UPS</el-radio>
                                <el-radio label="FEDEX" :disabled="true">FEDEX</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="SERVICE:">
                            <el-select v-model="expressForm.service" :placeholder='$t("main.accountNew.register.mainAcReSelect")'>
                                <el-option
                                v-for="item in expressOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item><el-checkbox v-model="expressForm.self">{{ $t("main.cart.settle.mainCartSeSelfSign") }}</el-checkbox></el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <div class="order">
            <h5>{{ $t("main.cart.settle.mainCartSeOrderInfo") }}</h5>
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark">
                <el-table-column :label='$t("main.cart.list.mainCartliGoodsInfo")'   align="left" width="700">
                    <template slot-scope="scope">
                        <a :href="'/detail#/?id=' + scope.row.id">
                            <div class="cart-item-info">
                                <img class="item-img" :src="'http://res.500mi.com/item/' + scope.row.url">
                                <div class="content">
                                    <p :title="scope.row.item_name">{{scope.row.item_name}}</p>
                                </div>
                                <div class="other">
                                    <div v-for="(value,index) in scope.row.item_props">
                                        <p v-for="(val,key) in value.propValue" :title="val">{{key}}: {{val}}</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </template>
                </el-table-column>
                <el-table-column prop="" width="" :label='$t("main.cart.list.mainCartliUnitPrice")' align="center">
                    <template slot-scope="scope">
                        <lts-money :money="scope.row.item_props[0].price"></lts-money>
                    </template>
                </el-table-column>
                <el-table-column :label='$t("main.cart.list.mainCartliNum")' width="" prop="num" align="center">
                </el-table-column>
                <el-table-column :label='$t("main.cart.list.mainCartliSubtotal")' width="" align="center">
                    <template slot-scope="scope">
                        <div class="count" ref="count">${{(scope.row.num*scope.row.item_props[0].price/100).toFixed(2)}}</div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="remark"><span>{{ $t("main.cart.settle.mainCartSeBuyersTalk") }}： </span><el-input v-model="remark"></el-input></div>
        </div>
        <div class="someCount">
            <div class="count">
                <p>{{ $t("main.cart.settle.mainCartSeShouldPay") }}： <span class="money">${{(sum.amount/100).toFixed(2)}}</span></p>
                <p>{{ $t("main.cart.settle.mainCartSeFright") }}： <span>+{{sum.express.toFixed(2)}}</span></p>
                <p>{{ $t("main.cart.settle.mainCartSeTax") }}： <span>+{{sum.tax.toFixed(2)}}</span></p>
                <p>{{ $t("main.cart.settle.mainCartSeRedBag") }}： <span>-{{sum.benefit.toFixed(2)}}</span></p>
                <p class="result">{{ $t("main.cart.settle.mainCartSeMustPay") }}： <span>${{totalPrice}}</span></p>
            </div>
        </div>
        <div class="allInfo">
            <p>{{$t("main.cart.settle.mainCartSeContact")}}： {{checkedAddress.user_name}}</p>
            <p>{{$t("main.cart.settle.mainCartSeContactPhone")}}： {{checkedAddress.mobile}}</p>
            <p>{{ $t("main.address.mainAddReceivingAddress") }}： {{checkedAddress.address}}{{checkedAddress.building}}</p>
            <p>{{$t("main.cart.settle.mainCartSeAccountAddr")}}： {{checkedAddress.address}}{{checkedAddress.building}}</p>
            <p>{{$t("main.cart.settle.mainCartSeQuaAddr")}}： {{checkedAddress.address}}{{checkedAddress.building}}</p>
        </div>
        <div class="submit">
            <el-button @click="settle">{{$t("main.cart.settle.mainCartSeSubOrder")}}</el-button>
        </div>
    </div>
</template>

<script>
    import  cartService from '@/services/CartService.js'
    import  addressService from '@/services/AddressService.js'
    import orderService from '@/services/OrderService.js'
    import {store} from 'ltsutil'
    export default {
        name: "settle",
        props: ['items'],
        data(){
            return{
                expressForm:{
                    express:'UPS',
                    service:'01',
                    self:false
                },
                expressOptions:[],
                UPSOptions:[
                    {value:'01',label:'Next Day Air'},
                    {value:'02',label:'2nd Day Air'},
                    {value:'03',label:'Ground'},
                    {value:'12',label:'3 Day Select'},
                    {value:'13',label:'Next Day Air Saver'},
                    {value:'14',label:'UPS Next Day Air Early'},
                    {value:'59',label:'2nd Day Air A.M.Valid international values'},
                    {value:'07',label:'Worldwide Express'},
                    {value:'08',label:'Worldwide Expedited'},
                    {value:'11',label:'Standard'},
                    {value:'54',label:'Worldwide Express Plus'},
                    {value:'65',label:'Saver'},
                    {value:'96',label:'UPS Worldwide Express Freight'},
                    {value:'71',label:'UPS Worldwide Express Freight Midday'},
                ],
                FEDEXOptions:[
                    {value:'Ground',label:'1Ground'},
                    {value:'3',label:'13 Day Select'},
                    {value:'2',label:'12nd Day Air'},
                    {value:'Next1',label:'1Next Day Air Server'},
                    {value:'Next2',label:'1Next Day Air'},
                    {value:'Next3',label:'1Next Day Air Early'},
                ],
                info:JSON.parse(store.getItem('SESSION_DATA')),
                totalPrice:'',
                inPriceType:'false', // 送货单是否包含价格，配送方式
                deliveryType:'ZITI', // 送货上门or快递
                useBalance: false,   // 是否使用余额
                showAddAddress: false, // 地址框
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
                defaultId:'',
                checkedId:'',
                addForm:{
                    setDefault: false,
                },
                editOrAdd: true, // 点击的是修改还是新增
                chooseAll: true,
                checkedAddress: {},
                defaultAddress:{},
                addressData:[],
                tableData: [],
                multipleTable: [],
                num: 10,
                remark:'',
                sum: {
                    amount: 0.00,
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
            // 选择快递公司
            selectCompany(value){
                this.expressForm.service = ''
                if(value == 'UPS'){
                    this.expressOptions = this.UPSOptions
                }else if(value == 'FEDEX'){
                    this.expressOptions = this.FEDEXOptions
                }
            },
            // 设置默认地址
            toggleDefault(item){
                this.defaultId = item.id
                addressService.toggleDefault(item).then((data) => {
                    this.getAddressList()
                    this.$ltsMessage.show({type:'success',message: this.$t("main.cart.settle.mainCartSeSetDefaultSuc")})
                },(msg)=>{
                    this.$ltsMessage.show({type:'error',message:msg.errorMessage})
                })
            },

            // 选择地址
            checkAddress(item){
                this.checkedAddress = item
                this.checkedId = item.id
            },
            // 编辑地址
            editAddress(item){
                this.editOrAdd = true
                this.showAddAddress = true
                this.addForm = item
                this.addForm.setDefault = item.status === 1 ? true : false
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
                for(let val in this.addForm){
                    this.addForm[val] = ''
                }
                this.editOrAdd = false
                this.showAddAddress = true
            },
            // 查询地址列表

            getAddressList(){
                addressService.getList().then((data) => {
                    this.addressData = data.datalist
                    this.addressData.forEach((value,index)=>{
                        value.zipCode = value.zip_code

                        if(value.status === 1){
                            console.log(111,value)
                            value.setDefault = true
                            this.defaultId = value.id
                            this.checkedId = value.id
                            this.checkedAddress = value
                            this.defaultAddress = value
                        }else{
                            value.setDefault = false
                        }
                        let position = value.address.indexOf(value.building)
                        if(position !== 0){
                            value.address = value.address.slice(0,position)
                        }
                    })
                    this.simulateCreateTrade()
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
                    this.getAddressList()
                    this.$ltsMessage.show({type:'success',message:this.$t("main.cart.settle.mainCartSeHandleSucc")})
                },(msg)=>{
                    this.$ltsMessage.show({type:'error',message:msg.errorMessage})
                })
                this.showAddAddress = false
            },
            // 删除地址
            deleteAddress(item,key){
                this.addressData.splice(key,1)
                addressService.deleteItem(item).then((data) => {
                    this.$ltsMessage.show({type:'success',message:this.$t("main.cart.settle.mainCartSeHandleErr")})
                })
            },
            settle(){
                this.submitOrder();
            },
            /*正式下单*/
            submitOrder(){
                let items = [];
                this.tableData.forEach(function(value,index,array){
                    let item_prop_ids = [];
                    item_prop_ids.push(value.item_props[0].id);

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
                    hidePrice : this.inPriceType,
                    hdMethod : this.deliveryType,
                    receiverMobile:this.checkedAddress.mobile,
                    userName: this.checkedAddress.user_name,
                    userAddr : this.checkedAddress.address + this.checkedAddress.building,
                    useBalance:false,
                    payMethod: "online",
                    source: "work.500mi.com.shop.pifa.market",
                    hdFeeCaculator:1,
                    hdFee:this.sum.express,
                    taxesFeeCaculator:1,
                    taxesFee:this.sum.tax,
                    ship:{
                        userAddrIdType:0,
                        // 0代表收货地址，1代表分销证地址，1免税费
                        toStates:'California',
                        // this.checkedAddress.address,
                        toZipCode:92093,
                        // this.checkedAddress.zipCode,
                        serviceCode:this.expressForm.service
                    }
                };
                orderService.createTrade(params,this.remark).then((data)=>{
                    this.$emit('submit',3);
                    this.$router.push({name: 'beforePay',query:{tid:data.data,delivery:this.deliveryType}});
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
                    useBalance:false,
                    payMethod: "online", //
                    source: "work.500mi.com.shop.pifa.market",
                    hdFeeCaculator:1,
                    taxesFeeCaculator:1,
                    ship:{
                        userAddrIdType:0,
                        // 0代表收货地址，1代表分销证地址，1免税费
                        toStates:'California',
                        // this.checkedAddress.address,
                        toZipCode:92093,
                        // this.checkedAddress.zipCode,
                        serviceCode:this.expressForm.service
                    }
                };
                orderService.simulateCreateTrade(params).then((resp)=>{
                    let fee = JSON.parse(resp.data.wholesale_order.fee_hd)
                    console.log(fee)
                    this.sum.express = fee.HD_ALL
                    this.sum.tax = fee.TAXES_ALL
                    this.sum.amount = resp.data.wholesale_order.pay_info.money_pay
                    this.totalPrice = resp.data.wholesale_order.pay_real_value;
                    this.$emit('submit',2);
                },(msg)=>{
                    this.$ltsMessage.show({type:'error',message:msg.error_message})
                })
            },
            /*计算价格*/
        },
        mounted(){
            if(this.$route.query && this.$route.query.item){
                let item = JSON.parse(this.$route.query.item);
                item.item_props.forEach(function (val,key,array) {
                    val.propValue = JSON.parse(val.prop_value);
                })
                this.tableData.push(item);
            }else{
                let items = this.$route.params.items
                items.forEach((item) => {
                    item.item_props.forEach((val) => {
                        val.propValue = val.prop_value;
                    })
                })
                this.tableData = items;
                // this.user_id = this.$route.params.userId;
            }
            this.getAddressList()

            this.expressOptions = this.UPSOptions
        },
    }
</script>

<style lang="less">

    tbody tr td:first-child{
        p{
            line-height: 30px;
            text-align: left;
        }
        .cell a{
            width:100%;
            display: flex;
            align-items: center;
        }
        .item-img{
            width:80px;
            height: 80px;
            border: 1px solid #dadada;
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
            p{
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }

        }
    }
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
                    }
                }
            }
        }
        .el-table{
            font-size: 14px;
            /*margin-left: 24px;*/
            /*加上margin-left表格宽度无限增加*/
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
                        /*width:120px;*/
                        p{
                            line-height: 30px;
                            font-size: 14px;
                            text-align: left;
                        }
                        p:first-child{
                            margin-top: 12px;
                        }
                    }
                }
            }
            .count{
                color:red;
                font-size: 16px;
            }

        }
        h5{
            color: rgba(0,0,0,0.7);
            font-weight: bold;
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
                width:100%;
                li{
                    width: 278px;
                    height: 122px;
                    box-shadow: 0px 3px 15px 0px #e8e8e8;
                    border-radius: 4px;
                    margin-bottom: 12px;
                    margin-right: 10px;
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
                li.checked{
                    header{
                        border-top:2px solid #f81f22;
                        display: flex;
                        justify-content: space-between;
                    }
                }
                li.default{
                    button.default{
                        display: none;
                    }
                    button.delete{
                        display: none;
                    }
                }
                li.checked:hover{
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
            u::after {
                content: "";
                flex: auto;
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
            .el-radio-group.selectButtons{
                margin-bottom: 24px;
                label{
                    span{
                        width:120px;
                        height: 40px;
                        line-height: 18px;
                        border:none;
                        background: #f6f6f6;
                        box-shadow:none;
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
        .delivery{
            .el-radio-group.selectButtons {
                margin-bottom: 6px;
            }
            .selectExpress{
                font-size: 14px;
                .el-form-item{
                    label{
                        font-weight: bold;
                        color:#737373;
                        line-height: 28px;
                        padding:0;
                    }
                    .el-form-item__content{
                        line-height: 0;
                        .el-radio-group label{
                            font-weight: normal;
                        }
                        input{
                            margin: 6px 0;
                        }
                    }
                    margin-bottom: 0;
                }

            }
        }
        .order{
            width:100%;
            h5{
                margin-top: 18px;
                margin-left: 24px;
            }
            padding-bottom:24px;
            border-bottom: 1px solid #f2f2f2;
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
            margin: 6px 0;
            padding-left: 24px;
            margin-left: 24px;
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
