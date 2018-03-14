import BaseService from "./abstract/BaseService";
import md5 from 'md5';
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
            second_password: md5(form.pass)
        }
        return super.getRequest('/user/reset_password', params)
    }

    // /**
    //  * return 邮箱获取验证码
    //  * param content 邮件模板
    //  * param account 邮箱
    //  * @autor taohua
    //  * remark 忘记密码获取验证码
    //  */
    //
    // static getResetCode(email) {
    //     let params = {
    //         account: email,
    //         content: '<div  style=\"line-height:3;\">尊敬的' + email + '， 您好:<\/div><div><blockquote style=\"margin: 0 0 0 40px; border: none; padding: 0px;\"><div style=\"line-height:3;\">您在LTS商城' + '<a href="http://mall.lts.com">mall.lts.com</a>' + '点击了忘记密码。<\/div><div>您的邮箱验证码为：<font color=\"#ff0000\" size=\"6\">$(captcha)<\/font><\/div><div style=\"line-height:3;\">注：请于30分钟内输入，工作人员不会向您索取，请勿告诉他人。如果您不需要修改密码，或者您从未点击过“忘记密码”按钮，请忽略本邮件。<\/div><div style=\"line-height:3;\">欢迎回到LTS，祝您购物愉快！<\/div><\/blockquote><\/div><div><includetail><!--<![endif]--><\/includetail><\/div>'
    //
    //     };
    //     return super.getRequest('/user/send_email', params)
    // }
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
            title:'LTS Forgot Password Verification Code',
            // content: '<div  style=\"line-height:3;\">Dear LTS customer:<\/div><div><blockquote style=\"margin: 0 0 0 40px; border: none; padding: 0px;\"><div style=\"line-height:3;\">We received a request to recover your LTS account through your email address.Your verification code is:<\/div><div><font color=\"#ff0000\" size=\"6\">$(captcha)<\/font><\/div><div style=\"line-height:3;\">This verification code will be valid for 30 minutes.<\/div><div style="line-height:3;">LTS employee will not ask for this code. Please do not forward or give this code to anyone.</div><div style="line-height:3;">If you no longer need to change your password, or you didn\'t request to reset your password, please ignore this email.</div><div style=\"line-height:3;\">Welcome back to<a href="http://mall.lts.com"> LTS</a>. Enjoy your shopping!<\/div><\/blockquote><\/div><div><includetail><!--<![endif]--><\/includetail><\/div>'

        };
        return super.getRequest('/user/send_email', params)
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
            pre_partner: JSON.stringify(obj)
        }
        return super.getRequest('/user/register', params)
    }
}
