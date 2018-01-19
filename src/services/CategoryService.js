import BaseService from "./abstract/BaseService";
export default class CategoryService extends BaseService {
    /**
     * 获取类目列表
     *
     * return datalist
     * */
    static getList(){
        return super.getRequest('/installer/category/get_carrier_category_list')
    }

}
