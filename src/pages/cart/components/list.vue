<template>
  <div class="cartlist">
    <el-table
      ref="multipleTable"
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
              <div class="popDetail"></div>
            </div>
            <el-table
              :data="scope.row.discount"
              :show-header="false"
              @select="selectChange"
              style="width: 100%">
              <el-table-column type="selection" align="left" width="50"></el-table-column>
              <el-table-column align="center" width="600">
                <template slot-scope="subscope">
                  <a :href="'/detail#/?id=' + subscope.row.id">
                    <div class="item-img"
                         :style="{backgroundImage : 'url(' + 'http://res.500mi.com/item/'+subscope.row.url+')'}"></div>
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
                    <lts-money :money="subscope.row.price"></lts-money>
                  </p>
                  <p>
                    <lts-money :money="subscope.row.item_props[0].price"></lts-money>
                  </p>
                </template>
              </el-table-column>
              <el-table-column prop="" width="" :label='$t("main.cart.list.mainCartliStock")' align="center">
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
              <el-table-column :label='$t("main.cart.list.mainCartliSubtotal")' width="100" align="center">
                <template slot-scope="subscope">
                  <div class="count" ref="count">
                    <lts-money :money="subscope.row.num*subscope.row.price_real"></lts-money>
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
              <div class="popDetail"></div>
            </div>
            <el-table
              :data="scope.row.reduce"
              :show-header="false"
              @select="selectChange"
              style="width: 100%">
              <el-table-column type="selection" align="left" width="50"></el-table-column>
              <el-table-column align="center" width="600">
                <template slot-scope="subscope">
                  <a :href="'/detail#/?id=' + subscope.row.id">
                    <div class="item-img"
                         :style="{backgroundImage : 'url(' + 'http://res.500mi.com/item/'+subscope.row.url+')'}"></div>
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
                    <lts-money :money="subscope.row.price"></lts-money>
                  </p>
                  <lts-money :money="subscope.row.price_real"></lts-money>
                </template>
              </el-table-column>
              <el-table-column prop="" width="" :label='$t("main.cart.list.mainCartliStock")' align="center">
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
              <el-table-column :label='$t("main.cart.list.mainCartliSubtotal")' width="100" align="center">
                <template slot-scope="subscope">
                  <div class="count" ref="count">
                    <lts-money :money="subscope.row.num*subscope.row.price_real"></lts-money>
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
            <div v-for="limitItem in scope.row.limit" :key="limitItem.id" class="reduceTable subtable">
              <div class="popover">
                <div class="popTitle">{{ $t("main.cart.list.mainCartliOnsaleLimits") }}</div>
                <div class="popDetail"></div>
              </div>
              <el-table
                :data="limitItem"
                :show-header="false"
                @select="selectChange"
                style="width: 100%">
                <el-table-column type="selection" align="left" width="50"></el-table-column>
                <el-table-column align="center" width="600">
                  <template slot-scope="subscope">
                    <a :href="'/detail#/?id=' + subscope.row.id">
                      <div class="item-img"
                           :style="{backgroundImage : 'url(' + 'http://res.500mi.com/item/'+subscope.row.url+')'}"></div>
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
                      <lts-money :money="subscope.row.price"></lts-money>
                    </p>
                    <lts-money :money="subscope.row.price_real"></lts-money>
                  </template>
                </el-table-column>
                <el-table-column prop="" width="" :label='$t("main.cart.list.mainCartliStock")' align="center">
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
                <el-table-column :label='$t("main.cart.list.mainCartliSubtotal")' width="100" align="center">
                  <template slot-scope="subscope">
                    <div class="count" ref="count">
                      <lts-money :money="subscope.row.num*subscope.row.price_real"></lts-money>
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
            <el-table
              :data="scope.row.others"
              :show-header="false"
              @select="selectChange"
              style="width: 100%">
              <el-table-column type="selection" align="left" width="50"></el-table-column>
              <el-table-column align="center" width="600">
                <template slot-scope="subscope">
                  <a :href="'/detail#/?id=' + subscope.row.id">
                    <div class="item-img"
                         :style="{backgroundImage : 'url(' + 'http://res.500mi.com/item/'+subscope.row.url+')'}"></div>
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
              <el-table-column prop="price" width="" label="单价" align="center">
                <template slot-scope="subscope">
                  <lts-money :money="subscope.row.price"></lts-money>
                </template>
              </el-table-column>
              <el-table-column prop="" width="" label="库存" align="center">
                <template slot-scope="subscope">
                  <p v-if="subscope.row.item_props[0].storage >= subscope.row.num">有货</p>
                  <p v-else>库存不足</p>
                </template>
              </el-table-column>
              <el-table-column label="数量" width="200" prop="num" align="center">
                <template slot-scope="subscope">
                  <div class="inputNumber">
                    <el-input-number :min='1' size="small" v-model="subscope.row.num"
                                     @change="inputNumeberChange(subscope.row)" label="描述文字"></el-input-number>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="小计" width="100" align="center">
                <template slot-scope="subscope">
                  <div class="count" ref="count">
                    <lts-money :money="subscope.row.num*subscope.row.price"></lts-money>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="" align="center">
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
      <el-table-column width="" :label='$t("main.cart.list.mainCartliStock")' align="center"></el-table-column>
      <el-table-column :label='$t("main.cart.list.mainCartliNum")' width="200" prop="num"
                       align="center"></el-table-column>
      <el-table-column :label='$t("main.cart.list.mainCartliSubtotal")' width="100" align="center"></el-table-column>
      <el-table-column :label='$t("main.cart.list.mainCartliOpera")' width="" align="center"></el-table-column>
    </el-table>
    <div class="table-footer">
      <div class="choose">
        <el-checkbox :label='$t("main.cart.list.mainCartliCheckedAll")' v-model="selectedAll"
                     @change="selectAll"></el-checkbox>
      </div>
      <div class="check">
        <div class="info">
          <div class="topline">
            <span>{{ $t("main.cart.list.mainCartliCheckedItem") }}{{checkedItem.length}}{{ $t("main.cart.other.mainCartUnit") }}，{{ $t("main.cart.list.mainCartliAllPrice") }}{{ $t("main.cart.other.mainCartNo") }}({{ $t("main.cart.settle.mainCartSeTax") }}、{{ $t("main.cart.settle.mainCartSeFright") }})：<lts-money
              :money="totalPrice"></lts-money></span>
          </div>
          <div class="bottomline">
            <div><span>{{ $t("main.cart.list.mainCartliBenefit") }}：-</span>
              <lts-money :money="totalPrice - realTotal"></lts-money>
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
    <!--<div class="history">-->
    <!--<h5>购买记录</h5>-->
    <!--<ul class="items">-->
    <!--<li v-for="item in historyData">-->
    <!--<img :src="item.img" :alt=item.disc>-->
    <!--<p>{{item.name}}</p>-->
    <!--<p><span>{{item.info}}</span></p>-->
    <!--<p><span>{{item.model}}</span></p>-->
    <!--<div class="price"><lts-money :money="item.price"></lts-money></div>-->
    <!--</li>-->
    <!--</ul>-->
    <!--</div>-->
  </div>
