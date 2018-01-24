<template>
  <div class="s-span-page">

      <div class="footer-box">
          <ul class="partner">
              <li v-for="link in partner">
                  <a :style="{backgroundImage: 'url('+link.img+')'}" :href="link.link" :key="link.value" class="partner-img-box"></a>
              </li>
          </ul>
          <div class="footer-menu-box">
                <ul>
                  <li>关于LTS</li>
                  <li>联系我们</li>
                  <li>帮助我们</li>

                </ul>
                <ul>
                  <li>诚聘英才</li>
                  <li>事件新闻</li>
                  <li>公司地址</li>
                </ul>
                <ul>
                  <li>使用条款</li>
                  <li>隐私条款</li>
                  <li>条款条件</li>
                </ul>
                <ul>
                  <li>关注我们:</li>
                  <li>
                      <a v-for="link in footerLinkList" :style="{backgroundImage: 'url('+link.img+')'}" :href="link.link" :key="link.value" class="link-img-box"></a>
                  </li>
                </ul>
              </div>
              <div class="footer-link-box">
                  <div>Copyright © 2018 LT Security Inc., All Rights Reserved</div>
              </div>
          </div>
  </div>
</template>
<script>
  export default {
    name : "lts-footer",
    data(){
      return{
        partner : [
            {
                value : 'hikvision',
                img : require('@/assets/img/hikvision.png'),
                link : 'http://www.ltsecurityinc.com/discussion'
            },
            {
                value : 'resolution',
                img : require('@/assets/img/resolution.png'),
                link : 'http://www.ltsecurityinc.com/discussion'
            },
            {
                value : 'MD',
                img : require('@/assets/img/MD.png'),
                link : 'http://www.ltsecurityinc.com/discussion'
            },
            {
                value : 'seagate',
                img : require('@/assets/img/seagate.png'),
                link : 'http://www.ltsecurityinc.com/discussion'
            },
            {
                value : 'unisight',
                img : require('@/assets/img/unisight.png'),
                link : 'http://www.ltsecurityinc.com/discussion'
            },
            {
                value : 'ubiquiti',
                img : require('@/assets/img/ubiquiti.png'),
                link : 'http://www.ltsecurityinc.com/discussion'
            },
            {
                value : 'napco',
                img : require('@/assets/img/napco.png'),
                link : 'http://www.ltsecurityinc.com/discussion'
            }
        ],
        footerLinkList:[
          {
            value : 'lts',
            img : require('@/assets/img/blog_icon.png'),
            link : 'http://www.ltsecurityinc.com/discussion'
          },
          {
            value : 'facebook',
            img : require('@//assets/img/facebook_icon.png'),
            link : 'http://www.ltsecurityinc.com/discussion'
          },
          {
            value : 'linkedin',
            img : require('@//assets/img/linkedin_icon.png'),
            link : 'http://www.ltsecurityinc.com/discussion'
          },
          {
            value : 'twitter',
            img : require('@//assets/img/twitter_icon.png'),
            link : 'http://www.ltsecurityinc.com/discussion'
          },
          {
            value : 'youtube',
            img : require('@//assets/img/youtube_icon.png'),
            link : 'http://www.ltsecurityinc.com/discussion'
          }
        ]
      }
    },
    methods:{

    },
    created(){

    },
  }
</script>
<style lang="less" scoped>
  .partner{
        margin: auto;
        margin-top: 24px;
        display: flex;
        justify-content: center;
        li{
            display: flex;
            margin-right: 24px;
        }
        li:last-child{
            margin-right: 0;
        }
        .partner-img-box{
            width:140px;
            height:30px;
            background-size: cover;

        }
    }
  .footer-box{
    width: 1124px;
    margin: auto;
    .footer-menu-box{
      padding-top:35px;
      margin-bottom:35px;
      display: flex;
      justify-content: space-between;
      text-align: left;
      li{
        font-size: 14px;
        color: #737373;
        margin-top: 15px;
        line-height: normal;
        .email{
          font-size: 14px;
        }
        .email-remark{
          font-size: 12px;
        }
        .email-input input{
          -webkit-appearance: none;
          background-color: #fff;
          border-radius: 4px;
          border: 1px solid #dcdfe6;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          color: #606266;
          display: inline-block;
          font-size: inherit;
          height: 30px;
          line-height: 1;
          outline: 0;
          margin-top: 6px;
          -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
          transition: border-color .2s cubic-bezier(.645,.045,.355,1);
          width: 100%;
        }
        .el-button--default{
          font-size: 12px;
          width: 90px;
          height: 24px;
          line-height: 24px;
          padding: 0;
          margin-top: 6px;
          background-color: red;
          color: #fff;
        }
         .link-img-box{
              display: inline-block;
              width: 30px;
              height:30px;
              background-size: cover;
              margin-right: 12px;
         }
      }
    }
    .footer-link-box{
      text-align: left;
      font-size: 14px;
      color: #737373;
      text-align: center;
    }


  }

</style>
