import BaseService from "./abstract/BaseService";
export default class AccountService extends BaseService {


    /**
     * return
     * param captach 验证码
     * param account 邮箱
     * param second_password 密码
     * @autor taohua
     * remark 重置密码
     */
    static resetPass(form) {
        let params = {
            email: form.email,
            captcha: form.code,
            second_password: form.pass
        }
        return super.getRequest('/user/reset_password', params)
    }

    /**
     * return 邮箱获取验证码
     * param content 邮件模板
     * param account 邮箱
     * @autor taohua
     * remark 忘记密码获取验证码
     */

    static getResetCode(email) {
        let params = {
            account: email,
            content: "<div>尊敬的" + email + "， 您好:<\/div><div><blockquote style=\"margin: 0 0 0 40px; border: none; padding: 0px;\"><div style=\"line-height:2;\">您在LTS商城（< a href=\"http:\/\/mall.lts.com\">mall.lts.com<\/a>)点击了忘记密码。<\/div><div>您的邮箱验证码为：<font color=\"#ff0000\" size=\"6\">$(captcha).<\/font><\/div><div style=\"line-height:2;\">注：请于30分钟内输入，工作人员不会向您索取，请勿告诉他人。如果您不需要修改密码，或者您从未点击过“忘记密码”按钮，请忽略本邮件。<\/div><div style=\"line-height:2;\">欢迎回到LTS，祝您购物愉快！<\/div><\/blockquote><\/div><div><includetail><!--<![endif]--><\/includetail><\/div>)"

    }
        return super.getRequest('/user/send_email', params)
    }
    // <div style="line-height:2;">您也可以点击<a href="http://#">此链接</a>进入我的账户中心修改密码。</div>
    // 要不要???

    /**
     * return 邮箱获取验证码
     * param content 邮件模板
     * param account 邮箱
     * @autor taohua
     * remark 注册账户获取验证码
     */
    static getSignupCode(email) {
        let params = {
            account:'taohua@huntlee.cn',
            content:"<div>尊敬的" + 'taohua@huntlee.cn' + "， 您好:<\/div><div><blockquote style=\"margin: 0 0 0 40px; border: none; padding: 0px;\"><div style=\"line-height:2;\">您在LTS商城（< a href=\"http:\/\/mall.lts.com\">mall.lts.com<\/a>)点击了注册账户。<\/div><div>您的邮箱验证码为：<font color=\"#ff0000\" size=\"6\">" + "834982" + ".<\/font><\/div><div style=\"line-height:2;\">注：请于30分钟内输入，工作人员不会向您索取，请勿告诉他人。如果您不需要注册账户，请忽略本邮件。<\/div><div style=\"line-height:2;\">欢迎来到LTS，祝您购物愉快！<\/div><\/blockquote><\/div><div><includetail><!--<![endif]--><\/includetail><\/div>)"
        }
        return super.getRequest('', params)
    }
    /**
     * return
     * param
     * param
     * @autor taohua
     * remark 创建用户
     */
    static creatAccount(obj) {
        let params = {
            pre_partner:JSON.stringify(obj)
        }
        return super.getRequest('/user/register', params)
    }

    /**
     * return
     * param code 验证码
     * param account 邮箱
     * param password 新密码
     * @autor taohua
     * remark 重置密码
     */
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