</template>

<script>
  import cartService from '@/services/CartService.js'

  export default {
    name: 'list',
    data () {
      return {
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
        checkbox: {
          discount: false,
          reduce: false,
          others: false
        }
      }
    },
    mounted () {
      setTimeout(() => {
        this.queryCartList()
        // this.putCartPlus()
      }, 20)
    },
    methods: {
      selectedChange (selection, row) {
        console.log(selection, row)
      },
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
      // 全选框
      selectAll () {
        if (this.selectedAll) {
          this.checkedItem = this.tableDataItem
          for (let key in this.checkbox) {
            this.checkbox[key] = true
          }
        } else {
          this.checkedItem = []
          for (let key in this.checkbox) {
            this.checkbox[key] = false
          }
        }
        this.calc(this.checkedItem)
      },
      // 单选框
      selectChange (selection, row) {
        if (this.checkedItem.indexOf(row) !== -1) {
          this.checkedItem.splice(this.checkedItem.indexOf(row), 1)
        } else {
          this.checkedItem.push(row)
        }
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
        this.realTotal = realTotal
      },
      queryCartList () {
        cartService.queryCartList().then((data) => {
          this.tableDataItem = data.datalist
          this.tableData = [
            {discount: []},
            {reduce: []},
            {limit: []},
            {others: []}
          ]
          data.datalist = [{"activity_id":null,"attribute":4194305,"brand":"LTS","category_id":9487633,"discount_type":4,"id":2101489,"item_name":"LTN8708T-HT","item_props":[{"attribute":1792,"cdate":null,"edate":null,"id":789,"img_url":"","item_id":null,"multi_select":false,"price":200,"price_action":1,"prop_value":"{\"IP Video Inputs\":\"8\"}","rank":null,"required":false,"search":true,"selectable":false,"show":true,"sin":"2010000438727","sku":true,"spec":false,"spu_id":180511,"status":null,"storage":100,"system":false,"value_type":0}],"maxinum":45,"mininum":12,"num":1,"price":200,"price_real":200,"proxy_distribute_num":null,"puser_id":158667,"spec_unit":"æ— æè¿°/PIECE","spu_id":180511,"status":1,"storage":0,"tag":"","url":"03e9b4c9ccb834126518e34593b85a8e.jpg"},{"activity_id":null,"attribute":4194305,"brand":"LTS","category_id":9487632,"discount_type":1,"id":2101487,"item_name":"LTN8916-P16, Platinum Enterprise Level 16 Channel 4K NVR, 1.5U, 16 Port POE , 12MP IP Recording","item_props":[{"attribute":1792,"cdate":null,"edate":null,"id":787,"img_url":"","item_id":null,"multi_select":false,"price":1,"price_action":1,"prop_value":"{\"IP Video Inputs\":\"16\"}","rank":null,"required":false,"search":true,"selectable":false,"show":true,"sin":"LTN8916-P16","sku":true,"spec":false,"spu_id":180531,"status":null,"storage":100,"system":false,"value_type":0}],"maxinum":null,"mininum":0,"num":1,"price":1,"price_real":1,"proxy_distribute_num":null,"puser_id":158667,"spec_unit":"æ— æè¿°/PIECE","spu_id":180531,"status":1,"storage":100,"tag":"æ ‡ç­¾ä¸€12,æ ‡ç­¾,æ ‡ç­¾ä¸‰asdaa,æ ‡ç­¾å››,æ ‡ç­¾äº”","url":"ef365d1574615ddb35c4f19bb3000b4b.PNG"},{"activity_id":null,"attribute":4194304,"brand":"LTS","category_id":9487695,"discount_type":2,"id":2101392,"item_name":"NA-SLECDMA-CB-TFï¼ŒStarLinkâ„¢ NAPCO Alarm Communicator for Universal Cell or IP","item_props":[{"attribute":1792,"cdate":null,"edate":null,"id":653,"img_url":"","item_id":null,"multi_select":false,"price":1,"price_action":1,"prop_value":"{\"Brand\":\"Starlink\"}","rank":null,"required":false,"search":true,"selectable":false,"show":true,"sin":"NA-SLECDMA-CB-TF","sku":true,"spec":false,"spu_id":180517,"status":null,"storage":100,"system":false,"value_type":0}],"maxinum":null,"mininum":0,"num":1,"price":1,"price_real":1,"proxy_distribute_num":null,"puser_id":158667,"spec_unit":"æ— æè¿°/Piece","spu_id":180517,"status":1,"storage":100,"tag":"çƒ­å–å•†å“","url":"49554e0023fbd95efb7956f46b127ff5.png"},{"activity_id":null,"attribute":4194305,"brand":"LTS","category_id":9487633,"discount_type":4,"id":2101489,"item_name":"LTN8708T-HT","item_props":[{"attribute":1792,"cdate":null,"edate":null,"id":789,"img_url":"","item_id":null,"multi_select":false,"price":200,"price_action":1,"prop_value":"{\"IP Video Inputs\":\"8\"}","rank":null,"required":false,"search":true,"selectable":false,"show":true,"sin":"2010000438727","sku":true,"spec":false,"spu_id":180511,"status":null,"storage":100,"system":false,"value_type":0}],"maxinum":45,"mininum":12,"num":1,"price":200,"price_real":200,"proxy_distribute_num":null,"puser_id":158667,"spec_unit":"æ— æè¿°/PIECE","spu_id":180511,"status":1,"storage":0,"tag":"","url":"03e9b4c9ccb834126518e34593b85a8e.jpg"}]
          console.log(data.datalist)
          data.datalist.forEach((value) => {
            value.item_props.forEach((item) => {
              item.prop_value = JSON.parse(item.prop_value)
            })
            if (value.discount_type === 1) {
              this.tableData[0].discount.push(value)
            } else if (value.discount_type === 2) {
              this.tableData[1].reduce.push(value)
            } else if (value.discount_type === 4) {
              this.tableData[2].limit.push([value])
            } else {
              this.tableData[3].others.push(value)
            }
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
            this.$ltsMessage.show({type: 'error', message: msg.errorMessage})
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
            this.calc(this.checkedItem)
          }, (msg) => {
            console.log('fail')
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
    .has-gutter {
      tr {
        th {
          background-color: rgba(0, 0, 0, 0.05);
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
        .subtable {
          margin-top: 40px;
          border: 1px solid #a3a3a3;
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
          margin-top: 20px;
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
          width: 250px;
          padding: 0 6px;
          margin-left: 24px;

        }
        p.oldPrice {
          text-decoration: line-through;
        }
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
            justify-content: space-between;
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
