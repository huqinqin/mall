<template>
  <div class="cartlist">
      <div v-if="cartNum">
        <el-table
          :data="tableData"
          :default-expand-all="true"
          :stripe="false"
          tooltip-effect="dark"
          style="width: 100%" align="right">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <div v-if="scope.row.discount && scope.row.discount.length>0" class="discountTable subtable">
                <div class="popover">
                  <div class="popTitle">{{ $t("main.cart.list.mainCartliDisGoods") }}</div>
                </div>
                <el-table
                  :data="scope.row.discount"
                  :show-header="false"
                  style="width: 100%">
                  <el-table-column align="center" width="48">
                    <template slot-scope="subscope">
                      <el-checkbox v-model="subscope.row.checked"  @change="selectChange(subscope.row)"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" width="600">
                    <template slot-scope="subscope">
                      <a :href="'/detail#/?id=' + subscope.row.id">
                        <div class="item-img"
                             :style="{backgroundImage : 'url(' + subscope.row.full_url + '!item_small)'}"></div>
                        <div class="content">
                          <p :title="subscope.row.item_name">{{subscope.row.item_name}}</p>
                        </div>
                        <ul class="other">
                          <li v-for="(item,index) in subscope.row.item_props">
                            <p v-for="(val,key) in item.prop_value" :title="val">{{key}}:{{val}}</p>
                          </li>
                        </ul>
                      </a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="price" width="" :label='$t("main.cart.list.mainCartliUnitPrice")' align="center">
                    <template slot-scope="subscope">
                        <p class="oldPrice">
                            <lts-money :money="subscope.row.item_props[0].price"></lts-money>
                        </p>
                        <p>
                            <lts-money :money="subscope.row.price_real"></lts-money>
                        </p>
                    </template>
                  </el-table-column>
                  <el-table-column prop="" width="100" :label='$t("main.cart.list.mainCartliStock")' align="center">
                    <template slot-scope="subscope">
                      <p v-if="subscope.row.item_props[0].storage >= subscope.row.num">{{
                        $t("main.cart.list.mainCartliAvailable") }}</p>
                      <p v-else>{{ $t("main.cart.list.mainCartliStockInsuff") }}</p>
                    </template>
                  </el-table-column>
                  <el-table-column :label='$t("main.cart.list.mainCartliNum")' width="200" prop="num" align="center">
                    <template slot-scope="subscope">
                      <div class="inputNumber">
                        <el-input-number :min='1' size="small" v-model="subscope.row.num"
                                         @change="inputNumeberChange(subscope.row)"
                                         :label='$t("main.cart.list.mainCartliDescWord")'></el-input-number>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column :label='$t("main.cart.list.mainCartliSubtotal")' width="90" align="center">
                    <template slot-scope="subscope">
                      <div class="count" >
                        <lts-money :money="subscope.row.num * subscope.row.price_real"></lts-money>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column :label='$t("main.cart.list.mainCartliOpera")' width="" align="center">
                    <template slot-scope="subscope">
                      <div class="cart-delete" @click="deleteHandle(subscope.$index, subscope.row)">
                        <i class="iconfont icon-shanchu"></i>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-else-if="scope.row.reduce && scope.row.reduce.length>0" class="reduceTable subtable">
                <div class="popover">
                  <div class="popTitle">{{ $t("main.cart.list.mainCartliOnsaleGoods") }}</div>
                </div>
                <el-table
                  :data="scope.row.reduce"
                  :show-header="false"
                  style="width: 100%">
                  <el-table-column align="center" width="48">
                    <template slot-scope="subscope">
                      <el-checkbox v-model="subscope.row.checked"  @change="selectChange(subscope.row)"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" width="600">
                    <template slot-scope="subscope">
                      <a :href="'/detail#/?id=' + subscope.row.id">
                        <div class="item-img"
                             :style="{backgroundImage : 'url(' + subscope.row.full_url + '!item_small)'}"></div>
                        <div class="content">
                          <p :title="subscope.row.item_name">{{subscope.row.item_name}}</p>
                        </div>
                        <ul class="other">
                          <li v-for="(item,index) in subscope.row.item_props">
                            <p v-for="(val,key) in item.prop_value" :title="val">{{key}}:{{val}}</p>
                          </li>
                        </ul>
                      </a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="price" width="" :label='$t("main.cart.list.mainCartliUnitPrice")' align="center">
                    <template slot-scope="subscope">
                        <p class="oldPrice">
                            <lts-money :money="subscope.row.item_props[0].price"></lts-money>
                        </p>
                        <p>
                            <lts-money :money="subscope.row.price_real"></lts-money>
                        </p>
                    </template>
                  </el-table-column>
                  <el-table-column prop="" width="100" :label='$t("main.cart.list.mainCartliStock")' align="center">
                    <template slot-scope="subscope">
                      <p v-if="subscope.row.item_props[0].storage >= subscope.row.num">{{
                        $t("main.cart.list.mainCartliAvailable") }}</p>
                      <p v-else>{{ $t("main.cart.list.mainCartliStockInsuff") }}</p>
                    </template>
                  </el-table-column>
                  <el-table-column :label='$t("main.cart.list.mainCartliNum")' width="200" prop="num" align="center">
                    <template slot-scope="subscope">
                      <div class="inputNumber">
                        <el-input-number :min='1' size="small" v-model="subscope.row.num"
                                         @change="inputNumeberChange(subscope.row)"
                                         :label='$t("main.cart.list.mainCartliDescWord")'></el-input-number>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column :label='$t("main.cart.list.mainCartliSubtotal")' width="90" align="center">
                    <template slot-scope="subscope">
                      <div class="count">
                        <lts-money :money="subscope.row.num * subscope.row.price_real"></lts-money>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column :label='$t("main.cart.list.mainCartliOpera")' width="" align="center">
                    <template slot-scope="subscope">
                      <div class="cart-delete" @click="deleteHandle(subscope.$index, subscope.row)">
                        <i class="iconfont icon-shanchu"></i>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div v-else-if="scope.row.limit && scope.row.limit.length>0" >
                <div v-for="limitItem in scope.row.limit" :key="limitItem.id" class="limitTable subtable">
                  <div class="popover">
                    <div class="popTitle" :class="{ 'noStart': !limitItem[0].rule.started }">{{ $t("main.cart.list.mainCartliOnsaleLimits") }} <span v-show="false">{{rending}}</span></div>
                    <div class="popDetail" :class="[{ 'noStart': !limitItem[0].rule.started }, {'started': limitItem[0].rule.started}]">
                      <div v-if="!limitItem[0].rule.finished">
                        <span v-if="limitItem[0].rule.started">{{$t("main.cart.list.mainCartliEndCountdown")}}</span>
                        <span v-else>{{$t("main.cart.list.mainCartliStartCountdown")}}</span>：
                        <span v-if="limitItem[0].rule.day">{{limitItem[0].rule.day}}{{$t("main.detail.info.mainDetInfoDay")}}</span>
                      </div>
                      <div v-else-if="limitItem[0].rule.finished">
                        <span>{{$t("main.detail.info.mainDetInLimitOver")}}</span>
                      </div>
                      <div class="timeDown" v-if="!limitItem[0].rule.finished">
                        <div>{{limitItem[0].rule.hr}}</div>:
                        <div>{{limitItem[0].rule.min}}</div>:
                        <div>{{limitItem[0].rule.sec}}</div>
                      </div>
                    </div>
                  </div>
                  <el-table
                    :data="limitItem"
                    :show-header="false"
                    style="width: 100%">
                    <el-table-column align="center" width="48">
                      <template slot-scope="subscope">
                        <el-checkbox v-model="subscope.row.checked"  @change="selectChange(subscope.row)" :disabled="!(subscope.row.rule.started && !subscope.row.rule.finished)"></el-checkbox>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" width="600">
                      <template slot-scope="subscope">
                        <a :href="'/detail#/?id=' + subscope.row.id">
                          <div class="item-img"
                               :style="{backgroundImage : 'url(' + subscope.row.full_url + '!item_small)'}"></div>
                          <div class="content">
                            <p :title="subscope.row.item_name">{{subscope.row.item_name}}</p>
                          </div>
                          <ul class="other">
                            <li v-for="(item,index) in subscope.row.item_props">
                              <p v-for="(val,key) in item.prop_value" :title="val">{{key}}:{{val}}</p>
                            </li>
                          </ul>
                        </a>
                      </template>
                    </el-table-column>
                    <el-table-column prop="price" width="" :label='$t("main.cart.list.mainCartliUnitPrice")' align="center">
                      <template slot-scope="subscope">
                          <p class="oldPrice">
                              <lts-money :money="subscope.row.item_props[0].price"></lts-money>
                          </p>
                          <p>
                              <lts-money :money="subscope.row.price_real"></lts-money>
                          </p>
                      </template>
                    </el-table-column>
                    <el-table-column prop="" width="100" :label='$t("main.cart.list.mainCartliStock")' align="center">
                      <template slot-scope="subscope">
                        <p v-if="subscope.row.item_props[0].storage >= subscope.row.num">{{
                          $t("main.cart.list.mainCartliAvailable") }}</p>
                        <p v-else>{{ $t("main.cart.list.mainCartliStockInsuff") }}</p>
                      </template>
                    </el-table-column>
                    <el-table-column :label='$t("main.cart.list.mainCartliNum")' width="200" prop="num" align="center">
                      <template slot-scope="subscope">
                        <div class="inputNumber">
                          <el-input-number :min='subscope.row.mininum'
                                           :max="subscope.row.item_props[0].storage > subscope.row.maxinum ? subscope.row.maxinum : subscope.row.item_props[0].storage"
                                           size="small"
                                           v-model="subscope.row.num"
                                           @change="inputNumeberChange(subscope.row)"
                                           :label='$t("main.cart.list.mainCartliDescWord")'></el-input-number>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column :label='$t("main.cart.list.mainCartliSubtotal")' width="90" align="center">
                      <template slot-scope="subscope">
                        <div class="count">
                          <lts-money :money="subscope.row.num * subscope.row.price_real"></lts-money>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column :label='$t("main.cart.list.mainCartliOpera")' width="" align="center">
                      <template slot-scope="subscope">
                        <div class="cart-delete" @click="deleteHandle(subscope.$index, subscope.row)">
                          <i class="iconfont icon-shanchu"></i>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <div v-else-if="scope.row.others && scope.row.others.length>0" class="otherTable subtable">
                <div class="popover">
                  <div class="popTitle">{{ $t("main.cart.list.mainCartliOnsaleFull") }}</div>
                </div>
                <el-table
                  :data="scope.row.others"
                  :show-header="false"
                  style="width: 100%">
                  <el-table-column align="center" width="48">
                    <template slot-scope="subscope">
                      <el-checkbox v-model="subscope.row.checked"  @change="selectChange(subscope.row)"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" width="600">
                    <template slot-scope="subscope">
                      <a :href="'/detail#/?id=' + subscope.row.id">
                        <div class="item-img"
                             :style="{backgroundImage : 'url(' + subscope.row.full_url + '!item_small)'}"></div>
                        <div class="content">
                          <p :title="subscope.row.item_name">{{subscope.row.item_name}}</p>
                        </div>
                        <ul class="other">
                          <li v-for="(item,index) in subscope.row.item_props">
                            <p v-for="(val,key) in item.prop_value" :title="val">{{key}}:{{val}}</p>
                          </li>
                        </ul>
                      </a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="price" width="" :label='$t("main.cart.list.mainCartliUnitPrice")' align="center">
                    <template slot-scope="subscope">
                        <p class="oldPrice" v-if="subscope.row.item_props[0].price != subscope.row.price_real"><lts-money :money="subscope.row.item_props[0].price"></lts-money></p>
                        <p><lts-money :money="subscope.row.price_real"></lts-money></p>
                    </template>
                  </el-table-column>
                  <el-table-column prop="" width="100" :label='$t("main.cart.list.mainCartliStock")' align="center">
                    <template slot-scope="subscope">
                      <p v-if="subscope.row.item_props[0].storage >= subscope.row.num">{{
                        $t("main.cart.list.mainCartliAvailable") }}</p>
                      <p v-else>{{ $t("main.cart.list.mainCartliStockInsuff") }}</p>
                    </template>
                  </el-table-column>
                  <el-table-column :label='$t("main.cart.list.mainCartliNum")' width="200" prop="num" align="center">
                    <template slot-scope="subscope">
                      <div class="inputNumber">
                        <el-input-number :min='1' size="small" v-model="subscope.row.num"
                                         @change="inputNumeberChange(subscope.row)"
                                         :label='$t("main.cart.list.mainCartliDescWord")'></el-input-number>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column :label='$t("main.cart.list.mainCartliSubtotal")' width="90" align="center">
                    <template slot-scope="subscope">
                      <div class="count">
                        <p><lts-money :money="subscope.row.num * subscope.row.price_real"></lts-money></p>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column :label='$t("main.cart.list.mainCartliOpera")' width="" align="center">
                    <template slot-scope="subscope">
                      <div class="cart-delete" @click="deleteHandle(subscope.$index, subscope.row)">
                        <i class="iconfont icon-shanchu"></i>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label='$t("main.cart.list.mainCartliGoodsInfo")' width="600"></el-table-column>
          <el-table-column width="" :label='$t("main.cart.list.mainCartliPrice")' align="center"></el-table-column>
          <el-table-column width="100" :label='$t("main.cart.list.mainCartliStock")' align="center"></el-table-column>
          <el-table-column :label='$t("main.cart.list.mainCartliNum")' width="200" prop="num" align="center"></el-table-column>
          <el-table-column :label='$t("main.cart.list.mainCartliSubtotal")' width="90" align="center"></el-table-column>
          <el-table-column :label='$t("main.cart.list.mainCartliOpera")' width="" align="center"></el-table-column>
        </el-table>
        <div class="table-footer">
          <div class="choose">
            <el-checkbox :label='$t("main.cart.list.mainCartliCheckedAll")' v-model="selectedAll"
                         @change="selectAll"></el-checkbox>
              <span>{{checkedItem.length}} {{ $t("main.cart.other.mainCartUnit") }} {{ $t("main.cart.list.mainCartliCheckedItem") }}</span>
          </div>
          <div class="check">
            <div class="info">
              <div class="topline">
                <span>{{ $t("main.cart.list.mainCartliAllPrice") }} ({{ $t("main.cart.other.mainCartNo") }} {{ $t("main.cart.settle.mainCartSeTax") }}, {{ $t("main.cart.settle.mainCartSeFright") }})：<lts-money
                  :money="totalPrice"></lts-money></span>
              </div>
              <div class="bottomline">
                <div><span>{{ $t("main.cart.list.mainCartliBenefit") }}：-</span> <lts-money :money="totalPrice - realTotal"></lts-money>
                </div>
                <div><span>{{ $t("main.cart.list.mainCartliShouldPay") }}：</span><span class="bold"><lts-money
                  :money="realTotal"></lts-money></span></div>
              </div>
            </div>
            <el-button @click="check" :disabled="checkedItem.length <= 0 && tooManyItems">{{
              $t("main.cart.list.mainCartliImmeSettle") }}
            </el-button>
          </div>
        </div>
      </div>
      <div v-else class="cartNull">
          <div class="img" :style="'backgroundImage: url(' + nullImg + ')'"></div>
          <div class="text">
              <p>{{$t("main.cart.list.mainCartliTextOne")}}</p>
              <p>{{$t("main.cart.list.mainCartliTextTwo")}}<a href="/">{{$t("main.cart.list.mainCartliTextThree")}}</a>{{$t("main.cart.list.mainCartliTextFour")}}</p>
          </div>
      </div>
  </div>
