<template>
    <div class="packlist">
        <div class="banner" :style="{backgroundImage:'url(' + banner + ')'}"></div>
        <main class="list">
            <div v-for="pack in datalist">
                <a :href="'/detail?t=' + new Date().getTime() +'#/pack?id=' + pack.id">
                    <header>
                        <div>{{pack.item_name}}</div>
                        <div class="right">
                            <div class="price">
                                <p><span class="red"><lts-money :money="140000"></lts-money></span></p>
                                <p class="old"><lts-money :money="2100000"></lts-money></p>
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
                                    <span class="latest"><lts-money :money="item.price_real"></lts-money></span>
                                    <span class="old"><lts-money :money="item.price"></lts-money></span>
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
                itemService.getItemDetail(10240).then((data) => {
                    data.data.item.package_item_list.forEach((t,index) => {
                        t.num = 2 + Math.pow(2,index * 2)
                        t.item_struct_props.forEach(prop => {
                            if(prop.sku) t.props = JSON.parse(prop.prop_value)
                        })
                    })
                    let item = data.data.item
                    this.datalist = [item, item, item, item]
                    console.log(this.datalist)
                })
            },
            buyItem(items){
                let allItems = []
                items.forEach(t => {
                    let sku = {}
                    t.item_struct_props.forEach(p => {
                        if(p.sku){
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
        .banner{
            width:100%;
            background-size: contain;
            margin-bottom: 24px;
        }
        .list{
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
        }
    }
</style>
