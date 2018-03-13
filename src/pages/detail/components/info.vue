<template>
    <div class="detail">
        <!-- top -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!--<el-breadcrumb-item><a href="/index">首页</a></el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:void(0)">商品详情</a></el-breadcrumb-item>-->
        </el-breadcrumb>
        <div class="detail-top">
            <div class="detail-img-box">
                <div class="prc_info">
                    <div class="big" :style="{backgroundImage:'url('+activeImg.url+')'}">
                    </div>
                    <!--大图下面的小图-->
                    <div class="small">
                        <div class="small_img" v-for="prc in item.item_images" :key="prc.index"
                             @mouseover="showImage(prc,$event)"
                             :style="{backgroundImage:'url('+prc.url+')'}"></div>
                    </div>
                </div>
            </div>
            <div class="detail-sku-box" v-if="item.price">
                <!-- 商品标题-->
                <h3>{{item.item_name}}</h3>
                <!-- 商品属性-->
                <div class="slogan" :class="{ isFinished: finished }">
                    <span v-if="item.discount_type == 1" class="bold">{{ $t("main.detail.info.mainDetInfoDisGoods") }}</span>
                    <span v-else-if="item.discount_type == 2" class="bold">{{ $t("main.detail.info.mainDetInfoDepriceGoods") }}</span>
                    <span v-else-if="item.discount_type == 4" class="bold">{{ $t("main.detail.info.mainDetInfoLimit") }}</span>
                    <div class="count" style="margin-right:24px;" v-if="finished">{{ $t("main.detail.info.mainDetInLimitOver") }} </div>
                    <div class="count" v-if="(item.discount_type == 4) && (!finished) && item.status == 1">
                        <span v-if="!started" class="bold">{{ $t("main.detail.info.mainDetInfoDown") }}</span>
                        <span v-if="started" class="bold">{{ $t("main.detail.info.mainDetInfoEnd") }}</span>
                        <span v-if="day>0">{{day}}{{ $t("main.detail.info.mainDetInfoDay") }}</span>
                        <span v-if="!finished"><div>{{hr}}</div>:<div>{{min}}</div>:<div>{{sec}}</div></span>
                    </div>
                </div>
                <el-form label-position="left" label-width="120px" ref="ruleForm">
                    <el-form-item :label=' $t("main.detail.info.mainDetInfoPrice")' class="price">
                        <div class="tips" v-ltsLoginShow:false>{{ $t("main.detail.info.mainDetInfoComp") }}</div>
                        <div v-ltsLoginShow:true class="detail_price" v-if="!checkedSpu.price">
                            <lts-money :money="item.price"></lts-money>
                        </div>
                        <div v-ltsLoginShow:true class="detail_price" v-else>
                            <span v-if="item.discount_type === 1">
                                <lts-money :money="checkedSpu.price * item.discount / 100"/>
                                <span class="oldPrice"><lts-money :money="checkedSpu.price"/></span>
                            </span>
                            <span v-else-if="item.discount_type === 2">
                                <lts-money :money="checkedSpu.price - item.discount"/>
                                <span class="oldPrice"><lts-money :money="checkedSpu.price"/></span>
                            </span>
                            <span v-else-if="item.discount_type === 4">
                                <lts-money :money="item.sale_rule_do.price"/>
                                <span class="oldPrice"><lts-money :money="checkedSpu.price"/></span>
                            </span>
                            <span v-else><lts-money :money="checkedSpu.price"></lts-money></span>
                        </div>
                    </el-form-item>
                    <div :class="[showPropsError ? 'error' : '']" @click="closeError">
                        <el-form-item v-for="prop in item.item_prop_value_maps" :key="prop.prop_name"
                                      :label="prop.prop_name" class="radio sku_prop">
                            <el-radio-group v-model="prop.checked_prop" @change="checkedProp(prop,item,'checkedSku')">
                                <el-radio v-for="propValue in prop.prop_values" :disabled="!propValue.can_checked"
                                          :label="propValue.value" :key="propValue.value">
                                    {{propValue.value}}
                                    <!--<i class="iconfont icon-duihao"></i>-->
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <i class="el-icon-close"></i>
                        <div class="el-form-item__error">{{ $t("main.detail.info.mainDetInfoContactSale") }}</div>
                    </div>
                    <div :class="[item.num > checkedSpu.storage ? 'error' : '']" @click="closeError">
                        <el-form-item :label='$t("main.detail.info.mainDetInfoAmount")' class="num">
                            <el-input-number
                                v-if="item.discount_type == 4"
                                v-model="item.num"
                                size="mini"
                                :max="item.sale_rule_do.total > item.sale_rule_do.maxinum ? item.sale_rule_do.maxinum : item.sale_rule_do.total"
                                :min=item.sale_rule_do.minimum></el-input-number>
                            <el-input-number
                                v-else
                                v-model="item.num"
                                size="mini"
                                :max="checkedSpu.storage"
                                :min="1"></el-input-number>
                            <span v-if="checkedSpu.storage > 0" class="storage_spec">{{ $t("main.detail.info.mainDetInfoStock") }}</span>
                            <span v-else-if="checkedSpu && checkedSpu.storage <= 0" class="storage_spec">{{ $t("main.detail.info.mainDetInfoNoStock") }}</span>
                            <div class="el-form-item__error">{{ $t("main.detail.info.mainDetInfoExceed") }}！</div>
                            <i class="el-icon-close"></i>
                        </el-form-item>
                    </div>
                    <el-form-item :label='$t("main.detail.info.mainDetInfoCozyTip")' class="mark">
                        <p>{{ $t("main.detail.info.mainDetInfoNoReason") }}</p>
                    </el-form-item>
                    <el-form-item class="buttons" v-if="item.status == 1">
                        <lts-login display="inline-block">
                            <el-button @click.stop="buyNow" type="button" :disabled="(item.discount_type == 4 && (!started) || (started && finished))">
                                {{ $t("main.detail.info.mainDetInfoImme") }}
                            </el-button>
                        </lts-login>
                        <lts-login display="inline-block">
                            <el-button @click.stop="addCart(item, checkedSpu)" type="button" class="addcart">
                                {{ $t("main.detail.info.mainDetInfoJoinCart") }}
                            </el-button>
                        </lts-login>
                    </el-form-item>
                    <el-form-item class="buttons-disabled" v-else-if="item.status != 1">
                        <el-button type="info" plain disabled>
                            {{ $t("main.detail.info.mainDetInfoOffShelf") }}
                        </el-button>
                    </el-form-item>
                    <addCartSuccess
                        :flag.sync="flag"
                        @fade="hide"
                        :info="hotSale"
                    ></addCartSuccess>
                </el-form>
            </div>
            <div class="detail-buy-history">
                <div class="header">
                    <div>{{ $t("main.detail.info.mainDetInfoBuy") }}</div>
                    <div class="icons">
                        <div class="icon-left"><i class="iconfont  icon-iconfontzuo"></i></div>
                        <div class="icon-right"><i class="iconfont  icon-iconfontzuo"></i></div>
                    </div>
                </div>
                <ul v-if="buyHistory">
                    <li v-for="item in buyHistory"
                        :class="{ limit: item.discount_type == 4, reduce:item.discount_type == 2, discount:item.discount_type == 1}">
                        <a :href="'/detail#/?id=' + item.id" target="_blank">
                            <div class="img" :style="{backgroundImage : 'url(' + item.image_value +')'}"></div>
                            <p class="name" :title="item.item_name">{{item.item_name}}</p>
                            <p class="line-four"></p>
                            <div class="item-price">
                                <p v-ltsLoginShow:true class="price">
                                    <lts-money :money="item.price"></lts-money>
                                </p>
                            </div>
                        </a>
                    </li>
                </ul>
                <div v-else class="history_null">
                    <div :style="{backgroundImage:'url(' + nullImg + ')'}"></div>
                </div>
            </div>
        </div>
        <!--configure-->
        <div class="detail-configure" v-if="otherGoods.length > 0" v-ltsLoginShow:true>
            <div class="h5">{{ $t("main.detail.info.mainDetConfigure") }}</div>
            <div class="content">
                <div class="briefInfo">
                    <div class="img" :style="'background-image: url(' + item.image_value + ')'"></div>
                    <el-tooltip class="item" effect="dark" :content="item.item_name" placement="top-start">
                        <div class="name">{{item.item_name}}</div>
                    </el-tooltip>
                    <div class="price" v-if="!checkedSpu.price"><span class="red" style="font-size: 14px;">{{ $t("main.detail.info.mainDetInfoNoChoose") }}</span>
                    </div>
                    <div class="price" v-if="checkedSpu.price">
                        <span class="red">
                            <span v-if="item.discount_type === 1"><lts-money :money="checkedSpu.price * item.discount / 100"></lts-money></span>
                            <span v-else-if="item.discount_type === 2"><lts-money :money="checkedSpu.price - item.discount"></lts-money></span>
                            <span v-else-if="item.discount_type === 4"><lts-money :money="item.sale_rule_do.price"></lts-money></span>
                        </span>
                    </div>
                </div>
                <div class="icon-handle"><i class="iconfont icon-jiahaocu"></i></div>
                <el-button class="handlePage" @click="pre" disabled><i class="el-icon-caret-left"></i></el-button>
                <ul class="others">
                    <li v-for="(value,index) in otherGoods" :key="value.id" class="othersItem">
                        <a :href="'/detail#/?id=' + value.id" target="_blank">
                            <div class="img" :style="'background-image: url(' + value.image_value + ')'"></div>
                        </a>
                        <el-tooltip class="item" effect="dark" :content="value.item_name" placement="top-start">
                            <div class="name">{{value.item_name}}</div>
                        </el-tooltip>
                        <el-popover placement="bottom" popper-class="othersPopover" ref="popover">
                            <el-form label-width="120px" label-position="left">
                                <el-form-item v-for="prop in otherGoodsItem.item_prop_value_maps" :key="prop.prop_name"
                                              :label="prop.prop_name" class="radio sku_prop">
                                    <el-radio-group v-model="prop.checked_prop"
                                                    @change="checkedProp(prop,value,'otherSku')">
                                        <el-radio v-for="propValue in prop.prop_values"
                                                  :disabled="!propValue.can_checked" :label="propValue.value"
                                                  :key="propValue.value">
                                            {{propValue.value}}<i class="iconfont icon-duihao"></i>
                                        </el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item :label=' $t("main.detail.info.mainDetInfoPrice")' class="price">
                                    <div class="tips" v-ltsLoginShow:false>{{ $t("main.detail.info.mainDetInfoComp")
                                        }}
                                    </div>
                                    <div v-ltsLoginShow:true class="detail_price" v-if="!otherSpu.price">
                                        <lts-money :money="value.price"></lts-money>
                                    </div>
                                    <div v-ltsLoginShow:true class="detail_price" v-else>
                                        <span v-if="value.discount_type === 1">
                                            <lts-money :money="otherSpu.price * value.discount / 100"/>
                                            <span class="oldPrice"><lts-money :money="otherSpu.price"/></span>
                                        </span>
                                                    <span v-else-if="value.discount_type === 2">
                                            <lts-money :money="otherSpu.price - value.discount"/>
                                            <span class="oldPrice"><lts-money :money="otherSpu.price"/></span>
                                        </span>
                                                    <span v-else-if="value.discount_type === 4">
                                            <lts-money :money="value.sale_rule_do.price"/>
                                            <span class="oldPrice"><lts-money :money="otherSpu.price"/></span>
                                        </span>
                                        <span v-else><lts-money :money="otherSpu.price"></lts-money></span>
                                    </div>
                                </el-form-item>
                                <el-form-item :label='$t("main.detail.info.mainDetInfoAmount")' class="num">
                                    <el-input-number v-model="value.num" size="mini" :min="1"
                                                     :max="otherSpu.storage"></el-input-number>
                                    <span v-if="otherSpu.storage > 0" class="storage_spec">{{ $t("main.detail.info.mainDetInfoStock") }}</span>
                                    <span v-else-if="otherSpu && otherSpu.storage <= 0" class="storage_spec">{{ $t("main.detail.info.mainDetInfoNoStock") }}</span>
                                    <!--<div v-if="value.num > otherSpu.storage"  class="el-form-item__error">{{ $t("main.detail.info.mainDetInfoExceed") }}！</div>-->
                                </el-form-item>
                                <el-form-item>
                                    <!--:disabled="otherGoodsItem.storage <= 0"-->
                                    <el-button @click="addOthers(value,index)" type="primary" :disabled="!otherSpu.storage">{{
                                        $t("main.detail.info.mainDetSure") }}
                                    </el-button>
                                </el-form-item>
                            </el-form>
                            <el-button class="model" slot="reference" @click="selectModel(value.id)">{{
                                $t("main.detail.info.mainDetSelectModel") }}
                            </el-button>
                        </el-popover>

                    </li>
                </ul>
                <el-button class="handlePage" disabled @click="next"><i class="el-icon-caret-right"></i></el-button>
                <div class="icon-handle"><i class="iconfont icon-dengyu"></i></div>
                <div class="package">
                    <p>
                        {{ $t("main.detail.info.mainDetCheckedPackage") }}<span class="red bold">{{checkedOthers.length}}</span>{{
                        $t("main.detail.info.mainDetPiece") }}
                        <el-popover placement="left-start" popper-class="checkedOthersList" trigger="hover">
                            <ul v-if="checkedOthers.length > 0">
                                <li v-for="item in checkedOthers">
                                    <div class="img" :style="'background-image:url(' + item.item.img + ');'"></div>
                                    <div class="content">
                                        <div class="name">{{item.item.name}}</div>
                                        <div class="props">{{ $t("main.detail.info.mainDetCkeckedProp")
                                            }}：{{item.otherProp.newProps}}
                                        </div>
                                        <div class="about">
                                            <div class="num">{{ $t("main.detail.info.mainDetNum") }}：{{item.item.num}}
                                            </div>
                                            <div class="price">{{ $t("main.detail.info.mainDetSinglePrice") }}：<span
                                                class="bold red" v-if="item.otherProp.price"><lts-money
                                                :money="item.otherProp.price"></lts-money></span></div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <span v-else>{{ $t("main.detail.info.mainDetNoAnyPackage") }}</span>
                            <i class="el-icon-warning" slot="reference"></i>
                        </el-popover>
                    </p>
                    <p>{{ $t("main.detail.info.mainDetPackagePrice") }}：<span class="red bold"><lts-money
                        :money="packagePrice"/></span></p>
                    <el-button @click="addPackage">{{ $t("main.detail.info.mainDetInfoJoinCart") }}</el-button>
                </div>
            </div>
        </div>
        <!-- bottom -->
        <div class="detail-bottom">
            <div class="detail_side">
                <div class="detail_side_img">
                    <div class="header">
                        <div>{{ $t("main.detail.info.mainDetInfoHot") }}</div>
                        <div class="icons">
                            <div class="icon-left"><i class="iconfont  icon-iconfontzuo"></i></div>
                            <div class="icon-right"><i class="iconfont  icon-iconfontzuo"></i></div>
                        </div>
                    </div>
                    <ul class="item-list-box">
                        <li v-for="item in hotSale" :key="item.id"
                            :class="{ limit: item.discount_type == 4, reduce:item.discount_type == 2, discount:item.discount_type == 1}">
                            <a :href="'/detail#/?id=' + item.id" target="_blank">
                                <div class="img" :style="{backgroundImage : 'url(' + item.image_value +')'}"></div>
                                <p class="name" :title="item.item_name">{{item.item_name}}</p>
                                <p class="line-four"></p>
                                <div class="item-price">
                                    <button v-ltsLoginShow:false v-login>{{ $t("main.detail.info.mainDetInfoLoginPrice")
                                        }}
                                    </button>
                                    <p v-ltsLoginShow:true class="price">
                                        <lts-money :money="item.price"></lts-money>
                                    </p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- detail_goods -->
                <div class="detail_goods">
                    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
                        <el-tab-pane :label='$t("main.detail.info.mainDetInfoGoodsInfo")' name="first">
                            <ul class="aboutDetail" :class="[showPropDetail ? 'propOpen' : 'propClose']">
                                <li v-for="(value,index) in aboutDetail" v-if="!value.sku">
                                    <span v-for="(val,key) in value.propValues">
                                        {{key}}: {{val}}
                                    </span>
                                </li>
                                <li class="more" v-if="aboutDetail.length > 8"
                                    @click="showPropDetail = !showPropDetail">{{
                                    $t("main.detail.info.mainDetInfoDetail") }} <i
                                        class="iconfont icon-shangyiye-copy-copy"></i></li>
                            </ul>
                            <div class="item_detail">
                                <div v-html="item.description"></div>
                            </div>
                        </el-tab-pane>
                        <!--<el-tab-pane label="规格与包装" name="second">规格与包装</el-tab-pane>-->
                        <!--<el-tab-pane label="商品评价" name="third">-->
                        <!--&lt;!&ndash;<ul class="comments">&ndash;&gt;-->
                        <!--&lt;!&ndash;<li v-for="item in comments">&ndash;&gt;-->

                        <!--&lt;!&ndash;</li>&ndash;&gt;-->
                        <!--&lt;!&ndash;</ul>&ndash;&gt;-->
                        <!--</el-tab-pane>-->
                        <!--<el-tab-pane label="服务保障" name="fourth">服务保障</el-tab-pane>-->
                        <!--<el-tab-pane label="下载" name="five">下载</el-tab-pane>-->
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery'
    import itemService from '@/services/ItemService'
    import cartService from '@/services/CartService'
    import addCartSuccess from 'ui/components/lts-addCartSuccess.vue'

    export default {
        components: {addCartSuccess},
        name: 'detailInfo',
        props: {},
        data() {
            return {
                packVisible: false,
                activeName: 'first',
                sku_1: '',
                sku_2: '',
                count: '',
                prc_info: [],
                flag: false,
                detail_side_img: [
                    {
                        href: '',
                        src: '',
                        alt: '',
                        info1: '福特科',
                        info2: '300W变焦超长镜头',
                        info3: '$399.00'
                    }
                ],
                item: {},
                checkedSpu: {},
                buyHistory: [],
                hotSale: [],
                activeImg: '',
                aboutDetail: [],
                comment: [],
                nullImg: require('@/assets/img/buynull.png'),
                showPropsError: false,
                day: '',
                hr: '',
                min: '',
                sec: '',
                started: false,
                finished: false,
                start: '',
                end: '',
                showPropDetail: false,
                // 推荐搭配
                otherGoods: [],
                otherGoodsItem: {},
                showSelectModel: true,
                checkedOthers: [],
                otherSpu: {}
            }
        },
        methods: {
            // 倒计时
            countdown() {
                let self = this
                let start = this.start
                let end = this.end
                let now = Date.parse(new Date())
                let date
                // 判断活动是否开始
                if (now < start) {
                    // 还没开始
                    this.started = false
                    this.finished = false
                    date = this.start
                } else if (start <= now <= end) {
                    // 开始了还没结束
                    this.started = true
                    this.finished = false
                    date = this.end
                } else {
                    this.started = true
                    this.finished = true
                }
                let msec = date - now

                // 计算时分秒数
                this.day = parseInt(msec / 1000 / 60 / 60 / 24)
                this.hr = parseInt(msec / 1000 / 60 / 60 % 24)
                this.min = parseInt(msec / 1000 / 60 % 60)
                this.sec = parseInt(msec / 1000 % 60)
                // 个位数前补零
                this.hr = this.hr > 9 ? this.hr : '0' + this.hr
                this.min = this.min > 9 ? this.min : '0' + this.min
                this.sec = this.sec > 9 ? this.sec : '0' + this.sec
                // 倒计时开始
                if (msec >= 0) {
                    setTimeout(function () {
                        self.countdown()
                    }, 1000)
                }
            },
            handleClick(tab, event) {
                console.log(tab, event)
            },
            getItemDetail(id) {
                itemService.getItemDetail(id).then((data) => {
                    data.data.item.item_struct_props.forEach((value, index, array) => {
                        value.propValues = JSON.parse(value.prop_value)
                    })
                    data.data.item.item_struct_props.forEach((value, index, array) => {
                        if (!value.sku) {
                            this.aboutDetail.push(value);
                        }
                    })
                    this.otherGoods = data.data.item.package_item_list
                    this.item = data.data.item
                    this.activeImg = this.item.item_images[0]
                    this.hotSale = data.data.hot_recomment.items
                    this.buyHistory = data.data.user_order_history
                    if (this.item.discount_type === 4) {
                        this.end = this.item.end_time
                        this.start = this.item.start_time
                        let now = Date.parse(new Date())
                        if (this.end > now) {
                            this.countdown()
                        } else {
                            // 活动结束，不显示了
                            this.finished = true
                        }
                    }
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.errorMessage})
                })
            },
            checkedProp(prop, data, type) {
                if (prop.checked_prop !== '') {
                    this.skuMapEach(prop, data, type)
                }
            },
            skuMapEach(prop, data, type) {
                let key = prop.prop_name
                let propValue = {}
                let checkedSkuProp = {}
                // 匹配sku
                checkedSkuProp[key] = prop.checked_prop
                // checkedSkuProp['rules'] = data.sale_rule_do
                // 匹配库存
                propValue[key] = prop.checked_prop
                // propValue['rules'] = data.sale_rule_do
                if (data.item_prop_value_maps.length > 1) {
                    data.item_prop_value_maps.forEach((value, index, array) => {
                        if (value.prop_name !== prop.prop_name) {
                            checkedSkuProp[value.prop_name] = value.checked_prop
                            this.equalsProp(checkedSkuProp, data.item_struct_props, type, data.item_prop_value_maps.length)
                            value.prop_values.forEach((val, key, array) => {
                                propValue[value.prop_name] = val.value
                                val.can_checked = this.equalsProp(propValue, data.item_struct_props, '', data.item_prop_value_maps.length)
                            })
                        }
                    })
                } else {
                    this.equalsProp(checkedSkuProp, data.item_struct_props, type, data.item_prop_value_maps.length)
                }
            },
            equalsProp(propObj, skuList, type, skuLength) {
                let Boolean = 0 // 0 false, 1 true
                let self = this
                try {
                    skuList.forEach(function (sku, index, array) {
                        let cloneProp = JSON.parse(sku.prop_value)
                        let count = 0
                        for (let key in propObj) {
                            if (!cloneProp[key]) {
                                Boolean = 0
                                return false
                            }
                            if (cloneProp[key] === propObj[key]) {
                                count++
                            } else {
                                Boolean = 0
                                return false
                            }
                        }
                        if (count >= skuLength && sku.storage > 0) {
                            if (type === 'checkedSku') {
                                self.checkedSpu = sku
                            } else if (type === 'otherSku') {
                                self.otherSpu = sku

                            }
                            Boolean = 1
                            // 跳出循环抛出的异常 别删
                            throw new Error('foreach.break')
                        } else {
                            Boolean = 0
                        }
                        return false
                    })
                } catch (e) {
                    if (e === 'foreach.break') return
                }
                if (Boolean === 1) {
                    return true
                } else {
                    return false
                }
            },
            addCart(item, spu) {
                if (!this.validate()) {
                    return false
                }
                cartService.putCartPlus(item, spu).then((data) => {
                    if (!this.showPropsError) {
                        this.flag = true
                    }
                    this.selfContext.$emit('addCartSuccess')
                    // this.$ltsMessage.show({type:'success',message:'加入购物车成功'})
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
            },
            hide() {
                this.flag = false
            },
            buyNow() {
                if (!this.validate()) {
                    return false
                }
                let items = {
                    'activity_id': null,
                    'attribute': this.item.attribute,
                    'brand': this.item.brand,
                    'category_id': this.item.category_id,
                    'discount':this.item.discount,
                    'discount_type': this.item.discount_type,
                    'id': this.item.id,
                    'item_name': this.item.item_name,
                    'item_props': [this.checkedSpu],
                    'maxinum': this.item.maxinum,
                    'mininum': this.item.mininum,
                    'num': this.item.num,
                    'price': this.item.price,
                    'price_real': this.item.price_real,
                    'proxy_distribute_num': this.item.proxy_distribute_num,
                    'puser_id': this.item.puser_id,
                    'spec_unit': this.item.spec_unit,
                    'spu_id': this.item.spu_id,
                    'status': this.item.status,
                    'storage': this.item.storage,
                    'tag': this.item.tag,
                    'url': this.item.url,
                    'sale_rule': this.item.sale_rule
                }
                window.open('/cart#/settle?item=' + JSON.stringify(items))
            },
            validate() {
                if (!this.checkedSpu.spu_id) {
                    this.showPropsError = true
                    return false
                } else {
                    return true
                }
            },
            showImage(prc, e) {
                $(e.currentTarget).addClass('is_active')
                $(e.currentTarget).siblings().removeClass('is_active')
                this.activeImg = prc
            },
            closeError() {
                this.showPropsError = false
            },
            // 套餐搭配
            pre() {
                console.log('pre')
            },
            next() {
                console.log('next')
            },
            selectModel(id) {
                this.otherSpu = {}
                itemService.getItemProps(id).then((data) => {
                    this.packVisible = true
                    this.otherGoodsItem = data.data
                    if (this.otherGoods) {
                        this.otherGoods.forEach((item) => {
                            if (item.id === data.data.id) {
                                item.item_prop_value_maps = data.data.item_prop_value_maps
                                item.item_struct_props = data.data.item_struct_props
                            }
                        })
                    }
                }, (msg) => {
                    this.$ltsMessage({type: 'error', message: msg.error_message})
                })
            },
            addOthers(value,index) {
                this.$refs.popover[index].showPopper = false
                this.otherSpu.newProps = this.otherSpu.props.split(',').join('/')
                let obj = {
                    item: {
                        id: value.id,
                        num: value.num,
                        img: value.image_value,
                        name: value.item_name
                    },
                    otherProp: this.otherSpu
                }
                if (this.checkedOthers.length > 0) {
                    if (JSON.stringify(this.checkedOthers).indexOf(value.id) !== -1) {
                        this.checkedOthers.forEach((val) => {
                            if (val.item.id == value.id ) {
                                if(val.otherProp.newProps.indexOf(this.otherSpu.newProps) != -1){
                                    val.item.num = value.num
                                }else {
                                    this.checkedOthers.push(obj)
                                }
                            }
                        })
                    } else {
                        this.checkedOthers.push(obj)
                    }
                } else {
                    this.checkedOthers.push(obj)
                }
            },
            otherItemNum(row, value) {
                console.log(row, value)
            },
            // 添加套餐到购物车
            addPackage() {
                if (this.checkedSpu) {
                    this.addCart(this.item, this.checkedSpu)
                }
                if (this.checkedOthers.length > 0) {
                    this.checkedOthers.forEach((item) => {
                        // this.addCart (item.item, item.otherProp)
                        cartService.putCartPlus(item.item, item.otherProp).then((data) => {
                            if (!this.showPropsError) {
                                this.flag = true
                            }
                            this.selfContext.$emit('addCartSuccess')
                        }, (msg) => {
                            this.$ltsMessage.show({type: 'error', message: msg.error_message})
                        })
                    })
                }
            }
        },
        created() {
            let id = this.$route.query.id
            this.getItemDetail(id)
        },
        computed: {
            packagePrice: function () {
                let price = 0
                if (this.checkedSpu.price) {
                    if (this.item.discount_type === 1) {
                        price = this.checkedSpu.price * this.item.discount / 100
                    } else if (this.item.discount_type === 2) {
                        price = this.checkedSpu.price - this.item.discount
                    } else if (this.item.discount_type === 4) {
                        price = this.item.sale_rule_do.price
                    }
                }
                if (this.checkedOthers.length > 0) {
                    this.checkedOthers.forEach((item) => {
                        price += item.otherProp.price * item.item.num
                    })
                }
                return price
            },
        }
    }
