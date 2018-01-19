import BaseService from "./abstract/BaseService";
export default class CategoryService extends BaseService {
    /**
     * 获取类目列表
     *
     * return datalist
     * */
    static getList(){
        return super.getRequest('/category/getCarrierCategoryList')
    }

}
