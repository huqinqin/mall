import BaseService from "./abstract/BaseService";
export default class HomeService extends BaseService {
    /**
     * 获取首页楼层数据以及热卖单品
     *
     * return datalist
     * */
    static getList(){
        return super.getRequest('/indexarea/get_index')
    }

}
