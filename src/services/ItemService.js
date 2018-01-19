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

    /**
     * 搜索商品列表
     * @param text
     * @param condition
     * @returns {*}
     */
    static searchItemList(text,condition){
        let params = {
            text ,
            condition
        };
        return super.getRequest('/static/test/json/search.item.json',params)
    }

    /**
     * 搜索详细的商品
     * @param item_search
     * @param page
     * @param page_size
     * @param order_by
     * @returns {*}
     */
    static searchItem(search){
        console.log(search)
        let params = {
            item_search : JSON.stringify({
                puserIds:search.puserIds,
                itemName:search.itemName,
                brand:search.brand,
                cateId:search.cateId,
                attribute_1:search.attribute_1,
                discountType:search.discountType,
                allStatus:search.allStatus,
                sin:search.sin,
                propValues:search.condition
            }),
            page:search.page,
            page_size:search.page_size,
            order_by: ''
        };
        return super.getRequest('/installer/item/get_item_with_aggregate',params)
    }




}
