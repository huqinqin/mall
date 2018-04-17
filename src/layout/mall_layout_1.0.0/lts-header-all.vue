<template>
    <div class="product all-head" slot="header">
        <div class="menu-list s-span-page">
            <ul>
                <li v-for="value in menuList">
                    <div>
                        <a :href="value.link" v-if="value.type == 'logo'" class="header-logo">
                            <span class="iconfont" :class="value.icon"></span>
                        </a>
                        <a :href="value.link" target="_blank" v-else-if="value.name === 'support center'">
                                <div>
                                    <span class="iconfont" :class="value.icon"></span>
                                    <p>{{value.first}}</p>
                                    <p>{{value.last}}</p>
                                </div>
                        </a>
                        <a :href="value.link" v-else-if="value.name === 'call experts'">
                            <el-tooltip placement="top" effect="ligth" :visible-arrow="false">
                                <div>
                                    <span class="iconfont" :class="value.icon"></span>
                                    <p>{{value.first}}</p>
                                    <p>{{value.last}}</p>
                                </div>
                                <div slot="content">
                                    <myExperts></myExperts>
                                </div>
                            </el-tooltip>
                        </a>
                        <el-popover
                            v-else-if="value.name === 'shopby scenario'"
                            placement="bottom"
                            trigger="hover"
                            content="Coming Soon">
                            <a :href="value.link"  @click="menuHandle" slot="reference">
                                <span class="iconfont" :class="value.icon"></span>
                                <p>{{value.first}}</p>
                                <p>{{value.last}}</p>
                            </a>
                        </el-popover>
                        <a :href="value.link" v-else-if="!value.needLogin" @click="menuHandle" slot="reference" target="_blank">
                            <span class="iconfont" :class="value.icon"></span>
                            <p>{{value.first}}</p>
                            <p>{{value.last}}</p>
                        </a>
                        <a :href="value.link" v-else v-login @click="menuHandle" target="_blank">
                            <el-badge :value="cart_num" class="item" v-if="value.name == 'shopping center'"
                                      :hidden="cart_num <= 0">
                                <span class="iconfont"
                                      :class="[value.icon,value.name == 'shopping center' ? 'cart' : '']">
                                </span>
                            </el-badge>
                            <span class="iconfont" :class="[value.icon]" v-else>
                            </span>
                            <p>{{value.first}}</p>
                            <p>{{value.last}}</p>
                        </a>
                    </div>
                </li>
            </ul>
        </div>
        <div class="s-span-page search-bar">
            <el-input :placeholder="$t('comHeader.headerSearchGoods')" v-model="keywords" class="input-with-select"
                      @keyup.native.enter='searchToHref'>
                <el-cascader
                    slot="prepend"
                    :placeholder="select"
                    expand-trigger="hover"
                    :options="options"
                    v-model="selectedOptions"
                    :change-on-select="false"
                    style="width: 240px"
                    popper-class="cascader-class"
                    @focus="focusSelect"
                    @change="handleChange">
                </el-cascader>
                <el-button slot="append" icon="iconfont icon-sousuo2" @click="searchToHref"></el-button>
                <!--<el-dropdown split-button type="primary"  slot="append" @click="searchToHref"  @command="handleCommand">-->
                    <!--<i class="el-icon-search"></i><span>{{selectedItem}}</span>-->
                    <!--<el-dropdown-menu slot="dropdown">-->
                        <!--<el-dropdown-item command="name">Item Name</el-dropdown-item>-->
                        <!--<el-dropdown-item command="sin">Model Name</el-dropdown-item>-->
                    <!--</el-dropdown-menu>-->
                <!--</el-dropdown>-->
            </el-input>
            <!--<el-checkbox class="el-checkbox" label="Model Number" v-model="model"></el-checkbox>-->
        </div>
    </div>
</template>