</template>

<script>
  import cartService from '@/services/CartService.js'
  import Vue from 'vue'
  export default {
    name: 'list',
    data () {
      return {
        nullImg: require('@/assets/img/cartNull.png'),
        rending:1,
        expands: [], // 默认展开全部
        checked: false,
        tooManyItems: true,
        chooseAll: false,
        historyData: [],
        tableData: [
          {discount: []},
          {reduce: []},
          {limit: []},
          {others: []}
        ],
        tableDataItem: {}, // 购物车所有数据
        multipleSelection: [],
        totalPrice: 0,
        realTotal: 0,
        selectedAll: false,
        cart: {
          cartTotal: 0,
          cartPriceTotal: 0
        },
        checkedItem: [], // 已选商品
        cartNum:1,
        fullrule:[], // 满减规则
        minusPro:0, // 满减
      }
    },
    mounted () {
      setTimeout(() => {
        this.queryCartList()
        this.minus()
        // this.putCartPlus()
      }, 20)
    },
    methods: {
      // 删除选中商品
      deleteChecked () {
        this.checkedItem.forEach((item) => {
          this.tableData.forEach((value) => {
          })
        })
      },
      // 删除失效商品
      deleteInvalid () {

      },
      // 全选框-改变每行数据的checked
      selectAll () {
        if (this.selectedAll) {
          this.checkedItem = this.tableDataItem
            this.checkedItem.forEach((item, index) => {
                if(item.discount_type == 4){
                    if(item.rule.started && !item.rule.finished){
                    }else{
                        this.checkedItem.splice(index, 1)
                    }
                }
            })
          this.tableData.forEach((table,index,array) => {
            for(let key in table){
              this.tableData[index][key].forEach((item,count) => {
                 if(item.length > 0){
                     if(item[0].rule.started && !item[0].rule.finished){
                         item[0].checked = true;
                         let cloneItem = item[0];
                         Vue.set(item,0,cloneItem);
                         item[0].checked = true;
                     }else{
                     }
                 }else{
                    item.checked = true;
                 }
                 Vue.set(this.tableData[index][key],count,item)
              })
            }
            Vue.set(this.tableData,index,this.tableData[index])
          })
        }else {
          this.checkedItem = []
          this.tableData.forEach((table,index) => {
            for(let key in table){
              table[key].forEach((item,count) => {
                if(item.length > 0){
                    if(item.length > 0) {
                        item[0].checked = false;
                        let cloneItem = item[0];
                        Vue.set(item,0,cloneItem);
                    }
                }else{
                    item.checked = false;
                }
                Vue.set(this.tableData[index][key],count,item)
              })
            }
            Vue.set(this.tableData,index,this.tableData[index])
          })
        }


          this.calcMinus(this.checkedItem)
          this.calc(this.checkedItem)
      },
      // 单选框
      selectChange (row) {
        if (this.checkedItem.indexOf(row) !== -1) {
          this.checkedItem.splice(this.checkedItem.indexOf(row), 1)
            row.checked = false;
        } else {
          this.checkedItem.push(row)
          row.checked  = true
        }
        this.tableData.forEach((table,index,array) => {
          for(let key in table){
              this.tableData[index][key].forEach((item,count) => {
                  if(item.length > 0 && item[0].id == row.id && JSON.stringify(item[0].item_props[0].prop_value) == JSON.stringify(row.item_props[0].prop_value)){
                      Vue.set(item,0,row);
                      Vue.set(this.tableData[index][key],count,item)
                  }else if(item.id == row.id && JSON.stringify(item.item_props[0].prop_value) == JSON.stringify(row.item_props[0].prop_value)){
                      Vue.set(this.tableData[index][key],count,row)
                  }
                  Vue.set(this.tableData[index][key],count,item)
              })
          }
          Vue.set(this.tableData,index,this.tableData[index])
         })
        Vue.set(this.tableData)
        this.calcMinus(this.checkedItem)
        this.calc(this.checkedItem)
        if (this.checkedItem.length === this.tableDataItem.length) {
          this.selectedAll = true
        } else {
          this.selectedAll = false
        }
      },
      // 计算价格
      calc (checked) {
        let total = 0
        let realTotal = 0
        checked.forEach((item) => {
          total += item.num * item.price
          realTotal += item.num * item.price_real
        })
        this.totalPrice = total
        this.realTotal = realTotal - this.minusPro
      },
      queryCartList () {
        cartService.queryCartList().then((data) => {
          this.tableData = [
            {discount: []},
            {reduce: []},
            {limit: []},
            {others: []}
          ]
            this.cartNum = data.datalist.length
          data.datalist.forEach((value) => {
            value.checked = false
            value.item_props.forEach((item) => {
              item.prop_value = JSON.parse(item.prop_value)
            })
            value.oldPrice = value.item_props[0].price
            if (value.discount_type === 1) {
                value.realPrice = value.item_props[0].price * value.discount / 100
              this.tableData[0].discount.push(value)
            } else if (value.discount_type === 2) {
                value.realPrice = value.item_props[0].price - value.discount
              this.tableData[1].reduce.push(value)
            } else if (value.discount_type === 4) {
              value.rule = JSON.parse(value.sale_rule)
              value.item_props[0].storage = value.rule.total
              // value.rule.end = value.end_time
              // value.rule.end = value.end_time
              value.rule.end = Date.parse(new Date(value.rule.endTime))
              value.rule.start = Date.parse(new Date(value.rule.startTime))
                value.realPrice = value.rule.price
              let now = Date.parse(new Date())
              if (value.rule.end > now) {
                this.countdown(value)
              } else {
                // 活动结束，不显示了
                value.rule.finished = true
              }
              this.tableData[2].limit.push([value])
            } else {
                value.realPrice = value.item_props[0].price
                this.tableData[3].others.push(value)
            }
            this.tableDataItem = data.datalist

          })
        }, (msg) => {
          this.$ltsMessage.show({type: 'error', message: msg.errorMessage})
        })
      },
      putCartPlus (item) {
        return new Promise((resolve, reject) => {
          cartService.putCartPlus(item, item.item_props[0]).then((data) => {
            resolve(data)
          }, (msg) => {
            this.$ltsMessage.show({type: 'error', message: msg.error_message})
            reject(msg)
          })
        })
      },
      // 购物车结算
      check () {
        this.$emit('submit', 1)
        this.$router.push({
          name: 'settle',
          params: {'items': this.checkedItem, 'cartItems': this.cartItemList, 'cartTotal': this.cart}
        })
      },
      // 修改购物车数量
      inputNumeberChange (row) {
        this.$nextTick(() => {
          this.putCartPlus(row).then((data) => {
              this.calcMinus(this.checkedItem)

          }, (msg) => {
            this.$ltsMessage.show({type:'error',message:msg.error_message})
          })
        })
      },
      // 删除购物车条目
      deleteHandle (index, row) {
        row.num = 0
        this.putCartPlus(row).then((data) => {
          this.queryCartList()
        }, (msg) => {
          this.$ltsMessage.show({type: 'error', message: msg.errorMessage})
        })
      },
      // 倒计时计算
      countdown(value){
        let item  = value.rule
        let start = item.start
        let end = item.end
        let now = Date.parse(new Date())
        let date
        // 判断活动是否开始
        if (now < start) {
          // 还没开始
          item.started = false
          item.finished = false
          date = item.start
            if(this.tableDataItem.length){
                this.tableDataItem.forEach((val,index) => {
                    if(val.id === value.id){
                        this.tableDataItem.splice(index, 1)
                    }
                })
            }

        } else if (start <= now <= end) {
          // 开始了还没结束
          item.started = true
          item.finished = false
          date = item.end
        } else {
          item.started = true
          item.finished = true
          this.tableDataItem.forEach((val,index) => {
            if(val.id === value.id){
              this.tableDataItem.splice(index, 1)
            }
          })
          return false
        }
        let msec = date - now
        this.rending++

        // 计算时分秒数
        item.day = parseInt(msec / 1000 / 60 / 60 / 24)
        item.hr = parseInt(msec / 1000 / 60 / 60 % 24)
        item.min = parseInt(msec / 1000 / 60 % 60)
        item.sec = parseInt(msec / 1000 % 60)
        // 个位数前补零
        item.hr = item.hr > 9 ? item.hr : '0' + item.hr
        item.min = item.min > 9 ? item.min : '0' + item.min
        item.sec = item.sec > 9 ? item.sec : '0' + item.sec
        // 倒计时开始
        if (msec >= 0) {
          setTimeout(() => {
            this.countdown(value)
          }, 1000)
        }
      },
        // 查询是否有满减活动
        minus(){
          cartService.getFullSetting().then((data) => {
              if(data.datalist.length >0 ){
                  this.fullrule = data.datalist
              }
          }, (msg) => {
              this.$ltsMessage.show({type: 'error', message: msg.errorMessage})
          })
        },
        calcMinus(item){
            let sum = 0
            this.minusPro = 0
            if(item.length > 0){
                item.forEach((value) => {
                    if(value.discount_type === 0){
                        sum += value.price * value.num
                    }
                })
                if(this.fullrule.length > 0){
                    this.fullrule.forEach((value) => {
                        if(sum >= value.start_v){
                            this.minusPro = value.value
                        }
                    })
                }
            }
            this.calc(this.checkedItem)
        }
    },
    watch: {
      tableData: {
        deep: true,
        handler (newval, oldval) {
          this.cart.cartTotal = 0
          this.cart.cartPriceTotal = 0
          newval.forEach((value, index, array) => {
            if (value.num === 0) {
              array.splice(index, 1)
            }
            this.cart.cartTotal = parseInt(value.num) + parseInt(this.cart.cartTotal)
            this.cart.cartPriceTotal += parseInt(value.num) * parseInt(value.price)
          })
        }
      }
    }
  }
