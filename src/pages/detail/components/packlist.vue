<template>
    <div class="packlist">
        <div class="banner" :style="{backgroundImage:'url(' + banner + ')'}"></div>
        <main class="list">
            <div v-for="pack in datalist" class="packItem">
                <a :href="'/detail?t=' + new Date().getTime() +'#/pack?id=' + pack.id">
                    <header>
                        <div>{{pack.item_name}}</div>
                        <div class="right">
                            <div class="price">
                                <p><span class="red" v-if="pack.total_price_real"><lts-money :money="pack.total_price_real"></lts-money></span></p>
                                <p class="old" v-if="pack.total_price"><lts-money :money="pack.total_price"></lts-money></p>
                            </div>
                            <el-button @click.prevent="buyItem(pack.package_item_list)">Buy Now</el-button>
                        </div>
                    </header>
                    <ul class="content">
                        <li v-for="item in pack.package_item_list">
                            <div class="img" :style="{backgroundImage:'url(' + item.image_value +')'}"></div>
                            <div class="desc">
                                <p>{{item.sinr}}</p>
                                <p v-for="(prop,key) in item.props">{{key}}:{{prop}}</p>
                                <p>
                                    <span class="latest"><lts-money :money="item.item_struct_props[0].price_real"></lts-money></span>
                                    <span class="old"><lts-money :money="item.item_struct_props[0].price"></lts-money></span>
                                </p>
                            </div>
                            <div class="num">x&nbsp;{{item.num}}</div>
                        </li>
                    </ul>
                </a>
            </div>
        </main>
    </div>
</template>

