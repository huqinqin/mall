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

}
