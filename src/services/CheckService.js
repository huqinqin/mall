import BaseService from "./abstract/BaseService";
export default class CheckService extends BaseService {
    /**
     * 获取用户详情
     *
     * return datalist
     * */
    static checkInfo(){
        return super.getRequest('/installer/installer_acct/query_shop_acct')
    }
    static history(params){
        return super.getRequest('/installer/item/user_order_history',params)
    }
    static getInfo(){
        return super.getRequest('/installer/installer_acct/query_by_uid')
    }
}
