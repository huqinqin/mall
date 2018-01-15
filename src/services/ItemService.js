import BaseService from "./abstract/BaseService";
export default class ItemService extends BaseService {
    /**
     * 获取商城首页商品列表
     * @author 小猪
     */
    getList(){
        let params = {
            user_id : userId
        };
        return super.getRequest('/wholesale/item/getList',params);
    }

    /**
     * 获取商品详情
     * @author 小猪
     */
    static getItemDetail(id){
        let params = {
            item_id : id
        };
        return super.getRequest('/wholesale/item/get_item_with_props',params)
    }
}
