import BaseService from "./abstract/BaseService";
export default class AccountService extends BaseService {
    /**
     * return
     * @autor maisi
     * remark 获取用户基本信息
     */
    static getUserMessage() {
        return super.getRequest('user', params)
    }
}