<script>
    import itemService from '@/services/ItemService'
    export default {
        name: "packlist",
        data(){
            return{
                banner:require('@/assets/img/banner36.png'),
                datalist:[]
            }
        },
        mounted(){
            this.getList()
        },
        methods:{
            getList(){
                itemService.searchItem({cateId:[91]}).then(resp => {
                    resp.data.item_d_o_list.forEach(pack => {
                        pack.total_price = 0
                        pack.total_price_real = 0
                        pack.package_item_list = [{"diy_price":false,"percent":true,"tag":"","price_real":16450,"price_real_value":"164.50","type":41,"commission_t":0,"upshelf":true,"stock_out":0.000,"fixed":false,"member_price_value":"329.00","image_value":"http://ltsres-us.oss-us-west-1.aliyuncs.com/item/c951f6e0088ee694ff3450bbf446a3f1.png","price_value":"329.00","follow_num":0,"category_name":"","rank":0,"wholesale":true,"edate":1526460956000,"discount_type":1,"order_num":0.000,"prepay":false,"open_code":"lts2open","sale_rule":"","cdate":1526460956000,"spot_rule":"","order_promotion":true,"package_item_list":[],"parent_id":0,"app_show":false,"partner_id":4,"short_code":"","biz_type":101,"sinr":"2010000004973","shop_id":4,"status":1,"best_box":false,"category_id":26,"manager_cate_name":"","spot_price_value":"0","distribution":false,"activity_price":16450,"url":"c951f6e0088ee694ff3450bbf446a3f1.png","size":"","price_define":"","discount":50,"commission_s":0,"price":32900,"spu_id":497,"spot_price":0,"attr_activity":true,"min_num":0.000,"item_name":"LTN8716T-HTï¼ŒPlatinum 16+16 Channel Hybrid NVR Compact 1U","shop_name":"","no_rebate":false,"orign":"CN","send_rule":"","retail":false,"spec":"æ— æè¿°","weight":1995.827,"props_ext":"","discount_type_cname":"æ‰“æŠ˜","attribute":4194305,"promotion_title":"","id":10837,"warehousing":true,"manager_cate_id":0,"type_fa":false,"sku_id":237,"member_price":32900,"sale_rule_do":{},"hd_method":2304,"presale":false,"share_num":0,"safe_num":0.000,"item_struct_props":[{"value_type":0,"spec":false,"img_url":"","price_real":16450,"spu_id":498,"attribute":1024,"show":false,"price_action":1,"sku":true,"id":4513,"system":false,"multi_select":false,"price":32900,"search":false,"selectable":false,"sin":"2010000004982","prop_value":"{\"Channel\":\"16\"}","required":false,"props":"16","storage":1035},{"value_type":0,"spec":false,"img_url":"","price_real":16450,"spu_id":0,"attribute":0,"show":false,"price_action":0,"sku":false,"id":4514,"system":false,"multi_select":false,"price":0,"search":false,"selectable":false,"sin":"","prop_value":"{\"Maximum storage\":\"12TB\"}","required":false,"props":"12TB","storage":0.000},{"value_type":0,"spec":false,"img_url":"","price_real":16450,"spu_id":0,"attribute":0,"show":false,"price_action":0,"sku":false,"id":4515,"system":false,"multi_select":false,"price":0,"search":false,"selectable":false,"sin":"","prop_value":"{\"Built-in POE number\":\"4\"}","required":false,"props":"4","storage":0.000}],"urls":"c951f6e0088ee694ff3450bbf446a3f1.png,4598d172bad855ab33fb1f6d898c17b5.png,90eb9100a1559d72e7f82510cd879a5f.png,7066f75370174695dd1aca33c108dd9c.png","status_cname":"å·²ä¸Šæž¶","sku_total":0,"puser_id":20016,"beyond_num":0,"open_codes":"","unit":"PC","sin":"2010000004973","brand":"LTS","type_ch":false,"special":"","cut":false,"group":false,"partner_name":"","props":"{}","advance":false,"storage":10.000,"soldout":false},{"diy_price":false,"percent":true,"tag":"","price_real":25950,"price_real_value":"259.50","type":41,"commission_t":0,"upshelf":true,"stock_out":0.000,"fixed":false,"member_price_value":"519.00","image_value":"http://ltsres-us.oss-us-west-1.aliyuncs.com/item/271e95856ceefe98fd4c0b5a5fe3565d.png","price_value":"519.00","follow_num":0,"category_name":"","rank":0,"wholesale":true,"edate":1526460956000,"discount_type":1,"order_num":0.000,"prepay":false,"open_code":"lts2open","sale_rule":"","cdate":1526460956000,"spot_rule":"","order_promotion":true,"package_item_list":[],"parent_id":0,"app_show":false,"partner_id":4,"short_code":"","biz_type":101,"sinr":"2010000005033","shop_id":4,"status":1,"best_box":false,"category_id":24,"manager_cate_name":"","spot_price_value":"0","distribution":false,"activity_price":25950,"url":"271e95856ceefe98fd4c0b5a5fe3565d.png","size":"","price_define":"","discount":50,"commission_s":0,"price":51900,"spu_id":503,"spot_price":0,"attr_activity":true,"min_num":0.000,"item_name":"LTN8916-P16, Platinum Enterprise Level 16 Channel 4K NVR 1.5U","shop_name":"","no_rebate":false,"orign":"CN","send_rule":"","retail":false,"spec":"nothing","weight":7257.552,"props_ext":"","discount_type_cname":"æ‰“æŠ˜","attribute":4194305,"promotion_title":"","id":10838,"warehousing":true,"manager_cate_id":0,"type_fa":false,"sku_id":240,"member_price":51900,"sale_rule_do":{},"hd_method":2304,"presale":false,"share_num":0,"safe_num":0.000,"item_struct_props":[{"value_type":0,"spec":false,"img_url":"","price_real":25950,"spu_id":504,"attribute":1024,"show":false,"price_action":1,"sku":true,"id":4516,"system":false,"multi_select":false,"price":51900,"search":false,"selectable":false,"sin":"2010000005042","prop_value":"{\"Channel\":\"16\"}","required":false,"props":"16","storage":999},{"value_type":0,"spec":false,"img_url":"","price_real":25950,"spu_id":0,"attribute":0,"show":false,"price_action":0,"sku":false,"id":4517,"system":false,"multi_select":false,"price":0,"search":false,"selectable":false,"sin":"","prop_value":"{\"Maximum storage\":\"32TB\"}","required":false,"props":"32TB","storage":0.000},{"value_type":0,"spec":false,"img_url":"","price_real":25950,"spu_id":0,"attribute":0,"show":false,"price_action":0,"sku":false,"id":4518,"system":false,"multi_select":false,"price":0,"search":false,"selectable":false,"sin":"","prop_value":"{\"Built-in POE number\":\"8\"}","required":false,"props":"8","storage":0.000}],"urls":"271e95856ceefe98fd4c0b5a5fe3565d.png,2ee92b47de01a8a5fb62fcf018b56a31.png","status_cname":"å·²ä¸Šæž¶","sku_total":0,"puser_id":20016,"beyond_num":0,"open_codes":"","unit":"PC","sin":"2010000005033","brand":"LTS","type_ch":false,"special":"","cut":false,"group":false,"partner_name":"","props":"{}","advance":false,"storage":0.000,"soldout":false},{"diy_price":false,"percent":true,"tag":"","price_real":12900,"price_real_value":"129.00","type":41,"commission_t":0,"upshelf":true,"stock_out":0.000,"fixed":false,"member_price_value":"129.00","image_value":"http://ltsres-us.oss-us-west-1.aliyuncs.com/item/b61e48b5d6b5bb1ebcb855350a54fe01.png","price_value":"129.00","follow_num":0,"category_name":"","rank":0,"wholesale":true,"edate":1526693671000,"discount_type":1,"order_num":0.000,"prepay":false,"open_code":"lts2open","sale_rule":"","cdate":1526693671000,"spot_rule":"","order_promotion":true,"package_item_list":[],"parent_id":0,"app_show":false,"partner_id":4,"short_code":"","biz_type":101,"sinr":"2010000004991","shop_id":4,"status":1,"best_box":false,"category_id":9,"manager_cate_name":"","spot_price_value":"0","distribution":false,"activity_price":12900,"url":"b61e48b5d6b5bb1ebcb855350a54fe01.png","size":"","price_define":"","discount":100,"commission_s":0,"price":12900,"spu_id":499,"spot_price":0,"attr_activity":true,"min_num":0.000,"item_name":"CMIP9142W, Platinum Fixed Lens Bullet Camera 4.1MP - 4mm CMIP9142W","shop_name":"","no_rebate":false,"orign":"CN","send_rule":"","retail":false,"spec":"æ— æè¿°","weight":1950.467,"props_ext":"","discount_type_cname":"æ‰“æŠ˜","attribute":4194305,"promotion_title":"","id":10840,"warehousing":true,"manager_cate_id":0,"type_fa":false,"sku_id":239,"member_price":12900,"sale_rule_do":{},"hd_method":2304,"presale":false,"share_num":0,"safe_num":0.000,"item_struct_props":[{"value_type":0,"spec":false,"img_url":"","price_real":12900,"spu_id":500,"attribute":1024,"show":false,"price_action":1,"sku":true,"id":4529,"system":false,"multi_select":false,"price":12900,"search":false,"selectable":false,"sin":"CMIP9142W","prop_value":"{\"Resolution\":\"4MP\",\"Select Lens\":\"6mm\"}","required":false,"props":"4MP,6mm","storage":1005},{"value_type":0,"spec":false,"img_url":"","price_real":12900,"spu_id":0,"attribute":0,"show":false,"price_action":0,"sku":false,"id":4530,"system":false,"multi_select":false,"price":0,"search":false,"selectable":false,"sin":"","prop_value":"{\"Compression\":\"H.264/H.264+\"}","required":false,"props":"H.264/H.264+","storage":0.000},{"value_type":0,"spec":false,"img_url":"","price_real":12900,"spu_id":0,"attribute":0,"show":false,"price_action":0,"sku":false,"id":4531,"system":false,"multi_select":false,"price":0,"search":false,"selectable":false,"sin":"","prop_value":"{\"WDR\":\"True WDR\"}","required":false,"props":"True WDR","storage":0.000},{"value_type":0,"spec":false,"img_url":"","price_real":12900,"spu_id":0,"attribute":0,"show":false,"price_action":0,"sku":false,"id":4532,"system":false,"multi_select":false,"price":0,"search":false,"selectable":false,"sin":"","prop_value":"{\"IR\":\"Matrix IR\"}","required":false,"props":"Matrix IR","storage":0.000},{"value_type":0,"spec":false,"img_url":"","price_real":12900,"spu_id":0,"attribute":0,"show":false,"price_action":0,"sku":false,"id":4533,"system":false,"multi_select":false,"price":0,"search":false,"selectable":false,"sin":"","prop_value":"{\"Housing Color\":\"White\"}","required":false,"props":"White","storage":0.000}],"urls":"b61e48b5d6b5bb1ebcb855350a54fe01.png,971bbf9398547087d2294a7da30455bb.png,513728bb09a5726955fa3a52305222d4.png","status_cname":"å·²ä¸Šæž¶","sku_total":0,"puser_id":20016,"beyond_num":0,"open_codes":"","unit":"pc","sin":"2010000004991","brand":"LTS","type_ch":false,"special":"","cut":false,"group":false,"partner_name":"","props":"{}","advance":false,"storage":10.000,"soldout":false}]
                        pack.package_item_list.forEach((t,index) => {
                            console.log(t)
                            t.num = index + 1
                            pack.total_price_real += t.num * t.item_struct_props[0].price_real
                            pack.total_price += t.num * t.item_struct_props[0].price
                            t.item_struct_props.forEach(prop => {
                                if(prop.sku) t.props = JSON.parse(prop.prop_value)
                            })
                        })
                    })
                    this.datalist = resp.data.item_d_o_list
                }, err => {
                    this.$ltsMessage({type:'error',message:err.error_message})
                })
            },
            buyItem(items){
                let allItems = []
                items.forEach(t => {
                    let sku = {}
                    t.item_struct_props.forEach(p => {
                        if(p.sku && p.storage){
                            sku = p
                            return
                        }
                    })
                    let item = {
                        'discount':t.discount,
                        'discount_type': t.discount_type,
                        'id': t.id,
                        'item_name': t.item_name.replace('%','%25'),
                        'item_props': [sku],
                        'num': t.num,
                        'price': t.price,
                        'price_real': t.price_real,
                        'puser_id': t.puser_id,
                        'spec_unit': t.spec_unit,
                        'spu_id': sku.spu_id,
                        'storage': t.storage,
                        'full_url': t.image_value,
                        'sale_rule': t.sale_rule,
                    }
                    allItems.push(item)
                })
                window.open('/cart?t=' + new Date().getTime() + '#/settle?items=' + JSON.stringify(allItems))
            }
        }
    }
