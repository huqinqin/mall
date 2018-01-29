import BaseService from "./abstract/BaseService";
export default class AddressService extends BaseService {

    /**
     * return
     * param
     * param
     * @autor taohua
     * remark 创建用户
     */
    static creatAccount() {
        let params = {

        }
        return super.getRequest('', params)
    }

    /**
     * return
     * param
     * param
     * @autor taohua
     * remark 重置密码
     */
    static resetPass() {
        let params = {

        }
        return super.getRequest('', params)
    }

    /**
     * return
     * param
     * param
     * @autor taohua
     * remark 获取验证码
     */
    static getCode() {
        let params = {

        }
        return super.getRequest('', params)
    }

    /**
     * return
     * param
     * param
     * @autor taohua
     * remark 校验验证码
     */
    static checkCode() {
        let params = {

        }
        return super.getRequest('', params)
    }
}
