import BaseService from "./abstract/BaseService";
export default class AddressService extends BaseService {
    /**
     * param
     * param
     * param
     * param
     * @autor taohua
     * remark 查询地址列表
     */
    static getList(){
        let params = {

        }
        return super.getRequest('',params)
    }

    /**
     * param
     * param
     * param
     * param
     * @autor taohua
     * remark 编辑地址
     */
    static updateItem(){
        let params = {

        }
        return super.getRequest('',params)
    }
    /**
     * param
     * param
     * param
     * param
     * @autor taohua
     * remark 新增地址
     */
    static addItem(){
        let params = {

        }
        return super.getRequest('',params)
    }

}
