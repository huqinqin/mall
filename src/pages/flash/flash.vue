<template>
    <div>
        <div class="search-result" v-if="data.length > 0">
            <ul class="result">
                <li v-for="item in data" :key="item.id">
                    <a :href="'/detail?t=' + new Date().getTime() +'#/info?id=' + item.id" target="_blank">
                        <div class="img" :style="{backgroundImage : 'url(' + item.image_value + '!item_middle)'}"></div>
                        <p class="name" :title="item.item_name">{{item.item_name}}</p>
                        <div class="item-price">
                            <button v-ltsLoginShow:false v-login>{{$t("main.search.mainSeaLogin")}}</button>
                            <p class="price" v-ltsLoginShow:true>
                                <lts-money :money="item.price_real"></lts-money>
                            </p>
                        </div>
                    </a>
                </li>
            </ul>
            <el-pagination
                background
                layout="prev, pager, next"
                :total= "totalPage"
                :page-size= "pageSize"
                :prev-text='$t("main.search.mainSeaPre")'
                :next-text='$t("main.search.mainSeaNext")'
                :current-page="page"
                @current-change="changePage"></el-pagination>
        </div>
    </div>
</template>

<script>
    import itemService from '@/services/ItemService'
    export default {
        name: "flash",
        data(){
            return{
                page:1,
                pageSize:20,
                totalPage:0,
                data:[]
            }
        },
        methods:{
            get(){
                let params = {
                    'order_by': 'cdate desc',
                    'page': this.page,
                    'page_size': this.pageSize,
                    'wholesale_item_query': JSON.stringify({
                        'type': 0,
                        discount_type:0
                    })
                };
                // 'isActivities':0,
                itemService.getManageList(params).then((data) => {
                    console.log(data)
                    this.totalPage = data.total_page_count
                    this.data = data.datalist
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: 'unknown error'});
                });
            },
            changePage(e){
                this.page = e
                this.get()
            }
        },
        mounted(){
            this.get()
        }
    }
</script>

<style scoped lang="less">
    .search-result{
        position: relative;
        ul.result{
            display: flex;
            flex-wrap: wrap;
            width:100%;
            margin-bottom: 80px;
            li:hover{
                -webkit-box-shadow: 0 15px 30px rgba(0,0,0,0.1);
                box-shadow: 0 15px 30px rgba(0,0,0,0.1);
                -webkit-transform: translate3d(0, -2px, 0);
                transform: translate3d(0, -2px, 0);
            }
            li{
                transition: all ease .2s;
                width:290px;
                overflow: hidden;
                margin-top: 36px;
                text-align: center;
                border:1px  solid #f2f2f2;
                .img{
                    width:100%;
                    height: 222px;
                    background-position: center center;
                    background-size: 190px auto;
                    background-repeat: no-repeat;
                    transition: all ease .4s;
                }
                p.name{
                    margin: 10px;
                    font-size: 14px;
                    color: #a3a3a3;
                    line-height: 18px;
                    height: 54px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                }
                .item-price{
                    border-top:solid 1px #f2f2f2;
                    color:#ff3d41;
                    font-size: 26px;
                    font-weight: bold;
                    margin-top: 24px;
                    padding: 24px 0 30px 0;
                    button {
                        border: none;
                        width:60%;
                        height: 26px;
                        font-weight: bold;
                        font-size: 12px;
                        color: #ff3b41;
                        box-shadow: 0px 2px 15px 2px #e9e9e9;
                    }
                    .price{
                        position: relative;
                        .oldPrice{
                            font-size: 14px;
                            position: absolute;
                            top:12px;
                            text-decoration: line-through;
                            color: #a3a3a3;
                        }
                    }
                }
                position: relative;
                .handle{
                    display: flex;
                    button{
                        width:50%;
                        height: 52px;
                        background: red;
                        border:none;
                        color: #fff;
                        font-size: 29px;
                        i{
                            font-size: 29px;
                        }
                    }
                    button.cart{
                        background: #ce2127;
                    }
                    button.cart:focus{
                        background: #9b0e13;
                        border:none;
                    }
                    button.favo{
                        background: #999;
                    }
                    button.favo:focus{
                        background: #666;
                        border:none;
                    }
                }
            }
            li::after{
                content:'';
                width:260px;
                height: 1px;
                background: #ddd;
                position: absolute;
                top:100%;
                left:15px;

            }
        }
        .el-pagination{
            position: absolute;
            right:0;
            bottom: -45px;
            display: flex;
            .btn-next{
                padding: 0 8px;
            }
            .btn-prev{
                padding: 0 8px;
            }
        }
    }
</style>
