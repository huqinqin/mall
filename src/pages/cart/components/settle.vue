<template>
    <div class="settle">
        <div class="address">
            <h5>{{ $t("main.address.mainAddReceivingAddress") }}</h5>
            <ul>
                <li v-for="item in certiAddress" :class="{checked:item.id === checkedId}" @click="checkAddress(item)">
                    <header>
                        <div><p>{{item.user_name}}({{item.state}}) </p></div>
                        <div><p class="icon">{{ $t("main.cart.settle.mainAddCertiAddress") }}</p></div>
                    </header>
                    <main>
                        <p>{{item.city}}-{{item.address}}</p>
                        <p>{{ $t("main.cart.settle.mainCartSePhone") }}：{{item.mobile}}</p>
                    </main>
                </li>
                <li :class="[{checked:defaultAddress.id === checkedId},{default:defaultAddress.id === defaultId}]"
                    v-show="defaultAddress.user_name"
                    @click="checkAddress(defaultAddress)">
                    <header>
                        <div><p>{{defaultAddress.user_name}}({{defaultAddress.address}}) </p></div>
                    </header>
                    <main>
                        <p>{{defaultAddress.building}}</p>
                        <p>{{ $t("main.cart.settle.mainCartSePhone") }}：{{defaultAddress.mobile}}</p>
                    </main>
                    <footer class="ship-footer">
                        <button class="default" @click.stop="toggleDefault(defaultAddress)">{{
                            $t("main.cart.settle.mainCartSeFitDefault") }}
                        </button>
                        <button class="delete" @click="deleteAddress(defaultAddress,0)">{{
                            $t("main.cart.settle.mainCartSeDel") }}
                        </button>
                        <button @click="editAddress(defaultAddress)">{{ $t("main.cart.settle.mainCartSeAlert") }}
                        </button>
                        <button v-show="defaultAddress.id === defaultId" class="defaultAdd">{{
                            $t("main.cart.settle.mainCartSeDefaultAdress") }}
                        </button>
                    </footer>
                </li>
                <li v-for="(item,key) in addressData"
                    :class="[{checked:item.id === checkedId},{default:item.id === defaultId}]"
                    @click="checkAddress(item)" v-if="item.id !== defaultId">
                    <header>
                        <div><p>{{item.user_name}}({{item.address}}) </p></div>
                    </header>
                    <main>
                        <p>{{item.building}}</p>
                        <p>{{ $t("main.cart.settle.mainCartSePhone") }}：{{item.mobile}}</p>
                    </main>
                    <footer class="ship-footer">
                        <button class="default" @click.stop="toggleDefault(item)">{{
                            $t("main.cart.settle.mainCartSeFitDefault") }}
                        </button>
                        <button class="delete" @click="deleteAddress(item,key)">{{ $t("main.cart.settle.mainCartSeDel") }}
                        </button>
                        <button @click="editAddress(item)">{{ $t("main.cart.settle.mainCartSeAlert") }}</button>
                        <button v-show="item.id === defaultId" class="defaultAdd">{{ $t("main.cart.settle.mainCartSeDefaultAdress") }}
                        </button>
                    </footer>
                </li>
                <li class="addAddress" @click="addAddress">
                    <i class="iconfont icon-add"></i>
                    <div>{{ $t("main.cart.settle.mainCartSeAddAdress") }}</div>
                </li>
            </ul>
            <el-dialog :title='$t("main.address.mainAddReceivingAddress")' :visible.sync="showAddAddress" center
                       @close="clearForm">
                <el-form :model="addForm" ref="addForm">
                    <el-form-item :label='$t("main.cart.settle.mainCartSeStreet")'
                                  :rules="[{required: true, message: this.$t('main.cart.settle.mainCartSeEnterStreet'), trigger: 'blur' }]">
                        <el-input v-model="addForm.street" type="textarea" :row="2"></el-input>
                    </el-form-item>
                    <el-form-item :label='$t("main.cart.settle.mainCartSeCity")'
                                  :rules="[{required: true, message: this.$t('main.cart.settle.mainCartSeEnterCity'), trigger: 'blur' }]">
                        <el-input v-model="addForm.city"></el-input>
                    </el-form-item>
                    <el-form-item :label='$t("main.cart.settle.mainCartSeRegion")'
                                  :rules="[{required: true, message: this.$t('main.cart.settle.mainCartSeEnterRegion'), trigger: 'blur' }]">
                        <lts-location v-model="location.value" :labels.sync="location.label"/>
                    </el-form-item>
                    <el-form-item :label='$t("main.cart.settle.mainCartSeZip")'
                                  :rules="[{required: true, message: this.$t('main.cart.settle.mainCartSeEnterZip'), trigger: 'blur' }]">
                        <el-input v-model="addForm.zipCode"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-form :inline="true" label-position="top">
                            <el-form-item
                                :label='$t("main.cart.settle.mainCartSeFirstName")'
                                :rules="[{required: true, message: this.$t('main.cart.settle.mainCartSeEnterFirst'), trigger: 'blur' }]">
                                <el-input v-model="addForm.first"></el-input>
                            </el-form-item>
                            <el-form-item
                                :label='$t("main.cart.settle.mainCartSeLastName")'
                                :rules="[{required: true, message: this.$t('main.cart.settle.mainCartSeEnterLast'), trigger: 'blur' }]">
                                <el-input v-model=addForm.last></el-input>
                            </el-form-item>
                        </el-form>
                    </el-form-item>
                    <!--<el-form-item :label='$t("main.cart.settle.mainCartSeContact")'-->
                                  <!--:rules="[{required: true, message: this.$t('main.cart.settle.mainCartSeEnterContact'), trigger: 'blur' }]">-->
                        <!--<el-input v-model="addForm.user_name"></el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item :label='$t("main.cart.settle.mainCartSeContactPhone")'
                                  :rules="[{required: true, message: this.$t('main.cart.settle.mainCartSeEnterConPhone'), trigger: 'blur' }]">
                        <el-input v-model="addForm.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="" class="radio">
                        <el-checkbox v-model="addForm.setDefault">{{ $t("main.cart.settle.mainCartSeFitDefaultAddr") }}
                        </el-checkbox>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm">{{ $t("main.cart.settle.mainCartSeSure") }}
                    </el-button>
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
                <el-radio-group v-model="deliveryType" class="selectButtons" @change="selectDilivery">
                    <el-radio-button label="ZITI" value="">{{ $t("main.cart.beforePay.mainCartBefSelfFetch") }}
                    </el-radio-button>
                    <el-radio-button label="SHSM" value="">{{ $t("main.cart.beforePay.mainCartBefExpress") }}
                    </el-radio-button>
                </el-radio-group>
                <div v-if="deliveryType == 'ZITI'" style="color: #666;">
                    {{$t("main.cart.settle.mainCartSeZitiAdress")}}：{{user.shop_address}}
                </div>
                <div class="selectExpress" v-if="deliveryType == 'SHSM'">
                <!--<div class="selectExpress" v-if="false">-->
                    <el-form label-position="top">
                        <el-form-item label="Logistics Company:">
                            <el-radio-group v-model="expressForm.express" @change="simulateCreateTrade">
                                <el-radio label="UPS">UPS</el-radio>
                                <el-radio label="FEDEX">FEDEX</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="Service:">
                            <el-select v-model="expressForm.service"
                                       :placeholder='$t("main.accountNew.register.mainAcReSelect")'
                                       @change="simulateCreateTrade">
                                <el-option
                                    v-for="item in expressOptions"
                                    v-if="!(expressForm.express == 'FEDEX' && item.label.match('UPS')) || expressForm.express == 'UPS'"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox v-model="expressForm.self">{{ $t("main.cart.settle.mainCartSeSelfSign") }}
                            </el-checkbox>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <div class="order">
            <h5>{{ $t("main.cart.settle.mainCartSeOrderInfo") }}</h5>
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark">
                <el-table-column :label='$t("main.cart.list.mainCartliGoodsInfo")' align="left" width="700">
                    <template slot-scope="scope">
                        <a :href="'/detail?t=' + new Date().getTime() +'#/info?id=' + scope.row.id" target="_blank">
                            <div class="cart-item-info">
                                <img class="item-img" :src="scope.row.full_url + '!item_small'">
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
                        <p class="oldPrice" v-if="scope.row.price != scope.row.price_real"><lts-money :money="scope.row.price"></lts-money></p>
                        <p class="red"><span><span><lts-money :money="scope.row.price_real"></lts-money></span></span>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column :label='$t("main.cart.list.mainCartliNum")' width="" prop="num" align="center">
                </el-table-column>
                <el-table-column :label='$t("main.cart.list.mainCartliSubtotal")' width="" align="center">
                    <template slot-scope="scope">
                        <div class="count" ref="count">
                            <p class="red"><lts-money :money="(scope.row.price_real) * scope.row.num"></lts-money></p>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="remark">
                <el-form>
                    <el-form-item label-width="90px" :label='$t("main.cart.settle.mainCartSeBuyersTalk")+ "："'>
                        <el-input v-model="remark"></el-input>
                    </el-form-item>
                </el-form>
                <el-form>
                    <el-form-item label-width="90px" :label='$t("main.someinfo.mainSomeCoupon")+ "："'>
                        <el-select v-model="selectedBonus" @change="selectBonus">
                            <el-option
                                v-for="item in bonusOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="someCount">
            <div class="count">
                <p>{{ $t("main.cart.settle.mainCartSeShouldPay") }}： <span class="money"><span v-if="sum.amount"><lts-money :money="sum.amount"></lts-money></span><span v-else>$0.00</span></span></p>
                <p>{{ $t("main.cart.settle.mainCartSeFright") }}：
                    <span>
                        <i class="iconfont icon-jia11" ></i><span v-if="sum.express"><lts-money :money="sum.express"></lts-money></span><span v-else>$0.00</span>
                    </span>
                </p>
                <p>{{ $t("main.cart.settle.mainCartSeTax") }}：
                    <span>
                        <i class="iconfont icon-jia11"></i><span v-if="sum.tax"><lts-money :money="sum.tax"></lts-money></span><span v-else>$0.00</span>
                    </span>
                </p>
                <p v-if="sum.promotion - minusPro">{{ $t("main.cart.list.mainCartliBenefit") }}：
                    <span>
                        <span>
                            <i class="iconfont icon-jianquminus25"></i><lts-money :money="sum.promotion - minusPro"></lts-money>
                        </span>
                    </span>
                </p>
                <p v-if="minusPro">{{ $t("main.cart.settle.mainCartSeFullProm") }}：
                    <span>
                        <span>
                            <i class="iconfont icon-jianquminus25"></i><lts-money :money="minusPro"></lts-money>
                        </span>
                    </span>
                </p>
                <p v-if="bonusId">{{$t("main.someinfo.mainSomeCoupon")}}：
                    <span>
                        <i class="iconfont icon-jianquminus25"></i><lts-money :money="bonus"/>
                    </span>
                </p>
                <p class="result">{{ $t("main.cart.settle.mainCartSeMustPay") }}：
                    <span>
                        <span v-if="totalPrice && !bonusId"><lts-money :money="totalPrice"></lts-money></span>
                        <span v-if="totalPrice && bonusId"><lts-money :money="totalPrice - bonus"></lts-money></span>
                    </span>
                </p>
            </div>
        </div>
        <div class="allInfo">
            <p>{{$t("main.cart.settle.mainCartSeContact")}}： {{checkedAddress.user_name}}</p>
            <p>{{$t("main.cart.settle.mainCartSeContactPhone")}}： {{checkedAddress.mobile}}</p>
            <p v-if="deliveryType == 'ZITI' ">{{$t("main.cart.settle.mainCartSeZitiAdress")}}：
                <span>{{user.shop_address}}</span></p>
            <p v-else>{{ $t("main.address.mainAddReceivingAddress") }}：
                <span>{{checkedAddress.address}}&nbsp;{{checkedAddress.building}}</span></p>
            <p v-if="deliveryType != 'ZITI' && checkedAddress.valid_time">{{$t("main.cart.settle.mainCartSeQuaAddr")}}：
                {{checkedAddress.address}}</p>
        </div>
        <div class="submit">
            <el-button @click="settle" :disabled="canSubmit || checkedId == 0">
                {{$t("main.cart.settle.mainCartSeSubOrder")}}
            </el-button>
        </div>
    </div>
