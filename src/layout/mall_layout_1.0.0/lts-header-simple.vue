<template>
    <div slot="header" class="simpleHead">
        <main>
            <a href="/"><img src="../../assets/img/LOGO_html.png" alt="LTS-logo"></a>
            <el-input suffix-icon="el-icon-search" placeholder="搜索商品" v-model="keywords" @keyup.native.enter='searchToHref'></el-input>
        </main>
    </div>
</template>

<script>
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
        },
        created(){
            $(document).ready(function(){
                resize();
            })
            $(window).resize(function(){
                resize();
            });
            function resize(){
                let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                if(width <= 1500){
                    $('.simpleHead').attr('class','simpleHead b1200');
                }else{
                    $('.simpleHead').attr('class','simpleHead b1500');
                }
            }
        },
    }
</script>

<style lang="less">
    .simpleHead{
        box-shadow: 0 6px 10px #f3f3f3;;
        main{
            margin:0 auto;
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
    .simpleHead.b1200 main{
        width:1200px;
    }
    .simpleHead.b1500 main{
        width:1500px;
    }
</style>
