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
                callback('Existing account')
            }
        },(error)=>{
            callback('Existing account')
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
                callback('Existing E-mail')
            }
        },(error)=>{
            callback('Existing E-mail')
        });
    },
    validateNum = (rule, value, callback)=>{
        if(value && /^\d+$/.test(value)) {
            callback(new Error('Please enter number!'))
        }
        callback()
    };
export default {
    validatePasswordRepeat(rule, password, passwordRepeat, callback) {
        if (password !== passwordRepeat) {
            callback(new Error('Two passwords do not match!'))
        } else {
            callback()
        }
    },
    account(require, cb){
        if (!cb) {
            cb = validateAccount;
        }
        return [
            {required: require !== false, message: 'Please enter account number', trigger: 'blur'},
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
        {required: true, message: 'Please enter password', trigger: 'blur'},
        {min: 8, max: 20, message: 'Password must contain 8-20 charaters at least 1 upper case, 1 lower case, 1 number', trigger: 'blur'},
        {pattern: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/, message: 'Password must contain 8-20 charaters at least 1 upper case, 1 lower case, 1 number', trigger: 'blur'},
        {validator: validatePassword, trigger: 'blur'}
    ],
    email (require, cb){
        if (!cb) {
            cb = validateEmail;
        }
        return [
            {required: true, message: 'Please input email', trigger: 'blur'},
            {type: 'email', message: 'Email has a wrong format', trigger: 'blur'},
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
        {required: true, message: 'Please select region', trigger: 'change'}
    ],
    storeName: [
        {required: true, message: 'Please enter the name of the branch', trigger: 'blur'},
        {min: 4, max: 200, message: 'Length must be between 4-200 charaters', trigger: 'blur'}
    ],
    address: [
        {required: true, message: 'Please Enter Detail Address', trigger: 'blur'},
        {min: 4, max: 200, message: 'Length is 4 to 200', trigger: 'blur'}
    ],
    contact: [
        {required: true, message: 'Please enter contact person', trigger: 'blur'},
        {min: 2, max: 800, message: 'Length must be between 2-200 charaters', trigger: 'blur'}
    ],
    name: [
        {required: true, message: 'Please enter name', trigger: 'blur'},
        {min: 4, max: 200, message: 'Length must be between 4-100 charaters', trigger: 'blur'}
    ],
    /**
     * 仅手机 ^[2-9][0-9]{2}[2-9][0-9]{2}[0-9]{4}$
     */
    mobile(require, cb){
        if (!cb) {
            cb = validateMobile;
        }

        return [
            {required: require !== false, message: 'Please input phone', trigger: 'blur'},
            {pattern: /^[1-9]{1,3}\-[2-9][0-9]{2}[2-9][0-9]{2}[0-9]{4}$/, message: 'Phone numer has a wrong format', trigger: 'blur'},
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
        {required: true, message: 'Please enter contact number', trigger: 'blur'},
        {pattern: /^[1-9]{1,3}\-[2-9][0-9]{2}[2-9][0-9]{2}[0-9]{4}$/, message: 'Contact number has a wrong format', trigger: 'blur'},
        {validator: validatePhone, trigger: 'blur'}
    ],
}