</script>

<style lang="less">
  .cartlist {

    .el-table__header-wrapper {
      height: 40px;
    }
    thead {
      tr {
        th {
          background-color: #f2f2f2;
          .el-checkbox {
            margin-left: -16px;
          }
          .cell {
            margin-top: -4px;
          }
        }
        th:nth-child(2) {
          .cell {
            text-align: left;
          }
        }
      }
    }
    .el-table {
      font-size: 14px;
      tbody tr td:nth-child(2) {
        p {
          line-height: 30px;
          text-align: left;
        }
      }
      .el-table__row.expanded {
        display: none;
      }
      .el-table__expanded-cell {
        padding: 0;
        border-bottom:none;
        .subtable {
          margin-top: 40px;
          border: 1px solid #ddd;
          position: relative;
          .popover {
            position: absolute;
            top: -40px;
            height: 40px;
            left: 20px;
            font-size: 12px;
            display: flex;
            align-items: center;
            .popTitle {
              padding: 4px;
              background: #f48719;
              color: white;
              border-radius: 4px 4px 4px 0;
            }
            .popTitle::before {
              content: '';
              position: absolute;
              top: 80%;
              left: 0;
              width: 0;
              height: 0;
              border-top: 8px solid #f48719;
              border-right: 8px solid transparent;
            }
            .popDetail {
              margin-left: 10px;
              display: flex;
              padding: 4px;
              color: white;
              border-radius: 4px 4px 4px 0;
              .timeDown{
                margin-left: 4px;
                display: flex;
                div{
                  padding: 0 2px;
                  margin:0 2px;
                  border-radius: 4px;
                }
              }
            }
            .noStart{
              background: #a7a7a7;
              .timeDown div{
                background: #6d6d6d;
              }
            }.noStart::before {
                 border-top: 8px solid #a7a7a7;
             }
            .popDetail.started{
              background: #f48719;
              .timeDown div{
                background: #E94740;
              }
            }
          }
          tbody {
            tr:last-child {
              td {
                border-bottom: none;
              }
            }
          }
        }
        .otherTable.subtable{
        }
        .dicount {
        }
        .reduce {
        }
        .others {

        }
        a {
          width: 100%;
          display: flex;
          align-items: center;
        }
        .item-img {
          width: 80px;
          height: 80px;
          border: 1px solid #ddd;
          background-position: center;
          background-size: cover;
          flex: 0 0 80px;
        }
        .content {
          width: 300px;
          margin-left: 24px;
        }
        .other {
          padding: 0 6px;
          margin-left: 24px;

        }
        p.oldPrice {
          text-decoration: line-through;
        }
      }
      .el-table__expanded-cell:hover {
        background-color: #fff !important;
      }
      .cart-delete {
        line-height: 40px;
        font-size: 22px;
        color: #cecece;
        cursor: pointer;
        i {
          font-size: 18px;
        }
      }
      .count {
        color: red;
        font-size: 16px;
      }
      .el-input-number--small {
        width: 128px;
      }
    }
    .table-footer {
      margin-top: 24px;
      display: flex;
      border-radius: 0 4px 4px 0;
      justify-content: space-between;
      line-height: 40px;
      background: #F6F6F6;
      border:solid 1px #F6F6F6;
      span {
        font-size: 14px;
        color: #999;
      }
      .choose {
        margin-left: 16px;
        .el-checkbox {
          color: #777;
          margin-right: 12px;
        }
        span.span-delete {
          margin-left: 12px;
          color: #b1b1b1;
          cursor: pointer;
        }
        span.delete-invalid {
          color: #ff3b41;
        }
      }
      .check {
        display: flex;
        .info {
          margin-right: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          div {
            line-height: 21px;
          }
          .bottomline {
            display: flex;
            justify-content: flex-end;
              div:first-child{
                  margin-right: 24px;
              }
            span.bold span {
              color: #ff3b41;
              font-weight: bold;
              font-size: 18px;
            }
          }
        }
        .el-button {
          background-color: #ff3b41;
          width: 160px;
          border-radius: 0;
          border:1px solid #ff3b41;
          span {
            color: #fff;
            font-size: 18px;
            font-weight: bold;
          }
        }

      }
    }
    .history {
      h5 {
        line-height: 49px;
        color: #777;
        margin-left: 24px;
      }
      .items {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding-left: 4px;
        li {
          width: 290px;
          background-color: #ffffff;
          border: 1px solid #eee;
          border-top: 2px solid #3d98ff;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 12px;
          margin-right: 8px;
          img {
            margin: 150px 0 96px;
          }
          p {
            line-height: 18px;
            font-weight: bold;
            font-size: 18px;
            margin-top: 12px;
            color: rgba(0, 0, 0, 0.7);
            text-align: center;
            span {
              font-size: 14px;
              color: rgba(0, 0, 0, 0.5);
              font-weight: normal;
            }
          }
          .price {
            color: #ce2127;
            font-size: 26px;
            width: 266px;
            line-height: 75px;
            height: 75px;
            border-top: 1px solid rgba(0, 0, 0, 0.05);
            text-align: center;
            margin-top: 24px;
            margin-left: 12px;
          }
        }
        li:hover {
          animation: floats 0.3s ease forwards;
        }
      }
      padding-bottom: 96px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }
      .cartNull{
          display: flex;
          padding-top:48px;
          padding-left: 20%;
        .img{
            width:268px;
            height: 224px;
            margin-right: 36px;
        }
        .text{
            padding-top: 24px;
            p{
                font-size: 18px;
                line-height: 42px;
                color:#282828;
                vertical-align: middle;
                a{
                    text-decoration: none;
                    color: #7ec1e7;
                }
            }
        }
      }
  }

  @keyframes floats {
    from {
      border: 1px solid #eee;
      border-top: 2px solid #3d98ff;
    }
    to {
      border: 1px solid #fff;
      border-top: 2px solid #3d98ff;
      box-shadow: 0px 6px 18px 6px rgba(0, 0, 0, 0.05);
    }
  }

</style>