</template>

<script>
    import addressService from '@/services/AddressService.js'
    import cartService from '@/services/CartService.js'
    import orderService from '@/services/OrderService.js'
    import checkService from '@/services/CheckService.js'
    import expressConfig from 'config/expressConfig'
    import {store, dateUtils} from 'ltsutil'
    import {ltsLocation} from 'ui'

    export default {
        components: {ltsLocation},
        name: 'settle',
        props: ['items'],
        data() {
            return {
                location: {
                    label: [],
                    value: []
                },
                certiAddress: [],
                user: {
                    name: '',
                    phone: '',
                    shop_address:''
                },
                canSubmit: true, // 刚进入页面等待运费税费计算
                expressForm: {
                    express: 'UPS',
                    service: '03',
                    self: false
                },
                expressOptions: expressConfig,
                info: JSON.parse(store.getItem('SESSION_DATA')),
                totalPrice: '',
                inPriceType: 'false', // 送货单是否包含价格，配送方式
                deliveryType: 'SHSM', // 送货上门or快递
                useBalance: false, // 是否使用余额
                showAddAddress: false, // 地址框
                showEditAddress: false,
                cityOptions: [],
                defaultId: '',
                checkedId: 0,
                addForm: {
                    setDefault: false,
                    StateSelection: []

                },
                editOrAdd: true, // 点击的是修改还是新增
                chooseAll: true,
                checkedAddress: {},
                defaultAddress: {},
                editForm: {},
                addressData: [],
                certificateData: [],
                tableData: [],
                multipleTable: [],
                num: 10,
                remark: '',
                sum: {
                    amount: 0.00,
                    express: 0.00,
                    tax: 0.00,
                    benefit: 0.00,
                    result: 0
                },
                data: {
                    link: '',
                    datalist: [
                        {},
                        {},
                        {}
                    ]
                },
                bonusId: '',
                bonus: '',
                selectedBonus: '',
                bonusOption: [],
                bonusArr: [],
                editing:0, // 正在编辑的地址id
                minusPro:0,
                fullrule:[],
                userAddr:''
            }
        },
        methods: {
            selectDilivery(value){
                if(value == 'ZITI'){
                    this.userAddr = this.user.shop_address
                    this.simulateCreateTrade()
                }else{
                    this.userAddr = this.checkedAddress.building ? this.checkedAddress.address + this.checkedAddress.building : this.checkedAddress.address
                    this.simulateCreateTrade()
                }
            },
            // 查询是否有满减活动
            minus(){
                cartService.getFullSetting().then((data) => {
                    if(data.datalist.length > 0){
                        this.fullrule = data.datalist
                        this.calcMinus(this.tableData)
                    }
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.errorMessage})
                })
            },
            calcMinus(item){
                let sum = 0
                this.minusPro = 0
                if(item.length > 0){
                    item.forEach((value) => {
                        if(value.discount_type === 0){
                            sum += value.price_real * value.num
                        }
                    })
                    if(this.fullrule.length > 0){
                        this.fullrule.forEach((value) => {
                            if(sum >= value.start_v){
                                this.minusPro = value.value
                            }
                        })
                    }
                }
            },
            // 重置表单
            clearForm() {
                this.addForm.StateSelection = []
                this.$refs['addForm'].resetFields()
            },
            // 设置默认地址
            toggleDefault(item) {
                this.defaultId = item.id
                addressService.toggleDefault(item).then((data) => {
                    this.getAddressList()
                    this.$ltsMessage.show({
                        type: 'success',
                        message: this.$t('main.cart.settle.mainCartSeSetDefaultSuc')
                    })
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.errorMessage})
                })
            },

            // 选择地址
            checkAddress(item) {
                this.checkedAddress = item
                this.checkedId = item.id
                this.simulateCreateTrade()
            },
            // 编辑地址
            editAddress(item) {
                this.editing = item.id
                let string = JSON.stringify(item)
                this.addForm = JSON.parse(string)
                this.location.value = [this.addForm.lc_code]
                this.addForm.first = this.addForm.user_name.split('-')[0]
                this.addForm.last = this.addForm.user_name.split('-')[1]
                this.addForm.city = this.addForm.building.split('-')[0]
                this.addForm.street = this.addForm.building.split('-')[1]
                this.editOrAdd = true
                this.showAddAddress = true
                if (item.status === 1) {
                    this.addForm.setDefault = true
                } else {
                    this.addForm.setDefault = false
                }
            },
            // 添加地址
            addAddress() {
                for (let val in this.addForm) {
                    this.addForm[val] = this.addForm[val] instanceof Array ? [] : ''
                }
                this.editOrAdd = false
                this.showAddAddress = true
            },
            // 查询个人信息
            getInfo() {
                checkService.getInfo().then((data) => {
                    this.user.name = data.data.contact
                    this.user.phone = data.data.contact_phone
                    this.getAddressList()
                }, (msg) => {
                    this.$ltsMessage({type: 'error', message: msg.error_message})
                })
            },
            // 查询地址列表
            getAddressList() {
                this.defaultId = ''
                this.defaultAddress = []
                addressService.getList().then((data) => {
                    this.addressData = data.data.consumer_address_d_o
                    this.addressData.forEach((value, index) => {
                        // value.user_name = value.user_name.replace('-', ' ')
                        value.zipCode = value.zip_code
                        value.setDefault = false
                        if(value.location_d_o){
                            value.state = value.location_d_o.province
                        }
                        if(this.editing){
                            if (value.status === 1) {
                                value.setDefault = true
                                this.defaultId = value.id
                                this.defaultAddress = value
                            }
                            if(this.editing == value.id){
                                this.checkedId = value.id
                                this.checkedAddress = value
                            }
                        }else if (value.status === 1) {
                            value.setDefault = true
                            this.defaultId = value.id
                            this.checkedId = value.id
                            this.checkedAddress = value
                            this.defaultAddress = value
                        } else {
                            value.setDefault = false
                        }
                    })
                    data.data.distribute_certificate_d_o.forEach((item) => {
                        item.user_name = this.user.name
                        item.mobile = this.user.phone
                        item.zipCode = item.postcode
                    })
                    this.certiAddress = data.data.distribute_certificate_d_o
                    if(!this.defaultId){
                        if(this.addressData.length > 0){
                            this.checkedId = this.addressData[0].id
                            this.checkedAddress = this.addressData[0]
                        }else if(this.certiAddress.length > 0){
                            this.checkedId = this.certiAddress[0].id
                            this.checkedAddress = this.certiAddress[0]
                        }
                    }
                    if(this.checkedId){
                        this.simulateCreateTrade()
                    }
                })
            },
            // 提交地址表单
            submitForm() {
                this.addForm.address = this.location.label[0]
                this.addForm.state = this.location.label[0]
                this.addForm.lcCode = this.location.value[0]
                if (this.editOrAdd) {
                    addressService.updateItem(this.addForm).then((data) => {
                        this.getAddressList()
                        this.$ltsMessage.show({
                            type: 'success',
                            message: this.$t('main.cart.settle.mainCartSeHandleSucc')
                        })
                    }, (msg) => {
                        this.$ltsMessage.show({type: 'error', message: msg.errorMessage})
                    })
                } else {
                    addressService.addItem(this.addForm).then((data) => {
                        this.addressData.push(this.addForm)
                        this.getAddressList()
                        this.$ltsMessage.show({
                            type: 'success',
                            message: this.$t('main.cart.settle.mainCartSeHandleSucc')
                        })
                    }, (msg) => {
                        this.$ltsMessage.show({type: 'error', message: msg.errorMessage})
                    })
                }
                this.showAddAddress = false
            },
            // 删除地址
            deleteAddress(item, key) {
                this.addressData.splice(key, 1)
                addressService.deleteItem(item).then((data) => {
                    this.$ltsMessage.show({type: 'success', message: this.$t('main.cart.settle.mainCartSeHandleErr')})
                })
            },
            settle() {
                this.submitOrder()
            },
            // 选择红包
            selectBonus(value) {
                this.bonusId = value
                this.bonusArr.forEach((val) => {
                    if (val.id == value) {
                        this.bonus = val.realRule.value
                    }
                })
            },
            // 正式下单
            submitOrder() {
                this.userAddr = this.checkedAddress.building ? this.checkedAddress.address + this.checkedAddress.building : this.checkedAddress.address
                this.canSubmit = true
                let items = []
                this.tableData.forEach(function (value, index, array) {
                    let itemPropIds = []
                    itemPropIds.push(value.item_props[0].id)

                    let Obj = {
                        'id': value.id,
                        'num': value.num,
                        'puser_id': value.puser_id,
                        'spu_id': value.spu_id,
                        'item_prop_ids': itemPropIds
                    }
                    items.push(Obj)
                })
                let params = {
                    user_id: this.user_id,
                    items: JSON.stringify(items),
                    hidePrice: this.inPriceType,
                    hdMethod: this.deliveryType,
                    receiverMobile: this.checkedAddress.mobile,
                    userName: this.checkedAddress.user_name,
                    userAddr: this.userAddr,
                    useBalance: false,
                    payMethod: 'online',
                    source: 'work.500mi.com.shop.pifa.market',
                    hdFeeCalculator: 1,
                    hdFee: this.sum.express,
                    taxesFeeCalculator: 1,
                    taxesFee: this.sum.tax,
                    accBonusId: this.bonusId,
                    ship: {
                        logisticsCompany: this.expressForm.express,
                        userAddrIdType: this.checkedAddress.valid_time ? 1 : 0,
                        // 0代表收货地址，1代表分销证地址，1免税费
                        toStates: this.checkedAddress.state,
                        toZipCode: this.checkedAddress.zipCode,
                        serviceCode: this.expressForm.service
                    }
                }
                orderService.createTrade(params, this.remark).then((data) => {
                    this.$emit('submit', 3)
                    this.$router.push({
                        name: 'beforePay',
                        query: {tid: data.data, delivery: this.deliveryType, orderpay: 3}
                    })
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
            },
            // 模拟下单
            simulateCreateTrade() {
                let items = []
                this.tableData.forEach(function (value, index, array) {
                    let itemPropIds = []
                    itemPropIds.push(value.item_props[0].id)
                    let Obj = {
                        'id': value.id,
                        'num': value.num,
                        'puser_id': value.puser_id,
                        'spu_id': value.spu_id,
                        'item_prop_ids': itemPropIds
                    }
                    items.push(Obj)
                })
                let params = {
                    user_id: this.user_id,
                    items: JSON.stringify(items),
                    useBalance: false,
                    payMethod: 'online', //
                    source: 'work.500mi.com.shop.pifa.market',
                    hdMethod: this.deliveryType,
                    hdFeeCalculator: 1,
                    taxesFeeCalculator: 1,
                    ship: {
                        logisticsCompany: this.expressForm.express,
                        userAddrIdType: this.checkedAddress.valid_time ? 1 : 0,
                        // 0代表收货地址，1代表分销证地址，1免税费
                        toStates: this.checkedAddress.state,
                        toZipCode: this.checkedAddress.zipCode,
                        serviceCode: this.expressForm.service
                    }
                }
                this.canSubmit = true
                orderService.simulateCreateTrade(params).then((resp) => {
                    let fee = JSON.parse(resp.data.wholesale_order.fee_hd)
                    this.canSubmit = false
                    this.sum.express = fee.HD_ALL
                    this.sum.tax = fee.TAXES_ALL
                    this.sum.amount = resp.data.wholesale_order.pay
                    this.sum.promotion = resp.data.wholesale_order.discount
                    this.totalPrice = resp.data.wholesale_order.pay_info.pay_real
                    if (resp.data.wholesale_order.pay_info.acc_bonus_list.length > 0) {
                        this.bonusOption = [{label: this.$t("main.someinfo.mainSomeNoBonus"), value: ''}]
                        this.bonusArr = resp.data.wholesale_order.pay_info.acc_bonus_list
                        this.bonusArr.forEach((item) => {
                            item.realRule = JSON.parse(item.rule)[0]
                            this.bonusOption.push({
                                label: this.$t("main.someinfo.mainSomeCoupon") + '：' + this.$t("main.someinfo.mainSomeFull") + ' ' + (item.realRule.startV / 100).toFixed(2) + ' ' + this.$t("main.someinfo.mainSomeMinus") + ' ' + (item.realRule.value / 100).toFixed(2),
                                value: item.id
                            })
                        })
                    } else {
                        this.selectedBonus = this.$t('main.cart.settle.mainCartSeNoBonus')
                    }
                    let ZITI
                    for(let key in resp.data.wholesale_delivery_info_map){
                        ZITI = resp.data.wholesale_delivery_info_map[key].wholesale_sell_order_list[0].shop
                        this.user.shop_address = ZITI.address
                    }
                    this.$emit('submit', 2)
                }, (msg) => {
                    this.$confirm(msg.error_message, '', {
                        showCancelButton: false,
                        showConfirmButton: false,
                        closeOnPressEscape: false,
                        type: 'warning',
                        center: true
                    }).then(() => {

                    }).catch(() => {
                        this.$router.push({
                            path: '/'
                        })
                    });
                })
            }
        },
        mounted() {
            if (this.$route.query && this.$route.query.item) {
                let item = JSON.parse(this.$route.query.item)
                item.item_props.forEach(function (val, key, array) {
                    val.propValue = JSON.parse(val.prop_value)
                })
                item.price = item.item_props[0].price
                item.price_real = item.item_props[0].price_real
                this.tableData.push(item)
            } else  if(this.$route.params && this.$route.params.items){
                let items = this.$route.params.items
                items.forEach((item) => {
                    item.item_props.forEach((val) => {
                        val.propValue = val.prop_value
                    })
                })
                this.tableData = items
                // this.user_id = this.$route.params.userId
            }else{
                let items = JSON.parse(localStorage.getItem('buyNowItem'))
                localStorage.removeItem('buyNowItem')
                this.tableData.push(items)
            }
            console.log(this.tableData)
            // let level = window.localStorage.getItem('userLevel')
            // if(level != 0){
            //     this.tableData.forEach((item) => {
            //         for(let map in item.price_define_do.discount_map){
            //             if(map == level){
            //                 item.price_real = item.price_real * item.price_define_do.discount_map[map] / 100
            //             }
            //         }
            //     })
            // }

            this.tableData.forEach((item) => {
                if (item.discount_type == 1) {
                    item.realPrice = item.item_props[0].price * item.discount / 100
                    item.oldPrice = item.item_props[0].price
                } else if (item.discount_type == 1) {
                    item.realPrice = item.item_props[0].price - item.discount
                    item.oldPrice = item.item_props[0].price
                } else if (item.discount_type == 4) {
                    item.realPrice = JSON.parse(item.sale_rule).price
                    // item.realPrice = item.sale_rule_do.price
                    item.oldPrice = item.item_props[0].price
                } else {
                    item.realPrice = item.item_props[0].price
                }
            })
            this.getInfo()
            // this.expressOptions = this.UPSOptions
            this.minus()
        }
    }