</script>

<style lang="less">
    .othersPopover {
        padding: 12px;
        padding-right: 24px;
        .el-form-item {
            margin-bottom: 0;
            .detail_price {
                font-size: 14px;
            }
            .el-button {
                width: 80px;
                height: 24px;
                padding: 0;
                line-height: 22px;
            }
        }
        .price {
            margin-top: 7px;
        }
        span.oldPrice {
            color: #9a9a9a;
            text-decoration: line-through;
            font-size: 12px;
        }
        .tips {
            border: 1px solid #ff3b41;
            line-height: 21px;
            width: 210px;
            margin-top: 10px;
            font-size: 12px;
            padding-left: 6px;
            color: #ff3b41;
        }
        .detail_price {
            color: #ff3b41;
            font-size: 18px;
            font-weight: bold;

        }
        .radio {
            .el-radio {
                height: 28px;
                padding: 0;
                border-radius: 0;
                line-height: 28px;
                font-size: 14px;
                width: auto !important;
                border: 1px solid #b8b7bd;
                color: red;
                .el-radio__input {
                    display: none;
                }
                .el-radio__label {
                    text-align: center;
                    font-size: 14px;
                    color: #606266;
                    line-height: 19px;
                    padding: 0 9px;
                }
            }
            .iconfont {

            }
            .el-radio:hover {
                border: 1px solid #FF0036
            }
            .el-radio.is-checked {
                border: 1px solid #ff3b41;
                position: relative;
                span {
                    color: rgba(0, 0, 0, 0.5);
                }
            }
            .el-radio.is-disabled {
                border: 1px dashed #a3a3a3;
            }
            .el-radio.is-disabled .el-radio__label {
                color: #a3a3a3;
            }
            .el-radio.is-checked::after {
                content: '';
                width: 0;
                height: 0;
                border-right: 4px solid red;
                border-bottom: 4px solid red;
                border-top: 4px solid transparent;
                border-left: 4px solid transparent;
                position: absolute;
                bottom: 0;
                right: 0;
            }
            .el-radio.is-bordered + .el-radio.is-bordered {
                margin-left: 0px;
            }
        }
        .num {
            margin-bottom: -2px;
            .el-input-number--mini {
                line-height: 24px;
            }
            .el-input-number {
                width: 84px;
                margin-left: 0px;
                margin-bottom: 12px;
                border: 1px solid rgba(0, 0, 0, 0.2);
                border-radius: 0;
                .el-input__inner {
                    border-radius: 0px;
                    border: none;
                    height: 20px;
                    padding: 0 15px;
                }
                span {
                    width: 22px;
                    line-height: 18px;
                    background: rgb(238, 238, 238);
                    border: 1px solid #dcdfe6;
                    margin-left: -2px;
                    margin-top: -2px;
                    i {
                        font-size: 18px;
                        color: rgba(0, 0, 0, 0.7);
                        font-weight: bolder;
                        margin-top: 3px;
                    }
                }
                span.el-input-number__increase {
                    margin-right: -2px;
                }
                span.el-input-number__decrease {
                    i {
                        color: rgba(0, 0, 0, 0.7);
                    }

                }
            }
            .storage_spec {
                font-size: 12px;
                margin-left: 20px;
            }
        }
    }

    .checkedOthersList {
        ul {
            span.red {
                color: #ff3b41;
            }
            span.bold {
                font-weight: bold;
            }
            li {
                border-bottom: 1px solid #ddd;
                display: flex;
                padding: 6px 0;
                .img {
                    width: 80px;
                    height: 80px;
                    background-size: cover;
                    border: 1px solid #ddd;
                }
                .content {
                    margin-left: 12px;
                    & > div {
                        line-height: 22px;
                    }
                    .name {
                        width: 320px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                    .about {
                        display: flex;
                        .num {
                            width: 100px;
                        }
                    }
                }
            }
            li:last-child {
                border-bottom: none;
            }
        }
    }

    .detail {

        li {
            box-sizing: border-box;
            position: relative;
            overflow: hidden;
        }
        li.reduce::before, li.discount::before, li.limit::before {
            content: '活动';
            color: white;
            font-weight: bold;
            font-size: 18px;
            line-height: 35px;
            text-align: center;
            background: rgb(237, 39, 58);
            width: 110px;
            height: 35px;
            position: absolute;
            top: 8px;
            left: -29px;
            transform: rotate(-45deg)
        }
        .el-breadcrumb {
            font-size: 14px;
        }

        .detail-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            .detail-img-box {
                width: 400px;
                margin-right: 48px;
                .prc_info {
                    .big {
                        box-sizing: border-box;
                        border: 1px solid #cccccc;
                        width: 400px;
                        height: 400px;
                        margin-bottom: 12px;
                        background-size: cover;
                        background-position: center center;
                    }
                    .small {
                        display: flex;
                        .small_img {
                            width: 60px;
                            height: 60px;
                            background-size: cover;
                            border: 1px solid rgba(0, 0, 0, 0);
                            background-position: center;
                            cursor: pointer;
                            border: solid 1px #afafb3;
                            margin-right: 20px;
                        }
                        .small_img:last-child {
                            margin-right: 0px;
                        }
                        .is_active {
                            border: solid 1px #48a2ff;
                        }
                    }
                }
                .info_num {
                    color: #a3a3a3;
                    margin-top: 20px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    .icons {
                        width: 120px;
                        display: flex;
                        justify-content: space-between;
                        div {
                            cursor: pointer;
                        }
                        i {
                            font-size: 14px;
                            margin-right: 4px;
                            color: #48a2ff;
                            line-height: 14px;
                        }
                    }
                }
            }
            .error {
                border: solid 1px red;
                padding: 0 10px;
                margin-bottom: 10px !important;
                position: relative;
                .el-form-item__error {
                    display: block;
                }
                .el-icon-close {
                    position: absolute;
                    right: 0px;
                    top: 5px;
                    color: red;
                    display: block;
                }
            }
            .el-form-item__error {
                display: none;
            }
            .el-icon-close {
                display: none;
            }
            .detail-sku-box {
                margin-bottom: 24px;
                margin-right: 12px;
                color: rgba(0, 0, 0, 0.5);
                flex: 1;
                h3 {
                    color: rgba(0, 0, 0, 0.7);
                    font-size: 16px;
                    line-height: 24px;
                    font-weight: bold;
                }
                .slogan {
                    width: 100%;
                    line-height: 40px;
                    font-size: 14px;
                    color: white;
                    background-image: url('../../../assets/img/xqbjt.png');
                    position: relative;
                    span.bold {
                        font-weight: bold;
                        margin: 0 6px 0 12px;
                    }
                    .count {
                        position: absolute;
                        right: 0;
                        top: 10px;
                        line-height: 20px;
                        span {
                            line-height: 20px;
                        }
                        div {
                            display: inline-block;
                            width: 20px;
                            height: 20px;
                            background: #451012;
                            margin: -4px 2px;
                            border-radius: 4px;
                            padding-left: 2px;
                        }
                        div:last-child {
                            margin-right: 12px;
                        }
                    }
                }
                .slogan.isFinished {
                    background-image: none;
                    background-color: #f3f3f3;
                    color: #bbb;
                }
                p.brief {
                    margin: 6px 0 16px 0;
                    span {
                        color: #bcbcbc;
                        font-size: 12px;
                        margin-right: 12px;
                    }
                }
                .el-form-item {
                    margin-bottom: 0;
                }
                .price {
                    margin-top: 7px;
                }
                .tips {
                    border: 1px solid #ff3b41;
                    line-height: 21px;
                    width: 155px;
                    margin-top: 10px;
                    font-size: 12px;
                    padding-left: 6px;
                    color: #ff3b41;
                }
                .detail_price {
                    color: #ff3b41;
                    font-size: 18px;
                    font-weight: bold;
                    span.oldPrice {
                        color: #9a9a9a;
                        text-decoration: line-through;
                        font-size: 14px;
                    }
                }
                .radio {
                    .el-radio {
                        height: 28px;
                        padding: 0;
                        border-radius: 0;
                        line-height: 28px;
                        font-size: 14px;
                        width: auto !important;
                        border: 1px solid #b8b7bd;
                        color: red;
                        .el-radio__input {
                            display: none;
                        }
                        .el-radio__label {
                            text-align: center;
                            font-size: 14px;
                            color: #606266;
                            line-height: 19px;
                            padding: 0 9px;
                        }
                    }
                    .iconfont {

                    }
                    .el-radio:hover {
                        border: 1px solid #FF0036
                    }
                    .el-radio.is-checked {
                        border: 1px solid #ff3b41;
                        position: relative;
                        span {
                            color: rgba(0, 0, 0, 0.5);
                        }
                    }
                    .el-radio.is-disabled {
                        border: 1px dashed #a3a3a3;
                    }
                    .el-radio.is-disabled .el-radio__label {
                        color: #a3a3a3;
                    }
                    .el-radio.is-checked::after {
                        content: '';
                        width: 0;
                        height: 0;
                        border-right: 6px solid red;
                        border-bottom: 6px solid red;
                        border-top: 6px solid transparent;
                        border-left: 6px solid transparent;
                        position: absolute;
                        bottom: 0;
                        right: 0;
                    }
                    .el-radio.is-bordered + .el-radio.is-bordered {
                        margin-left: 0px;
                    }
                }

                .num {
                    margin-bottom: -2px;
                    .el-input-number--mini {
                        line-height: 24px;
                    }
                    .el-input-number {
                        width: 84px;
                        margin-left: 0px;
                        margin-bottom: 12px;
                        border: 1px solid rgba(0, 0, 0, 0.2);
                        border-radius: 0;
                        .el-input__inner {
                            border-radius: 0px;
                            border: none;
                            height: 20px;
                            padding: 0 15px;
                        }
                        span {
                            width: 22px;
                            line-height: 18px;
                            background: rgb(238, 238, 238);
                            border: 1px solid #dcdfe6;
                            margin-left: -2px;
                            margin-top: -2px;
                            i {
                                font-size: 18px;
                                color: rgba(0, 0, 0, 0.7);
                                font-weight: bolder;
                                margin-top: 3px;
                            }
                        }
                        span.el-input-number__increase {
                            margin-right: -2px;
                        }
                        span.el-input-number__decrease {
                            i {
                                color: rgba(0, 0, 0, 0.7);
                            }

                        }
                    }
                    .storage_spec {
                        font-size: 12px;
                        margin-left: 20px;
                    }
                }
                .mark {
                    margin-bottom: 8px;
                    p {
                        font-size: 12px;
                    }
                }
                .el-alert {
                    height: 40px;
                    padding: 8px 0;
                    .el-alert__title {
                        font-size: 12px;
                    }
                }
                .buttons {
                    display: inline-block;
                    button {
                        padding: 0;
                        width: 160px;
                        height: 40px;
                        border: 1px solid #ff3b41;
                        background: #ff3b41;
                        color: white;
                        font-weight: bold;
                        font-size: 18px;
                        border-radius: 4px;
                        cursor: pointer;
                    }
                    .addcart {
                        margin-left: 16px;
                        background: #fff;
                        color: #ff3b41;
                    }
                    button:focus {
                        outline: none;
                    }
                    button.is-disabled{
                        background: #f3f3f3;
                        color: #bbb;
                    }
                    button.is-disabled:hover{
                        cursor: not-allowed;
                    }
                }
                .buttons-disabled button {
                    width: 160px;
                    height: 40px;
                    background: #f3f3f3;
                    color: #bbb;
                    font-weight: bold;
                    font-size: 18px;
                    border-radius: 4px;
                }
            }

        }
        .detail-configure {
            color: #737373;
            margin-top: 12px;
            font-size: 14px;
            .h5 {
                line-height: 38px;
                border-bottom: 1px solid #ddd;
                font-weight: bold;
            }
            .content {
                padding: 12px 0;
                width: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                .briefInfo {
                    .price {
                        span {
                            font-size: 16px;
                            font-weight: bold;
                            line-height: 28px;
                        }
                    }
                }
                span.red {
                    color: #ff3b41;
                }
                span.bold {
                    font-weight: bold;
                }
                .img {
                    width: 100px;
                    height: 100px;
                    border: 1px solid #ddd;
                    background-size: cover;
                }
                .name {
                    width: 100px;
                    line-height: 26px;
                    height: 48px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                ul.others {
                    padding: 0 24px;
                    width: 640px;
                    display: flex;
                    li.othersItem {
                        margin-left: 24px;
                        .el-button {
                            width: 100px;
                            height: 24px;
                            padding: 0;
                            color: #ff3b41;
                        }
                        .el-button.model {
                            margin-top: 6px;
                        }
                    }
                }
                .icon-handle {

                }
                .el-button.handlePage {
                    padding: 0;
                    border: 0;
                    width: 20px;
                    height: 80px;
                    background: #f2f2f2;
                    i {
                        color: #fff;
                        font-size: 18px;
                    }
                }
                .el-button.handlePage:hover {
                    background: #828282;
                }
                .package {
                    p {
                        line-height: 28px;
                    }
                    .el-button {
                        background: #ff3b41;
                        color: #fff;
                        width: 120px;
                        height: 30px;
                        padding: 0;
                    }
                    .el-icon-warning {
                        display: inline-block;
                    }
                }
            }

        }
        .detail-bottom {
            margin-top: 12px;
            .detail_side {
                display: flex;
                justify-content: space-between;
                .detail_side_img {
                    margin-right: 48px;

                }
                .detail_goods {
                    flex: 1;
                    .el-tabs {
                        box-shadow: none;
                        -webkit-box-shadow: none;
                        border-bottom: 1px solid #e3e3e3;
                        .el-tabs__header {
                            background: #f6f6f6;
                            .el-tabs__item {
                                border-top: 2px solid #f6f6f6;
                                width: 122px;
                                font-size: 14px;
                                height: 38px;
                                line-height: 38px;
                                text-align: center;
                                font-weight: bold;
                            }
                            .el-tabs__item:hover {
                                color: #ff3b41;
                            }
                            .el-tabs__item.is-active {
                                color: #ff3b41;
                                background-color: #fff;
                                border-bottom: 1px solid #fff;
                                border-right: 1px solid #e3e3e3;

                            }
                        }
                        .el-tabs__content {
                            color: #a3a3a3;
                            padding: 29px 0;
                            border-bottom: 1px solid #E5E5E5;
                            font-size: 14px;
                            position: relative;
                        }
                        .aboutDetail {
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: flex-start;
                            border-bottom: 1px solid #E5E5E5;
                            margin-left: 24px;
                            max-height: 56px;
                            overflow: hidden;
                            li {
                                width: 24.8%;
                                line-height: 28px;
                            }
                            li.more {
                                position: absolute;
                                top: 80px;
                                left: 100%;
                                margin-left: -80px;
                                cursor: pointer;
                                color: #48a2ff;
                                i {
                                    display: inline-block;
                                    transform: rotateZ(180deg);
                                    font-size: 14px;
                                    position: relative;
                                    top: -2px;

                                }
                            }
                        }
                        .propOpen {
                            max-height: inherit;
                        }
                        .propClose {
                            max-height: 56px;
                        }
                        .imgDetail {
                            max-height: 2000px;
                            overflow: auto;
                            margin-top: 24px;

                            li {
                                width: 100%;
                                height: 500px;
                                background-repeat: no-repeat;
                                background-size: contain;
                                background-position: center;
                            }

                        }
                    }
                    .item_detail {
                        text-align: left;
                        width: 750px;
                        padding-top: 20px;
                    }
                }
            }
        }
        // 购买记录和热卖推荐
        .detail-buy-history {
            ul {
                overflow-y: scroll;
                height: 434px;
            }
        }
        .detail-buy-history, .detail_side_img {
            width: 290px;
            background: #fff;
            border: 1px solid #ccc;
            overflow: hidden;
            .header {
                height: 36px;
                line-height: 36px;
                color: #737373;
                border-bottom: 1px solid #ccc;
                padding: 0 12px;
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                .icons {
                    width: 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    div {
                        color: #b6b6b6;
                        i {
                            display: block;
                            font-size: 14px;
                        }
                    }
                    .icon-right {
                        transform: rotateZ(180deg);
                    }
                }
            }

            li {

                text-align: center;
                background: #ffffff;
                margin: 0 15px;
                border-bottom: 1px solid #f2f2f2;
                .img {
                    width: 146px;
                    height: 146px;
                    margin: 0 auto;
                    background-position: center;
                    background-size: contain;
                    background-repeat: no-repeat;
                }

                p.name {
                    margin: 10px 0;
                    font-size: 14px;
                    color: #a3a3a3;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                }
                p.line-four {
                    border-top: 1px solid #f2f2f2;
                    margin: 0 12px;
                }
                .item-price {
                    margin-top: 24px;
                    margin-bottom: 24px;
                    background-color: #ffffff;
                    font-weight: bold;
                    button {
                        border: none;
                        width: 60%;
                        height: 26px;
                        font-weight: bold;
                        font-size: 12px;
                        color: #ff3b41;
                        box-shadow: 0px 2px 15px 2px #e9e9e9;
                    }
                    .price {
                        color: #ff3b41;
                    }
                }
                position: relative;
            }
            li:last-child {
                border-bottom: none;
            }
            .history_null {
                height: 434px;
                display: flex;
                justify-content: center;
                align-items: center;
                div {
                    width: 183px;
                    height: 128px;
                    background-size: contain;
                    background-repeat: no-repeat;
                }
            }
        }
    }

    .b1200 {
        .detail-img-box {
            margin-right: 29px !important;
        }
    }

</style>
