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
                             :style="{backgroundImage:'url('+prc.url+'!item_small)'}"></div>
                    </div>
                </div>
            </div>
            <div class="detail-sku-box" v-if="item.price">
                <!-- 商品标题-->
                <h3>{{item.item_name}}</h3>
                <!-- 商品属性-->
                <div class="slogan" :class="{ isFinished: finished }">
                    <span v-if="item.discount_type == 1" class="bold">{{ $t("main.detail.info.mainDetInfoDisGoods") }}</span>
                    <span v-if="item.discount_type == 9" class="bold">{{ $t("main.detail.info.mainDetInfoDisGoods") }}</span>
                    <span v-if="item.discount_type == 0" class="bold">Save $200 with $1000+ purchase&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Save $75 with $500 - $999 purchase&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Save $30 with $300 - $499 purchase</span>
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
                            <span v-if="item.price_real">
                                <lts-money :money="item.price_real"></lts-money>
                                <span class="oldPrice" v-if="item.price_real != item.price"><lts-money :money="item.price"/></span>
                            </span>
                            <span v-else>
                                <lts-money :money="item.price"/>
                            </span>
                        </div>
                        <div v-ltsLoginShow:true class="detail_price" v-else>
                            <lts-money :money="checkedSpu.price_real"></lts-money>
                            <span class="oldPrice" v-if="checkedSpu.price_real != checkedSpu.price"><lts-money :money="checkedSpu.price"/></span>
                        </div>
                    </el-form-item>
                    <div :class="[showPropsError ? 'error' : '']" class="error_box" @click="closeError">
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
                    <div :class="[item.num > checkedSpu.storage ? 'error' : '']">
                        <el-form-item :label='$t("main.detail.info.mainDetInfoAmount")' class="num">
                            <template>
                                <el-input-number
                                    v-model="item.num"
                                    size="mini"
                                    :min="1"></el-input-number>
                                <span v-if="checkedSpu.storage > 0" class="storage_spec">{{ $t("main.detail.info.mainDetInfoStock") }}</span>
                                <span v-else-if="checkedSpu && checkedSpu.storage <= 0" class="storage_spec">{{ $t("main.detail.info.mainDetInfoNoStock") }}</span>
                                <div class="el-form-item__error">{{ $t("main.detail.info.mainDetInfoExceed") }}！</div>
                                <div class="limit-red" v-if="item.discount_type == 4">{{$t("main.detail.info.mainDetPackageMin")}} {{item.sale_rule_do.minimum}}, {{$t("main.detail.info.mainDetPackageMax")}} {{item.sale_rule_do.maxinum}}</div>
                            </template>
                        </el-form-item>
                    </div>
                    <el-form-item :label='$t("main.detail.info.mainDetInfoCozyTip")' class="mark" v-if="item.id == 11651">
                        <p>{{ $t("main.detail.info.mainDetInfoNoReason") }}</p>
                        <p v-if="(item.attribute&16384) == 16384">{{ $t("main.detail.info.mainDetInfoNoCoupon") }}</p>
                    </el-form-item>
                    <el-form-item class="buttons" v-if="item.status == 1">
                        <lts-login display="inline-block">
                            <el-button
                                @click.stop="buyNow"
                                type="button"
                                :disabled="item.num > checkedSpu.storage || (item.discount_type == 4 && item.num < item.sale_rule_do.minimum)"
                                :class="{'hidden':(item.discount_type == 4 && (!started) || (started && finished)) }">
                                {{ $t("main.detail.info.mainDetInfoImme") }}
                            </el-button>
                        </lts-login>
                        <lts-login display="inline-block">
                            <el-button
                                @click.stop="addCart(item, checkedSpu)"
                                type="button" class="addcart"
                                :disabled="(item.discount_type == 4 && finished) || item.num > checkedSpu.storage || (item.discount_type == 4 && item.num < item.sale_rule_do.minimum)">
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
                        :info="recommondInfo"
                    ></addCartSuccess>
                </el-form>
            </div>
            <div class="detail-buy-history">
                <div class="header">
                    <div>{{ $t("main.detail.info.mainDetInfoBuy") }}</div>
                    <div class="icons">
                        <div class="icon-left" @click="handleHistory(-1)"><i class="iconfont  icon-iconfontzuo"></i></div>
                        <div class="icon-right" @click="handleHistory(+1)"><i class="iconfont  icon-iconfontyou-copy"></i></div>
                    </div>
                </div>
                <ul v-if="buyHistory.length > 0">
                    <li v-for="item in historyItems"
                        :class="{ limit: item.discount_type == 4, reduce:item.discount_type == 2, discount:item.discount_type == 1,'newSeller': item.isNew}">
                        <a :href="'/detail?t=' + new Date().getTime() +'#/info?id=' + item.id" target="_blank">
                            <div class="img" :style="{backgroundImage : 'url(' + item.image_value +'!item_middle)'}"></div>
                            <div class="content" :title="item.item_name">
                                <!--<el-tooltip class="item" effect="dark" :content="item.item_name" placement="top">-->
                                    <p class="name">{{item.item_name}}</p>
                                <!--</el-tooltip>-->
                            </div>
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
        <a href="/search/#/detail?cateId=%5B%5D&discountype=0"><div class="detailDiscount" :style="{backgroundImage : 'url(' + img + ')'}"></div></a>
        <!--configure-->
        <div class="detail-configure" v-if="otherGoods.length > 0" v-ltsLoginShow:true>
            <div class="h5">{{ $t("main.detail.info.mainDetConfigure") }}</div>
            <div class="content">
                <div class="briefInfo">
                    <div class="img" :style="'background-image: url(' + item.image_value + ')'"></div>
                    <!--<el-tooltip class="item" effect="dark" :content="item.item_name" placement="top">-->
                        <div class="name" :title="item.item_name">{{item.item_name}}</div>
                    <!--</el-tooltip>-->
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
                <ul class="others">
                    <li v-for="(value,index) in otherGoods" :key="value.id" class="othersItem briefInfo">
                        <a :href="'/detail?t=' + new Date().getTime() +'#/info?id=' + value.id" target="_blank">
                            <div class="img" :style="'background-image: url(' + value.image_value + ')'"></div>
                        </a>
                        <div class="name" :title="value.item_name">{{value.item_name}}</div>
                        <div class="price">
                            <span class="red" v-if="value.price_real"><lts-money :money="value.price_real"></lts-money></span>
                            <!--<el-button @click="addPackage(value)">++</el-button>-->
                            <el-button class="icon" :disabled="value.checked"><i class="iconfont" v-ltsLoginShow:true  @click="addPackage(value)" :class="value.checked ? 'icon-chenggong1':'icon-gouwuche-copy'"></i></el-button>
                        </div>
                    </li>
                </ul>
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
                            <div class="icon-right"><i class="iconfont  icon-iconfontyou-copy"></i></div>
                        </div>
                    </div>
                    <ul class="item-list-box">
                        <li v-for="item in hotSale" :key="item.id"
                            :class="{ limit: item.discount_type == 4, reduce:item.discount_type == 2, discount:item.discount_type == 1,'newSeller': item.isNew}">
                            <a :href="'/detail?t=' + new Date().getTime() +'#/info?id=' + item.id" target="_blank">
                                <div class="img" :style="{backgroundImage : 'url(' + item.image_value +'!item_middle)'}"></div>
                                <div class="content" >
                                    <!--<el-tooltip class="item" effect="dark" :content="item.item_name" placement="top">-->
                                        <p class="name" :title="item.item_name">{{item.item_name}}</p>
                                    <!--</el-tooltip>-->
                                </div>
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
                            <ul class="aboutDetail" :class="[showPropDetail ? 'propOpen' : 'propClose']" v-if="aboutDetail.length > 0">
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
    import timeService from '@/services/TimeService.js'
    import addCartSuccess from 'ui/components/lts-addCartSuccess.vue'

    function getDefaultSkuItem(prod) {
        const structProps = prod.item_struct_props
        let propMap = null
        let defaultSkuItem = {item: null, props: [], propMap: null}
        structProps.forEach(v => {
          if (!propMap && v.sku && v.storage > 0) {
              defaultSkuItem.item = v
              defaultSkuItem.propMap = JSON.parse(v.prop_value)
              propMap = defaultSkuItem.propMap
          }
        })
        propMap && prod.item_prop_value_maps.forEach(x => {
          let pvalue = propMap[x.prop_name]
          if (pvalue !== undefined){
              x.prop_values.forEach(prop => {
                if (prop.value === pvalue) {
                  x.checked_prop = pvalue
                  defaultSkuItem.props.push(x)
                }
              })
          }
        })
        return defaultSkuItem;
    }

    export default {
        components: {addCartSuccess},
        name: 'detailInfo',
        props: {},
        data() {
            return {
                img: require('../../../assets/img/detail0504.png'),
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
                otherSpu: {},
                recommondInfo:[],
                historyIndex:0,
                historyItems:[],
                level:'0',
                otherItemSpu:{}
            }
        },
        methods: {
            // 购买历史左右选择
            handleHistory(index){
                // console.log(this.historyIndex)
                if(index > 0){
                    if(this.historyIndex == Math.floor(this.buyHistory.length / 2)){
                        this.historyIndex = 0
                    }else {
                        this.historyIndex += index
                    }
                }else{
                    if(this.historyIndex == 0){
                        this.historyIndex = Math.floor(this.buyHistory.length / 2)
                    }else{
                        this.historyIndex += index
                    }
                }
                this.historyItems = this.buyHistory.slice(this.historyIndex * 2, this.historyIndex * 2 + 2)
            },
            // 倒计时
            countdown(time) {
                let self = this
                let start = this.start
                let end = this.end
                let now = time
                // let now = Date.parse(new Date())
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
                        self.countdown(now + 1000)
                    }, 1000)
                }
            },
            handleClick(tab, event) {
                console.log(tab, event)
            },
            getItemDetail(id) {
                itemService.getItemDetail(id).then((data) => {
                    // data = {"data":{"hot_recomment":{"id":33,"content":"10060,10977,10164,10171,10250,10401,11363","rank":66,"status":0,"items":[{"diy_price":false,"percent":false,"tag":"","type":0,"commission_t":0,"upshelf":true,"stock_out":0.000,"fixed":false,"image_value":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/5537e32443689c0990b1767d9a9dfd64.png","price_value":"45.00","follow_num":0,"category_name":"","rank":1094,"wholesale":true,"edate":1525369770000,"discount_type":0,"order_num":0.000,"prepay":false,"open_code":"lts2open","sale_rule":"","cdate":1521158909000,"spot_rule":"","order_promotion":true,"package_item_list":[],"parent_id":0,"app_show":false,"partner_id":4,"short_code":"","biz_type":101,"sinr":"LTCMHT2722-28","shop_id":4,"status":1,"best_box":false,"category_id":17,"manager_cate_name":"","cost_price_value":"0","spot_price_value":"0","distribution":false,"url":"5537e32443689c0990b1767d9a9dfd64.png","size":"","price_define":"{\"discountMap\":{\"3\":100,\"2\":100,\"1\":100,\"5\":100,\"4\":100},\"kaPriceMap\":{},\"priceMap\":{}}","discount":0,"commission_s":0,"price":4500,"spu_id":123,"spot_price":0,"attr_activity":false,"min_num":0.000,"item_name":"CMHT2722-28, eco - Platinum HD-TVI Turret Camera 2.1MP - 2.8mm","shop_name":"","no_rebate":false,"orign":"CN","send_rule":"","retail":false,"spec":"nothing","weight":680.396,"full_url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/5537e32443689c0990b1767d9a9dfd64.png","props_ext":"","discount_type_cname":"æ— ä¼˜æƒ ","attribute":4194304,"item_images":[{"value":"5537e32443689c0990b1767d9a9dfd64.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/5537e32443689c0990b1767d9a9dfd64.png"}],"promotion_title":"","price_define_do":{"price_map":{},"ka_price_map":{},"discount_map":{"3":100,"2":100,"1":100,"5":100,"4":100}},"id":10060,"warehousing":true,"manager_cate_id":0,"type_fa":false,"sku_id":60,"sale_rule_do":{},"hd_method":2304,"presale":false,"share_num":0,"safe_num":0.000,"item_struct_props":[],"urls":"5537e32443689c0990b1767d9a9dfd64.png","status_cname":"å·²ä¸Šæž¶","sku_total":0,"puser_id":20016,"beyond_num":0,"open_codes":"","unit":"pc","sin":"LTCMHT2722-28","brand":"LTS","type_ch":false,"special":"","cut":false,"group":false,"partner_name":"","props":"{}","advance":false,"storage":0.000,"soldout":false},{"diy_price":false,"percent":false,"tag":"","type":0,"commission_t":0,"upshelf":true,"stock_out":0.000,"fixed":false,"image_value":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/2fdd769070a745f7d3e53fd8a8ec6334.png","price_value":"129.00","follow_num":0,"category_name":"","rank":1068,"wholesale":true,"edate":1525369770000,"discount_type":0,"order_num":0.000,"prepay":false,"open_code":"lts2open","sale_rule":"","cdate":1521177484000,"spot_rule":"","order_promotion":true,"package_item_list":[],"parent_id":0,"app_show":false,"partner_id":4,"short_code":"","biz_type":101,"sinr":"LTCMIP1142W-28","shop_id":4,"status":1,"best_box":false,"category_id":10,"manager_cate_name":"","cost_price_value":"0","spot_price_value":"0","distribution":false,"url":"2fdd769070a745f7d3e53fd8a8ec6334.png","size":"","price_define":"{\"discountMap\":{\"3\":100,\"2\":100,\"1\":100,\"5\":100,\"4\":100},\"kaPriceMap\":{},\"priceMap\":{}}","discount":0,"commission_s":0,"price":12900,"spu_id":329,"spot_price":0,"attr_activity":false,"min_num":0.000,"item_name":"CMIP1142W-28, Platinum Fixed Lens Turret IP Camera 4.1MP - 2.8mm","shop_name":"","no_rebate":false,"orign":"CN","send_rule":"","retail":false,"spec":"nothing","weight":725.755,"full_url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/2fdd769070a745f7d3e53fd8a8ec6334.png","props_ext":"","discount_type_cname":"æ— ä¼˜æƒ ","attribute":4194304,"item_images":[{"value":"2fdd769070a745f7d3e53fd8a8ec6334.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/2fdd769070a745f7d3e53fd8a8ec6334.png"},{"value":"971bbf9398547087d2294a7da30455bb.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/971bbf9398547087d2294a7da30455bb.png"},{"value":"513728bb09a5726955fa3a52305222d4.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/513728bb09a5726955fa3a52305222d4.png"}],"promotion_title":"","price_define_do":{"price_map":{},"ka_price_map":{},"discount_map":{"3":100,"2":100,"1":100,"5":100,"4":100}},"id":10164,"warehousing":true,"manager_cate_id":0,"type_fa":false,"sku_id":157,"sale_rule_do":{},"hd_method":2304,"presale":false,"share_num":0,"safe_num":0.000,"item_struct_props":[],"urls":"2fdd769070a745f7d3e53fd8a8ec6334.png,971bbf9398547087d2294a7da30455bb.png,513728bb09a5726955fa3a52305222d4.png","status_cname":"å·²ä¸Šæž¶","sku_total":0,"puser_id":20016,"beyond_num":0,"open_codes":"","unit":"pc","sin":"LTCMIP1142W-28","brand":"LTS","type_ch":false,"special":"","cut":false,"group":false,"partner_name":"","props":"{}","advance":false,"storage":0.000,"soldout":false},{"diy_price":false,"percent":false,"tag":"","type":0,"commission_t":0,"upshelf":true,"stock_out":0.000,"fixed":false,"image_value":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/a8cfea33a7f2148bbae9a92ed28e478f.png","price_value":"99.00","follow_num":0,"category_name":"","rank":1065,"wholesale":true,"edate":1525369770000,"discount_type":0,"order_num":0.000,"prepay":false,"open_code":"lts2open","sale_rule":"","cdate":1521178009000,"spot_rule":"","order_promotion":true,"package_item_list":[],"parent_id":0,"app_show":false,"partner_id":4,"short_code":"","biz_type":101,"sinr":"LTCMIP3022W","shop_id":4,"status":1,"best_box":false,"category_id":10,"manager_cate_name":"","cost_price_value":"0","spot_price_value":"0","distribution":false,"url":"a8cfea33a7f2148bbae9a92ed28e478f.png","size":"","price_define":"{\"discountMap\":{\"3\":100,\"2\":100,\"1\":100,\"5\":100,\"4\":100},\"kaPriceMap\":{},\"priceMap\":{}}","discount":0,"commission_s":0,"price":9900,"spu_id":345,"spot_price":0,"attr_activity":false,"min_num":0.000,"item_name":"CMIP3022W, Platinum Fixed Lens Turret IP Camera 2.1MP - 4mm","shop_name":"","no_rebate":false,"orign":"CN","send_rule":"","retail":false,"spec":"nothing","weight":816.475,"full_url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/a8cfea33a7f2148bbae9a92ed28e478f.png","props_ext":"","discount_type_cname":"æ— ä¼˜æƒ ","attribute":4194304,"item_images":[{"value":"a8cfea33a7f2148bbae9a92ed28e478f.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/a8cfea33a7f2148bbae9a92ed28e478f.png"}],"promotion_title":"","price_define_do":{"price_map":{},"ka_price_map":{},"discount_map":{"3":100,"2":100,"1":100,"5":100,"4":100}},"id":10171,"warehousing":true,"manager_cate_id":0,"type_fa":false,"sku_id":164,"sale_rule_do":{},"hd_method":2304,"presale":false,"share_num":0,"safe_num":0.000,"item_struct_props":[],"urls":"a8cfea33a7f2148bbae9a92ed28e478f.png","status_cname":"å·²ä¸Šæž¶","sku_total":0,"puser_id":20016,"beyond_num":0,"open_codes":"","unit":"pc","sin":"LTCMIP3022W","brand":"LTS","type_ch":false,"special":"","cut":false,"group":false,"partner_name":"","props":"{}","advance":false,"storage":0.000,"soldout":false},{"diy_price":false,"percent":false,"tag":"å…³è”å•†å“","type":0,"commission_t":0,"upshelf":true,"stock_out":0.000,"fixed":false,"image_value":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/271e95856ceefe98fd4c0b5a5fe3565d.png","price_value":"699.00","follow_num":0,"category_name":"","rank":1073,"wholesale":true,"edate":1525369770000,"discount_type":0,"order_num":0.000,"prepay":false,"open_code":"lts2open","sale_rule":"","cdate":1521185554000,"spot_rule":"","order_promotion":true,"package_item_list":[],"parent_id":0,"app_show":false,"partner_id":4,"short_code":"","biz_type":101,"sinr":"LTN8932-P16","shop_id":4,"status":1,"best_box":false,"category_id":24,"manager_cate_name":"","cost_price_value":"0","spot_price_value":"0","distribution":false,"url":"271e95856ceefe98fd4c0b5a5fe3565d.png","size":"","price_define":"{\"discountMap\":{\"3\":100,\"2\":100,\"1\":100,\"5\":100,\"4\":100},\"kaPriceMap\":{},\"priceMap\":{}}","discount":0,"commission_s":0,"price":69900,"spu_id":513,"spot_price":0,"attr_activity":false,"min_num":0.000,"item_name":"LTN8932-P16, Platinum Enterprise Level 32 Channel 4K NVR 1.5U","shop_name":"","no_rebate":false,"orign":"CN","send_rule":"","retail":false,"spec":"nothing","weight":4989.567,"full_url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/271e95856ceefe98fd4c0b5a5fe3565d.png","props_ext":"","discount_type_cname":"æ— ä¼˜æƒ ","attribute":4194304,"item_images":[{"value":"271e95856ceefe98fd4c0b5a5fe3565d.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/271e95856ceefe98fd4c0b5a5fe3565d.png"},{"value":"2ee92b47de01a8a5fb62fcf018b56a31.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/2ee92b47de01a8a5fb62fcf018b56a31.png"}],"promotion_title":"","price_define_do":{"price_map":{},"ka_price_map":{},"discount_map":{"3":100,"2":100,"1":100,"5":100,"4":100}},"id":10250,"warehousing":true,"manager_cate_id":0,"type_fa":false,"sku_id":243,"sale_rule_do":{},"hd_method":2304,"presale":false,"share_num":0,"safe_num":0.000,"item_struct_props":[],"urls":"271e95856ceefe98fd4c0b5a5fe3565d.png,2ee92b47de01a8a5fb62fcf018b56a31.png","status_cname":"å·²ä¸Šæž¶","sku_total":0,"puser_id":20016,"beyond_num":0,"open_codes":"","unit":"pc","sin":"LTN8932-P16","brand":"LTS","type_ch":false,"special":"","cut":false,"group":false,"partner_name":"","props":"{}","advance":false,"storage":0.000,"soldout":false},{"diy_price":false,"percent":false,"tag":"","type":0,"commission_t":0,"upshelf":true,"stock_out":0.000,"fixed":false,"image_value":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/1f2586fe496b7e0ff7be58b4970946b2.png","price_value":"189.00","follow_num":0,"category_name":"","rank":1092,"wholesale":true,"edate":1525369770000,"discount_type":0,"order_num":0.000,"prepay":false,"open_code":"lts2open","sale_rule":"","cdate":1521841023000,"spot_rule":"","order_promotion":true,"package_item_list":[],"parent_id":0,"app_show":false,"partner_id":4,"short_code":"","biz_type":101,"sinr":"LTD8316K-ET","shop_id":4,"status":1,"best_box":false,"category_id":29,"manager_cate_name":"","cost_price_value":"0","spot_price_value":"0","distribution":false,"url":"1f2586fe496b7e0ff7be58b4970946b2.png","size":"","price_define":"{\"discountMap\":{\"3\":100,\"2\":100,\"1\":100,\"5\":100,\"4\":100}}","discount":0,"commission_s":0,"price":18900,"spu_id":783,"spot_price":0,"attr_activity":false,"min_num":0.000,"item_name":"LTD8316K-ET, H.265/H.265+ Platinum Professional Level 16 Channel HD-TVI DVR","shop_name":"","no_rebate":false,"orign":"CN","send_rule":"","retail":false,"spec":"nothing","weight":3628.776,"full_url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/1f2586fe496b7e0ff7be58b4970946b2.png","props_ext":"","discount_type_cname":"æ— ä¼˜æƒ ","attribute":4194304,"item_images":[{"value":"1f2586fe496b7e0ff7be58b4970946b2.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/1f2586fe496b7e0ff7be58b4970946b2.png"},{"value":"e464f2b1192b1ef30d225b7935f34644.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/e464f2b1192b1ef30d225b7935f34644.png"},{"value":"ffb28c9bdc5a26d220d92edddfc40141.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/ffb28c9bdc5a26d220d92edddfc40141.png"},{"value":"0a544f6248a13c802cc4d37a17156459.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/0a544f6248a13c802cc4d37a17156459.png"}],"promotion_title":"","price_define_do":{"price_map":{},"ka_price_map":{},"discount_map":{"3":100,"2":100,"1":100,"5":100,"4":100}},"id":10401,"warehousing":true,"manager_cate_id":0,"type_fa":false,"sku_id":6612,"sale_rule_do":{},"hd_method":2304,"presale":false,"share_num":0,"safe_num":0.000,"item_struct_props":[],"urls":"1f2586fe496b7e0ff7be58b4970946b2.png,e464f2b1192b1ef30d225b7935f34644.png,ffb28c9bdc5a26d220d92edddfc40141.png,0a544f6248a13c802cc4d37a17156459.png","status_cname":"å·²ä¸Šæž¶","sku_total":0,"puser_id":20016,"beyond_num":0,"open_codes":"","unit":"pc","sin":"LTD8316K-ET","brand":"LTS","type_ch":false,"special":"","cut":false,"group":false,"partner_name":"","props":"{}","advance":false,"storage":0.000,"soldout":false},{"diy_price":false,"percent":false,"tag":"","type":0,"commission_t":0,"upshelf":true,"stock_out":0.000,"fixed":false,"image_value":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/5f27072dc1df65ad0eda6f0fc2387fa8.png","price_value":"109.00","follow_num":0,"category_name":"","rank":1085,"wholesale":true,"edate":1525369770000,"discount_type":0,"order_num":0.000,"prepay":false,"open_code":"lts2open","sale_rule":"","cdate":1523695908000,"spot_rule":"","order_promotion":true,"package_item_list":[],"parent_id":0,"app_show":false,"partner_id":4,"short_code":"","biz_type":101,"sinr":"LTCMIP7442-28M","shop_id":4,"status":1,"best_box":false,"category_id":8,"manager_cate_name":"","cost_price_value":"0","spot_price_value":"0","distribution":false,"url":"5f27072dc1df65ad0eda6f0fc2387fa8.png","size":"","price_define":"{\"discountMap\":{\"3\":100,\"2\":100,\"1\":100,\"5\":100,\"4\":100}}","discount":0,"commission_s":0,"price":10900,"spu_id":1375,"spot_price":0,"attr_activity":false,"min_num":0.000,"item_name":"CMIP7442-28M, Platinum Fixed Lens Dome Network IP Camera 4.1MP - 2.8mm","shop_name":"","no_rebate":false,"orign":"CN","send_rule":"","retail":false,"spec":"nothing","weight":498.957,"full_url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/5f27072dc1df65ad0eda6f0fc2387fa8.png","props_ext":"","discount_type_cname":"æ— ä¼˜æƒ ","attribute":4194304,"item_images":[{"value":"5f27072dc1df65ad0eda6f0fc2387fa8.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/5f27072dc1df65ad0eda6f0fc2387fa8.png"}],"promotion_title":"","price_define_do":{"price_map":{},"ka_price_map":{},"discount_map":{"3":100,"2":100,"1":100,"5":100,"4":100}},"id":10977,"warehousing":true,"manager_cate_id":0,"type_fa":false,"sku_id":11996,"sale_rule_do":{},"hd_method":2304,"presale":false,"share_num":0,"safe_num":0.000,"item_struct_props":[],"urls":"5f27072dc1df65ad0eda6f0fc2387fa8.png","status_cname":"å·²ä¸Šæž¶","sku_total":0,"puser_id":20016,"beyond_num":0,"open_codes":"","unit":"pc","sin":"LTCMIP7442-28M","brand":"LTS","type_ch":false,"special":"","cut":false,"group":false,"partner_name":"","props":"{}","advance":false,"storage":0.000,"soldout":false},{"diy_price":false,"percent":true,"tag":"ä¸å‚åŠ æ»¡å‡","type":0,"commission_t":0,"upshelf":true,"stock_out":0.000,"fixed":false,"member_price_value":"150.00","image_value":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/71f126134465233d5f36de770db39f42.png","price_value":"150.00","follow_num":0,"category_name":"","rank":1083,"wholesale":true,"edate":1525369770000,"prepay":false,"discount_type":1,"order_num":0.000,"open_code":"lts2open","sale_rule":"","cdate":1523970394000,"spot_rule":"","order_promotion":true,"package_item_list":[],"parent_id":0,"app_show":false,"partner_id":4,"short_code":"","biz_type":101,"sinr":"DHWD40PURX","shop_id":4,"status":1,"best_box":false,"category_id":35,"manager_cate_name":"","cost_price_value":"0","spot_price_value":"0","distribution":false,"activity_price":14850,"url":"71f126134465233d5f36de770db39f42.png","size":"","price_define":"","discount":99,"commission_s":0,"price":15000,"spu_id":863,"spot_price":0,"attr_activity":true,"min_num":0.000,"item_name":"DHWD40PURX, Western Digital Purple Surveillance Hard Drive - 4TB","shop_name":"","no_rebate":false,"orign":"CN","send_rule":"","retail":false,"spec":"nothing","weight":680.396,"full_url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/71f126134465233d5f36de770db39f42.png","props_ext":"","discount_type_cname":"æ‰“æŠ˜","attribute":4194305,"item_images":[{"value":"71f126134465233d5f36de770db39f42.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/71f126134465233d5f36de770db39f42.png"}],"promotion_title":"","id":11363,"warehousing":true,"manager_cate_id":0,"type_fa":false,"sku_id":7902,"member_price":15000,"sale_rule_do":{},"presale":false,"hd_method":2304,"share_num":0,"safe_num":0.000,"item_struct_props":[],"urls":"71f126134465233d5f36de770db39f42.png","status_cname":"å·²ä¸Šæž¶","sku_total":0,"puser_id":20016,"beyond_num":0,"open_codes":"","unit":"pc","sin":"DHWD40PURX","brand":"LTS","type_ch":false,"special":"","cut":false,"group":false,"partner_name":"","props":"{}","advance":false,"storage":0.000,"soldout":false}],"edate":1524144283000,"name":"","attribute":5,"type":2,"cdate":1524144283000},"item":{"diy_price":false,"percent":false,"tag":"","price_real":49900,"price_real_value":"499.00","type":0,"commission_t":0,"upshelf":true,"stock_out":0.000,"fixed":false,"image_value":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/bb718f634499dd4b041b872fb0b9f3af.png","price_value":"499.00","follow_num":0,"category_name":"","rank":1299,"wholesale":true,"edate":1525484904000,"discount_type":0,"description":"<img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/1f6538979905c29125639869f8cbe7e0.png\"><div></div><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/837cb857e6e8a8f64967b67f8526f4ab.png\"><br></div><div>\n\n\n\n\n<style type=\"text/css\">\np.p1 {margin: 0.0px 0.0px 0.0px 0.0px; text-indent: 7.0px; font: 10.4px Roboto; color: #000000; -webkit-text-stroke: #ffffff}\nspan.s1 {font-kerning: none}\n</style>\n\n\n<p class=\"p1\"><span class=\"s1\">2.1MP High Definition</span></p><p class=\"p1\"><span class=\"s1\"><br></span></p><p class=\"p1\"><span class=\"s1\">\n\n\n\n\n<style type=\"text/css\">\np.p1 {margin: 0.0px 0.0px 0.0px 0.0px; text-indent: 7.0px; font: 10.4px Roboto; color: #000000; -webkit-text-stroke: #ffffff}\nspan.s1 {font-kerning: none}\n</style>\n\n\n</span></p><p class=\"p1\"><span class=\"s1\">4.7-94mm VF Motorized Lens</span></p><p class=\"p1\"><span class=\"s1\"><br></span></p><p class=\"p1\"><span class=\"s1\">\n\n\n\n\n<style type=\"text/css\">\np.p1 {margin: 0.0px 0.0px 0.0px 0.0px; text-indent: 7.0px; font: 10.4px Roboto; color: #000000; -webkit-text-stroke: #ffffff}\nspan.s1 {font-kerning: none}\n</style>\n\n\n</span></p><p class=\"p1\"><span class=\"s1\">1/2.8\" CMOS</span></p><p class=\"p1\"><span class=\"s1\"><br></span></p><p class=\"p1\"><span class=\"s1\">\n\n\n\n\n<style type=\"text/css\">\np.p1 {margin: 0.0px 0.0px 0.0px 0.0px; text-indent: 7.0px; font: 10.4px Roboto; color: #000000; -webkit-text-stroke: #ffffff}\nspan.s1 {font-kerning: none}\n</style>\n\n\n</span></p><p class=\"p1\"><span class=\"s1\">1920X1080P@30fps</span></p><p class=\"p1\"><span class=\"s1\"><br></span></p><p class=\"p1\"><span class=\"s1\">\n\n\n\n\n<style type=\"text/css\">\np.p1 {margin: 0.0px 0.0px 0.0px 0.0px; text-indent: 7.0px; font: 10.4px Roboto; color: #000000; -webkit-text-stroke: #ffffff}\nspan.s1 {font-kerning: none}\n</style>\n\n\n</span></p><p class=\"p1\"><span class=\"s1\">True WDR 120dB</span></p><p class=\"p1\"><span class=\"s1\"><br></span></p><p class=\"p1\"><span class=\"s1\">\n\n\n\n\n<style type=\"text/css\">\np.p1 {margin: 0.0px 0.0px 0.0px 0.0px; text-indent: 7.0px; font: 10.4px Roboto; color: #000000; -webkit-text-stroke: #ffffff}\nspan.s1 {font-kerning: none}\n</style>\n\n\n</span></p><p class=\"p1\"><span class=\"s1\">Micro SD/SDHC/SDXC Card Slot up to 128GB</span></p><p class=\"p1\"><span class=\"s1\"><br></span></p><p class=\"p1\"><span class=\"s1\">\n\n\n\n\n<style type=\"text/css\">\np.p1 {margin: 0.0px 0.0px 0.0px 0.0px; text-indent: 7.0px; font: 10.4px Roboto; color: #000000; -webkit-text-stroke: #ffffff}\nspan.s1 {font-kerning: none}\n</style>\n\n\n</span></p><p class=\"p1\"><span class=\"s1\">Audio I/O, Alarm I/O</span></p><p class=\"p1\"><span class=\"s1\"><br></span></p><p class=\"p1\"><span class=\"s1\">\n\n\n\n\n<style type=\"text/css\">\np.p1 {margin: 0.0px 0.0px 0.0px 0.0px; text-indent: 7.0px; font: 10.4px Roboto; color: #000000; -webkit-text-stroke: #ffffff}\nspan.s1 {font-kerning: none}\n</style>\n\n\n</span></p><p class=\"p1\"><span class=\"s1\">IP67</span></p><p class=\"p1\"><span class=\"s1\"><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/a46dcd0144a70e062f8520c8caf73ba8.png\"><br></span></p><p class=\"p1\"><span class=\"s1\"><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/e7de6a4c998fc0c541deaf74afdd78bc.png\"><br></span></p><p class=\"p1\"><span class=\"s1\"><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/9b9abb7a76761bdd027c179985a910ca.png\"><br></span></p></div>","order_num":2.000,"prepay":false,"open_code":"lts2open","sale_rule":"","cdate":1521185664000,"spot_rule":"","order_promotion":true,"package_item_list":[],"parent_id":0,"app_show":false,"partner_id":4,"short_code":"","biz_type":101,"sinr":"LTCMIP9223W-SZ","shop_id":4,"status":1,"best_box":false,"category_id":9,"manager_cate_name":"","cost_price_value":"0","spot_price_value":"0","distribution":false,"url":"bb718f634499dd4b041b872fb0b9f3af.png","size":"","price_define":"{\"discountMap\":{\"3\":100,\"2\":100,\"1\":100,\"5\":100,\"4\":100},\"kaPriceMap\":{},\"priceMap\":{}}","discount":0,"commission_s":0,"price":49900,"spu_id":509,"spot_price":0,"attr_activity":false,"min_num":0.000,"item_name":"CMIP9223W-SZ, Platinum Long Range Bullet Network IP Camera 2.1MP CMIP9223W-SZ","shop_name":"","no_rebate":false,"orign":"CN","send_rule":"","retail":false,"spec":"nothing","weight":2267.985,"full_url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/bb718f634499dd4b041b872fb0b9f3af.png","props_ext":"","discount_type_cname":"æ— ä¼˜æƒ ","attribute":4194304,"item_images":[{"value":"bb718f634499dd4b041b872fb0b9f3af.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/bb718f634499dd4b041b872fb0b9f3af.png"}],"promotion_title":"","price_define_do":{"price_map":{},"ka_price_map":{},"discount_map":{"3":100,"2":100,"1":100,"5":100,"4":100}},"id":10252,"warehousing":true,"manager_cate_id":0,"type_fa":false,"sku_id":245,"sale_rule_do":{},"presale":false,"hd_method":2304,"share_num":0,"safe_num":0.000,"item_struct_props":[{"value_type":0,"spec":false,"img_url":"","price_real":49900,"spu_id":510,"attribute":1024,"show":false,"price_action":1,"sku":true,"id":1394,"system":false,"multi_select":false,"price":49900,"search":false,"selectable":false,"sin":"LTCMIP9223W-SZ","prop_value":"{\"Resolution\":\"2MP\",\"Select Lens\":\"Long Range\"}","required":false,"props":"2MP,Long Range","storage":995},{"value_type":0,"spec":false,"img_url":"","price_real":49900,"spu_id":0,"attribute":0,"show":false,"price_action":0,"sku":false,"id":2020,"system":false,"multi_select":false,"price":0,"search":false,"selectable":false,"sin":"","prop_value":"{\"Compression\":\"H.264/H.264+\"}","required":false,"props":"H.264/H.264+","storage":0.000},{"value_type":0,"spec":false,"img_url":"","price_real":49900,"spu_id":0,"attribute":0,"show":false,"price_action":0,"sku":false,"id":2021,"system":false,"multi_select":false,"price":0,"search":false,"selectable":false,"sin":"","prop_value":"{\"WDR\":\"True WDR\"}","required":false,"props":"True WDR","storage":0.000},{"value_type":0,"spec":false,"img_url":"","price_real":49900,"spu_id":0,"attribute":0,"show":false,"price_action":0,"sku":false,"id":2022,"system":false,"multi_select":false,"price":0,"search":false,"selectable":false,"sin":"","prop_value":"{\"IR\":\"Matrix IR\"}","required":false,"props":"Matrix IR","storage":0.000},{"value_type":0,"spec":false,"img_url":"","price_real":49900,"spu_id":0,"attribute":0,"show":false,"price_action":0,"sku":false,"id":2023,"system":false,"multi_select":false,"price":0,"search":false,"selectable":false,"sin":"","prop_value":"{\"Housing Color\":\"White\"}","required":false,"props":"White","storage":0.000}],"urls":"bb718f634499dd4b041b872fb0b9f3af.png","status_cname":"å·²ä¸Šæž¶","sku_total":0,"puser_id":20016,"item_prop_value_maps":[{"prop_values":[{"can_checked":true,"value":"2MP"}],"prop_name":"Resolution"},{"prop_values":[{"can_checked":true,"value":"Long Range"}],"prop_name":"Select Lens"}],"beyond_num":0,"open_codes":"","unit":"pc","sin":"LTCMIP9223W-SZ","brand":"LTS","type_ch":false,"special":"","cut":false,"group":false,"partner_name":"","props":"{}","advance":false,"storage":0.000,"soldout":false},"user_order_history":[{"diy_price":false,"percent":false,"tag":"","price_real":800,"price_real_value":"8.00","type":0,"commission_t":0,"upshelf":true,"stock_out":0.000,"fixed":false,"image_value":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/eccca7c8ee7b66fe3a0b372269fbad75.png","price_value":"8.00","follow_num":0,"category_name":"","rank":1000,"wholesale":true,"edate":1525369770000,"discount_type":0,"description":"<img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/3fadc03f82f7a446368764e431544dd3.png\"><div><div>Testing RJ45=USOC 4/6/8. 10Base-T, ELA/TIA 568 A/B, AT&amp;T258A, Token Ring, BNC, LEDs, USBli&gt;</div><div>Testing, short, connection, non-parallel 25/50 Ohm, termination, screening each conductor, includes protective leather pouch, Auto shut off</div></div><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/4905942d4e81b5beca35e8e74175163b.png\"><br></div>","order_num":0.000,"prepay":false,"open_code":"lts2open","sale_rule":"","cdate":1521149396000,"spot_rule":"","order_promotion":true,"package_item_list":[],"parent_id":0,"app_show":false,"partner_id":4,"short_code":"","biz_type":101,"sinr":"LTA-AU25S","shop_id":4,"status":1,"best_box":false,"category_id":39,"manager_cate_name":"","cost_price_value":"0","spot_price_value":"0","distribution":false,"url":"eccca7c8ee7b66fe3a0b372269fbad75.png","size":"","price_define":"{\"discountMap\":{\"3\":100,\"2\":100,\"1\":100,\"5\":100,\"4\":100},\"kaPriceMap\":{},\"priceMap\":{}}","discount":0,"commission_s":0,"price":800,"spu_id":3,"spot_price":0,"attr_activity":false,"min_num":0.000,"item_name":"LTA-AU25S, Multi-Function Network Cable Tester","shop_name":"","no_rebate":false,"orign":"CN","send_rule":"","retail":false,"spec":"nothing","weight":226.799,"full_url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/eccca7c8ee7b66fe3a0b372269fbad75.png","props_ext":"","discount_type_cname":"æ— ä¼˜æƒ ","attribute":4194304,"item_images":[{"value":"eccca7c8ee7b66fe3a0b372269fbad75.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/eccca7c8ee7b66fe3a0b372269fbad75.png"}],"promotion_title":"","price_define_do":{"price_map":{},"ka_price_map":{},"discount_map":{"3":100,"2":100,"1":100,"5":100,"4":100}},"id":10002,"warehousing":true,"manager_cate_id":0,"type_fa":false,"sku_id":3,"sale_rule_do":{},"hd_method":2304,"presale":false,"share_num":0,"safe_num":0.000,"item_struct_props":[],"urls":"eccca7c8ee7b66fe3a0b372269fbad75.png","status_cname":"å·²ä¸Šæž¶","sku_total":0,"puser_id":20016,"beyond_num":0,"open_codes":"","unit":"pc","sin":"LTA-AU25S","brand":"LTS","type_ch":false,"special":"","cut":false,"group":false,"partner_name":"","props":"{}","advance":false,"storage":0.000,"soldout":false},{"diy_price":false,"percent":false,"tag":"","price_real":4900,"price_real_value":"49.00","type":0,"commission_t":0,"upshelf":true,"stock_out":0.000,"fixed":false,"image_value":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/63554d694987da5412520ca795d43760.png","price_value":"49.00","follow_num":0,"category_name":"","rank":2000,"wholesale":true,"edate":1525369770000,"discount_type":0,"description":"<img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/9ddc51946bab3499bf66e7883a888332.png\"><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/837cb857e6e8a8f64967b67f8526f4ab.png\"><br></div><div>\n\n\n\n\n<style>\n<!--table\n\t{mso-displayed-decimal-separator:\"\\.\";\n\tmso-displayed-thousand-separator:\"\\,\";}\n@page\n\t{margin:1.0in .75in 1.0in .75in;\n\tmso-header-margin:.51in;\n\tmso-footer-margin:.51in;}\ntd\n\t{padding-top:1px;\n\tpadding-right:1px;\n\tpadding-left:1px;\n\tmso-ignore:padding;\n\tcolor:black;\n\tfont-size:11.0pt;\n\tfont-weight:400;\n\tfont-style:normal;\n\ttext-decoration:none;\n\tfont-family:Calibri;\n\tmso-generic-font-family:auto;\n\tmso-font-charset:134;\n\tmso-number-format:General;\n\ttext-align:general;\n\tvertical-align:middle;\n\tborder:none;\n\tmso-background-source:auto;\n\tmso-pattern:auto;\n\tmso-protection:locked visible;\n\twhite-space:nowrap;\n\tmso-rotate:0;}\n.xl65\n\t{color:black;\n\tfont-size:10.45pt;\n\tfont-family:Roboto;\n\tmso-generic-font-family:auto;\n\tmso-font-charset:0;\n\ttext-align:left;\n\twhite-space:normal;\n\tpadding-left:12px;\n\tmso-char-indent-count:1;}\n-->\n</style>\n\n\n\n\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"304\" style=\"border-collapse:\n collapse;width:304pt\">\n<!--StartFragment-->\n <colgroup><col width=\"304\" style=\"mso-width-source:userset;mso-width-alt:12970;width:304pt\">\n </colgroup><tbody><tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"304\" style=\"height:14.0pt;width:304pt\">2.1MP\n  High Definition</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"304\" style=\"height:14.0pt;width:304pt\">1920x1080P@30fps</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"304\" style=\"height:14.0pt;width:304pt\">2.8mm\n  Fixed Lens</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"304\" style=\"height:14.0pt;width:304pt\">True WDR\n  120dB</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"304\" style=\"height:14.0pt;width:304pt\">2 Matrix\n  IR 2.0 up to 131ft (40m)</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"304\" style=\"height:14.0pt;width:304pt\">DC 12V</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"304\" style=\"height:14.0pt;width:304pt\">OSD Menu\n  via UTC technology with Platinum TVI DVR</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"304\" style=\"height:14.0pt;width:304pt\">IP66\n  Weatherproof</td>\n </tr>\n<!--EndFragment-->\n</tbody></table><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/a46dcd0144a70e062f8520c8caf73ba8.png\"><br></div><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/a9c24cc35cdae7acac0ab31b06bc1006.png\"><br></div><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/9b9abb7a76761bdd027c179985a910ca.png\"><br></div>","order_num":0.000,"prepay":false,"open_code":"lts2open","sale_rule":"","cdate":1521155762000,"spot_rule":"","order_promotion":true,"package_item_list":[],"parent_id":0,"app_show":false,"partner_id":4,"short_code":"","biz_type":101,"sinr":"LTCMHT1722W-28","shop_id":4,"status":1,"best_box":false,"category_id":17,"manager_cate_name":"","cost_price_value":"0","spot_price_value":"0","distribution":false,"url":"63554d694987da5412520ca795d43760.png","size":"","price_define":"{\"discountMap\":{\"3\":100,\"2\":100,\"1\":100,\"5\":100,\"4\":100},\"kaPriceMap\":{},\"priceMap\":{}}","discount":0,"commission_s":0,"price":4900,"spu_id":59,"spot_price":0,"attr_activity":false,"min_num":0.000,"item_name":"CMHT1722W-28, Platinum Fixed Lens Turret HD-TVI Camera 2.1MP - 2.8mm","shop_name":"","no_rebate":false,"orign":"CN","send_rule":"","retail":false,"spec":"nothing","weight":680.396,"full_url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/63554d694987da5412520ca795d43760.png","props_ext":"","discount_type_cname":"æ— ä¼˜æƒ ","attribute":4194304,"item_images":[{"value":"63554d694987da5412520ca795d43760.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/63554d694987da5412520ca795d43760.png"}],"promotion_title":"","price_define_do":{"price_map":{},"ka_price_map":{},"discount_map":{"3":100,"2":100,"1":100,"5":100,"4":100}},"id":10029,"warehousing":true,"manager_cate_id":0,"type_fa":false,"sku_id":29,"sale_rule_do":{},"hd_method":2304,"presale":false,"share_num":0,"safe_num":0.000,"item_struct_props":[],"urls":"63554d694987da5412520ca795d43760.png","status_cname":"å·²ä¸Šæž¶","sku_total":0,"puser_id":20016,"beyond_num":0,"open_codes":"","unit":"pc","sin":"LTCMHT1722W-28","brand":"LTS","type_ch":false,"special":"","cut":false,"group":false,"partner_name":"","props":"{}","advance":false,"storage":0.000,"soldout":false},{"diy_price":false,"percent":false,"tag":"","price_real":9500,"price_real_value":"95.00","type":0,"commission_t":0,"upshelf":true,"stock_out":0.000,"fixed":false,"image_value":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/a77468fb4b9f539d88b218ff5c10017d.png","price_value":"95.00","follow_num":0,"category_name":"","rank":1000,"wholesale":true,"edate":1525369770000,"discount_type":0,"description":"<img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/837cb857e6e8a8f64967b67f8526f4ab.png\"><div></div><div><div><span style=\"font-size: 14px;\">5GHz NanoBeam M5</span></div><div><span style=\"font-size: 14px;\">150+ Mbps</span></div><div><span style=\"font-size: 14px;\">19dBi (15+ km)</span></div></div><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/9b9abb7a76761bdd027c179985a910ca.png\"><span style=\"font-size: 14px;\"><br></span></div>","order_num":0.000,"prepay":false,"open_code":"lts2open","sale_rule":"","cdate":1521157781000,"spot_rule":"","order_promotion":true,"package_item_list":[],"parent_id":0,"app_show":false,"partner_id":4,"short_code":"","biz_type":101,"sinr":"LTUBNBM5-19","shop_id":4,"status":1,"best_box":false,"category_id":42,"manager_cate_name":"","cost_price_value":"0","spot_price_value":"0","distribution":false,"url":"a77468fb4b9f539d88b218ff5c10017d.png","size":"","price_define":"{\"discountMap\":{\"3\":100,\"2\":100,\"1\":100,\"5\":100,\"4\":100},\"kaPriceMap\":{},\"priceMap\":{}}","discount":0,"commission_s":0,"price":9500,"spu_id":95,"spot_price":0,"attr_activity":false,"min_num":0.000,"item_name":"LTUBNBM5-19, 5GHz NanoBeam M5","shop_name":"","no_rebate":false,"orign":"CN","send_rule":"","retail":false,"spec":"nothing","weight":725.755,"full_url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/a77468fb4b9f539d88b218ff5c10017d.png","props_ext":"","discount_type_cname":"æ— ä¼˜æƒ ","attribute":4194304,"item_images":[{"value":"a77468fb4b9f539d88b218ff5c10017d.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/a77468fb4b9f539d88b218ff5c10017d.png"}],"promotion_title":"","price_define_do":{"price_map":{},"ka_price_map":{},"discount_map":{"3":100,"2":100,"1":100,"5":100,"4":100}},"id":10046,"warehousing":true,"manager_cate_id":0,"type_fa":false,"sku_id":46,"sale_rule_do":{},"hd_method":2304,"presale":false,"share_num":0,"safe_num":0.000,"item_struct_props":[],"urls":"a77468fb4b9f539d88b218ff5c10017d.png","status_cname":"å·²ä¸Šæž¶","sku_total":0,"puser_id":20016,"beyond_num":0,"open_codes":"","unit":"pc","sin":"LTUBNBM5-19","brand":"Ubiquiti Networks","type_ch":false,"special":"","cut":false,"group":false,"partner_name":"","props":"{}","advance":false,"storage":0.000,"soldout":false},{"diy_price":false,"percent":false,"tag":"","price_real":4500,"price_real_value":"45.00","type":0,"commission_t":0,"upshelf":true,"stock_out":0.000,"fixed":false,"image_value":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/5537e32443689c0990b1767d9a9dfd64.png","price_value":"45.00","follow_num":0,"category_name":"","rank":1094,"wholesale":true,"edate":1525369770000,"discount_type":0,"description":"<img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/84cc08c627967b10eae3b0a2be30eb3c.png\"><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/837cb857e6e8a8f64967b67f8526f4ab.png\"><br></div><div>\n\n\n\n\n<style>\n<!--table\n\t{mso-displayed-decimal-separator:\"\\.\";\n\tmso-displayed-thousand-separator:\"\\,\";}\n@page\n\t{margin:1.0in .75in 1.0in .75in;\n\tmso-header-margin:.51in;\n\tmso-footer-margin:.51in;}\ntd\n\t{padding-top:1px;\n\tpadding-right:1px;\n\tpadding-left:1px;\n\tmso-ignore:padding;\n\tcolor:black;\n\tfont-size:11.0pt;\n\tfont-weight:400;\n\tfont-style:normal;\n\ttext-decoration:none;\n\tfont-family:Calibri;\n\tmso-generic-font-family:auto;\n\tmso-font-charset:134;\n\tmso-number-format:General;\n\ttext-align:general;\n\tvertical-align:middle;\n\tborder:none;\n\tmso-background-source:auto;\n\tmso-pattern:auto;\n\tmso-protection:locked visible;\n\twhite-space:nowrap;\n\tmso-rotate:0;}\n.xl65\n\t{color:black;\n\tfont-size:10.45pt;\n\tfont-family:Roboto;\n\tmso-generic-font-family:auto;\n\tmso-font-charset:0;\n\ttext-align:left;\n\twhite-space:normal;\n\tpadding-left:12px;\n\tmso-char-indent-count:1;}\n-->\n</style>\n\n\n\n\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"240\" style=\"border-collapse:\n collapse;width:240pt\">\n<!--StartFragment-->\n <colgroup><col width=\"240\" style=\"mso-width-source:userset;mso-width-alt:10240;width:240pt\">\n </colgroup><tbody><tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"240\" style=\"height:14.0pt;width:240pt\">2.1MP\n  High Definition</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"240\" style=\"height:14.0pt;width:240pt\">Full HD\n  1080P</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"240\" style=\"height:14.0pt;width:240pt\">1920X1080P@30fps</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"240\" style=\"height:14.0pt;width:240pt\">2.8mm\n  Fixed Lens</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"240\" style=\"height:14.0pt;width:240pt\">1 Matrix\n  IR LED up to 131ft</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"240\" style=\"height:14.0pt;width:240pt\">Outdoor/Indoor</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"240\" style=\"height:14.0pt;width:240pt\">DC 12V</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"240\" style=\"height:14.0pt;width:240pt\">IP66</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"240\" style=\"height:14.0pt;width:240pt\">UTC</td>\n </tr>\n<!--EndFragment-->\n</tbody></table><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/a46dcd0144a70e062f8520c8caf73ba8.png\"><br></div><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/bc3d56c6e0b5faa7426272e28c110124.png\"><br></div><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/9b9abb7a76761bdd027c179985a910ca.png\"><br></div>","order_num":0.000,"prepay":false,"open_code":"lts2open","sale_rule":"","cdate":1521158909000,"spot_rule":"","order_promotion":true,"package_item_list":[],"parent_id":0,"app_show":false,"partner_id":4,"short_code":"","biz_type":101,"sinr":"LTCMHT2722-28","shop_id":4,"status":1,"best_box":false,"category_id":17,"manager_cate_name":"","cost_price_value":"0","spot_price_value":"0","distribution":false,"url":"5537e32443689c0990b1767d9a9dfd64.png","size":"","price_define":"{\"discountMap\":{\"3\":100,\"2\":100,\"1\":100,\"5\":100,\"4\":100},\"kaPriceMap\":{},\"priceMap\":{}}","discount":0,"commission_s":0,"price":4500,"spu_id":123,"spot_price":0,"attr_activity":false,"min_num":0.000,"item_name":"CMHT2722-28, eco - Platinum HD-TVI Turret Camera 2.1MP - 2.8mm","shop_name":"","no_rebate":false,"orign":"CN","send_rule":"","retail":false,"spec":"nothing","weight":680.396,"full_url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/5537e32443689c0990b1767d9a9dfd64.png","props_ext":"","discount_type_cname":"æ— ä¼˜æƒ ","attribute":4194304,"item_images":[{"value":"5537e32443689c0990b1767d9a9dfd64.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/5537e32443689c0990b1767d9a9dfd64.png"}],"promotion_title":"","price_define_do":{"price_map":{},"ka_price_map":{},"discount_map":{"3":100,"2":100,"1":100,"5":100,"4":100}},"id":10060,"warehousing":true,"manager_cate_id":0,"type_fa":false,"sku_id":60,"sale_rule_do":{},"hd_method":2304,"presale":false,"share_num":0,"safe_num":0.000,"item_struct_props":[],"urls":"5537e32443689c0990b1767d9a9dfd64.png","status_cname":"å·²ä¸Šæž¶","sku_total":0,"puser_id":20016,"beyond_num":0,"open_codes":"","unit":"pc","sin":"LTCMHT2722-28","brand":"LTS","type_ch":false,"special":"","cut":false,"group":false,"partner_name":"","props":"{}","advance":false,"storage":0.000,"soldout":false},{"diy_price":false,"percent":false,"tag":"å…³è”å•†å“","price_real":13900,"price_real_value":"139.00","type":0,"commission_t":0,"upshelf":true,"stock_out":0.000,"fixed":false,"image_value":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/f0ad4f89e1ad3b5435196feca1729280.png","price_value":"139.00","follow_num":0,"category_name":"","rank":1064,"wholesale":true,"edate":1525474001000,"discount_type":0,"description":"<img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/72e7c7b05894b657d8a4ace2161ac0e4.png\"><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/837cb857e6e8a8f64967b67f8526f4ab.png\"><br></div><div><table width=\"436\" height=\"190\" style=\"border-collapse:collapse;width:327.00pt;\">\n<colgroup><col width=\"436\">\n</colgroup><tbody><tr height=\"19\">\n<td class=\"et2\" x:str=\"\" height=\"19\" width=\"436\" style=\"color: rgb(0, 0, 0); font-size: 10.4pt; vertical-align: middle; height: 14.25pt; width: 327pt;\">4MP&nbsp;High&nbsp;Definition</td>\n</tr>\n<tr height=\"19\">\n<td class=\"et2\" x:str=\"\" height=\"19\" width=\"436\" style=\"color: rgb(0, 0, 0); font-size: 10.4pt; vertical-align: middle; height: 14.25pt; width: 327pt;\">2560x1440@30fps</td>\n</tr>\n<tr height=\"19\">\n<td class=\"et2\" x:str=\"\" height=\"19\" width=\"436\" style=\"color: rgb(0, 0, 0); font-size: 10.4pt; vertical-align: middle; height: 14.25pt; width: 327pt;\">2.8mm&nbsp;Fixed&nbsp;Lens</td>\n</tr>\n<tr height=\"19\">\n<td class=\"et2\" x:str=\"\" height=\"19\" width=\"436\" style=\"color: rgb(0, 0, 0); font-size: 10.4pt; vertical-align: middle; height: 14.25pt; width: 327pt;\">0.018&nbsp;Lux&nbsp;@&nbsp;F1.6</td>\n</tr>\n<tr height=\"19\">\n<td class=\"et2\" x:str=\"\" height=\"19\" width=\"436\" style=\"color: rgb(0, 0, 0); font-size: 10.4pt; vertical-align: middle; height: 14.25pt; width: 327pt;\">Matrix&nbsp;IR&nbsp;2.0,&nbsp;IR&nbsp;Range&nbsp;up&nbsp;to&nbsp;100&nbsp;feet</td>\n</tr>\n<tr height=\"19\">\n<td class=\"et2\" x:str=\"\" height=\"19\" width=\"436\" style=\"color: rgb(0, 0, 0); font-size: 10.4pt; vertical-align: middle; height: 14.25pt; width: 327pt;\">H.265,&nbsp;H.265+,&nbsp;H.264,&nbsp;H.264+&nbsp;Ready</td>\n</tr>\n<tr height=\"19\">\n<td class=\"et2\" x:str=\"\" height=\"19\" width=\"436\" style=\"color: rgb(0, 0, 0); font-size: 10.4pt; vertical-align: middle; height: 14.25pt; width: 327pt;\">True&nbsp;WDR&nbsp;120dB</td>\n</tr>\n<tr height=\"19\">\n<td class=\"et2\" x:str=\"\" height=\"19\" width=\"436\" style=\"color: rgb(0, 0, 0); font-size: 10.4pt; vertical-align: middle; height: 14.25pt; width: 327pt;\">IP67&nbsp;&amp;&nbsp;IK10</td>\n</tr>\n<tr height=\"19\">\n<td class=\"et2\" x:str=\"\" height=\"19\" width=\"436\" style=\"color: rgb(0, 0, 0); font-size: 10.4pt; vertical-align: middle; height: 14.25pt; width: 327pt;\">MicroSD&nbsp;Slot&nbsp;up&nbsp;to&nbsp;128GB</td>\n</tr>\n<tr height=\"19\">\n<td class=\"et2\" x:str=\"\" height=\"19\" width=\"436\" style=\"color: rgb(0, 0, 0); font-size: 10.4pt; vertical-align: middle; height: 14.25pt; width: 327pt;\">DC&nbsp;12V,&nbsp;PoE</td>\n</tr>\n\n</tbody></table><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/a46dcd0144a70e062f8520c8caf73ba8.png\"><br></div><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/91956e71a0c6dc7f7dcc900a773a97b9.png\"><br></div><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/9b9abb7a76761bdd027c179985a910ca.png\"><br></div><div><br></div>","order_num":3.000,"prepay":false,"open_code":"lts2open","sale_rule":"","cdate":1521160095000,"spot_rule":"","order_promotion":true,"package_item_list":[],"parent_id":0,"app_show":false,"partner_id":4,"short_code":"","biz_type":101,"sinr":"LTCMIP7342W-28M","shop_id":4,"status":1,"best_box":false,"category_id":8,"manager_cate_name":"","cost_price_value":"0","spot_price_value":"0","distribution":false,"url":"f0ad4f89e1ad3b5435196feca1729280.png","size":"","price_define":"{\"discountMap\":{\"3\":100,\"2\":100,\"1\":100,\"5\":100,\"4\":100},\"kaPriceMap\":{},\"priceMap\":{}}","discount":0,"commission_s":0,"price":13900,"spu_id":147,"spot_price":0,"attr_activity":false,"min_num":0.000,"item_name":"CMIP7342W-28M, Platinum Network Vandal Dome IP Camera 4MP - 2.8mm","shop_name":"","no_rebate":false,"orign":"CN","send_rule":"","retail":false,"spec":"nothing","weight":0.000,"full_url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/f0ad4f89e1ad3b5435196feca1729280.png","props_ext":"","discount_type_cname":"æ— ä¼˜æƒ ","attribute":4194304,"item_images":[{"value":"f0ad4f89e1ad3b5435196feca1729280.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/f0ad4f89e1ad3b5435196feca1729280.png"}],"promotion_title":"","price_define_do":{"price_map":{},"ka_price_map":{},"discount_map":{"3":100,"2":100,"1":100,"5":100,"4":100}},"id":10072,"warehousing":true,"manager_cate_id":0,"type_fa":false,"sku_id":72,"sale_rule_do":{},"hd_method":2304,"presale":false,"share_num":0,"safe_num":0.000,"item_struct_props":[],"urls":"f0ad4f89e1ad3b5435196feca1729280.png","status_cname":"å·²ä¸Šæž¶","sku_total":0,"puser_id":20016,"beyond_num":0,"open_codes":"","unit":"pc","sin":"LTCMIP7342W-28M","brand":"LTS","type_ch":false,"special":"","cut":false,"group":false,"partner_name":"","props":"{}","advance":false,"storage":0.000,"soldout":false},{"diy_price":false,"percent":false,"tag":"","price_real":11900,"price_real_value":"119.00","type":0,"commission_t":0,"upshelf":true,"stock_out":0.000,"fixed":false,"image_value":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/23092c687f066cc3c1f460ff7cc813af.png","price_value":"119.00","follow_num":0,"category_name":"","rank":1054,"wholesale":true,"edate":1525369770000,"discount_type":0,"description":"<img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/0a2f09428249c3424ceba3e8771e8f4c.png\"><div></div><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/837cb857e6e8a8f64967b67f8526f4ab.png\"><br></div><div>\n\n\n\n\n<style>\n<!--table\n\t{mso-displayed-decimal-separator:\"\\.\";\n\tmso-displayed-thousand-separator:\"\\,\";}\n@page\n\t{margin:1.0in .75in 1.0in .75in;\n\tmso-header-margin:.51in;\n\tmso-footer-margin:.51in;}\ntd\n\t{padding-top:1px;\n\tpadding-right:1px;\n\tpadding-left:1px;\n\tmso-ignore:padding;\n\tcolor:black;\n\tfont-size:11.0pt;\n\tfont-weight:400;\n\tfont-style:normal;\n\ttext-decoration:none;\n\tfont-family:Calibri;\n\tmso-generic-font-family:auto;\n\tmso-font-charset:134;\n\tmso-number-format:General;\n\ttext-align:general;\n\tvertical-align:middle;\n\tborder:none;\n\tmso-background-source:auto;\n\tmso-pattern:auto;\n\tmso-protection:locked visible;\n\twhite-space:nowrap;\n\tmso-rotate:0;}\n.xl65\n\t{color:black;\n\tfont-size:10.45pt;\n\tfont-family:Roboto;\n\tmso-generic-font-family:auto;\n\tmso-font-charset:0;\n\ttext-align:left;\n\twhite-space:normal;\n\tpadding-left:12px;\n\tmso-char-indent-count:1;}\n-->\n</style>\n\n\n\n\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"469\" style=\"border-collapse:\n collapse;width:469pt\">\n<!--StartFragment-->\n <colgroup><col width=\"469\" style=\"mso-width-source:userset;mso-width-alt:20010;width:469pt\">\n </colgroup><tbody><tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"469\" style=\"height:14.0pt;width:469pt\">4.1MP\n  High Definition</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"469\" style=\"height:14.0pt;width:469pt\">2.8mm\n  Fixed Lens</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"469\" style=\"height:14.0pt;width:469pt\">1/3\"\n  CMOS</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"469\" style=\"height:14.0pt;width:469pt\">2688X1520P@20fp</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"469\" style=\"height:14.0pt;width:469pt\">DWDR</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"469\" style=\"height:14.0pt;width:469pt\">3D DNR,\n  BLC, VCA&nbsp;</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"469\" style=\"height:14.0pt;width:469pt\">Matrix\n  IR LED up to 100ft</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"469\" style=\"height:14.0pt;width:469pt\">IP66</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"469\" style=\"height:14.0pt;width:469pt\">DC 12V,\n  PoE</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"469\" style=\"height:14.0pt;width:469pt\">UL\n  Listed</td>\n </tr>\n<!--EndFragment-->\n</tbody></table><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/a46dcd0144a70e062f8520c8caf73ba8.png\"><br></div><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/5a0f5c7732aecdc00744f7761940b805.png\"><br></div><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/9b9abb7a76761bdd027c179985a910ca.png\"><br></div>","order_num":0.000,"prepay":false,"open_code":"lts2open","sale_rule":"","cdate":1521176936000,"spot_rule":"","order_promotion":true,"package_item_list":[],"parent_id":0,"app_show":false,"partner_id":4,"short_code":"","biz_type":101,"sinr":"LTCMIP1142-28","shop_id":4,"status":1,"best_box":false,"category_id":10,"manager_cate_name":"","cost_price_value":"0","spot_price_value":"0","distribution":false,"url":"23092c687f066cc3c1f460ff7cc813af.png","size":"","price_define":"{\"discountMap\":{\"3\":100,\"2\":100,\"1\":100,\"5\":100,\"4\":100},\"kaPriceMap\":{},\"priceMap\":{}}","discount":0,"commission_s":0,"price":11900,"spu_id":311,"spot_price":0,"attr_activity":false,"min_num":0.000,"item_name":"CMIP1142-28, Platinum Fixed Lens Turret Network IP Camera 4.1MP - 2.8mm","shop_name":"","no_rebate":false,"orign":"CN","send_rule":"","retail":false,"spec":"nothing","weight":825.547,"full_url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/23092c687f066cc3c1f460ff7cc813af.png","props_ext":"","discount_type_cname":"æ— ä¼˜æƒ ","attribute":4194304,"item_images":[{"value":"23092c687f066cc3c1f460ff7cc813af.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/23092c687f066cc3c1f460ff7cc813af.png"}],"promotion_title":"","price_define_do":{"price_map":{},"ka_price_map":{},"discount_map":{"3":100,"2":100,"1":100,"5":100,"4":100}},"id":10155,"warehousing":true,"manager_cate_id":0,"type_fa":false,"sku_id":148,"sale_rule_do":{},"hd_method":2304,"presale":false,"share_num":0,"safe_num":0.000,"item_struct_props":[],"urls":"23092c687f066cc3c1f460ff7cc813af.png","status_cname":"å·²ä¸Šæž¶","sku_total":0,"puser_id":20016,"beyond_num":0,"open_codes":"","unit":"pc","sin":"LTCMIP1142-28","brand":"LTS","type_ch":false,"special":"","cut":false,"group":false,"partner_name":"","props":"{}","advance":false,"storage":0.000,"soldout":false},{"diy_price":false,"percent":false,"tag":"","price_real":9900,"price_real_value":"99.00","type":0,"commission_t":0,"upshelf":true,"stock_out":0.000,"fixed":false,"image_value":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/a8cfea33a7f2148bbae9a92ed28e478f.png","price_value":"99.00","follow_num":0,"category_name":"","rank":1057,"wholesale":true,"edate":1525369770000,"discount_type":0,"description":"<img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/2bca563b9ce1b44c85e14d2663681b11.png\"><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/837cb857e6e8a8f64967b67f8526f4ab.png\"><br></div>\n\n\n\n\n<style>\n<!--table\n\t{mso-displayed-decimal-separator:\"\\.\";\n\tmso-displayed-thousand-separator:\"\\,\";}\n@page\n\t{margin:1.0in .75in 1.0in .75in;\n\tmso-header-margin:.51in;\n\tmso-footer-margin:.51in;}\ntd\n\t{padding-top:1px;\n\tpadding-right:1px;\n\tpadding-left:1px;\n\tmso-ignore:padding;\n\tcolor:black;\n\tfont-size:11.0pt;\n\tfont-weight:400;\n\tfont-style:normal;\n\ttext-decoration:none;\n\tfont-family:Calibri;\n\tmso-generic-font-family:auto;\n\tmso-font-charset:134;\n\tmso-number-format:General;\n\ttext-align:general;\n\tvertical-align:middle;\n\tborder:none;\n\tmso-background-source:auto;\n\tmso-pattern:auto;\n\tmso-protection:locked visible;\n\twhite-space:nowrap;\n\tmso-rotate:0;}\n.xl65\n\t{color:black;\n\tfont-size:10.45pt;\n\tfont-family:Roboto;\n\tmso-generic-font-family:auto;\n\tmso-font-charset:0;\n\ttext-align:left;\n\twhite-space:normal;\n\tpadding-left:12px;\n\tmso-char-indent-count:1;}\n-->\n</style>\n\n\n\n\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"469\" style=\"border-collapse:\n collapse;width:469pt\">\n<!--StartFragment-->\n <colgroup><col width=\"469\" style=\"mso-width-source:userset;mso-width-alt:20010;width:469pt\">\n </colgroup><tbody><tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"469\" style=\"height:14.0pt;width:469pt\">2.1MP\n  High Definition</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"469\" style=\"height:14.0pt;width:469pt\">1/2.8â€\n  CMOS</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"469\" style=\"height:14.0pt;width:469pt\">1920X1080P@30fps</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"469\" style=\"height:14.0pt;width:469pt\">2.8mm\n  Fixed Lens</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"469\" style=\"height:14.0pt;width:469pt\">1 Matrix\n  IR LED up to 100ft</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"469\" style=\"height:14.0pt;width:469pt\">3D DNR,\n  WDR, BLC, VCA</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"469\" style=\"height:14.0pt;width:469pt\">IP66</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"469\" style=\"height:14.0pt;width:469pt\">Junction\n  Box Sold Seperately</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"469\" style=\"height:14.0pt;width:469pt\">DC 12V,\n  PoE</td>\n </tr>\n<!--EndFragment-->\n</tbody></table><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/a46dcd0144a70e062f8520c8caf73ba8.png\"><br><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/1373bfadb43c17807105f6e55b64e4a9.png\"><br></div><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/9b9abb7a76761bdd027c179985a910ca.png\"><br></div>","order_num":0.000,"prepay":false,"open_code":"lts2open","sale_rule":"","cdate":1521178178000,"spot_rule":"","order_promotion":true,"package_item_list":[],"parent_id":0,"app_show":false,"partner_id":4,"short_code":"","biz_type":101,"sinr":"LTCMIP3022W-28","shop_id":4,"status":1,"best_box":false,"category_id":10,"manager_cate_name":"","cost_price_value":"0","spot_price_value":"0","distribution":false,"url":"a8cfea33a7f2148bbae9a92ed28e478f.png","size":"","price_define":"{\"discountMap\":{\"3\":100,\"2\":100,\"1\":100,\"5\":100,\"4\":100},\"kaPriceMap\":{},\"priceMap\":{}}","discount":0,"commission_s":0,"price":9900,"spu_id":349,"spot_price":0,"attr_activity":false,"min_num":0.000,"item_name":"CMIP3022W-28, Platinum Fixed Lens Turret IP Camera 2.1MP - 2.8mm","shop_name":"","no_rebate":false,"orign":"CN","send_rule":"","retail":false,"spec":"nothing","weight":816.475,"full_url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/a8cfea33a7f2148bbae9a92ed28e478f.png","props_ext":"","discount_type_cname":"æ— ä¼˜æƒ ","attribute":4194304,"item_images":[{"value":"a8cfea33a7f2148bbae9a92ed28e478f.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/a8cfea33a7f2148bbae9a92ed28e478f.png"}],"promotion_title":"","price_define_do":{"price_map":{},"ka_price_map":{},"discount_map":{"3":100,"2":100,"1":100,"5":100,"4":100}},"id":10174,"warehousing":true,"manager_cate_id":0,"type_fa":false,"sku_id":167,"sale_rule_do":{},"hd_method":2304,"presale":false,"share_num":0,"safe_num":0.000,"item_struct_props":[],"urls":"a8cfea33a7f2148bbae9a92ed28e478f.png","status_cname":"å·²ä¸Šæž¶","sku_total":0,"puser_id":20016,"beyond_num":0,"open_codes":"","unit":"pc","sin":"LTCMIP3022W-28","brand":"LTS","type_ch":false,"special":"","cut":false,"group":false,"partner_name":"","props":"{}","advance":false,"storage":0.000,"soldout":false},{"diy_price":false,"percent":false,"tag":"","price_real":19900,"price_real_value":"199.00","type":0,"commission_t":0,"upshelf":true,"stock_out":0.000,"fixed":false,"image_value":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/cf06dce16d9fabb9b3c0d69c7ef088af.png","price_value":"199.00","follow_num":0,"category_name":"","rank":1059,"wholesale":true,"edate":1525369770000,"discount_type":0,"description":"<img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/3fadc03f82f7a446368764e431544dd3.png\"><div></div><div><span style=\"color: rgb(0, 0, 0); font-family: Roboto, sans-serif; font-size: 13.95px;\">4.1MP High Definition</span><br><span style=\"color: rgb(0, 0, 0); font-family: Roboto, sans-serif; font-size: 13.95px;\">1/3â€ CMOS</span><br><span style=\"color: rgb(0, 0, 0); font-family: Roboto, sans-serif; font-size: 13.95px;\">2688X1520P@20fps</span><br><span style=\"color: rgb(0, 0, 0); font-family: Roboto, sans-serif; font-size: 13.95px;\">2.8-12mm Varifocal Motorized Lens</span><br><span style=\"color: rgb(0, 0, 0); font-family: Roboto, sans-serif; font-size: 13.95px;\">42 IR LEDs up to 100ft</span><br><span style=\"color: rgb(0, 0, 0); font-family: Roboto, sans-serif; font-size: 13.95px;\">3D DNR, WDR, BLC, VCA</span><br><span style=\"color: rgb(0, 0, 0); font-family: Roboto, sans-serif; font-size: 13.95px;\">Micro SD/SDHC/SDXC Card Slot</span><br><span style=\"color: rgb(0, 0, 0); font-family: Roboto, sans-serif; font-size: 13.95px;\">Audio I/O, Alarm I/O</span><br><span style=\"color: rgb(0, 0, 0); font-family: Roboto, sans-serif; font-size: 13.95px;\">IP67</span><br><span style=\"color: rgb(0, 0, 0); font-family: Roboto, sans-serif; font-size: 13.95px;\">Junction Box Included</span><br><span style=\"color: rgb(0, 0, 0); font-family: Roboto, sans-serif; font-size: 13.95px;\">DC 12V, PoE</span><br></div><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/4905942d4e81b5beca35e8e74175163b.png\"><span style=\"color: rgb(0, 0, 0); font-family: Roboto, sans-serif; font-size: 13.95px;\"><br></span></div>","order_num":0.000,"prepay":false,"open_code":"lts2open","sale_rule":"","cdate":1523696197000,"spot_rule":"","order_promotion":true,"package_item_list":[],"parent_id":0,"app_show":false,"partner_id":4,"short_code":"","biz_type":101,"sinr":"LTCMIP9743W-SZ","shop_id":4,"status":1,"best_box":false,"category_id":9,"manager_cate_name":"","cost_price_value":"0","spot_price_value":"0","distribution":false,"url":"cf06dce16d9fabb9b3c0d69c7ef088af.png","size":"","price_define":"{\"discountMap\":{\"3\":100,\"2\":100,\"1\":100,\"5\":100,\"4\":100},\"kaPriceMap\":{},\"priceMap\":{}}","discount":0,"commission_s":0,"price":19900,"spu_id":1381,"spot_price":0,"attr_activity":false,"min_num":0.000,"item_name":"CMIP9743W-SZ, Platinum Motorized Varifocal Bullet IP Camera 4.1MP","shop_name":"","no_rebate":false,"orign":"CN","send_rule":"","retail":false,"spec":"nothing","weight":1202.032,"full_url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/cf06dce16d9fabb9b3c0d69c7ef088af.png","props_ext":"","discount_type_cname":"æ— ä¼˜æƒ ","attribute":4194304,"item_images":[{"value":"cf06dce16d9fabb9b3c0d69c7ef088af.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/cf06dce16d9fabb9b3c0d69c7ef088af.png"},{"value":"971bbf9398547087d2294a7da30455bb.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/971bbf9398547087d2294a7da30455bb.png"},{"value":"513728bb09a5726955fa3a52305222d4.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/513728bb09a5726955fa3a52305222d4.png"},{"value":"3b69b9e55cf5c89e6d2159b1bd1afd95.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/3b69b9e55cf5c89e6d2159b1bd1afd95.png"}],"promotion_title":"","price_define_do":{"price_map":{},"ka_price_map":{},"discount_map":{"3":100,"2":100,"1":100,"5":100,"4":100}},"id":10979,"warehousing":true,"manager_cate_id":0,"type_fa":false,"sku_id":11998,"sale_rule_do":{},"hd_method":2304,"presale":false,"share_num":0,"safe_num":0.000,"item_struct_props":[],"urls":"cf06dce16d9fabb9b3c0d69c7ef088af.png,971bbf9398547087d2294a7da30455bb.png,513728bb09a5726955fa3a52305222d4.png,3b69b9e55cf5c89e6d2159b1bd1afd95.png","status_cname":"å·²ä¸Šæž¶","sku_total":0,"puser_id":20016,"beyond_num":0,"open_codes":"","unit":"pc","sin":"LTCMIP9743W-SZ","brand":"LTS","type_ch":false,"special":"","cut":false,"group":false,"partner_name":"","props":"{}","advance":false,"storage":0.000,"soldout":false},{"diy_price":false,"percent":false,"tag":"","price_real":2100,"price_real_value":"21.00","type":0,"commission_t":0,"upshelf":true,"stock_out":0.000,"fixed":false,"image_value":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/dc6673c1c17bf636fa38726bc487bdc9.png","price_value":"25.00","category_name":"","follow_num":0,"rank":1096,"wholesale":true,"edate":1525483944000,"discount_type":2,"description":"<img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/837cb857e6e8a8f64967b67f8526f4ab.png\"><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/12c64be9409f943f96f7e3c184cd1ddc.png\"><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/fbfdf04f71604223cab4c014a5695a7b.png\"><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/e9d457afcb90a01d28f014a954244b2e.png\"><br><div></div><div><ul style=\"margin-bottom: 1em; padding-left: 15px; list-style-position: outside; list-style-image: initial; color: rgb(0, 0, 0); font-family: Roboto, sans-serif; font-size: 13.95px;\"><li style=\"margin-bottom: 0.5em;\">2.1MP High Definition</li><li style=\"margin-bottom: 0.5em;\">Full HD 1080P</li><li style=\"margin-bottom: 0.5em;\">1920X1080P@30fps</li><li style=\"margin-bottom: 0.5em;\">2.8mm Fixed Lens</li><li style=\"margin-bottom: 0.5em;\">24 IR LEDs up to 65ft</li><li style=\"margin-bottom: 0.5em;\">Outdoor/Indoor</li><li style=\"margin-bottom: 0.5em;\">DC 12V</li><li style=\"margin-bottom: 0.5em;\">IP66</li><li style=\"margin-bottom: 0.5em;\">UTC</li></ul><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/a46dcd0144a70e062f8520c8caf73ba8.png\"><font color=\"#000000\" face=\"Roboto, sans-serif\"><span style=\"font-size: 13.95px;\"><br></span></font></div></div></div><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/9260d2aac79b2ad1d1e08528b3fa55c6.png\"><br></div><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/1c5d724c2b07bf79e2b688c29b223897.png\"><br></div><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/9b9abb7a76761bdd027c179985a910ca.png\"><br></div>","order_num":6.000,"prepay":false,"open_code":"lts2open","sale_rule":"","cdate":1524174089000,"spot_rule":"","order_promotion":true,"package_item_list":[],"parent_id":0,"app_show":false,"partner_id":4,"short_code":"","biz_type":101,"sinr":"LTCMHT2122-28","shop_id":4,"status":1,"best_box":false,"category_id":17,"manager_cate_name":"","cost_price_value":"0","spot_price_value":"0","distribution":false,"activity_price":2100,"url":"dc6673c1c17bf636fa38726bc487bdc9.png","size":"","price_define":"{\"discountMap\":{\"3\":100,\"2\":100,\"1\":100,\"5\":100,\"4\":100},\"kaPriceMap\":{},\"priceMap\":{}}","discount":400,"commission_s":0,"price":2500,"spu_id":2446,"spot_price":0,"attr_activity":true,"min_num":0.000,"item_name":"LTCMHT2122-28, Platinum HD-TVI Turret Camera 2.1MP","shop_name":"","no_rebate":false,"orign":"CN","send_rule":"","retail":false,"spec":"nothing","weight":408.237,"full_url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/dc6673c1c17bf636fa38726bc487bdc9.png","props_ext":"","discount_type_cname":"å‡ä»·","attribute":4210689,"item_images":[{"value":"dc6673c1c17bf636fa38726bc487bdc9.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/dc6673c1c17bf636fa38726bc487bdc9.png"}],"promotion_title":"","price_define_do":{"price_map":{},"ka_price_map":{},"discount_map":{"3":100,"2":100,"1":100,"5":100,"4":100}},"id":11638,"warehousing":true,"manager_cate_id":0,"type_fa":false,"sku_id":21836,"sale_rule_do":{},"presale":false,"hd_method":2304,"share_num":0,"safe_num":0.000,"item_struct_props":[],"urls":"dc6673c1c17bf636fa38726bc487bdc9.png","status_cname":"å·²ä¸Šæž¶","sku_total":0,"puser_id":20016,"beyond_num":0,"open_codes":"","unit":"pc","sin":"LTCMHT2122-28","brand":"LTS","type_ch":false,"special":"","cut":true,"group":false,"partner_name":"","props":"{}","advance":false,"storage":0.000,"soldout":false},{"diy_price":false,"tag":"20off2018421","commission_t":0,"member_price_value":"45.00","fixed":true,"stock_out":0.000,"upshelf":false,"price_value":"45.00","follow_num":0,"category_name":"","rank":1051,"wholesale":true,"edate":1525369770000,"prepay":false,"open_code":"lts2open","package_item_list":[],"order_promotion":true,"parent_id":0,"partner_id":4,"short_code":"","shop_id":4,"best_box":false,"cost_price_value":"0","activity_price":3600,"distribution":false,"discount":0,"commission_s":0,"price":4500,"min_num":0.000,"spot_price":0,"shop_name":"","no_rebate":false,"orign":"CN","retail":false,"send_rule":"","spec":"nothing","full_url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/799cf753444caf73f51b7539509cb336.png","discount_type_cname":"é™æ—¶æŠ¢è´­","item_images":[{"value":"799cf753444caf73f51b7539509cb336.png","url":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/799cf753444caf73f51b7539509cb336.png"}],"type_fa":false,"member_price":4500,"safe_num":0.000,"sin":"LTCMHD7422-28","brand":"LTS","cut":false,"props":"{}","percent":false,"price_real":4500,"price_real_value":"45.00","type":0,"image_value":"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/799cf753444caf73f51b7539509cb336.png","order_num":-2.000,"description":"<img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/de148df3d0de65c80eaacbfffc90af62.png\"><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/837cb857e6e8a8f64967b67f8526f4ab.png\"><br></div><div>\n\n\n\n\n<style>\n<!--table\n\t{mso-displayed-decimal-separator:\"\\.\";\n\tmso-displayed-thousand-separator:\"\\,\";}\n@page\n\t{margin:1.0in .75in 1.0in .75in;\n\tmso-header-margin:.51in;\n\tmso-footer-margin:.51in;}\ntd\n\t{padding-top:1px;\n\tpadding-right:1px;\n\tpadding-left:1px;\n\tmso-ignore:padding;\n\tcolor:black;\n\tfont-size:11.0pt;\n\tfont-weight:400;\n\tfont-style:normal;\n\ttext-decoration:none;\n\tfont-family:Calibri;\n\tmso-generic-font-family:auto;\n\tmso-font-charset:134;\n\tmso-number-format:General;\n\ttext-align:general;\n\tvertical-align:middle;\n\tborder:none;\n\tmso-background-source:auto;\n\tmso-pattern:auto;\n\tmso-protection:locked visible;\n\twhite-space:nowrap;\n\tmso-rotate:0;}\n.xl65\n\t{color:black;\n\tfont-size:10.45pt;\n\tfont-family:Roboto;\n\tmso-generic-font-family:auto;\n\tmso-font-charset:0;\n\ttext-align:left;\n\twhite-space:normal;\n\tpadding-left:12px;\n\tmso-char-indent-count:1;}\n-->\n</style>\n\n\n\n\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"334\" style=\"border-collapse:\n collapse;width:334pt\">\n<!--StartFragment-->\n <colgroup><col width=\"334\" style=\"mso-width-source:userset;mso-width-alt:14250;width:334pt\">\n </colgroup><tbody><tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"334\" style=\"height:14.0pt;width:334pt\">2.1MP\n  High Definition</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"334\" style=\"height:14.0pt;width:334pt\">1920x1080P@30fps</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"334\" style=\"height:14.0pt;width:334pt\">True\n  Day/Night</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"334\" style=\"height:14.0pt;width:334pt\">2.8mm\n  Fixed Lens</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"334\" style=\"height:14.0pt;width:334pt\">Smart\n  IR, 65ft(20m) IR Distance</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"334\" style=\"height:14.0pt;width:334pt\">OSD Menu\n  via UTC Technology with Platinum TVI DVR</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"334\" style=\"height:14.0pt;width:334pt\">Aluminum\n  Housing</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"334\" style=\"height:14.0pt;width:334pt\">Vandal-Proof</td>\n </tr>\n <tr height=\"14\" style=\"height:14.0pt\">\n  <td height=\"14\" class=\"xl65\" width=\"334\" style=\"height:14.0pt;width:334pt\">3-Axis</td>\n </tr>\n<!--EndFragment-->\n</tbody></table><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/a46dcd0144a70e062f8520c8caf73ba8.png\"><br></div><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/957e8efb9afcb61c16b1839eb4004c0d.png\"><br></div><div><img src=\"https://ltsb2b.oss-us-west-1.aliyuncs.com/item/9b9abb7a76761bdd027c179985a910ca.png\"><br></div>","discount_type":4,"sale_rule":"{\"total\":500,\"startTime\":\"2018-04-21 00:00:00\",\"price\":3600,\"maxinum\":8,\"minimum\":1,\"endTime\":\"2018-04-29 00:00:00\"}","cdate":1524295601000,"spot_rule":"","app_show":false,"biz_type":101,"sinr":"LTCMHD7422-28","status":4,"manager_cate_name":"","category_id":15,"spot_price_value":"0","url":"799cf753444caf73f51b7539509cb336.png","price_define":"","size":"","attr_activity":true,"spu_id":171,"item_name":"CMHD7422-28, Platinum HD-TVI Dome Camera 2.1MP","end_time":1524985200000,"weight":635.036,"props_ext":"","attribute":4194305,"promotion_title":"","id":11657,"warehousing":true,"manager_cate_id":0,"sku_id":36718,"sale_rule_do":{"total":500,"start_time":"2018-04-21 00:00:00","price":3600,"maxinum":8,"minimum":1,"end_time":"2018-04-29 00:00:00"},"hd_method":2304,"presale":false,"share_num":0,"item_struct_props":[],"urls":"799cf753444caf73f51b7539509cb336.png","puser_id":20016,"sku_total":0,"status_cname":"å·²ç»“æŸ","beyond_num":0,"open_codes":"","unit":"pc","start_time":1524294000000,"special":"","type_ch":false,"group":false,"partner_name":"","advance":false,"soldout":false,"storage":2.000}]},"error_code":999,"error_message":"","error_name":"SERVICE_ERROR","fail":false,"success":true,"success_message":""}
                    let skuItem=  getDefaultSkuItem(data.data.item)
                    data.data.item.item_struct_props.forEach((value, index, array) => {
                        value.propValues = JSON.parse(value.prop_value)
                    })
                    data.data.item.item_struct_props.forEach((value, index, array) => {
                        if (!value.sku) {
                            this.aboutDetail.push(value);
                        }
                        // 计算会员等级
                        // else{
                        //     if(this.level != 0 && data.data.item.price_define_do){
                        //         for(let map in data.data.item.price_define_do.discount_map){
                        //             if(map == this.level && (data.data.item.price_define_do.discount_map[map]!= 100)){
                        //                 value.price_real = value.price_real * data.data.item.price_define_do.discount_map[map] / 100
                        //                 data.data.item.price_real = data.data.item.price_real * data.data.item.price_define_do.discount_map[map] / 100
                        //                 data.data.item.discount_type = data.data.item.discount_type ? data.data.item.discount_type : 9
                        //             }
                        //         }
                        //     }
                        // }
                    })
                    if(data.data.item.package_item_list.length > 0){
                        data.data.item.package_item_list.forEach(t => {
                            t.checked = false
                            t.item_struct_props.forEach(prop => {
                                if(prop.sku && prop.storage){
                                    t.otherCheckedProp = prop
                                    t.price_real = prop.price_real
                                    return false
                                }
                            })
                        })
                    }
                    this.otherGoods = data.data.item.package_item_list
                    if(data.data.item.item_images.length == 0){
                        data.data.item.item_images.push(
                            {
                                url : data.data.item.image_value
                            }
                        )
                    }
                    this.item = data.data.item
                    this.activeImg = this.item.item_images[0]
                    this.hotSale = data.data.hot_recomment.items
                    this.hotSale = (data.data && data.data.hot_recomment) ? data.data.hot_recomment.items : [];
                    this.hotSale.forEach((item) => {
                        if(item.tag.indexOf('新品') != -1){
                            item.isNew = true
                        }
                    })
                    this.buyHistory = (data.data && data.data.user_order_history) ? data.data.user_order_history : [];
                    // console.log(this.buyHistory)
                    if(this.buyHistory.length > 0){
                        this.buyHistory.forEach((item) => {
                            if(item.tag.indexOf('新品') != -1){
                                item.isNew = true
                            }
                        })
                    }
                    [this.hotSale,this.buyHistory].map(arr => {
                        arr.forEach(val => {
                            if(this.level != 0 && val.price_define_do){
                                for(let map in val.price_define_do.discount_map){
                                    if(map == this.level){
                                        val.price = val.price * val.price_define_do.discount_map[map] / 100
                                    }
                                }
                            }
                        })
                    })
                    this.historyItems = this.buyHistory.slice(0,2)
                    if (this.item.discount_type === 4) {
                        this.item.item_struct_props.forEach(t => {
                            if(t.sku){
                                t.storage = this.item.sale_rule_do.total
                            }
                        })
                        itemService.searchItem({discountType:0,sin:this.item.sin}).then((resp) => {
                            if(resp.data.item_d_o_list.length > 0){
                                this.otherGoodsItem = resp.data.item_d_o_list[0]
                            }
                        })
                        let now
                        timeService.getUtcTime(this.item.sale_rule_do.end_time).then(v1 => {
                            this.end = new Date(v1.time).getTime()
                            timeService.getUtcTime(this.item.sale_rule_do.start_time).then(v2 => {
                                this.start = new Date(v2.time).getTime()
                                timeService.getTimeAndZone().then(v3 => {
                                    now = new Date(v3.current_time).getTime()
                                    if (this.end > now) {
                                        this.countdown(now)
                                    } else {
                                        // 活动结束，不显示了
                                        this.finished = true
                                    }
                                })
                            })
                        })
                    }
                    let self = this
                    if(skuItem.props[0]) {
                        setTimeout(() => {
                            self.skuMapEach(skuItem.props[0], self.item, 'checkedSku')
                        }, 300)
                    }
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.errorMessage})
                })
            },
            hotRecommoned(){
                cartService.hotRecommond().then((data) => {
                   this.recommondInfo = data.data;
                })
            },
            checkedProp(prop, data, type) {
              // console.log(prop,data, type)
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
                // 判断限时限量商品购买数量是否超过限额
                if((JSON.stringify(this.otherGoodsItem) != '{}') && this.item.sale_rule_do.maxinum && (this.item.num > this.item.sale_rule_do.maxinum)){
                    this.otherGoodsItem.num = this.item.num - this.item.sale_rule_do.maxinum
                    this.item.num = this.item.sale_rule_do.maxinum
                }
                cartService.putCartPlus(item, spu).then((data) => {
                    if (!this.showPropsError) {
                        this.flag = true
                    }
                    if(JSON.stringify(this.otherGoodsItem) != '{}'){
                        this.otherGoodsItem.item_struct_props.forEach(t => {
                            if(this.checkedSpu.prop_value == t.prop_value){
                                cartService.putCartPlus(this.otherGoodsItem,t).then(data => {

                                }, err => {
                                    this.$ltsMessage.show({type: 'error', message: err.error_message})
                                })
                            }
                        })
                    }
                    this.selfContext.$emit('addCartSuccess')
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
                // 判断限时限量商品购买数量是否超过限额
                if((JSON.stringify(this.otherGoodsItem) != '{}') && this.item.sale_rule_do.maxinum && (this.item.num > this.item.sale_rule_do.maxinum)){
                    this.otherGoodsItem.num = this.item.num - this.item.sale_rule_do.maxinum
                    this.item.num = this.item.sale_rule_do.maxinum
                    if(JSON.stringify(this.otherGoodsItem) != '{}'){
                        this.otherGoodsItem.item_struct_props.forEach(t => {
                            if(this.checkedSpu.prop_value == t.prop_value){
                                this.otherItemSpu = t
                            }
                        })
                    }
                }
                let item = {
                    'activity_id': null,
                    'attribute': this.item.attribute,
                    'brand': this.item.brand,
                    'category_id': this.item.category_id,
                    'discount':this.item.discount,
                    'discount_type': this.item.discount_type,
                    'id': this.item.id,
                    'item_name': this.item.item_name.replace('%','%25'),
                    'item_props': [this.checkedSpu],
                    'maxinum': this.item.maxinum,
                    'mininum': this.item.mininum,
                    'num': this.item.num ? this.item.num : 1,
                    'price': this.item.price,
                    'price_real': this.item.price_real,
                    'proxy_distribute_num': this.item.proxy_distribute_num,
                    'puser_id': this.item.puser_id,
                    'spec_unit': this.item.spec_unit,
                    'spu_id': this.checkedSpu.spu_id,
                    'status': this.item.status,
                    'storage': this.item.storage,
                    'tag': this.item.tag,
                    'url': this.item.url,
                    'full_url': this.item.full_url,
                    'sale_rule': this.item.sale_rule,
                    'price_define_do':this.item.price_define_do
                }
                let otherItem
                if(JSON.stringify(this.otherGoodsItem) != '{}') {
                    otherItem = {
                        'activity_id': null,
                        'attribute': this.otherGoodsItem.attribute,
                        'brand': this.otherGoodsItem.brand,
                        'category_id': this.otherGoodsItem.category_id,
                        'discount': this.otherGoodsItem.discount,
                        'discount_type': this.otherGoodsItem.discount_type,
                        'id': this.otherGoodsItem.id,
                        'item_name': this.otherGoodsItem.item_name.replace('%', '%25'),
                        'item_props': [this.otherItemSpu],
                        'maxinum': this.otherGoodsItem.maxinum,
                        'mininum': this.otherGoodsItem.mininum,
                        'num': this.otherGoodsItem.num,
                        'price': this.otherGoodsItem.price,
                        'price_real': this.otherGoodsItem.price_real,
                        'proxy_distribute_num': this.otherGoodsItem.proxy_distribute_num,
                        'puser_id': this.otherGoodsItem.puser_id,
                        'spec_unit': this.otherGoodsItem.spec_unit,
                        'spu_id': this.otherItemSpu.spu_id,
                        'status': this.otherGoodsItem.status,
                        'storage': this.otherGoodsItem.storage,
                        'tag': this.otherGoodsItem.tag,
                        'url': this.otherGoodsItem.url,
                        'full_url': this.otherGoodsItem.full_url,
                        'sale_rule': this.otherGoodsItem.sale_rule,
                        'price_define_do': this.otherGoodsItem.price_define_do
                    }
                }
                let items = JSON.stringify(this.otherGoodsItem) != '{}' ? [item, otherItem] : [item]
                // window.open('/cart#/settle?item=' + JSON.stringify(items))
                localStorage.setItem('buyNowItem',JSON.stringify(items))
                window.open('/cart?t=' + new Date().getTime() + '#/settle?items=' + JSON.stringify(items))
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
            // 添加套餐到购物车
            addPackage(obj) {
                if(!obj.checked){
                    cartService.putCartPlus({id: obj.id,num: 1,}, obj.otherCheckedProp).then((data) => {
                        this.selfContext.$emit('addCartSuccess')
                        obj.checked = true
                    }, (msg) => {
                        this.$ltsMessage.show({type: 'error', message: msg.error_message})
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
        },
        mounted() {
            this.level = window.localStorage.getItem('userLevel')
            this.hotRecommoned();
        },
    }
</script>

<style lang="less">
    .detail {
        .detailDiscount{
            width: 100%;
            height: 100px;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            border: 1px solid #f6f6f6;
            margin:24px 0;
        }

        li {
            box-sizing: border-box;
            position: relative;
            overflow: hidden;
        }
        li.reduce::before,li.discount::before,li.limit::before,li.newSeller::before{
            content:'';
            width:100px;
            height: 100px;
            position: absolute;
            top: 0px;
            left: 0px;
            background-position: 0 0;
            background-repeat: no-repeat;
            background-size: 100px 100px;
        }
        li.newSeller::before{
            background-image:url('../../../assets/img/new.png');
        }
        li.reduce::before{
            background-image:url('../../../assets/img/ONSALE.png');
        }
        li.discount::before{
            background-image:url('../../../assets/img/Discount.png');
        }
        li.limit::before{
            background-image:url('../../../assets/img/Doorbuster.png');
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
                        div.disabled{
                            cursor:not-allowed;
                        }
                    }
                }
            }
            .error {
                border: solid 1px red;
                padding: 0 10px 10px;
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
            .error_box{
                margin-bottom: 12px;
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
                    padding-left: 12px;
                    background-image: url('../../../assets/img/xqbjt.png');
                    background-repeat: no-repeat;
                    background-size: cover;
                    position: relative;
                    span.bold {
                        font-weight: bold;
                        margin: 0 6px 0 0;
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
                span.red {
                    color: #ff3b41;
                }
                .tips {
                    border: 1px solid #ff3b41;
                    line-height: 21px;
                    width: 190px;
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
                    .el-form-item__content{
                        margin-bottom: 10px;
                    }
                    .storage_spec {
                        font-size: 12px;
                        margin-left: 20px;
                    }
                }
                .limit-red{
                    font-size: 12px;
                    color:#f56c6c;
                    line-height: 1;
                    margin-bottom: 12px;
                }
                .mark {
                    margin-bottom: 8px;
                    label{
                        /*margin-left: -120px;*/
                    }
                    p {
                        font-size: 12px;
                        line-height: 20px;
                        margin-top: 10px;
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
                    margin-top: 20px;
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
                    button.hidden{
                        display: none;
                    }
                    button.is-disabled:hover{
                        cursor: not-allowed;
                    }
                }
                .buttons-disabled button {
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
                align-items: center;
                &>div{
                  margin-right: 24px;
                }
                .price {
                    display: flex;
                    justify-content: space-between;
                    span {
                        font-size: 16px;
                        font-weight: bold;
                        line-height: 28px;
                        display: block;
                    }
                    .el-button.icon{
                        border: none;
                        display: block;
                        padding: 0;
                    }
                    .el-button.icon:hover{
                        background: none;
                    }
                    .icon-gouwuche-copy{
                        color: #ff3b41;
                        border:2px solid #ff3b41;
                        border-radius:50%;
                        height: 20px;
                        width: 20px;
                        font-weight: normal;
                        padding: 1px;
                        display: inline-block;
                    }
                    .icon-gouwuche-copy:before{
                        position: relative;
                        top: -2px;
                        left: 0px;
                    }
                    .icon-chenggong1{
                        color: #f2ac31;
                        font-size: 22px;
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
                    line-height: 22px;
                    height: 48px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                .icon-handle{
                    position: relative;
                    top: -30px;
                }
                ul.others {
                    display: flex;
                    li.othersItem {
                        margin-right: 24px;
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
                            padding-left: 20px;
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
                        padding: 20px;
                    }
                }
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
                        cursor: pointer;
                        i {
                            display: block;
                            font-size: 14px;
                        }
                    }
                }
            }
            li {
                text-align: center;
                background: #ffffff;
                margin: 0 15px;
                border-bottom: 1px solid #f2f2f2;
                margin-top: 4px;
                .img {
                    width: 140px;
                    height: 140px;
                    margin: 0 auto;
                    background-position: center;
                    background-size: contain;
                    background-repeat: no-repeat;
                }
                p.name {
                    margin: 10px 0 0;
                    font-size: 14px;
                    color: #a3a3a3;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                .item-price {
                    background-color: #ffffff;
                    font-weight: bold;
                    line-height: 24px;
                    button {
                        border: none;
                        width: 60%;
                        height: 26px;
                        font-weight: bold;
                        font-size: 12px;
                        color: #ff3b41;
                        background: #fff;
                        box-shadow: 0px 2px 15px 2px #ebebeb;
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
        // 购买记录和热卖推荐
        .detail-buy-history {
            ul {
                overflow: hidden;
                height: 434px;
                li{
                    div.content{
                        height: 38px;
                        p{
                            height: 36px;
                            -webkit-box-orient: vertical;
                        }
                    }
                }
            }
        }
        .detail_side_img{
            ul li{
                p.name {
                    margin: 10px 0 0;
                    font-size: 14px;
                    color: #a3a3a3;
                    max-height: 57px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                }
                p.price{
                    line-height: 2;
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