</script>

<style lang="less">
    .location-Popover {
        height: 320px;
        overflow: auto;
        width: 408px;
        ul {
            width: 100%;
        }
    }
    .settle {
        tbody tr td:first-child {
            p {
                line-height: 30px;
                text-align: left;
            }
            .cell a {
                width: 100%;
                display: flex;
                align-items: center;
            }
            .item-img {
                width: 80px;
                height: 80px;
                border: 1px solid #dadada;
                background-position: center;
                background-size: cover;
                flex: 0 0 80px;
            }
            .content {
                width: 300px;
                margin-left: 24px;
            }
            .other {
                width: 250px;
                padding: 0 6px;
                margin-left: 24px;
                p {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

            }
        }
        overflow: hidden;
        p.oldPrice {
            text-decoration: line-through;
        }
        button {
            cursor: pointer;
        }

        .el-table__header-wrapper {
            /*height: 40px;*/
        }
        .has-gutter {
            tr {
                th {
                    background-color: rgba(0, 0, 0, 0.05);
                    .cell {
                        margin-top: -4px;
                    }
                }
            }
        }
        .el-table {
            font-size: 14px;
            /*margin-left: 24px;*/
            /*加上margin-left表格宽度无限增加*/
            .cell {
                .cart-item-info {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    img {
                        width: 80px;
                        height: 80px;
                        border: 1px solid #dadada;
                    }
                    div {
                        p {
                            line-height: 30px;
                            font-size: 14px;
                            text-align: left;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 3;
                            overflow: hidden;
                        }
                    }
                }
            }
            .count {
                color: red;
                font-size: 16px;
            }
            p.red {
                color: #ff423b;
            }

        }
        h5 {
            color: rgba(0, 0, 0, 0.7);
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 23px;
            width: 100%;
        }
        .address {
            margin: 0 24px;
            display: flex;
            flex-wrap: wrap;
            ul {
                display: flex;
                flex-wrap: wrap;
                margin-bottom: 24px;
                width: 100%;
                li {
                    width: 278px;
                    height: 122px;
                    box-shadow: 0px 3px 15px 0px #e8e8e8;
                    border-radius: 4px;
                    margin-bottom: 12px;
                    margin-right: 10px;
                    header {
                        border-top: 2px solid rgba(0, 0, 0, 0.2);
                        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                        color: rgba(0, 0, 0, 0.7);
                        padding: 0 12px;
                        padding-top: 4px;
                        display: flex;
                        justify-content: space-between;
                        div {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        p.icon {
                            font-size: 12px;
                            color: #3d98ff;
                        }
                        p {
                            line-height: 40px;
                            font-size: 14px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        span {
                            font-size: 12px;
                            line-height: 40px;
                        }
                    }
                    main {
                        color: rgba(0, 0, 0, 0.5);
                        font-size: 14px;
                        line-height: 24px;
                        padding: 0 12px;
                        margin-top: 6px;
                        p {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                    footer {
                        text-align: right;
                        padding-right: 12px;
                        button {
                            font-size: 12px;
                            color: #3d98ff;
                            height: 12px;
                            margin: 0;
                            padding: 0;
                            background: #fff;
                            border: none;
                            visibility: hidden;
                            outline: none;
                        }
                        button.defaultAdd{
                            visibility: visible;
                        }
                    }
                    footer.ship-footer {
                        button:hover {
                            color: #f81f22;
                        }
                        button.defaultAdd:hover {
                            color: #3d98ff;
                        }
                    }
                }
                li.checked {
                    header {
                        border-top: 6px solid #f81f22;
                        display: flex;
                        justify-content: space-between;
                        padding-top: 0px;
                    }
                }
                li.default {
                    button.default {
                        display: none;
                    }
                    button.delete {
                        display: none;
                    }
                }
                li.checked:hover {
                    header {
                        border-top: 6px solid #f81f22;
                        padding-top: 0px;
                    }
                    footer {
                        button + button {
                            visibility: visible;
                        }
                    }
                }
                li:hover {
                    cursor: pointer;
                    header {
                        border-top: 6px solid #1f85f8;
                        padding-top: 0px;
                    }
                    footer {
                        button {
                            visibility: visible;
                        }
                    }
                }
                li.addAddress, li.addBill {
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-weight: bold;
                    color: rgba(0, 0, 0, 0.5);
                    i {
                        font-size: 32px;
                        color: #aaa;
                    }
                    div {
                        margin-top: 10px;
                        font-size: 14px;
                    }
                }
            }
            u::after {
                content: "";
                flex: auto;
            }
            .el-dialog {
                width: 488px;
                padding: 40px;
                padding-bottom: 18px;
                overflow: hidden;
                .el-dialog__header {
                    padding-top: 0;
                    font-size: 16px;
                    font-weight: bold;
                    color: #585858;
                    button:hover {
                        i {
                            color: #ff3b41;
                        }
                    }
                }
                .el-dialog__body {
                    padding: 0;
                    .el-cascader {
                        display: block;
                        width: 408px;
                        .el-cascader__label {
                            top: 24px;
                        }
                    }
                    .el-form-item {
                        margin-bottom: 11px;
                        .el-form-item__label {
                            color: #a3a3a3;
                            margin-left: 3px;
                            line-height: 24px;
                        }
                        .el-input {
                            input {
                                height: 30px;
                            }
                        }
                    }
                    .el-form--inline{
                        .el-form-item{
                            margin-right: 0;
                            .el-input{
                                width:180px;
                                input{
                                    border: 1px solid #dcdfe6;
                                }
                            }
                        }
                        .el-form-item:first-child{
                            margin-right: 40px;
                        }

                    }
                    .el-form-item.radio {
                        margin-top: -10px;

                    }
                }
                .dialog-footer {
                    .el-button {
                        background: #ff3b41;
                        width: 160px;
                        height: 40px;
                        font-weight: bold;
                        border: none;
                        line-height: 1px;
                        font-size: 16px;

                    }
                }
            }
        }

        .delivery, .inPrice {
            margin: 0 24px;
            .el-radio-group.selectButtons {
                margin-bottom: 24px;
                label {
                    span {
                        width: 120px;
                        height: 40px;
                        line-height: 18px;
                        border: none;
                        background: #f6f6f6;
                        box-shadow: none;
                    }
                }
                label.is-active {
                    span {
                        background: #1fa4f8;
                    }
                }
            }
            .el-button {
                width: 120px;
                height: 35px;
                background-color: #f6f6f6;
                margin-bottom: 48px;
                line-height: 0px;
                border: 1px solid #f6f6f6;
                span {
                    line-height: 0px;
                    font-size: 16px;
                }
            }

            .active {
                background-color: #1fa4f8;
                border: 1px solid #1fa4f8;
                color: white;
            }
        }
        .delivery {
            .el-radio-group.selectButtons {
                margin-bottom: 6px;
            }
            .selectExpress {
                font-size: 14px;
                .el-form-item {
                    label {
                        font-weight: bold;
                        color: #737373;
                        line-height: 28px;
                        padding: 0;
                    }
                    .el-form-item__content {
                        line-height: 0;
                        .el-radio-group label {
                            font-weight: normal;
                        }
                        input {
                            margin: 6px 0;
                        }
                    }
                    margin-bottom: 0;
                }

            }
        }
        .order {
            width: 100%;
            margin-left: 24px;
            h5 {
                margin-top: 18px;
            }
            border-bottom: 1px solid #f2f2f2;
            .remark {
                margin-top: 24px;
                .el-input {
                    width: 350px;
                    height: 40px;
                    input {
                        height: 40px;
                    }
                }
            }
            .el-table thead,th{
                background-color: #f6f6f6;
            }
        }
        .balance {
            margin: 6px 0;
            padding-left: 24px;
            margin-left: 24px;
            width: 100%;
            height: 40px;
            background-color: rgba(0, 0, 0, 0.05);
            color: rgba(0, 0, 0, 0.7);
            line-height: 40px;
            font-size: 12px;
            p {
                margin-left: 24px;
                i {
                    margin-right: 12px;
                    color: #f13a40;
                    font-size: 12px;
                }
                span {
                    color: rgba(0, 0, 0, 0.5);
                }
            }
        }
        .someCount {
            margin-right: 24px;
            padding-top: 12px;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            line-height: 40px;
            border-bottom: 1px solid #f2f2f2;
            .count {
                .iconfont{
                    font-size: 14px;
                }
                p {
                    text-align: right;
                    font-size: 14px;
                    color: #737373;
                    line-height: 26px;

                    & > span {
                        display: inline-block;
                        width: 100px;
                        color: #f13a40;

                    }
                }
                p.result {
                    font-size: 14px;
                    line-height: 50px;
                    color: #737373;;
                    span {
                        color: #f13a40;
                        font-size: 20px;
                        font-weight: bold;
                    }
                }
            }

        }
        .allInfo {
            text-align: right;
            color: #a3a3a3;
            font-size: 14px;
            margin-top: 12px;
            padding-right: 24px;
            letter-spacing: 0px;
            p {
                line-height: 26px;
            }
        }
        .submit {
            text-align: right;
            margin-right: 24px;
            margin-top: 24px;
            .el-button {
                padding: 0;
                width: 160px;
                height: 40px;
                background-color: #f13a40;
                border-radius: 4px;
                color: #fff;
                span {
                    font-size: 16px;
                    line-height: 0;
                    font-weight: bold;
                }
            }
        }
    }
</style>
