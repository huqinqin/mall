<template>
    <div class="detail">
        <!-- top -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item><a href="/index">首页</a></el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:void(0)">首页</a></el-breadcrumb-item>
            <el-breadcrumb-item>首页</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="detail-top">
            <div class="detail-img-box">
                <div class="prc_info" v-for="prc in prc_info" :key="prc.index">
                    <div class="big" :style="{backgroundImage:'url('+prc.link+')'}">
                    </div>
                    <!--大图下面的小图-->
                    <div class="small">
                        <div @click="showImage" class="small_img is_active" :style="{backgroundImage:'url('+prc.link+')'}"></div>
                        <div @click="showImage" class="small_img" :style="{backgroundImage:'url('+prc.link+')'}"></div>
                        <div @click="showImage" class="small_img" :style="{backgroundImage:'url('+prc.link+')'}"></div>
                        <div @click="showImage" class="small_img" :style="{backgroundImage:'url('+prc.link+')'}"></div>
                        <div @click="showImage" class="small_img" :style="{backgroundImage:'url('+prc.link+')'}"></div>
                    </div>
                </div>
                <!-- 商品编号 -->
                <div class="info_num"  v-for="prc in prc_info" :key="prc.index">
                    <div>商品编号：<span>{{prc.num}}</span></div>
                    <div class="icons">
                        <div class="follow"><i class="iconfont icon-follow"></i>关注</div>
                        <div class="share"><i class="iconfont icon-09"></i>分享</div>
                    </div>
                </div>
            </div>
            <div class="detail-sku-box">
                <!-- 商品标题-->
                <h3>LTS 1080P普及型会议终端TS2000</h3>
                <p class="brief"><span>性能强劲</span><span>电池保护</span><span>独特电路</span><span>防止干扰</span></p>
                <!-- 商品属性-->
                <el-form label-position="left" label-width="80px">
                    <el-form-item label="价格">
                        <div class="tips">完成登录注册，享受惊爆价</div>
                    </el-form-item>
                    <el-form-item label="供电方式" class="radio">
                        <el-radio-group v-model="sku_1">
                            <el-radio label="1" border>DC12V</el-radio>
                            <el-radio label="2" border>AC14V</el-radio>
                            <el-radio label="3" border>POE</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="像素分类" class="radio">
                        <el-radio-group v-model="sku_2">
                            <el-radio v-for="item in sku_2Data" :label=item.label :key=item.label border>{{item.content}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="采购量" class="num">
                        <el-input-number v-model="count" size="mini" @change="inputNumberChange" :min="1" :max="10" label="描述文字"></el-input-number>
                    </el-form-item>
                    <el-form-item label="温馨提示" class="mark">
                        <p>不支持60天无理由退换(如果商品参加活动，退换货以活动规则为准)</p>
                    </el-form-item>
                    <el-form-item class="buttons">
                        <button>立即购买</button>
                        <button>加入购物车</button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="detail-buy-history">
                <div class="header">
                    <div>购买记录</div>
                    <div class="icons">
                        <div class="icon-left"><i class="iconfont  icon-iconfontzuo"></i></div>
                        <div class="icon-right"><i class="iconfont  icon-iconfontzuo"></i></div>
                    </div>
                </div>
                <ul>
                    <li v-for="item in buyHistory">
                        <div class="img" :style="{backgroundImage : 'url(' + item.image_value +')'}"></div>
                        <p class="brand">{{item.brand}}</p>
                        <p class="name">{{item.item_name}}</p>
                        <p class="price">${{item.price_value}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <!-- bottom -->
        <div class="detail-bottom">
            <div class="detail_side">
                <div class="detail_side_img">
                    <div class="header">
                        <div>热卖推荐</div>
                        <div class="icons">
                            <div class="icon-left"><i class="iconfont  icon-iconfontzuo"></i></div>
                            <div class="icon-right"><i class="iconfont  icon-iconfontzuo"></i></div>
                        </div>
                    </div>
                    <ul>
                        <li v-for="item in hotSale">
                            <div class="img" :style="{backgroundImage : 'url(' + item.image_value +')'}"></div>
                            <p class="brand">{{item.brand}}</p>
                            <p class="name">{{item.item_name}}</p>
                            <p class="price">${{item.price_value}}</p>
                        </li>
                    </ul>
                </div>
                <!-- detail_goods -->
                <div class="detail_goods">
                    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
                        <el-tab-pane label="商品详情" name="first">
                            <ul class="aboutDetail">
                                <li v-for="(value,key) in aboutDetail">
                                    {{key}}: {{value}}
                                </li>
                                <li class="more">全部参数 <i class="iconfont icon-shangyiye-copy-copy"></i></li>
                            </ul>
                            <ul class="imgDetail">
                                <li style="backgroundImage: url('http://image01.homedo.com/Files/Images/Editor/2017-06-20/4715008730056764668.jpg')"></li>
                                <li style="backgroundImage: url('http://image01.homedo.com/Files/Images/Editor/2017-06-20/4743979195889279268.jpg')"></li>
                                <li style="backgroundImage: url('http://image01.homedo.com/Files/Images/Editor/2017-06-20/5440626719605415871.jpg')"></li>
                                <li style="backgroundImage: url('http://image01.homedo.com/Files/Images/Editor/2017-06-20/5320242678543224123.jpg')"></li>
                                <li style="backgroundImage: url('http://image01.homedo.com/Files/Images/Editor/2017-06-20/5266738026055269797.jpg')"></li>
                                <li style="backgroundImage: url('http://image01.homedo.com/Files/Images/Editor/2017-06-20/5590420552948228031.jpg')"></li>
                                <li style="backgroundImage: url('http://image01.homedo.com/Files/Images/Editor/2017-06-20/5649115564348094686.jpg')"></li>
                                <li style="backgroundImage: url('http://image01.homedo.com/Files/Images/Editor/2017-06-20/5242272330824122911.jpg')"></li>
                                <li style="backgroundImage: url('http://image01.homedo.com/Files/Images/Editor/2017-06-20/5229634969841837893.jpg')"></li>
                                <li style="backgroundImage: url('http://image01.homedo.com/Files/Images/Editor/2017-06-20/4963729093161931870.jpg')"></li>
                                <li style="backgroundImage: url('http://image01.homedo.com/Files/Images/Editor/2017-06-20/5532971629685536760.jpg')"></li>
                                <li style="backgroundImage: url('http://image01.homedo.com/Files/Images/Editor/2017-06-20/5350762759762531367.jpg')"></li>
                                <li style="backgroundImage: url('http://image01.homedo.com/Files/Images/Editor/2017-06-20/4965255310328801883.jpg')"></li>
                                <li style="backgroundImage: url('http://image01.homedo.com/Files/Images/Editor/2017-06-20/5137305903631243455.jpg')"></li>
                                <li style="backgroundImage: url('http://image01.homedo.com/Files/Images/Editor/2017-06-20/5747589952679423507.jpg')"></li>
                                <li style="backgroundImage: url('http://image01.homedo.com/Files/Images/Editor/2017-06-20/5106751131035694348.jpg')"></li>
                                <li style="backgroundImage: url('http://image01.homedo.com/Files/Images/Editor/2017-06-20/5491884177797444478.jpg')"></li>
                                <li style="backgroundImage: url('http://image01.homedo.com/Files/Images/Editor/2017-06-20/5342218004086739092.jpg')"></li>
                                <li style="backgroundImage: url('http://image01.homedo.com/Files/Images/Editor/2017-06-20/5652469014129041638.jpg')"></li>
                                <li style="backgroundImage: url('http://image01.homedo.com/Files/Images/Editor/2017-06-20/5089808701764818455.jpg')"></li>

                            </ul>
                        </el-tab-pane>
                        <!--<el-tab-pane label="规格与包装" name="second">规格与包装</el-tab-pane>-->
                        <!--<el-tab-pane label="商品评价" name="third">-->
                            <!--<ul class="comments">-->
                                <!--<li v-for="item in comments">-->

                                <!--</li>-->
                            <!--</ul>-->
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
    export default {
        name : 'detailInfo',
        props : {},
        data() {
            return {
                activeName: 'first',
                sku_1: '',
                sku_2: '',
                sku_2Data: [{
                    label: 0,
                    content: '200W'
                }, {
                    label: 1,
                    content: '201W'
                }, {
                    label: 2,
                    content: '202W'
                }, {
                    label: 3,
                    content: '203W'
                }, {
                    label: 4,
                    content: '204W'
                }, {
                    label: 5,
                    content: '205W'
                }, {
                    label: 6,
                    content: '206W'
                }, {
                    label: 7,
                    content: '207W'
                }, {
                    label: 8,
                    content: '208W'
                }, {
                    label: 9,
                    content: '209W'
                }, {
                    label: 10,
                    content: '210W'
                }, {
                    label: 11,
                    content: '211W'
                },{
                    label: 11,
                    content: '211W'
                },{
                    label: 11,
                    content: '211W'
                },],
                count: '',
                prc_info: [
                    {
                        href: "",
                        link: "static/image/shexiangtou1.png",
                        alt: "",
                        num: "111111"
                    }
                ],
                detail_center: [
                    {
                        p1: "1988.00",
                        p2: "888800"
                    }
                ],
                detail_side_img: [
                    {
                        href: "",
                        src: "",
                        alt: "",
                        info1: "福特科",
                        info2: "300W变焦超长镜头",
                        info3: "$399.00"
                    }
                ],
                item : {},
                checkedSpu : {},
                buyHistory: [
                    {
                        "activity_price":null,
                        "advance":false,
                        "app_show":true,
                        "attr_activity":false,
                        "attribute":4608,
                        "best_box":false,
                        "beyond_num":0,
                        "biz_type":201,
                        "brand":"康师傅",
                        "category_name":"",
                        "category_id":0,
                        "cdate":1404196559000,
                        "commission_s":0,
                        "commission_t":0,
                        "cost_price_value":"0",
                        "cost_price":0,
                        "count":null,
                        "cut":false,
                        "description":"",
                        "discount":0,
                        "discount_type_cname":"无优惠",
                        "discount_type":0,
                        "distribution":false,
                        "diy_price":false,
                        "edate":1479816849000,
                        "end_time":null,
                        "fixed":false,
                        "follow_num":19,
                        "group":false,
                        "hd_method":0,
                        "id":110492,
                        "image_value":"http://res.500mi.com/item/3501d08f9d4cd546e9654f7ed87f9c92.jpeg",
                        "item_name":"康师傅鲜脆雪笋炒肉丝面136g",
                        "item_struct_props":[],
                        "manager_cate_name":"",
                        "manager_cate_id":0,
                        "member_price":3700,
                        "member_price_value":"37.00",
                        "min_num":0,
                        "module_id":null,
                        "module_sku_id":null,
                        "no_rebate":false,
                        "num":null,
                        "open_code":"331088",
                        "open_codes":"PP33L5F3",
                        "order_promotion":false,
                        "order_num":0,
                        "orign":"",
                        "parent_id":0,
                        "partner":null,
                        "partner_id":36819,
                        "partner_name":"",
                        "percent":false,
                        "prepay":false,
                        "presale":false,
                        "price":3700,
                        "price_real":null,
                        "price_real_value":"",
                        "price_value":"37.00",
                        "price_define":"",
                        "price_define_do":null,
                        "promotion_title":"",
                        "props":"",
                        "props_ext":"",
                        "puser_id":38218,
                        "rank":0,
                        "retail":true,
                        "safe_num":0,
                        "sale_rule":"",
                        "sale_rule_do":{
                            "commission_rate":null,
                            "end_time":"",
                            "maxinum":null,
                            "minimum":null,
                            "price":null,
                            "start_time":"",
                            "total":null,
                            "virtual_start":null
                        },
                        "send_rule":"",
                        "share_num":2,
                        "shop_name":"",
                        "shop_id":2663,
                        "short_code":"",
                        "sin":"6920152483411",
                        "sinr":"6920152483411",
                        "sku_cost_price_value":"",
                        "sku_cost_price":null,
                        "sku_id":0,
                        "sku_total":0,
                        "soldout":false,
                        "spec":"136g*12桶",
                        "special":"",
                        "spot_price_value":"0",
                        "spot_rule_d_o":null,
                        "spot_price":0,
                        "spot_rule":"",
                        "spu_d_o":null,
                        "spu_id":12429,
                        "start_time":null,
                        "status":1,
                        "status_cname":"已上架",
                        "stock_out":0,
                        "storage":999,
                        "storage_num":null,
                        "tag":"",
                        "type":0,
                        "type_ch":false,
                        "type_fa":false,
                        "unit":"箱",
                        "upshelf":true,
                        "url":"8896f030dcf40763e2567a6b2193cf8e.jpg",
                        "urls":"8896f030dcf40763e2567a6b2193cf8e.jpg",
                        "warehousing":true,
                        "wholesale":false
                    },{
                        "activity_price":null,
                        "advance":false,
                        "app_show":true,
                        "attr_activity":false,
                        "attribute":4608,
                        "best_box":false,
                        "beyond_num":0,
                        "biz_type":201,
                        "brand":"康师傅",
                        "category_name":"",
                        "category_id":0,
                        "cdate":1404196559000,
                        "commission_s":0,
                        "commission_t":0,
                        "cost_price_value":"0",
                        "cost_price":0,
                        "count":null,
                        "cut":false,
                        "description":"",
                        "discount":0,
                        "discount_type_cname":"无优惠",
                        "discount_type":0,
                        "distribution":false,
                        "diy_price":false,
                        "edate":1479816849000,
                        "end_time":null,
                        "fixed":false,
                        "follow_num":19,
                        "group":false,
                        "hd_method":0,
                        "id":110492,
                        "image_value":"http://res.500mi.com/item/3501d08f9d4cd546e9654f7ed87f9c92.jpeg",
                        "item_name":"康师傅鲜脆雪笋炒肉丝面136g",
                        "item_struct_props":[],
                        "manager_cate_name":"",
                        "manager_cate_id":0,
                        "member_price":3700,
                        "member_price_value":"37.00",
                        "min_num":0,
                        "module_id":null,
                        "module_sku_id":null,
                        "no_rebate":false,
                        "num":null,
                        "open_code":"331088",
                        "open_codes":"PP33L5F3",
                        "order_promotion":false,
                        "order_num":0,
                        "orign":"",
                        "parent_id":0,
                        "partner":null,
                        "partner_id":36819,
                        "partner_name":"",
                        "percent":false,
                        "prepay":false,
                        "presale":false,
                        "price":3700,
                        "price_real":null,
                        "price_real_value":"",
                        "price_value":"37.00",
                        "price_define":"",
                        "price_define_do":null,
                        "promotion_title":"",
                        "props":"",
                        "props_ext":"",
                        "puser_id":38218,
                        "rank":0,
                        "retail":true,
                        "safe_num":0,
                        "sale_rule":"",
                        "sale_rule_do":{
                            "commission_rate":null,
                            "end_time":"",
                            "maxinum":null,
                            "minimum":null,
                            "price":null,
                            "start_time":"",
                            "total":null,
                            "virtual_start":null
                        },
                        "send_rule":"",
                        "share_num":2,
                        "shop_name":"",
                        "shop_id":2663,
                        "short_code":"",
                        "sin":"6920152483411",
                        "sinr":"6920152483411",
                        "sku_cost_price_value":"",
                        "sku_cost_price":null,
                        "sku_id":0,
                        "sku_total":0,
                        "soldout":false,
                        "spec":"136g*12桶",
                        "special":"",
                        "spot_price_value":"0",
                        "spot_rule_d_o":null,
                        "spot_price":0,
                        "spot_rule":"",
                        "spu_d_o":null,
                        "spu_id":12429,
                        "start_time":null,
                        "status":1,
                        "status_cname":"已上架",
                        "stock_out":0,
                        "storage":999,
                        "storage_num":null,
                        "tag":"",
                        "type":0,
                        "type_ch":false,
                        "type_fa":false,
                        "unit":"箱",
                        "upshelf":true,
                        "url":"8896f030dcf40763e2567a6b2193cf8e.jpg",
                        "urls":"8896f030dcf40763e2567a6b2193cf8e.jpg",
                        "warehousing":true,
                        "wholesale":false
                    }
                ],
                hotSale: [
                    {
                        "activity_price":null,
                        "advance":false,
                        "app_show":true,
                        "attr_activity":false,
                        "attribute":4608,
                        "best_box":false,
                        "beyond_num":0,
                        "biz_type":201,
                        "brand":"康师傅",
                        "category_name":"",
                        "category_id":0,
                        "cdate":1404196559000,
                        "commission_s":0,
                        "commission_t":0,
                        "cost_price_value":"0",
                        "cost_price":0,
                        "count":null,
                        "cut":false,
                        "description":"",
                        "discount":0,
                        "discount_type_cname":"无优惠",
                        "discount_type":0,
                        "distribution":false,
                        "diy_price":false,
                        "edate":1479816849000,
                        "end_time":null,
                        "fixed":false,
                        "follow_num":19,
                        "group":false,
                        "hd_method":0,
                        "id":110492,
                        "image_value":"http://res.500mi.com/item/3501d08f9d4cd546e9654f7ed87f9c92.jpeg",
                        "item_name":"康师傅鲜脆雪笋炒肉丝面136g",
                        "item_struct_props":[],
                        "manager_cate_name":"",
                        "manager_cate_id":0,
                        "member_price":3700,
                        "member_price_value":"37.00",
                        "min_num":0,
                        "module_id":null,
                        "module_sku_id":null,
                        "no_rebate":false,
                        "num":null,
                        "open_code":"331088",
                        "open_codes":"PP33L5F3",
                        "order_promotion":false,
                        "order_num":0,
                        "orign":"",
                        "parent_id":0,
                        "partner":null,
                        "partner_id":36819,
                        "partner_name":"",
                        "percent":false,
                        "prepay":false,
                        "presale":false,
                        "price":3700,
                        "price_real":null,
                        "price_real_value":"",
                        "price_value":"37.00",
                        "price_define":"",
                        "price_define_do":null,
                        "promotion_title":"",
                        "props":"",
                        "props_ext":"",
                        "puser_id":38218,
                        "rank":0,
                        "retail":true,
                        "safe_num":0,
                        "sale_rule":"",
                        "sale_rule_do":{
                            "commission_rate":null,
                            "end_time":"",
                            "maxinum":null,
                            "minimum":null,
                            "price":null,
                            "start_time":"",
                            "total":null,
                            "virtual_start":null
                        },
                        "send_rule":"",
                        "share_num":2,
                        "shop_name":"",
                        "shop_id":2663,
                        "short_code":"",
                        "sin":"6920152483411",
                        "sinr":"6920152483411",
                        "sku_cost_price_value":"",
                        "sku_cost_price":null,
                        "sku_id":0,
                        "sku_total":0,
                        "soldout":false,
                        "spec":"136g*12桶",
                        "special":"",
                        "spot_price_value":"0",
                        "spot_rule_d_o":null,
                        "spot_price":0,
                        "spot_rule":"",
                        "spu_d_o":null,
                        "spu_id":12429,
                        "start_time":null,
                        "status":1,
                        "status_cname":"已上架",
                        "stock_out":0,
                        "storage":999,
                        "storage_num":null,
                        "tag":"",
                        "type":0,
                        "type_ch":false,
                        "type_fa":false,
                        "unit":"箱",
                        "upshelf":true,
                        "url":"8896f030dcf40763e2567a6b2193cf8e.jpg",
                        "urls":"8896f030dcf40763e2567a6b2193cf8e.jpg",
                        "warehousing":true,
                        "wholesale":false
                    },{
                        "activity_price":null,
                        "advance":false,
                        "app_show":true,
                        "attr_activity":false,
                        "attribute":4608,
                        "best_box":false,
                        "beyond_num":0,
                        "biz_type":201,
                        "brand":"康师傅",
                        "category_name":"",
                        "category_id":0,
                        "cdate":1404196559000,
                        "commission_s":0,
                        "commission_t":0,
                        "cost_price_value":"0",
                        "cost_price":0,
                        "count":null,
                        "cut":false,
                        "description":"",
                        "discount":0,
                        "discount_type_cname":"无优惠",
                        "discount_type":0,
                        "distribution":false,
                        "diy_price":false,
                        "edate":1479816849000,
                        "end_time":null,
                        "fixed":false,
                        "follow_num":19,
                        "group":false,
                        "hd_method":0,
                        "id":110492,
                        "image_value":"http://res.500mi.com/item/3501d08f9d4cd546e9654f7ed87f9c92.jpeg",
                        "item_name":"康师傅鲜脆雪笋炒肉丝面136g",
                        "item_struct_props":[],
                        "manager_cate_name":"",
                        "manager_cate_id":0,
                        "member_price":3700,
                        "member_price_value":"37.00",
                        "min_num":0,
                        "module_id":null,
                        "module_sku_id":null,
                        "no_rebate":false,
                        "num":null,
                        "open_code":"331088",
                        "open_codes":"PP33L5F3",
                        "order_promotion":false,
                        "order_num":0,
                        "orign":"",
                        "parent_id":0,
                        "partner":null,
                        "partner_id":36819,
                        "partner_name":"",
                        "percent":false,
                        "prepay":false,
                        "presale":false,
                        "price":3700,
                        "price_real":null,
                        "price_real_value":"",
                        "price_value":"37.00",
                        "price_define":"",
                        "price_define_do":null,
                        "promotion_title":"",
                        "props":"",
                        "props_ext":"",
                        "puser_id":38218,
                        "rank":0,
                        "retail":true,
                        "safe_num":0,
                        "sale_rule":"",
                        "sale_rule_do":{
                            "commission_rate":null,
                            "end_time":"",
                            "maxinum":null,
                            "minimum":null,
                            "price":null,
                            "start_time":"",
                            "total":null,
                            "virtual_start":null
                        },
                        "send_rule":"",
                        "share_num":2,
                        "shop_name":"",
                        "shop_id":2663,
                        "short_code":"",
                        "sin":"6920152483411",
                        "sinr":"6920152483411",
                        "sku_cost_price_value":"",
                        "sku_cost_price":null,
                        "sku_id":0,
                        "sku_total":0,
                        "soldout":false,
                        "spec":"136g*12桶",
                        "special":"",
                        "spot_price_value":"0",
                        "spot_rule_d_o":null,
                        "spot_price":0,
                        "spot_rule":"",
                        "spu_d_o":null,
                        "spu_id":12429,
                        "start_time":null,
                        "status":1,
                        "status_cname":"已上架",
                        "stock_out":0,
                        "storage":999,
                        "storage_num":null,
                        "tag":"",
                        "type":0,
                        "type_ch":false,
                        "type_fa":false,
                        "unit":"箱",
                        "upshelf":true,
                        "url":"8896f030dcf40763e2567a6b2193cf8e.jpg",
                        "urls":"8896f030dcf40763e2567a6b2193cf8e.jpg",
                        "warehousing":true,
                        "wholesale":false
                    },{
                        "activity_price":null,
                        "advance":false,
                        "app_show":true,
                        "attr_activity":false,
                        "attribute":4608,
                        "best_box":false,
                        "beyond_num":0,
                        "biz_type":201,
                        "brand":"康师傅",
                        "category_name":"",
                        "category_id":0,
                        "cdate":1404196559000,
                        "commission_s":0,
                        "commission_t":0,
                        "cost_price_value":"0",
                        "cost_price":0,
                        "count":null,
                        "cut":false,
                        "description":"",
                        "discount":0,
                        "discount_type_cname":"无优惠",
                        "discount_type":0,
                        "distribution":false,
                        "diy_price":false,
                        "edate":1479816849000,
                        "end_time":null,
                        "fixed":false,
                        "follow_num":19,
                        "group":false,
                        "hd_method":0,
                        "id":110492,
                        "image_value":"http://res.500mi.com/item/3501d08f9d4cd546e9654f7ed87f9c92.jpeg",
                        "item_name":"康师傅鲜脆雪笋炒肉丝面136g",
                        "item_struct_props":[],
                        "manager_cate_name":"",
                        "manager_cate_id":0,
                        "member_price":3700,
                        "member_price_value":"37.00",
                        "min_num":0,
                        "module_id":null,
                        "module_sku_id":null,
                        "no_rebate":false,
                        "num":null,
                        "open_code":"331088",
                        "open_codes":"PP33L5F3",
                        "order_promotion":false,
                        "order_num":0,
                        "orign":"",
                        "parent_id":0,
                        "partner":null,
                        "partner_id":36819,
                        "partner_name":"",
                        "percent":false,
                        "prepay":false,
                        "presale":false,
                        "price":3700,
                        "price_real":null,
                        "price_real_value":"",
                        "price_value":"37.00",
                        "price_define":"",
                        "price_define_do":null,
                        "promotion_title":"",
                        "props":"",
                        "props_ext":"",
                        "puser_id":38218,
                        "rank":0,
                        "retail":true,
                        "safe_num":0,
                        "sale_rule":"",
                        "sale_rule_do":{
                            "commission_rate":null,
                            "end_time":"",
                            "maxinum":null,
                            "minimum":null,
                            "price":null,
                            "start_time":"",
                            "total":null,
                            "virtual_start":null
                        },
                        "send_rule":"",
                        "share_num":2,
                        "shop_name":"",
                        "shop_id":2663,
                        "short_code":"",
                        "sin":"6920152483411",
                        "sinr":"6920152483411",
                        "sku_cost_price_value":"",
                        "sku_cost_price":null,
                        "sku_id":0,
                        "sku_total":0,
                        "soldout":false,
                        "spec":"136g*12桶",
                        "special":"",
                        "spot_price_value":"0",
                        "spot_rule_d_o":null,
                        "spot_price":0,
                        "spot_rule":"",
                        "spu_d_o":null,
                        "spu_id":12429,
                        "start_time":null,
                        "status":1,
                        "status_cname":"已上架",
                        "stock_out":0,
                        "storage":999,
                        "storage_num":null,
                        "tag":"",
                        "type":0,
                        "type_ch":false,
                        "type_fa":false,
                        "unit":"箱",
                        "upshelf":true,
                        "url":"8896f030dcf40763e2567a6b2193cf8e.jpg",
                        "urls":"8896f030dcf40763e2567a6b2193cf8e.jpg",
                        "warehousing":true,
                        "wholesale":false
                    }
                ],
                aboutDetail: {
                    '商品编号': '34598739792',
                    '外形': '半球形',
                    '清晰度': '8MP',
                    '焦距': '2.8nm',
                    '水平角度': '106度',
                    '逆光处理': 'ture WDR',
                    '视频压缩': 'H.265+',
                    '声频': 'line in/out'
                },
                comment: [{
                    avatar: 'static/image/shexiangtou1.png',
                    acount: '测试用户',
                    bought: {
                        val1: '200W像素',
                        val2: '2mm焦距'
                    },
                    text: '功能很强大 很不错，很好的一次购物体验！！！！！功能很强大 很不错，很好的一次购物体验。功能很强大 很不错，很好的一次购物体验。',
                    imgs: {
                        img1: 'static/image/shexiangtou1.png',
                        img2: 'static/image/shexiangtou1.png',
                        img3: 'static/image/shexiangtou1.png',
                        img4: 'static/image/shexiangtou1.png',
                    },
                    time: '2017-12-21 20:35:58',
                    app: '来自：iPhone客户端',

                },{
                    avatar: 'static/image/shexiangtou1.png',
                    acount: '测试用户',
                    bought: {
                        val1: '200W像素',
                        val2: '2mm焦距'
                    },
                    text: '功能很强大 很不错，很好的一次购物体验！！！！！功能很强大 很不错，很好的一次购物体验。功能很强大 很不错，很好的一次购物体验。',
                    imgs: {
                        img1: 'static/image/shexiangtou1.png',
                        img2: 'static/image/shexiangtou1.png',
                        img3: 'static/image/shexiangtou1.png',
                        img4: 'static/image/shexiangtou1.png',
                    },
                    time: '2017-12-21 20:35:58'
                },{
                    avatar: 'static/image/shexiangtou1.png',
                    acount: '测试用户',
                    bought: {
                        val1: '200W像素',
                        val2: '2mm焦距'
                    },
                    text: '功能很强大 很不错，很好的一次购物体验！！！！！功能很强大 很不错，很好的一次购物体验。功能很强大 很不错，很好的一次购物体验。',
                    imgs: {
                        img1: 'static/image/shexiangtou1.png',
                        img2: 'static/image/shexiangtou1.png',
                        img3: 'static/image/shexiangtou1.png',
                        img4: 'static/image/shexiangtou1.png',
                    },
                    time: '2017-12-21 20:35:58'
                },{
                    avatar: 'static/image/shexiangtou1.png',
                    account: '测试用户',
                    bought: {
                        val1: '200W像素',
                        val2: '2mm焦距'
                    },
                    text: '功能很强大 很不错，很好的一次购物体验！！！！功能很强大 很不错，很好的一次购物体验。功能很强大 很不错，很好的一次购物体验。功能很强大 很不错，很好的一次购物体验！！！！！功能很强大 很不错，很好的一次购物体验。功能很强大 很不错，很好的一次购物体验。',
                    imgs: {
                        img1: 'static/image/shexiangtou1.png',
                        img2: 'static/image/shexiangtou1.png',
                        img3: 'static/image/shexiangtou1.png',
                        img4: 'static/image/shexiangtou1.png',
                    },
                    time: '2017-12-21 20:35:58'
                },{
                    avatar: 'static/image/shexiangtou1.png',
                    account: '测试用户',
                    bought: {
                        val1: '200W像素',
                        val2: '2mm焦距'
                    },
                    text: '功能很强大 很不错，很好的一次购物体验。功能很强大 很不错，很好的一次购物体验。功能很强大 很不错，很好的一次购物体验！！！！！功能很强大 很不错，很好的一次购物体验。功能很强大 很不错，很好的一次购物体验。',
                    imgs: {
                        img1: 'static/image/shexiangtou1.png',
                        img2: 'static/image/shexiangtou1.png',
                        img3: 'static/image/shexiangtou1.png',
                        img4: 'static/image/shexiangtou1.png',
                    },
                    time: '2017-12-21 20:35:58'
                },{
                    avatar: 'static/image/shexiangtou1.png',
                    account: '测试用户',
                    bought: {
                        val1: '200W像素',
                        val2: '2mm焦距'
                    },
                    text: '功能很强大 很不错，很好的一次购物体验。功能很强大 很不错，很好的一次购物体验。功能很强大 很不错，很好的一次购物体验！！！！！功能很强大 很不错，很好的一次购物体验。功能很强大 很不错，很好的一次购物体验。',
                    imgs: {
                        img1: 'static/image/shexiangtou1.png',
                        img2: 'static/image/shexiangtou1.png',
                        img3: 'static/image/shexiangtou1.png',
                        img4: 'static/image/shexiangtou1.png',
                    },
                    time: '2017-12-21 20:35:58'
                },]
            }
        },
        methods:{
            handleClick(tab,event){
                console.log(tab,event);
            },
            inputNumberChange(value){
                console.log(value)

            },
            getItemDetail(id){
                itemService.getItemDetail(id).then((data)=>{
                    this.item = data.data
                },(msg)=>{
                    this.$ltsMessage.show({type:'error',message:msg.errorMessage})
                })
            },
            skuMapEach(prop,data){
                let key = prop.prop_name;
                let prop_value = {};
                let checked_sku_prop = {};
                // 匹配sku
                checked_sku_prop[key] = prop.checked_prop;
                // 匹配库存
                prop_value[key] =  prop.checked_prop;
                data.item_prop_value_maps.forEach((value,index,array)=>{
                    if(value.prop_name !== prop.prop_name){
                        checked_sku_prop[value.prop_name] = value.checked_prop;
                        this.equalsProp(checked_sku_prop,data.item_struct_props,'checkedSku');
                        value.prop_values.forEach((val,key,array)=>{
                            prop_value[value.prop_name] = val.value;
                            val.can_checked = this.equalsProp(prop_value,data.item_struct_props);
                        })
                    }
                })
            },
            equalsProp(propObj,skuList,type){
                let Boolean = 0; // 0 false, 1 true;
                let self = this;
                try{
                    skuList.forEach(function(sku,index,array){
                        let clone_prop = JSON.parse(sku.prop_value);
                        let count = 0;
                        for(let key in propObj){
                            if(!clone_prop[key]){
                                Boolean = 0;
                                return false;
                            }
                            if(clone_prop[key] == propObj[key]){
                                count++;
                            }else{
                                Boolean = 0;
                                return false;
                            }
                        }
                        if(count >= 2 && sku.storage > 0){
                            if(type == 'checkedSku'){
                                self.checkedSpu = sku;
                            }
                            Boolean = 1;
                            // 跳出循环抛出的异常 别删
                            throw new Error("foreach.break");
                        }else{
                            Boolean = 0;
                        }
                        return false;
                    })
                }catch (e){
                    if(e === 'foreach.break')return;
                }
                if(Boolean == 1){
                    return true;
                }else {
                    return false;
                }
            },
            addCart(item) {
                cartService.putCartPlus(this.customerUid,item,this.checkedSpu).then((data) => {
                    this.queryCartList();
                },(msg) => {
                    this.$ltsMessage.show({type:"error",message:msg.error_message})
                });
            },
            showImage(e){
                $(e.currentTarget).addClass('is_active')
                $(e.currentTarget).siblings().removeClass('is_active')
                console.log(e.currentTarget)
                console.log($('big'))
            }
        },
        mounted(){
            let id = this.$route.query.id;
            this.getItemDetail(id);
        },

    }
</script>

<style lang="less">
    @import '//at.alicdn.com/t/font_516449_1in90gr5l8yyzaor.css';
    .detail{
        .el-breadcrumb{
            font-size: 14px;
            margin-bottom: 24px;
        }
        .detail-top{
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            .detail-img-box{
                width: 400px;
                margin-right: 24px;
                .prc_info{
                    .big{
                        box-sizing: border-box;
                        border: 1px solid #cccccc;
                        width: 400px;
                        height: 400px;
                        margin-bottom: 12px;
                        background-size: cover;
                        background-position: center center;
                    }
                    .small{
                        display: flex;
                        justify-content: space-between;
                        .small_img{
                            width: 70px;
                            height: 70px;
                            background-size: cover;
                            border:1px solid rgba(0,0,0,0);
                            background-position: center;
                            cursor: pointer;

                        }
                        .is_active{
                            border:solid 1px #48a2ff;
                        }
                    }
                }
                .info_num{
                    color: #a3a3a3;
                    margin-top: 20px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    .icons{
                        width:120px;
                        display: flex;
                        justify-content: space-between;
                        div{
                            cursor: pointer;
                        }
                        i{
                            font-size: 14px;
                            margin-right: 4px;
                            color: #48a2ff;
                            line-height: 14px;
                        }
                    }
                }
            }
            .detail-sku-box{
                margin-bottom: 24px;
                margin-right: 12px;
                color:rgba(0,0,0,0.5);
                flex: 1;
                h3{
                    color: rgba(0,0,0,0.7);
                    font-size: 16px;
                    line-height: 16px;
                    font-weight: bold;
                }
                p.brief{
                    margin:6px 0 16px 0;
                    span{
                        color:#bcbcbc;
                        font-size: 12px;
                        margin-right: 12px;
                    }
                }
                .el-form-item{
                    margin-bottom: 12px;
                }
                .el-form-item:nth-child(2){
                    .el-form-item__label{
                        margin-top: -5px;
                    }
                }
                .el-form-item:nth-child(3){
                    .el-form-item__label{
                        margin-top: -10px;
                    }
                }
                .tips{
                    border:1px solid #ff3b41;
                    color:#ff3b41;
                    line-height: 21px;
                    width:155px;
                    margin-top:10px;
                    font-size: 12px;
                    padding-left: 6px;
                }
                .radio{
                    margin-bottom: 6px;
                    width: 600px;
                    .el-radio{
                        width: 60px;
                        height: 20px;
                        padding:0;
                        border-radius: 0;
                        text-align: center;
                        margin-right: 24px;
                        margin-bottom: 12px;
                        .el-radio__input{
                            display: none;
                        }
                        .el-radio__label{
                            text-align: center;
                            font-size: 12px;
                            color: rgba(0,0,0,0.5);
                            line-height: 19px;
                            margin-left: -10px;
                        }
                    }
                    .el-radio:hover{
                        border:1px solid #ff3b41;
                    }
                    .el-radio.is-checked{
                        border:1px solid #ff3b41;
                        position: relative;
                        span{
                            color:rgba(0,0,0,0.5);
                        }
                    }
                    .el-radio.is-checked::after{
                        content:'';
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
                    .el-radio.is-bordered+.el-radio.is-bordered{
                        margin-left: 0px;
                    }
                }

                .num{
                    margin-bottom: -2px;
                    .el-input-number--mini{
                        line-height: 24px;
                    }
                    .el-input-number{
                        width:84px;
                        margin-left: 0px;
                        margin-bottom: 12px;
                        border: 1px solid rgba(0,0,0,0.2);
                        border-radius: 0;
                        .el-input__inner{
                            border-radius: 0px;
                            border:none;
                            height: 20px;
                        }
                        span{
                            width: 22px;
                            line-height: 20px;
                            background: rgb(238, 238, 238);
                            border: 1px solid #dcdfe6;
                            margin-left: -2px;
                            margin-top: -2px;
                            i{
                                font-size: 18px;
                                color: rgba(0,0,0,0.7);
                                font-weight: bolder;
                                margin-top: 3px;
                            }
                        }
                        span.el-input-number__increase{
                            margin-right: -2px;
                        }
                        span.el-input-number__decrease{
                            i{
                                color:white;
                            }

                        }
                    }
                }
                .mark{
                    margin-bottom: 8px;
                    p {
                        font-size: 12px;
                    }
                }
                .el-alert{
                    height: 40px;
                    padding: 8px 0;
                    .el-alert__title{
                        font-size: 12px;
                    }
                }
                .buttons{
                    display: inline-block;

                    button{
                        width:180px;
                        height: 50px;
                        background: #ff3b41;
                        color:white;
                        border:none;
                        font-weight: bold;
                        font-size: 20px;
                        border-radius: 4px;
                    }
                    button:nth-child(2){
                        margin-left: 16px;
                        border:1px solid #ff3b41;
                        background: #fff;
                        color:#ff3b41;
                    }
                }
            }

        }

        /*// 报废了*/
        /*.detail_center{*/
            /*border:1px solid red;*/
            /*font-size: 14px;*/
            /*color:rgba(0,0,0,0.5);*/
            /*h3{*/
                /*color: rgba(0,0,0,0.7);*/
                /*font-size: 16px;*/
                /*margin-bottom: 48px;*/
                /*line-height: 16px;*/
                /*font-family: MicrosoftYaHei-Bold;*/
            /*}*/
            /*.info{*/
                /*span{*/
                    /*display: inline-block;*/
                    /*width:70px;*/
                /*}*/
                /*.tips{*/
                    /*width:420px;*/
                    /*display: inline-block;*/
                    /*margin-left: 12px;*/
                    /*vertical-align: top;*/
                    /*.el-radio{*/
                        /*display: inline-block;*/
                        /*margin: 0 24px 24px 0px;*/
                        /*float: left;*/
                        /*width: 60px;*/
                        /*height: 20px;*/
                        /*padding:0;*/
                        /*color:rgba(0,0,0,0.5);*/
                        /*border:1px solid rgba(0,0,0,0.2);*/
                        /*border-radius: 0;*/
                        /*margin-right: 12px;*/
                        /*span.el-radio__input{*/
                            /*display: none;*/
                        /*}*/
                        /*span.el-radio__label{*/
                            /*padding: 0;*/
                            /*text-align: center;*/
                            /*font-size: 12px;*/
                            /*width:60px;*/
                            /*line-height: 19px;*/
                            /*margin-top: -2px;*/

                        /*}*/
                    /*}*/
                    /*.el-radio:hover{*/
                        /*border:1px solid #ff3b41;*/
                    /*}*/
                    /*.el-radio.is-checked{*/
                        /*border:1px solid #ff3b41;*/
                        /*position: relative;*/
                        /*span{*/
                            /*color:rgba(0,0,0,0.5);*/
                        /*}*/
                    /*}*/
                    /*.el-radio.is-checked::after{*/
                        /*content:'';*/
                        /*width: 0;*/
                        /*height: 0;*/
                        /*border-right: 6px solid red;*/
                        /*border-bottom: 6px solid red;*/
                        /*border-top: 6px solid transparent;*/
                        /*border-left: 6px solid transparent;*/
                        /*position: absolute;*/
                        /*bottom: 0;*/
                        /*right: 0;*/
                    /*}*/
                    /*.el-radio.is-bordered+.el-radio.is-bordered{*/
                        /*margin-left: 0px;*/
                    /*}*/
                /*}*/
                /*.price{*/
                    /*margin-bottom: 24px;*/
                    /*span{*/
                        /*line-height: 21px;*/
                    /*}*/
                    /*.tips{*/
                        /*color:#ff3b41;*/
                        /*font-size: 12px;*/
                        /*border: 1px solid #ff3b41;*/
                        /*width:160px;*/
                        /*line-height: 21px;*/
                        /*text-align: center;*/
                        /*cursor: pointer;*/
                    /*}*/
                /*}*/
                /*.num{*/
                    /*.el-input-number{*/
                        /*width:84px;*/
                        /*margin-left: 12px;*/
                        /*margin-bottom: 24px;*/
                        /*border: 1px solid rgba(0,0,0,0.2);*/
                        /*border-radius: 0;*/
                        /*.el-input__inner{*/
                            /*border-radius: 0px;*/
                            /*border:none;*/
                        /*}*/
                        /*span{*/
                            /*width: 28px;*/
                            /*background: #eee;*/
                            /*border: 1px solid #dcdfe6;*/
                            /*margin-left: -2px;*/
                            /*margin-top: -1px;*/
                            /*i{*/
                                /*font-size: 18px;*/
                                /*color: rgba(0,0,0,0.7);*/
                                /*font-weight: bolder;*/
                                /*margin-top: 3px;*/
                            /*}*/
                        /*}*/
                        /*span.el-input-number__increase{*/
                            /*margin-right: -2px;*/
                        /*}*/
                    /*}*/
                /*}*/
                /*.mark{*/
                    /*margin-bottom: 24px;*/
                    /*span{*/
                        /*display:inline;*/
                        /*margin-left: 24px;*/
                    /*}*/
                /*}*/
            /*}*/
            /*.buttons{*/
                /*button{*/
                    /*width:180px;*/
                    /*height: 50px;*/
                    /*background: #ff3b41;*/
                    /*color:white;*/
                    /*border:none;*/
                    /*font-family: MicrosoftYaHei-Bold;*/
                    /*font-size: 24px;*/
                    /*border-radius: 4px;*/
                /*}*/
                /*button:nth-child(2){*/
                    /*margin-left: 24px;*/
                    /*border:1px solid #ff3b41;*/
                    /*background: #fff;*/
                    /*color:#ff3b41;*/
                /*}*/
            /*}*/
        /*}*/
        .detail-bottom{
            margin-top: 48px;
            .detail_side{
                display: flex;
                justify-content: space-between;
                .detail_side_img{
                    margin-right: 48px;
                }
                .detail_goods{
                    flex:1;
                    .el-tabs{
                        border: none;
                        box-shadow: none;
                        -webkit-box-shadow:none;
                        .el-tabs__header{
                            background: #f6f6f6;
                            border:none;
                            .el-tabs__item{
                                border: none;
                                font-size: 16px;
                                width:115px;
                                height: 38px;
                                line-height: 38px;
                                text-align: center;
                            }
                            .el-tabs__item:hover{
                                color:#ff3b41;
                            }
                            .el-tabs__item.is-active{
                                color:#fff;
                                background-color:#ff3b41;
                                border: none;
                            }
                        }
                        .el-tabs__content{
                            color: #a3a3a3;
                            padding: 29px 0;
                            border-bottom: 1px solid #E5E5E5;
                            font-size: 14px;
                            position: relative;
                        }
                        .aboutDetail{
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: flex-start;
                            padding-bottom: 24px;
                            border-bottom: 1px solid #E5E5E5;
                            li{
                                width: 24.8%;
                                line-height: 28px;
                            }
                            li.more{
                                position: absolute;
                                top: 80px;
                                left:100%;
                                margin-left: -80px;
                                cursor: pointer;
                                i{
                                    display: inline-block;
                                    transform: rotateZ(180deg);
                                }
                            }
                        }
                        .imgDetail{
                            max-height: 2000px;
                            overflow: auto;
                            li{
                                width:100%;
                                height: 500px;
                                background-repeat: no-repeat;
                                background-size: contain;
                                background-position: center;
                            }

                        }
                    }
                }
            }

        }

        // 购买记录和热卖推荐
        .detail-buy-history, .detail_side_img{
            width: 290px;
            background: #fff;
            border:1px solid #ccc;
            .header{
                height: 36px;
                line-height: 36px;
                color:#737373 ;
                border-bottom:1px solid #ccc;
                padding: 0 12px;
                display: flex;
                justify-content: space-between;
                font-size: 16px;
                .icons{
                    width:40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    div{
                        color: #b6b6b6;
                        i{
                            display: block;
                            font-size: 14px;
                        }
                    }
                    .icon-right{
                        margin-top: -4px;
                        transform: rotateZ(180deg);
                    }
                }
            }
            li{
                text-align: center;
                background: #ffffff;
                margin: 0 15px;
                border-bottom: 1px solid #ccc;
                .img{
                    height: 146px;
                    background-position: center;
                    background-size: cover;
                }
                p.brand{
                    line-height: 14px;
                    font-weight: bold;
                    font-size: 14px;
                    color: #707070;
                }
                p.name{
                    margin: 10px 0;
                    font-size: 14px;
                    color: #a3a3a3;
                }
                p.price{
                    color:#ff3d43;
                    font-size: 16px;
                    font-weight: bold;
                    margin-bottom: 24px;
                }
                position: relative;
            }
            li:last-child{
                border-bottom: none;
            }
        }
    }

    // 公共样式
    body, ol, ul, h1, h2, h3, h4, h5, h6, p, th, td, dl, dd, form, fieldset, legend, input, textarea, select, td, figure {
        margin: 0;
        padding: 0; }

    body {

        word-wrap: break-word; }

    html {
        font-family: "Microsoft Yahei"; }

    a, u, s, del {
        color: #666;
        text-decoration: none; }

    a:hover {
        text-decoration: underline; }

    i, em, b {
        font-style: normal;
        font-weight: 100; }

    li {
        list-style: none; }

    img {
        vertical-align: middle; }

    fieldset, a img, .bor0 {
        border: 0; }

    table {
        border-collapse: collapse; }

    /*合并表格边框*/
    .ind2 {
        text-indent: 2em; }

    .cu {
        cursor: pointer; }

    /*垂直对齐属性*/
    .valign:after {
        content: "";
        display: inline-block;
        vertical-align: middle;
        width: 0px;
        height: 100%; }

    /*文本溢出出现省略号*/
    .over {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap; }

    /*clear清除浮动和防止margin-top向上传递*/
    .clear {
        zoom: 1;
        /*只有ie能识别*/ }

    .clear:before {
        content: "";
        display: table; }

    .clear:after {
        content: "";
        display: block;
        clear: both;
    }

    .breadcrumb{
        color: #646464;
        font: 14px/40px "MicrosoftYaHei";
        height: 40px;
        padding-bottom: 8px;
        position: relative;
        z-index: 10000;
        a{
            color: #646464;
            float: left;
        }
        span{
            color: #646464;
            margin: 1px 6px 0;
            float: left;
        }
    }



</style>
