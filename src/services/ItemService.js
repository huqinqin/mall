import BaseService from "./abstract/BaseService";

export default class ItemService extends BaseService {
    /**
     * 获取商城首页商品列表
     * @author 小猪
     */
    getList() {
        let params = {
            user_id: userId
        };
        return super.getRequest('/wholesale/item/getList', params);
    }

    /**
     * 获取商品详情
     * @author 小猪
     */
    static getItemDetail(id) {
        let params = {
            item_id: id
        };
        return super.getRequest('/installer/item/get_item_detail_full', params);
    }

    /**
     * 搜索商品列表
     * @param text
     * @param condition
     * @returns {*}
     */
    static searchItemList(text, condition) {
        let params = {
            text,
            condition
        };
        return super.getRequest('/static/test/json/search.item.json', params);
    }

    /**
     * 搜索详细的商品
     * @param item_search
     * @param page
     * @param page_size
     * @param order_by
     * @returns {*}
     */
    static searchItem(search,tags) {
        let params = {
            item_search: JSON.stringify({
                puserIds: search.puserIds,
                itemName: search.itemName ? search.itemName.trim() : '',
                brand: search.brand,
                cateId: search.cateId && search.cateId.length ? search.cateId[search.cateId.length - 1] : '',
                attribute_1: search.attribute_1,
                discountType: search.discountType,
                allStatus: search.allStatus,
                sin: search.sin,
                propValues: search.condition,
                tags: tags ? tags : [],
                type: 0,
            }),
            page: search.page,
            page_size: search.pageSize,
            order_by: search.orderBy
        };
        return super.getRequest('/installer/item/get_item_with_aggregate', params)
    }

    /**
     * return
     * @param item_id 商品id
     * @author taohua
     * @remark 搜索搭配商品的属性及价格
     */
    static getItemProps(id) {
        let params = {
            item_id: id
        };
        return super.getRequest('/installer/item/get_item_with_props', params)
    }
    static searchList(search,tags) {
        let params = {
            item_search: JSON.stringify({
                tags: tags ? tags : [],
                type: 0,
            }),
            page: search.page,
            page_size: search.pageSize,
            order_by: search.orderBy
        };
        return super.getRequest('/installer/item/get_item_with_aggregate', params)
    }
    /**
     * return datalist 商品列表
     * param order_by 排序
     * page: 当前页
     * page_size: 每页数量
     * wholesale_item_query: JSON
     * remark store_item_query 查询商品列表
     */
    static getNoList(params) {
        // return super.getRequest('/store/item/get_manage_list', params)
        return super.getRequest('/installer/item/get_item_with_aggregate', params)
    }
    /**
     * 查询活动楼层页面的商品
     **/
    static getActivityItemList(params) {
        // return super.getRequest('/store/item/get_manage_list', params)
        return super.getRequest('/installer/item/get_activity_item_list', params)
    }
}
