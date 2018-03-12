import BaseService from "./abstract/BaseService";
export default class CartService extends BaseService {

    /**
     * return datalist 配置列表
     * param 无
     * @remark 获取满减配置
     * @auth taohua
     */
    static getFullSetting(form) {
        let params = {

        }
        return super.getRequest('/installer/hq/get_paras_promotion', params)
    }

    /**
     * return ture
     * param  userId 工程商ID
     * param  num 数量
     * param  carrierUid 市场Uid
     * param  cartItemKey 商品信息
     * param  itemPropDOS 商品属性信息
     * @autor 小猪
     * remark 添加购物车
     */
    static putCartPlus(param,checkedSpu){
        let params;
        checkedSpu.spuId = checkedSpu.spu_id;
        params = {
            item_id : param.id,
            num: param.num,
            item_props: JSON.stringify([
                checkedSpu
            ]),
        };
        return super.getRequest('/installer/cart/put_cart_plus',params);
    }


    /**
     * return
     * params {user_id: 1} user_id
     * params {shop_id: 1} shop_id
     * params {carrier_uid: 1} carrier_uid
     * @auth taohua
     * @remark 查询购物车
     */
    static queryCartList() {
        let params
        params = {
            order_type: 'self_order',
        };

        return super.getRequest('/installer/cart/query_cart_list',params);
    }

    /**
     * return Number
     * @auth taohua
     * @remark 查询购物车数量
     */
    static queryCartCount() {
        return super.getRequest('/installer/cart/query_item_in_cart_count');
    }
}
