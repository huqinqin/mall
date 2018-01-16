import BaseService from "./abstract/BaseService";
export default class CartService extends BaseService {
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
    static putCartPlus(uid,param,checkedSpu){
        let params
        params = {
            user_id: uid,
            order_type : 'self_order',
            num: param.num,
            carrier_uid: 158635,
            item_props: JSON.stringify([
                checkedSpu
            ]),
            cart_item_key: JSON.stringify(
                {
                    puserId: 158635,
                    spuId: param.spuId,
                    itemId: param.id,
                }
            ),
        };
        return super.getRequest('/wholesale/cart/putCartPlus',params);
    }

    /**
     * return
     * params {user_id: 1} user_id
     * params {shop_id: 1} shop_id
     * params {carrier_uid: 1} carrier_uid
     * @auth taohua
     * @remark 查询购物车
     */
    static queryCartList(userId){
        let params
        params = {
            user_id: userId,
            order_type : 'self_order',
            carrier_uid: 158635,
        };
        return super.getRequest('/wholesale/cart/queryCartList',params)
    }



}
