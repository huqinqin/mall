<template>
    <div class="detail">
        <!-- top -->
        <div class="detail-top">
            <el-table :data="">

            </el-table>
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
    import itemService from '@/services/ItemService'
    import cartService from '@/services/CartService'

    export default {
        components: {addCartSuccess},
        name: 'detailInfo',
        props: {},
        data() {
            return {
                item:[],
                hotSale:{}
            }
        },
        methods: {
            getItemDetail(id) {
                itemService.getItemDetail(id).then((data) => {
                    this.items = data.data.item.package_item_list
                    this.hotSale = (data.data && data.data.hot_recomment) ? data.data.hot_recomment.items : [];
                    this.hotSale.forEach((item) => {
                        if(item.tag.indexOf('新品') != -1){
                            item.isNew = true
                        }
                    })
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.errorMessage})
                })
            },
            addCart(item, spu) {
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
            buyNow() {
                if(JSON.stringify(this.otherGoodsItem) != '{}'){
                    this.otherGoodsItem.item_struct_props.forEach(t => {
                        if(this.checkedSpu.prop_value == t.prop_value){
                            this.otherItemSpu = t
                        }
                    })
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
                let items = JSON.stringify(this.otherGoodsItem) != '{}' ? [item, otherItem] : [item]
                localStorage.removeItem('buyNowItem')
                localStorage.setItem('buyNowItem',JSON.stringify(items))
                window.open('/cart?t=' + new Date().getTime() + '#/settle?items=' + JSON.stringify(items))
            },
        },
        mounted() {
            let id = this.$route.query.id ? this.$route.query.id : 10240
            this.getItemDetail(id)
        },
    }
</script>

<style lang="less">
    .detail {
        .detailDiscount{
            width: 100%;
            height: 100px;
            box-sizing: border-box;
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
        .detail_side_img {
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
