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
            company_phone: params.companyPhone,
            mobile: params.mobile,
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
            account: params.account,
            // account: 'maisi@huntlee.cn',
            content: '<div  style=\"line-height:3;\">尊敬的' + params.account + '， 您好:<\/div><div><blockquote style=\"margin: 0 0 0 40px; border: none; padding: 0px;\"><div style=\"line-height:3;\">您在LTS商城' + '<a href="http://mall.lts.com">mall.lts.com</a>' + '点击了验证邮箱。<\/div><div>您的邮箱验证码为：<font color=\"#ff0000\" size=\"6\">$(captcha)<\/font><\/div><div style=\"line-height:3;\">注：请于30分钟内输入，工作人员不会向您索取，请勿告诉他人。如果您不需要注册账户，请忽略本邮件。<\/div><div style=\"line-height:3;\">欢迎来到LTS，祝您购物愉快！<\/div><\/blockquote><\/div><div><includetail><!--<![endif]--><\/includetail><\/div>'
        };
        return super.getRequest('/user/send_email', newparams)
    }

    /**
     * return
     * @autor maisi
     * remark 当前邮箱验证码验证
     */
    static changeEmail(params) {
        let newparams = {
            captcha: params.captcha,
            email: params.email
        };
        return super.getRequest('/user/to_change_email', newparams)
    }

    /**
     * return
     * @autor maisi
     * remark 新邮箱验证码验证
     */
    static checkNewEmail(params) {
        let newparams = {
            captcha: params.captcha,
            email: params.email
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
}