</script>

<style lang="less">
    .b1200 .banner{
        height: 300px;
    }
    .b1500 .banner{
        height: 500px;
    }
    .packlist{
        color:#737373;
        font-size: 16px;
        background: #F6F6F6;
        .banner{
            width:100%;
            background-size: contain;
            margin-bottom: 24px;
        }
        .list{
            background: #F6F6F6;
            padding: 0 16px 16px ;
            header{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 36px;
                background-color: #EEF9FF;
                height: 40px;
                .right{
                    display: flex;
                    align-items: center;
                }
                .price{
                    font-weight: bold;
                    color:#737373;
                    margin-right: 12px;
                    p{
                        text-align: right;
                        line-height: 20px;
                        font-size: 18px;
                        color:#FF3B41;
                    }
                    .old{
                        text-decoration: line-through;
                        color:#a3a3a3;
                        font-size: 12px;
                    }
                }
                .el-button{
                    background: #ff3b41;
                    color:#fff;
                    font-weight: bold;
                    height: 30px;
                    border-radius:15px;
                    padding: 0 20px;
                    position: relative;
                    z-index: 999;
                }
            }
            ul.content{
                height: 175px;
                display: flex;
                justify-content: space-around;
                padding:0 24px;
                align-items: center;
                background: #fff;
                li{
                    width: 315px;
                    height: 125px;
                    border:1px solid #ddd;
                    position: relative;
                    display: flex;
                    .img{
                        height: 125px;
                        width:125px;
                        background-size: 80px 80px;
                        background-position: center;
                        background-repeat: no-repeat;
                    }
                    .desc{
                        padding-top: 12px;
                        p{
                            line-height: 1.5;
                        }
                        p:first-child{
                            font-weight: bold;
                        }
                        .latest{

                        }
                        .old{
                            text-decoration: line-through;
                            font-size: 14px;
                        }

                    }
                    .num{
                        font-weight: bold;
                        font-size: 18px;
                        position: absolute;
                        line-height: 20px;
                        left:325px;
                        top:105px;
                    }
                }

            }
            .packItem{
                margin-bottom: 24px;
            }
            .packItem:hover{
                box-shadow: 0 0 40px #BABABA;
            }
        }

    }
</style>
