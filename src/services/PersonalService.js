import BaseService from "./abstract/BaseService";
import md5 from 'md5'

export default class PersonalService extends BaseService {
    /**
     * return
     * @autor maisi
     * remark 获取用户信息
     */
    static getUserMessage() {
        return super.getRequest('/user/get_user_by_id',)
    }

    /**
     * return
     * @autor maisi
     * remark 更新用户信息
     */
    static updateUserMessage(params) {
        let newparams = {
            avatar: params.imageUrl,
            name: params.name,
            company_name: params.companyName,
            company_phone: params.companyPhone ? params.companyPhone : '',
            mobile: params.mobile ? params.mobile : '',
            email: params.email
        };
        return super.getRequest('/user/update_user_info', newparams)
    }

    /**
     * return
     * @autor maisi
     * remark 邮箱发送验证码
     */
    static sendEmailCode(params) {
        let newparams = {
            old_email: params.oldEmail,
            new_email: params.newEmail
        };
        return super.getRequest('/user/send_email_plus', newparams)
    }

    /**
     * return
     * @autor maisi
     * remark 当前邮箱密码验证
     */
    static changeEmail(params) {
        let newparams = {
            password: md5(params.password),
            email: params.email
        };
        return super.getRequest('/user/to_check_old_email', newparams)
    }

    /**
     * return
     * @autor maisi
     * remark 新邮箱验证码验证
     */
    static checkNewEmail(params) {
        let newparams = {
            new_email: params.newEmail,
            captcha: params.code
        };
        return super.getRequest('/user/change_email', newparams)
    }

    /**
     * return
     * @autor maisi
     * remark 修改密码
     */
    static changePassword(params) {
        let newparams = {
            old_pwd: md5(params.oldPassword),
            new_pwd: md5(params.newPassword)
        };
        return super.postRequest('/user/modify_password', newparams)
    }

    /**
     * 通过工程商uid查询工程商下的所有分销证
     * @param uid
     * @auth maisi
     * @returns {*}
     */
    static getSaleCard(uid) {
        return super.getRequest('/installer/distribute/get_distribute_cerificate_by_shop_uid', {shop_uid: uid})
    }

    /**
     * 增加工程商的分销证
     * @param json
     * @auth maisi
     * @returns {*}
     */
    static addSaleCard(params) {
        let newparams = {
            distribute_certificate: JSON.stringify(params)
        };
        return super.getRequest('/installer/distribute/add', newparams);
    }

    /**
     * 编辑工程商的分销证
     * @param json
     * @auth maisi
     * @returns {*}
     */
    static updateSaleCard(params) {
        let newparams = {
            distribute_certificate: JSON.stringify(params)
        };
        return super.getRequest('/installer/distribute/update', newparams);
    }

    /**
     * 删除工程商的分销证
     * @param id
     * @auth maisi
     * @returns {*}
     */
    static deleteSaleCard(params) {
        let newparams = {
            id: params.id
        };
        return super.getRequest('/store/distribute/delete', newparams);
    }
}
