<template>
    <div class="out-menu">
        <ul>
            <li  @click="scrollto('0')" id="floor0">NVR</li>
            <li @click="scrollto('1')" id="floor1">ACCESSORIES</li>
            <li @click="scrollto('2')" id="floor2">DVR</li>
            <li @click="scrollto('3')" id="floor3">IP CAMERA</li>
            <li @click="scrollto('4')" id="floor4">HD-TVI CAMERA</li>
            <li @click="scrollto('5')" id="floor5">ACCESS CONTROL</li>
            <li @click="scrollto('6')" id="floor6">TEST</li>
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
                 let valnum = parseInt(val);
                 $(".out-menu ul li").attr("class","");
                 $("html,body").stop().animate({scrollTop: $("#" + val).offset().top}, 100);
                 $(".out-menu ul li").eq(valnum).attr("class","active");
             },
            scrollOne() {
                $(".out-menu ul li").eq(0).attr("class","active")
                 $(".out-menu").css("display","none !important")
                $(window).scroll(function () {
                        if($(window).scrollTop() > 400) {
                            $(".out-menu").show();
                        } else {
                            $(".out-menu").css("display" , "none");
                        }
                    })
                setTimeout( () => {
                    $(window).scroll(function () {
                        var top = $(document).scrollTop();
                         $(".out-menu ul li").attr("class","");
                        if(top >= $('#6').offset().top){
                            $(".out-menu ul li").eq(6).attr("class","active");
                        }else if(top >= $('#5').offset().top){
                            $(".out-menu ul li").eq(5).attr("class","active");
                        }else if(top >= $('#4').offset().top){
                            $(".out-menu ul li").eq(4).attr("class","active");
                        }else if(top >= $('#3').offset().top){
                            $(".out-menu ul li").eq(3).attr("class","active");
                        }else if(top >= $('#2').offset().top){
                            $(".out-menu ul li").eq(2).attr("class","active");
                        }else if(top >= $('#1').offset().top){
                            $(".out-menu ul li").eq(1).attr("class","active");
                        }else if(top >= $('#0').offset().top){
                            $(".out-menu ul li").eq(0).attr("class","active");
                        }
                    })
                },2000)
            },
            scrolltoTop(){
                 $("html,body").stop().animate({scrollTop: 0},100);
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
        padding: 20px 0px;
        box-sizing: border-box;
        font-family: 'Arial-BoldMT';
        box-shadow: 0 0 15px 2px #ccc;
        ul{
            li{
                font-weight: bold;
                font-size: 14px;
                cursor: pointer;
                line-height: 36px;
                height: 36px;
                padding: 0 10px;
            }
            .backtop{
                font-size: 24px;
                height: 24px;
                text-align: center;
            }
            .active{
                background-color: #FFA000;
            }
        }

    }
</style>