<script>
    import categoryService from '@/services/CategoryService.js'
    import cartService from '@/services/CartService.js'
    import myExperts from '@/common/components/myExperts'
    import jq from 'jquery'

    export default {
        name: "lts-header-all",
        data() {

            return {
                menuList: [
                    {
                        name: 'ip solution',
                        icon: 'icon-IPjiejuefangan',
                        first: 'IP',
                        last: 'Solution',
                        link: '/search?t='+ new Date().getTime() + '#/detail?cateId='+JSON.stringify([1]),
                        needLogin: false
                    },
                    {
                        name: 'hdtvi solution',
                        icon: 'icon-jiankong',
                        first: 'HD-TVI',
                        last: 'Solution',
                        link: '/search?t='+ new Date().getTime() + '#/detail?cateId='+JSON.stringify([2]),
                        needLogin: false
                    },
                    {
                        name: 'Popular Kits',
                        icon: 'icon-taozhuangzuhe2',
                        first: 'Popular',
                        last: 'Kits',
                        link: '/search?t=' + new Date().getTime() + '#/detail?cateId=%5B77%5D&keywords=&tags=',
                        needLogin: false
                    },
                    {
                        name: 'PROJECT REGISTRATION',
                        icon: 'icon-jiatingjiejuefangan',
                        first: 'Project',
                        last: 'Registration',
                        link: '//www.ltsecurityinc.com/projectregistration',
                        needLogin: false
                    },
                    {
                        name: 'logo',
                        icon: 'icon-LTSLOGO',
                        type: 'logo',
                        link: '/',
                        needLogin: false
                    },
                    {
                        name: 'call experts',
                        icon: 'icon-lianxixiaoshoukefu',
                        first: 'Contact',
                        last: 'Sales',
                        link: 'javascript:void(0)',
                        needLogin: false
                    },
                    {
                        name: 'support center',
                        icon: 'icon-zhichi',
                        first: 'Support',
                        last: 'Center',
                        link: '//www.ltsecurityinc.com/support',
                        needLogin: false
                    },
                    {
                        name: 'my favorite',
                        icon: 'icon-yewushouce',
                        first: 'Product',
                        last: 'Catalog',
                        link: '/catelog',
                        needLogin: true
                    },
                    {
                        name: 'shopping center',
                        icon: 'icon-gouwuche2',
                        first: 'Shopping',
                        last: 'Cart',
                        link: '/cart',
                        needLogin: true
                    }
                ],
                keywords: '',
                tags: '',
                select: this.$t("comHeader.headerAllclassify"),
                options: [],
                selectedOptions: [],
                cart_num: -1,
                // selectedItem:'Item Name',
                sin:'',
                itemName:'',
                model:false
            }
        },
        mounted(){

        },
        methods: {
            // 级联选择器选择父元素
            focusSelect(){
              let dom = jq('cascader-class')
              if (dom && dom[0] && dom[0].on){
                  let pop = jq('cascader-class')[0]
                  pop.on('hover','li',()=>{
                      //alert('hover')
                  })
              }
            },
            // 选择关键字类型
            // handleCommand(value){
            //     if(value == 'name'){
            //         this.selectedItem = 'Item Name'
            //     }else if(value == 'sin'){
            //         this.selectedItem = 'Model Name'
            //     }
            // },
            // 头部菜单选择
            menuHandle() {
                setTimeout(() => {
                    this.selfContext.$emit('getItemList')
                }, 100)
            },
            // 获取类目数据
            getLocalStorage() {
                let data = JSON.parse(localStorage.getItem('categoryList'));
                if (data) {
                    this.filterCategory(data);
                } else {
                    this.getCategoryList();
                }
            },
            searchToHref() {
                if(!this.model){
                    this.ItemName = this.keywords
                    this.sin = ''
                }else{
                    this.ItemName = ''
                    this.sin = this.keywords
                }
                // location.href = '/search?t='+ new Date().getTime() + '#/detail?cateId=' + JSON.stringify(this.selectedOptions) + '&itemname=' + this.ItemName + '&tags=' + this.tags + '&sin=' + this.sin;
                location.href = '/search?t='+ new Date().getTime() + '#/detail?cateId=' + JSON.stringify(this.selectedOptions) + '&itemname=' + this.ItemName + '&tags=' + this.tags;
                this.selfContext.$emit('getItemList')
            },
            getCategoryList() {
                categoryService.getList().then((data) => {
                    this.filterCategory(data.datalist);
                    localStorage.setItem("categoryList", JSON.stringify(data.datalist));
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
            },
            filterCategory(categoryList) {
                let count = 0;
                categoryList.forEach(function (value, index, array) {
                    value.label = value.name
                    value.value = value.id
                    if (value.id == -1000) {
                        value.value = ''
                        count++;
                    }
                    if (value.children) {
                        if (value.children.length === 0) {
                            delete value.children
                        } else {
                            value.children.forEach((value1) => {
                                value1.label = value1.name
                                value1.value = value1.id
                                if (value1.children) {
                                    if (value1.children.length === 0) {
                                        delete value1.children
                                    } else {
                                        value1.children.forEach((value2) => {
                                            value1.label = value1.name
                                            value1.value = value1.id
                                        })
                                    }
                                } else {
                                    return false;
                                }

                            })
                        }
                    } else {
                        return false;
                    }
                })
                this.options = categoryList
                if (count == 0) {
                    this.options.unshift({
                        label: this.$t("comHeader.headerAll"),
                        value: '',
                        name: this.$t("comHeader.headerAll"),
                        id: '-1000',
                        children: ''
                    })
                }
            },
            handleChange(value) {
                // 级联选择器选择类目
                this.selectedOptions = value;
                this.keywords = ''
//                window.location.href = '/search#/?cateId=' + this.selectedOptions
                this.searchToHref();
//                this.selfContext.$emit('getItemList')
            },
            getParamas() {
                let cateList = []
                if (this.$route && this.$route.query.cateId) {
//                    this.$route.query.cateId.split(",").forEach((value) => {
//                        cateList.push(+value);
//                    })
                    this.selectedOptions = JSON.parse(this.$route.query.cateId);
                }
                if (this.$route && this.$route.query.itemname) {
                    this.keywords = this.$route.query.itemname
                    this.model = false
                }
                if (this.$route && this.$route.query.sin) {
                    this.keywords = this.$route.query.sin
                    this.model = true
                }

            },
            getCartNum() {
                cartService.queryCartCount().then((data) => {
                    this.cart_num = data.data;
                }, (msg) => {
                    this.$ltsMessage.show({type: 'error', message: msg.error_message})
                })
            },
        },
        created() {
            this.selfContext.$on('addCartSuccess', this.getCartNum)
            this.getParamas()
            this.getLocalStorage()
            this.getCartNum();
        },
        components: {
            myExperts

        }
    }
</script>

<style lang="less">
    .all-head {
        background-color: white;
        .search-bar {
            display: flex;
            padding-bottom: 12px;
            justify-content: space-between;
            .el-input{
                flex-grow: 1;
                .el-input{
                    input::-webkit-input-placeholder{
                        color:#333 !important;
                    }
                }
                .el-input-group__append{
                    color:white;
                    border-radius:0;
                    background: #CE2127;
                    border:1px;
                }
                .el-input-group__append:hover{
                    background: #D84D52;
                }
            }
            .el-checkbox{
                padding:0 8px;
                line-height: 40px;
                font-size: 14px;
                color:rgba(0,0,0,0.8)
            }
        }
        .menu-list {
            padding: 24px 0;
            ul {
                display: flex;
                height: 100%;
                align-items: center;
                li {
                    flex: 1;
                    text-align: center;
                    overflow: inherit;
                    a {
                        text-decoration: none;
                        .iconfont {
                            font-size: 42px;
                            color: #4c4c4c;
                        }
                        .cart {
                            color: #f13a40;
                        }
                        p {
                            text-align: center;
                            color: #737373;
                            font-size: 12px;
                            transition: all ease .2s;
                        }
                    }
                    a:hover {
                        p {
                            color: #ff3b41;
                        }

                    }
                }
            }
        }
        .header-logo {
            width: 300px;
            height: 74px;
            background-position: center;
            background-size: 140px 48px;
            background-repeat: no-repeat;
            display: flex;
            text-align: center;
            overflow: hidden;
            justify-content: center;
            align-items: center;
            span {
                display: block;
                font-size: 200px !important;
                color: #cc242e !important;
                position: relative;
                top: 10px;
            }
        }
        .el-select .el-input {
            width: 130px;
        }
        .el-input-group__prepend {
            padding: 0;
            border: none;
            .el-cascader {
                width: 110px;
                line-height: 38px;
                border: none;
                .el-input--suffix{

                    width: 100% !important;
                }
                .el-input__inner {
                    border-right: none;
                }
            }
            .iconfont {
                font-size: 20px;
            }
        }
        .input-with-select .el-input-group__prepend {
            background-color: #fff;
        }
    }
</style>
