<template>
    <div class="out-menu">
        <ul>
            <li  @click="scrollto('0')">NVR</li>
            <li @click="scrollto('1')">ACCESSORIES</li>
            <li @click="scrollto('2')">DVR</li>
            <li @click="scrollto('3')">IP CAMERA</li>
            <li @click="scrollto('4')">HD-TVI CAMERA</li>
            <li @click="scrollto('5')">ACCESS CONTROL</li>
            <li @click="scrollto('6')">TEST</li>
            <p @click="scrolltoTop" class="backtop iconfont icon-fanhuidingbu"></p>
        </ul>
    </div>
</template>

<script>
    import $ from 'jquery'
    export default {
        name: "lts-out-menu",
        methods: {
             scrollto(val) {
                 $("html,body").stop().animate({scrollTop: $("#" + val).offset().top}, 1000);
             },
            scrollOne() {
                 $(".out-menu").css("display","none !important")
                $(window).scroll(function () {
                        if($(window).scrollTop() > 400) {
                            //$(".out-menu").css("display" , "block");
                            $(".out-menu").show();
                        } else {
                            $(".out-menu").css("display" , "none");
                        }
                    }
                )
            },
            scrolltoTop(){
                 $("html,body").stop().animate({scrollTop: 0},1000);
                /*$(window).scrollTop(0)*/
            }
        },
        mounted(){
            this.scrollOne();
        }
    }
</script>

<style lang="less">
    .out-menu{
        display: none;
        background-color: white;
        //width: 180px;
        //height: 300px;
        margin-left: -58px;
        padding: 20px 10px;
        box-sizing: border-box;
        font-family: 'Arial-BoldMT';
        ul{
            li{
                font-weight: bold;
                font-size: 14px;
                cursor: pointer;
                line-height: 36px;
                height: 36px;
            }
            .backtop{
                font-size: 24px;
                height: 24px;
                text-align: center;
            }
        }

    }
</style>
