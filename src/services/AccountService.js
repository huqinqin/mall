import BaseService from "./abstract/BaseService";
export default class AddressService extends BaseService {

    /**
     * return
     * param
     * param
     * @autor taohua
     * remark 创建用户
     */
    static creatAccount(form) {
        let params = {
            account: form.email,
            firstNam: form.fisrtName,
            lastName: form.lastName,
            companyName: form.companyName,
            code: form.code,
            phone: form.phone,
            pass: form.pass,
        }
        return super.getRequest('', params)
    }

    /**
     * return
     * param code 验证码
     * param account 邮箱
     * param password 新密码
     * @autor taohua
     * remark 重置密码
     */
    static resetPass(form) {
        let params = {
            account:form.email,
            code: form.code,
            password:form.pass
        }
        return super.getRequest('', params)
    }

    /**
     * return data 验证码
     * param content 邮件模板
     * param account 邮箱
     * @autor taohua
     * remark 忘记密码获取验证码
     */
    static getResetCode(email) {
        let params = {
            account:email,
            content:"<div>尊敬的" + email + "， 您好:<\/div><div><blockquote style=\"margin: 0 0 0 40px; border: none; padding: 0px;\"><div style=\"line-height:2;\">您在LTS商城（< a href=\"http:\/\/mall.lts.com\">mall.lts.com<\/a>)点击了忘记密码。<\/div><div>您的邮箱验证码为：<font color=\"#ff0000\" size=\"6\">" + "834982" + ".<\/font><\/div><div style=\"line-height:2;\">注：请于30分钟内输入，工作人员不会向您索取，请勿告诉他人。如果您不需要修改密码，或者您从未点击过“忘记密码”按钮，请忽略本邮件。<\/div><div style=\"line-height:2;\">欢迎回到LTS，祝您购物愉快！<\/div><\/blockquote><\/div><div><includetail><!--<![endif]--><\/includetail><\/div>)"
        }
        return super.getRequest('', params)
    }
    // <div style="line-height:2;">您也可以点击<a href="http://#">此链接</a>进入我的账户中心修改密码。</div>
    // 要不要???

    /**
     * return data 验证码
     * param content 邮件模板
     * param account 邮箱
     * @autor taohua
     * remark 注册账户获取验证码
     */
    static getSignupCode(email) {
        let params = {
            account:email,
            content:"<div>尊敬的" + email + "， 您好:<\/div><div><blockquote style=\"margin: 0 0 0 40px; border: none; padding: 0px;\"><div style=\"line-height:2;\">您在LTS商城（< a href=\"http:\/\/mall.lts.com\">mall.lts.com<\/a>)点击了注册账户。<\/div><div>您的邮箱验证码为：<font color=\"#ff0000\" size=\"6\">" + "834982" + ".<\/font><\/div><div style=\"line-height:2;\">注：请于30分钟内输入，工作人员不会向您索取，请勿告诉他人。如果您不需要注册账户，请忽略本邮件。<\/div><div style=\"line-height:2;\">欢迎来到LTS，祝您购物愉快！<\/div><\/blockquote><\/div><div><includetail><!--<![endif]--><\/includetail><\/div>)"
        }
        return super.getRequest('', params)
    }

    /**
     * return
     * param xxx 验证码
     * @autor taohua
     * remark 校验验证码
     */
    // static checkCode(code) {
    //     let params = {
    //
    //     }
    //     return super.getRequest('', params)
    // }
}
