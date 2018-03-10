<template>
    <div slot="header" class="simpleHead">
        <main class="s-span-page">
            <a href="/"><img src="../../assets/img/LOGO_html.png" alt="LTS-logo"></a>
            <el-input :placeholder="$t('comHeader.headerSearchGoods')" v-model="keywords" @keyup.native.enter='searchToHref'>
              <el-button slot="append" type="primary" icon="el-icon-search" @click="searchToHref"></el-button>
            </el-input>
        </main>
    </div>
</template>

<script>
    import  $ from 'jquery'
    export default {
        name: "lts-head-simple",
        data(){
            return{
                keywords:'',
            }
        },

        methods:{
            searchToHref(){
                location.href = '/search#/?cateId=' + '&keywords=' + this.keywords
            },
        }
    }
</script>

<style lang="less">
    .simpleHead{
        box-shadow: 0 6px 10px #f3f3f3;;
        main{
            height: 140px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            overflow: hidden;
            img{
                width:140px;
                height: 50px;
            }
            .el-input{
                width:550px;
            }
        }
    }
</style>
