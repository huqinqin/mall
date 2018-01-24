<template>
    <transition name="fade">
        <div class="wrapper">
            <div class="box">
                <div class="iconfont icon-iconset0127 delete" @click="fade"></div>
                <div class="innerWrapper">
                    <i  v-if="type === 0" class="iconfont icon-chenggong "></i>
                    <i  v-if="type === 1" class="iconfont icon-turnoff icon"></i>
                    <i  v-if="type === 2" class="iconfont icon-chenggong icon"></i>
                    <i  v-if="type === 3" class="iconfont icon-chenggong icon"></i>
                    <div class="title">{{title}}</div>
                    <el-button  class="addCart" @click="jump">{{btnTitle}}</el-button>
                </div>
                <hr style="width: 100%;color: #cecece;margin-top: 32px"/>
                <h3 class="recommoned">{{recommoned}}</h3>
                <ul class="list">
                      <li v-for = "(item,index) in info">
                        <a :href="'/detail#/?id=' + item.id" target="_blank">
                           <div class="bg" :style="{backgroundImage : 'url(' + item.image_value +')'}"></div>
                           <p class="desc">{{item.promotion_title}}</p>
                           <p class="price">${{item.price}}</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </transition>

</template>

<style scoped lang="less">
    .fade-enter-active, .fade-leave-active{
        transition: all .5s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
    .wrapper{
        position: fixed;
        z-index: 100;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        .box{
            width: 551px;
            padding: 16px;
            margin:0 24px;
            background-color: white;
            box-sizing: border-box;
            .delete{
                width: 21px;
                height: 18px;
                position: relative;
                left:490px;
                top:0;
                cursor: pointer;
            }
            .innerWrapper{
                display: flex;
                align-items: center;
                margin-top: 15px;
                .icon{
                    width: 26px;
                    height: 26px;
                    background-color: aqua;
                }
                .title{
                    margin-left: 15px;
                    font-family: "Microsoft YaHei";
                    font-weight: bold;
                    color: rgba(0,0,0,0.35);
                }
                .addCart{
                    width: 110px;
                    background-color: #ff2511;
                    color: #fff;
                    font-size: 14px;
                    text-align: center;
                    font-family: "Microsoft YaHei";
                    margin-left: 226px;
                    display: flex;
                    justify-content: center;
                }
            }
            .recommoned{
                font-size: 16px;
                color: #333;
                margin-top: 24px;
            }
            .list{
                width: 100%;
                margin-top: 36px;
                list-style: none;
                display: flex;
                align-items: center;
                overflow: hidden;
                li{
                    margin-right: 13px;
                    width: 90px;
                    word-break: break-all;
                    .bg{
                        width: 90px;
                        height: 90px;
                        background-size: 100% 100%;
                        background-position: center center;
                        background-repeat: no-repeat;
                        background-color: aqua;
                    }
                    .desc{
                        text-align: center;
                        margin-top: 13px;
                        height: 42px;
                    }
                    .price{
                        text-align: center;
                        color: red;
                    }
                }

            }
        }

    }
</style>

<script>
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
  export default {
      components: {ElButton},
      props:{
          title:{
              type:String,
              default:"已成功加入购物车"
          },
          btnTitle:{
              type:String,
              default:"去购物车结算"
          },
          type:{
              type:Number,
              default:0
          },
          recommoned:{
              type:String,
              default:"为您推荐"
          },
          info:{
              type: Array,
              default:[
                  {img:"../../assets/icon/shangpin.png",desc:"hahah",price:"100"},
                  {img:"../../assets/icon/shangpin.png",desc:"hahah",price:"1010"},
                  {img:"../../assets/icon/shangpin.png",desc:"hahah",price:"1020"},
                  {img:"../../assets/icon/shangpin.png",desc:"hahah",price:"1030"},
                  {img:"../../assets/icon/shangpin.png",desc:"hahah",price:"1030"}
              ]
          }
      },
      data(){
          return{
          }
      },
      methods:{
          fade(){
              this.$emit("fade");
          },
          jump(){
              this.$emit("jump");
          }
      }
  };
</script>

