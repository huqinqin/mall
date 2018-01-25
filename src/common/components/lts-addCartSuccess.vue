<template>
    <transition name="fade">
        <el-dialog
                     width="551px"
                     center
                     :visible.sync="show"
                     class="wrapper">
            <div class="box">
                <div class="iconfont icon-iconset0127 delete" @click="fade"></div>
                <div class="innerWrapper">
                    <i  v-if="type === 0" class="iconfont icon-chenggong icon"></i>
                    <i  v-if="type === 1" class="iconfont icon-turnoff icon"></i>
                    <i  v-if="type === 2" class="iconfont icon-chenggong icon"></i>
                    <i  v-if="type === 3" class="iconfont icon-chenggong icon"></i>
                    <div class="title">{{title}}</div>
                    <el-button  class="addCart" @click="jump">{{btnTitle}}</el-button>
                </div>
                <hr style="height:1px;border:none;width: 100%;border-top: 1px solid #cecece;margin-top: 32px"/>
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
        </el-dialog>
    </transition>

</template>

<style  lang="less">
    .fade-enter-active, .fade-leave-active{
        transition: all .5s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
    .el-dialog{
        .el-dialog--center .el-dialog__header{
            padding: 0!important;
        }
        .el-dialog__header{
            padding:0!important;
        }
        .el-dialog--center .el-dialog__body{
            padding:16px 24px !important;
        }
        .el-dialog__body{
            padding:16px 26px!important;
        }
    }

    .wrapper{
        position: fixed;
        z-index: 100;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        /*background-color: rgba(0,0,0,0.5);*/
        display: flex;
        justify-content: center;
        align-items: center;
        .box{
            box-sizing: border-box;
            .delete{
                font-size: 21px;
                position: relative;
                left:97%;
                top:0px;
                cursor: pointer;
            }
            .innerWrapper{
                display: flex;
                align-items: center;
                margin-top: 15px;
                .icon{
                    font-size: 26px;
                    color: #67c23a;
                }
                .icon:before{
                    width: 100%;
                    height: 100%;
                }
                .title{
                    margin-left: 15px;
                    font-family: "Microsoft YaHei";
                    font-weight: bold;
                    color: rgba(0,0,0,0.85);
                    font-size: 18px;
                }
                .addCart{
                    width: 110px;
                    background-color: #ff0000;
                    color: #fff;
                    font-size: 14px;
                    text-align: center;
                    font-family: "Microsoft YaHei";
                    margin-left: 38%;
                    display: flex;
                    justify-content: center;
                    font-size: 14px;
                }
            }
            .recommoned{
                font-size: 16px;
                color: #333;
                margin-top: 24px;
                font-family: "Microsoft YaHei";
            }
            .list{
                width: 100%;
                margin-top: 36px;
                list-style: none;
                display: flex;
                align-items: center;
                overflow: hidden;
                li{
                    margin-left: 10px;
                    width: 90px;
                    word-break: break-all;
                    .bg{
                        border: 1px solid rgba(0,0,0,0.3);
                        width: 90px;
                        height: 90px;
                        background-size: 100% 100%;
                        background-position: center center;
                        background-repeat: no-repeat;
                    }
                    .desc{
                        text-align: left;
                        margin-top: 13px;
                        height: 42px;
                    }
                    .price{
                        text-align: left;
                        color: red;
                        font-weight: bold;
                    }
                }
                li:first-child{
                    margin-left: 0;
                }
            }
        }

    }
</style>

<script>
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
  import ElDialog from "../../../node_modules/element-ui/packages/dialog/src/component.vue";
  export default {
      components: {
          ElDialog,
          ElButton},
      props:{

          title:{
              type:String,
              default:"已成功加入购物车!"
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
          },
          flag:{
              type:Boolean,
              default:false
          }
      },
      data(){
          return{
            show:false
          }
      },
      watch:{
          flag(){
              this.show = this.flag;
          },
          show(){
              if(!this.show){
                  this.close();
              }
          }
      },
      methods:{
          close(){
              this.$emit('update:flag',false);
          },
          fade(){
              this.$emit("fade");
          },
          jump(){
              this.$emit("jump");
          }
      }
  };
</script>

