/**
 * 表单输入验证
 * @Author Nation
 * @cdate 2018-01-17 21:26
 */
import userSerivce from '@/services/UserService'
let validateAccount = (rule, value, callback)=>{
        userSerivce.checkAccount(value).then((resp)=>{
            if (resp.success) {
                callback()
            } else {
                callback('账号已存在')
            }
        },(error)=>{
            callback('账号已存在')
        });
    },
    validatePassword = (rule, value, callback)=>{
        callback()
    },
    validateMobile = (rule, value, callback)=>{
        callback()
    },
    validatePhone = (rule, value, callback)=>{
        callback()
    },
    validateEmail = (rule, value, callback)=>{
        userSerivce.checkEmail(value).then((resp)=>{
            if (resp.success) {
                callback()
            } else {
                callback('E-mail已存在')
            }
        },(error)=>{
            callback('E-mail已存在')
        });
    },
    validateNum = (rule, value, callback)=>{
        if(value && /^\d+$/.test(value)) {
            callback(new Error('请输入数字!'))
        }
        callback()
    };
export default {
    validatePasswordRepeat(rule, password, passwordRepeat, callback) {
        if (password !== passwordRepeat) {
            callback(new Error('两次输入密码不一致!'))
        } else {
            callback()
        }
    },
    account(require, cb){
        if (!cb) {
            cb = validateAccount;
        }
        return [
            {required: require !== false, message: '请输入登录账号', trigger: 'blur'},
            //{min: 8, max: 30, message: '长度在 8 到 30 个字符', trigger: 'blur'},
            //{pattern: /^[a-zA-Z\d_]+/, message: '可使用字母、数字、下划线，需以字母开头', trigger: 'blur'},
            {validator: cb, trigger: 'blur'}
        ]
    },
    validateAccountEdit(rule, value, callback, oldVal){
        if (oldVal && value == oldVal) {
            callback();
            return;
        }
        return validateAccount(rule, value, callback)
    },
    password: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 8, max: 20, message: '密码长度在 8 到 20 个字符', trigger: 'blur'},
        {pattern: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/, message: '密码包括至少1个大写字母，1个小写字母，1个数字', trigger: 'blur'},
        {validator: validatePassword, trigger: 'blur'}
    ],
    email (require, cb){
        if (!cb) {
            cb = validateEmail;
        }
        return [
            {required: true, message: '请输入email', trigger: 'blur'},
            {type: 'email', message: '输入的email格式不正确', trigger: 'blur'},
            {validator: cb, trigger: 'blur'}
        ]
    },
    validateEmailEdit(rule, value, callback, oldVal){
        if (oldVal && value == oldVal) {
            callback();
            return;
        }
        return validateEmail(rule, value, callback)
    },
    /**
     * 密码确认验证，由于第一次输入的密码要从组件作用域获取，所以只能动态创建，通过回调函数获取第一次输入的密码
     * @param cb
     * @returns {Array & *[]}
     */
    passwordRepeat(cb){
        let rules = Object.assign([], this.password);
        rules.push({validator: (rule, value, callback)=>{
                cb.call(cb, rule, value, callback);
            }, trigger: 'blur'});
        return rules;
    },
    location: [
        {required: true, message: '请选择区域', trigger: 'change'}
    ],
    storeName: [
        {required: true, message: '请输入门店名称', trigger: 'blur'},
        {min: 4, max: 200, message: '长度在 4 到 200 个字符', trigger: 'blur'}
    ],
    address: [
        {required: true, message: 'Please Enter Detail Address', trigger: 'blur'},
        {min: 4, max: 200, message: 'Length is 4 to 200', trigger: 'blur'}
    ],
    contact: [
        {required: true, message: '请输入联系人', trigger: 'blur'},
        {min: 2, max: 800, message: '长度在 2 到 800 个字符', trigger: 'blur'}
    ],
    name: [
        {required: true, message: '请输入姓名', trigger: 'blur'},
        {min: 4, max: 200, message: '长度在 4 到 100 个字符', trigger: 'blur'}
    ],
    /**
     * 仅手机 ^[2-9][0-9]{2}[2-9][0-9]{2}[0-9]{4}$
     */
    mobile(require, cb){
        if (!cb) {
            cb = validateMobile;
        }

        return [
            {required: require !== false, message: '请输入手机号', trigger: 'blur'},
            {pattern: /^[1-9]{1,3}\-[2-9][0-9]{2}[2-9][0-9]{2}[0-9]{4}$/, message: '手机号码格式不正确', trigger: 'blur'},
            {validator: cb, trigger: 'blur'}
        ]
    },
    validateMobileEdit(rule, value, callback, oldVal){
        if (oldVal && value == oldVal) {
            callback();
            return;
        }
        return validateMobile(rule, value, callback)
    },
    /**
     * 电话或者手机
     */
    phone: [
        {required: true, message: '请输入联系号码', trigger: 'blur'},
        {pattern: /^[1-9]{1,3}\-[2-9][0-9]{2}[2-9][0-9]{2}[0-9]{4}$/, message: '联系号码格式不正确', trigger: 'blur'},
        {validator: validatePhone, trigger: 'blur'}
    ],
}
