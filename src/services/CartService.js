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
    static queryCartList(userId) {
        let params
        params = {
            user_id: userId,
            order_type: 'self_order',
            carrier_uid: 158635,
        };
        return {"current_page_no":1,"data":null,"datalist":[{"activity_id":null,"attribute":0,"brand":"","category_id":0,"discount_type":0,"id":2101187,"item_name":"球形2MM","item_props":[{"attribute":1792,"cdate":null,"edate":null,"id":282,"img_url":"","item_id":null,"multi_select":false,"price":100,"price_action":0,"prop_value":"{\"颜色\":\"黑\",\"内存\":\"16G\"}","rank":null,"required":false,"search":true,"selectable":false,"show":true,"sin":"GWK002-207","sku":true,"spec":false,"spu_id":180092,"status":null,"storage":100,"system":false,"value_type":0}],"maxinum":null,"mininum":0,"num":4,"price":100,"price_real":100,"proxy_distribute_num":null,"puser_id":158667,"spec_unit":"无描述/台","spu_id":158635,"status":1,"storage":0,"tag":"","url":"03e9b4c9ccb834126518e34593b85a8e.jpg"},{"activity_id":null,"attribute":0,"brand":"","category_id":9487564,"discount_type":0,"id":2101157,"item_name":"专业偷摄像头","item_props":[{"attribute":0,"cdate":null,"edate":null,"id":26,"img_url":"","item_id":null,"multi_select":false,"price":1500,"price_action":null,"prop_value":"","rank":null,"required":false,"search":false,"selectable":false,"show":false,"sin":"","sku":false,"spec":false,"spu_id":0,"status":null,"storage":0,"system":false,"value_type":null},{"attribute":0,"cdate":null,"edate":null,"id":29,"img_url":"","item_id":null,"multi_select":false,"price":35000,"price_action":null,"prop_value":"","rank":null,"required":false,"search":false,"selectable":false,"show":false,"sin":"CMIP2832DW-S","sku":false,"spec":false,"spu_id":179886,"status":null,"storage":0,"system":false,"value_type":null}],"maxinum":null,"mininum":0,"num":5,"price":30000,"price_real":30000,"proxy_distribute_num":null,"puser_id":158715,"spec_unit":"无描述/台","spu_id":158635,"status":1,"storage":0,"tag":"","url":"03e9b4c9ccb834126518e34593b85a8e.jpg"},{"activity_id":null,"attribute":0,"brand":"","category_id":0,"discount_type":0,"id":2101188,"item_name":"球形2MM","item_props":[{"attribute":1792,"cdate":null,"edate":null,"id":300,"img_url":"","item_id":null,"multi_select":false,"price":100,"price_action":null,"prop_value":"","rank":null,"required":false,"search":true,"selectable":false,"show":true,"sin":"GWK002-207","sku":true,"spec":false,"spu_id":180092,"status":null,"storage":100,"system":false,"value_type":null}],"maxinum":null,"mininum":0,"num":6,"price":100,"price_real":100,"proxy_distribute_num":null,"puser_id":158667,"spec_unit":"无描述/台","spu_id":158635,"status":1,"storage":0,"tag":"","url":"03e9b4c9ccb834126518e34593b85a8e.jpg"},{"activity_id":null,"attribute":0,"brand":"","category_id":9487566,"discount_type":0,"id":2101176,"item_name":"球形闪电","item_props":[{"attribute":1792,"cdate":null,"edate":null,"id":197,"img_url":"","item_id":null,"multi_select":false,"price":23400,"price_action":null,"prop_value":"","rank":null,"required":false,"search":true,"selectable":false,"show":true,"sin":"432","sku":true,"spec":false,"spu_id":null,"status":null,"storage":22,"system":false,"value_type":null}],"maxinum":null,"mininum":0,"num":5,"price":100,"price_real":100,"proxy_distribute_num":null,"puser_id":158667,"spec_unit":"无描述/球形","spu_id":158635,"status":1,"storage":0,"tag":"","url":"03e9b4c9ccb834126518e34593b85a8e.jpg"}],"error_code":999,"error_message":"","error_name":"SERVICE_ERROR","fail":false,"page_size":20,"success":true,"success_message":"","total":0,"total_page_count":0}

        // return super.getRequest('/wholesale/cart/queryCartList', params)
    }
}
