import BaseService from "./abstract/BaseService";
export default class ItemService extends BaseService {
    /**
     * 登录
     *
     * @author 桃花
     * */
    static login(param){
        let params = {
            xxx: param.xxx,
            yyy: param.yyy
        }
        return super.getRequest('----', params)
    }
}
