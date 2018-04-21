<template>
   <div class="wrapperExperts">
       <div class="el-icon-close" @click="close" style=""></div>
       <h3>Contact Sales</h3>
       <div class="box" v-ltsLoginShow:false>
           <ul >
               <li><span>Contact：</span><span>831-250-1292</span></li>
               <li><span>Email：</span><span>mall@ltsecurityinc.com</span></li>
           </ul>
           <ul><img src="../../assets/img/expertIcon.png" alt=""></ul>
       </div>
       <div class="box" v-ltsLoginShow:true>
           <ul>
               <li><span>Name：</span><span>{{someInfo.name}}</span></li>
               <li><span>Contact：</span><span>{{someInfo.mobile}}</span></li>
               <li><span>Email：</span><span>{{someInfo.email}}</span></li>
               <li><span>Store：</span><span>{{someInfo.p_shop_name}}</span></li>
               <li><span>Store Addr：</span><span>{{someInfo.p_shop_addr}}</span></li>
           </ul>
           <ul><img src="../../assets/img/expertIcon.png" alt=""></ul>
       </div>
   </div>
</template>

<script>
 // import expertService from '@/services/MyexpertService.js'
 import {store} from 'ltsutil'
 import $ from 'jquery'
  export default {
     name: 'expert',
      data () {
          return {
              flag: false,
              someInfo: {},
              /*someInfo: {
                  name: 'Kevin',
                  mobile: '6264352872',
                  email: 'mall@ltsecurityinc.com',
                  p_shop_name: 'San Francisco',
                  p_shop_addr: '38507 Cherry St. Suite GNewark, CA 94560'
              },*/
              storeinfo: [{
                  name: 'San Jose Ave.',
                  mobile: '626-435-2838',
                  email: 'Support.LosAngeles@LTSecurityinc.com',
                  p_shop_name: 'California - Los Angeles',
                  p_shop_addr: 'City of Industry, CA 91748'
              }, {
                  name: 'Cherry St. Suite G',
                  mobile: '510-201-9868',
                  email: ' Support.SanFrancisco@LTSecurityinc.com',
                  p_shop_name: 'California - San Francisco',
                  p_shop_addr: 'Newark, CA 94560'
              }, {
                  name: 'West Park Dr., Suite C',
                  mobile: ' 856-780-9888',
                  email: ' Support.NewJersey@LTSecurityinc.com',
                  p_shop_name: 'New Jersey',
                  p_shop_addr: 'Mount Laurel, NJ 08054'
              }, {
                  name: 'GRAND OPENING!',
                  mobile: ' 678-710-3788',
                  email: ' Support.GA@LTSecurityinc.com',
                  p_shop_name: 'Georgia',
                  p_shop_addr: '5933 Peachtree Industrial Blvd,Suite B'
              }, {
                  name: 'Elmhurst Rd.',
                  mobile: ' 630-348-8088',
                  email: ' Support.Chicago@LTSecurityinc.com',
                  p_shop_name: 'Illinois ',
                  p_shop_addr: 'Elk Grove Village, IL 60007'
              }, {
                  name: 'GRAND OPENING!',
                  mobile: ' 312-800-0766',
                  email: ' Support.Chicago@LTSecurityinc.com',
                  p_shop_name: 'Illinois - Chicago',
                  p_shop_addr: '2463 S Archer Ave.Chicago, IL 60616'
              }, {
                  name: 'Westpark Dr.',
                  mobile: ' 713-587-1800',
                  email: ' Support.Houston@LTSecurityinc.com ',
                  p_shop_name: 'Texas - Houston',
                  p_shop_addr: 'Houston, TX 77063'
              }, {
                  name: 'Forbes Blvd., Suite I',
                  mobile: '240-493-8988',
                  email: ' Support.Maryland@LTSecurityinc.com',
                  p_shop_name: 'Maryland',
                  p_shop_addr: 'Lanham, MD 20706'
              }, {
                  name: 'Valwood Pkwy., Suite 112',
                  mobile: '469-289-5780',
                  email: 'Support.Dallas@LTSecurityinc.com ',
                  p_shop_name: 'Texas - Dallas',
                  p_shop_addr: '38507 Cherry St. Suite GNewark, CA 94560'
              }, {
                  name: ' Seaview Blvd., Suite 1B',
                  mobile: ' 646-558-3888',
                  email: ' Support.NewYork@LTSecurityinc.com',
                  p_shop_name: 'New York',
                  p_shop_addr: 'Carrollton, TX 75006'
              }, {
                  name: 'NW 25th St., Suite 110',
                  mobile: ' 786-693-1813',
                  email: ' Support.Florida@LTSecurityinc.com ',
                  p_shop_name: 'Florida',
                  p_shop_addr: 'Miami, FL 33122'
              }, {
                  name: ' S. 36th St, Suite 150',
                  mobile: ' 602-903-2220',
                  email: 'Support.AZ@LTSecurityinc.com',
                  p_shop_name: 'Arizona',
                  p_shop_addr: 'Phoenix, AZ 85040'
              }]
          }
      },
      methods: {
          close(){
              this.$emit('close',this.flag);
              $('.el-tooltip__popper').css('display','none');
          },
          getExpert() {
              let data = store.getItem('expert');
              if (data) {
                  /*for (var value in data) {
                      if (data[value] === '' || data[value] === 'null' || data[value] === 'undefined') {
                          return false;
                      }
                  }
                  this.someInfo = data;*/
                  this.someInfo = data;
                  if (data.name === 'LTS Headquarters') {
                      this.storeinfo.forEach((item) => {
                          if (item.p_shop_name === data.p_shop_name) {
                              this.someInfo = item;
                          }
                      })
                  } else {
                      this.someInfo = data;
                  }
              }
            }
          },
      mounted () {
          this.getExpert();
      }
  };
</script>

<style lang="less">
    .el-tooltip__popper.is-light{
        border: none;
    }
    .wrapperExperts{
        padding: 20px;
        /*width: 298px;*/
        /*background-color: #3b98ff;*/
        background: #f8fcff;
        color: rgba(102,102,102,0.8);
        border-radius: 4px;
        font-family: "Microsoft YaHei";
        .el-icon-close{
            font-size: 20px;
            position: absolute;
            right:20px;
            top:20px;
            color: #bbbec0;
        }
        .box{
            display: flex;
            align-items: center;
            justify-content: center;
            ul{
                padding:0;
                li{
                    list-style: none;
                    margin-top: 15px;
                }
            }
            ul:first-child{
                flex:1;
                margin-right: 20px;
            }
            ul:nth-child(2){
                width: 63px;
                height: 69px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>

