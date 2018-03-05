export default {
    name : '123',
    title: '工作台',
    menu: {
      product : '商品管理',
      goods: '商品管理',
      order: '订单管理'
    },
    comHeader: {
        headerImmediatelyLog: '立即登录',
        headerWelcom: '欢迎',
        headerNews: '快报',
        headerIndex: '商城首页',
        headerMyOrder: '我的订单',
        headerFavorite: '收藏夹',
        headerMyExpert: '我的专家',
        headerPhoneOrder: '手机下单更便捷',
        headerLogin: '退出',
        headerSearchGoods: '搜索商品',
        headerAllclassify: '全部分类',
        headerInputUserOrEmail: '请输入用户名或邮箱',
        headerInputPwd: '请输入密码',
        headerAll: '全部',
    },
    comFooter: {
        footerAboutLts: '关于LTS',
        footerContactUs: '联系我们',
        footerHelpUs: '帮助我们',
        footerInvitePerson: '诚聘英才',
        footerEvevtNews: '事件新闻',
        footerCompanyAddress: '公司地址',
        footerUseItem: '使用条款',
        footerSecretItem: '隐私条款',
        footerItemCondition: '条款条件',
        footerFollowUs: '关注我们'
    },
    main: {
        accountNew: {
            register: {
                mainAcReSelect: '请选择',
                mainAcReFileDragHere: '将文件拖到此处，或',
                mainAcReClickUpload: '点击上传',
                mainAcReValidateSuccess: '验证成功',
                mainAcReContentNotNull: '内容不能为空',
                mainAcReCreateSuccess: '创建成功',
            },
            reset: {
                mainAcResetSyncDigit: '密码必须同时包括大小写字母和数字!'
            }
        },
        address: {
            mainAddContent: '内容',
            mainAddPersonData: '个人资料',
            mainAddDistributionAuth: '分销资格认证',
            mainAddBindCard: '信用卡绑定',
            mainAddBillAddress: '账单地址',
            mainAddPwdInstall: '密码设置',
            mainAddReceivingAddress: '收货地址',
            mainAddShareFriends: '分享好友'
        },
        cart: {
            beforePay: {
                mainCartBefPay: '支付',
                mainCartBefOrderNum: '订单编号',
                mainCartBefWaitPay: '待支付',
                mainCartBefEngineerAccount:'工程商账户余额',
                mainCartBefBalance:'余额',
                mainCartBefBalancePay:'本次余额支付',
                mainCartBefDpllar:'美元',
                mainCartBefExceedBanalace:'不可超过余额',
                mainCartBefNoExcWaitPay:'不可超过待支付金额',
                mainCartBefShouldPay:'应付余额',
                mainCartBefUseAccount:'使用账期',
                mainCartBefcartPay:'信用卡支付',
                mainCartBefgoPay:'去支付',
                mainCartBefExpress:'快递',
                mainCartBefSelfFetch:'自提',
            },
            fail: {
                mainCartFaProblem: '您在支付的时候好像出现了一些问题',
                mainCartFaPayFail: '支付失败',
                mainCartFaOrderNum: '订单编号',
                mainCartFaConsignee: '收货人',
                mainCartFaReceivingAddress: '收货地址',
                mainCartFaLogisticsMode: '物流方式',
                mainCartFaMyOrder: '我的订单',
                mainCartFaFirstPage: '回到首页',
                mainCartFaSince: '送货上门'
            },
            finish: {
                mainCartFiSuccess: '恭喜您，订单已经支付完成！',
                mainCartFiPaySuccess: '支付成功',
            },
            list: {
                mainCartliDisGoods: '折扣商品',
                mainCartliUnitPrice: '单价',
                mainCartliStock: '库存',
                mainCartliAvailable: '有货',
                mainCartliStockInsuff: '库存不足',
                mainCartliNum: '数量',
                mainCartliDescWord: '描述文字',
                mainCartliSubtotal: '小计',
                mainCartliOpera: '操作',
                mainCartliOnsaleGoods: '减价商品',
                mainCartliOnsaleLimits: '限时限量',
                mainCartliShouldPay: '应付金额',
                mainCartliImmeSettle: '立即结算',
                mainCartliGoodsInfo: '商品信息',
                mainCartliPrice: '价格',
                mainCartliAllPrice: '总价',
                mainCartliCheckedItem: '已选商品',
                mainCartliBenefit: '活动优惠',
                mainCartliCheckedAll: '全选',
                mainCartliDeleteChecked: '删除选中商品',
                mainCartliDeleteInvalid: '清除失效商品',
            },
            settle: {
                mainCartSePhone: '电话',
                mainCartSeFitDefault: '设为默认',
                mainCartSeDefaultAdress: '默认地址',
                mainCartSeDel: '删除',
                mainCartSeAlert: '修改',
                mainCartSeAddAdress: '添加地址',
                mainCartSeRegion: '地区',
                mainCartSeEnterRegion: '请输入地区',
                mainCartSeStreet: '街道',
                mainCartSeEnterStreet: '请输入街道',
                mainCartSeZip: '邮编',
                mainCartSeEnterZip: '请输入邮编',
                mainCartSeContact: '联系人',
                mainCartSeEnterContact: '请输入联系人',
                mainCartSeContactPhone: '联系电话',
                mainCartSeEnterConPhone: '请输入联系电话',
                mainCartSeFitDefaultAddr: '设为默认地址',
                mainCartSeSure: '确定',
                mainCartSeIsContainPrice: '送货单是否包含价格',
                mainCartSeYes: '是',
                mainCartSeNo: '否',
                mainCartSeDistraType: '配送方式',
                mainCartSeSelfSign: '本人签收',
                mainCartSeOrderInfo: '订单信息',
                mainCartSeBuyersTalk: '买家留言',
                mainCartSeShouldPay: '商品应付金额',
                mainCartSeFright: '运费',
                mainCartSeTax: '税费',
                mainCartSeRedBag: '红包',
                mainCartSeMustPay: '应付金额',
                mainCartSeAccountAddr: '账单地址',
                mainCartSeQuaAddr: '资格证地址',
                mainCartSeSubOrder: '提交订单',
                mainCartSeSetDefaultSuc: '设置默认地址成功',
                mainCartSeHandleSucc: '操作成功',
                mainCartSeHandleErr: '删除失败',
            },
            other: {
                mainCartOtCart: '购物车',
                mainCartOtConfimOrderInfo: '确认订单信息',
                mainCartOtOrderSub: '订单提交',
                mainCartOtPay: '支付',
                mainCartOtWait: '等待收货',
                mainCartNo:'不含',
                mainCartUnit:'件',
            }
        },
        detail: {
            info: {
                mainDetInfoDisGoods: '折扣商品',
                mainDetInfoDepriceGoods: '降价商品',
                mainDetInfoLimit: '限时限量',
                mainDetInfoDown: '开始倒计时',
                mainDetInfoEnd: '距离结束',
                mainDetInfoDay: '天',
                mainDetInfoPrice: '价格',
                mainDetInfoComp: '完成登录注册，享受惊爆价',
                mainDetInfoContactSale: '请选择商品属性。若商品属性不可选。请联系销售',
                mainDetInfoAmount: '采购量',
                mainDetInfoStock: '有货',
                mainDetInfoNoStock: '缺货',
                mainDetInfoExceed: '您所填写的数量超过库存',
                mainDetInfoCozyTip: '温馨提示',
                mainDetInfoNoReason: '支持30天无理由退换(如果商品参加活动，退换货以活动规则为准)',
                mainDetInfoImme: '立即购买',
                mainDetInfoJoinCart: '加入购物车',
                mainDetInfoBuy: '购买记录',
                mainDetInfoHot: '热卖推荐',
                mainDetInfoLoginPrice: '登录之后查看价格',
                mainDetInfoGoodsInfo: '商品详情',
                mainDetInfoDetail: '详细',
                mainInMore: '更多',
                mainDetConfigure:'推荐套餐',
                mainDetPiece:'件',
                mainDetCheckedPackage:'已选择配件',
                mainDetSure:'确定',
                mainDetSelectModel:'选择型号',
                mainDetCkeckedProp:'已选属性',
                mainDetNum:'数量',
                mainDetSinglePrice:'单价',
                mainDetNoAnyPackage:'您没有选择任何配件',
                mainDetPackagePrice:'组合价',

           }
        },
        finance: {
            mainfiAccountBal: '账户余额',
            mainficreditBal: '信用余额',
            mainfiNo: '无',
            mainfiUsedCredit: '已用信用',
            mainfiOneWord: '张',
            mainfiAccountType: '账户类型',
            mainfiPleaseSel: '请选择',
            mainfiAccBalance: '账期余额',
            mainfiCoupon: '购物券',
            mainfiBussiHandle: '业务操作',
            mainfiTime: '时间',
            mainfiYear: 'MM 月 dd 日 yyyy 年',
            mainfiStartTime: '开始日期',
            mainfiEndTime: '结束日期',
            mainfiSelect: '查询',
            mainfiNum: '序号',
            mainfiHandleTime: '操作时间',
            mainfiBalance: '收支',
            mainfiOut: '支出',
            mainfiIn: '收入',
            mainfiFrozen: '冻结',
            mainfiThaw: '解冻',
            mainfiChangeMoney: '变动金额',
            mainfiCurrent: '当前余额',
            mainfiMark: '备注',
            mainfiLastWeek: '最近一周',
            mainfiLastMouth: '最近一个月',
            mainfiLastThhreeM: '最近三个月',
            mainfiBalances: '余额',
            mainfiAcc: '账期',
            mainfiAvail: '暂无'
        },
        index: {
            mainInImmeLogin: '立即登录',
            mainInFreeRegis: '免费注册',
            mainInHotSingle: '热卖单品',
            mainInMore: '更多',
        },
        order: {
            detail: {
                mainOrDeOrderStatus: '订单状态',
                mainOrDeAuto: '10天后自动确认收货',
                mainOrDeBuyerInfo: '买家信息',
                mainOrDeMyAddr: '收货地址',
                mainOrDeCreateTime: '创建时间',
                mainOrDePayTime: '付款时间',
                mainOrDePayInfo: '支付信息',
                mainOrDeCard: '信用卡支付',
                mainOrDeAccount: '账期支付',
                mainOrDePayStatus: '支付状态',
                mainOrDeBag: '包裹',
                mainOrDeLogiInfo: '物流信息',
                mainOrDeSendTime: '发货时间',
                mainOrDeNo: '无',
                mainOrDeFetchTime: '收货时间',
                mainOrDePayReal: '小计',
                mainOrDeStatus: '状态',
                mainOrDeActivity: '活动优惠',
                mainOrDePayTotal: '应付总额',
            },
            list: {
                mainOrLiWaitPay: '待付款',
                mainOrLiWaitDeli: '待发货',
                mainOrLiAlreadyDeli: '已发货',
                mainOrLiBackApply: '申请中',
                mainOrLiReject: '退款已驳回',
                mainOrLiAlreadyBack: '已退',
                mainOrLiClose: '退款已关闭',
                mainOrLiBackGoods: '退货退款',
                mainOrLiOrderNum: '订单号',
                mainOrLiPayInfo: '支付信息',
                mainOrLiPhone: '手机下单',
                mainOrLiReal: '实付款',
                mainOrLiTransationSta: '交易状态',
                mainOrLiTransationHan: '交易操作',
                mainOrLiHanlde: '操作',
                mainOrLiPay: '支付',
                mainOrLiCanleOrder: '订单取消',
                mainOrLiOrderDet: '订单详情',
                mainOrLiAllStatus: '所有状态',
                mainOrLiWaitPay: '等待付款',
                mainOrLiRealPay: '已付款',
                mainOrLiRealComp: '已完成',
                mainOrLiRealClose: '已关闭',
                mainOrLiSearch: '搜索',
                mainOrLiAcceptSuccess: '受理成功',
                mainOrLiAccessFail: '受理失败',
                mainOrLiNoAccept: '拒绝',
                mainOrLiIsDelOrder: '是否删除订单?',
                mainOrLiIsDelTip: '提示?',
                mainOrLiConfirm: '确定',
                mainOrLiCanle: '取消',
                mainOrLiDeleteSucc: '删除成功',
                mainOrLiReturnMoner: '退货退款申请成功',
                mainOrLiSearchError: '查询失败，请稍后重试',
            },
            reverse: {
                mainOrReGoods: '商品',
                mainOrRePriceAmount: '单价/数量',
                mainOrReCancleType: '退货类型',
                mainOrReRejectPrice: '退款',
                mainOrReRejectGoods: '退货退款',
                mainOrReRejectNum: '退货数量',
                mainOrReRejectTotalPay: '退货总金额',
                mainOrReRejectSureTotalPay: '确认退款金额',
                mainOrReRejectReason: '退货原因',
                mainOrReEnterReson: '请选择退款原因',
                mainOrReRejectTalk: '退货留言',
                mainOrReUpload: '上传凭证',
                mainOrReSubmit: '提交',
                mainOrReEnterSomeReason: '请选择退货退款原因',
                mainOrReEnterGoodsNum: '请输入退货退款数量',
                mainOrReEnterMoney: '请输入退款金额',
                mainOrReRemark: '备注长度在 5 到 500 个字符',
                mainOrReBack: '未收到货 - 要求退',
                mainOrReNumNot: '已收到货 - 数量不对',
                mainOrRePackDamage: '已收到货 - 包装缺损',
                mainOrReQulity: '已收到货 - 商品质量问题',
                mainOrReDateNot: '已收到货 - 生产日期不好',
                mainOrReFlovarNot: '已收到货 - 口味/规格不对',
                mainOrReAgree: '协商一致退款',
                mainOrReOtherReason: '其它原因',
                mainOrReSuccess: '退货退款申请成功',
                mainOrReError: '退货退款申请失败',
                mainOrReUploadPicSucc: '上传图片成功',
                mainOrReFive: '您只能上传五张图片',
                mainOrSelf: '自送',
                mainOrOther: '其他',
            }
        },
        personal: {
            card: {
                mainPerCarNewCreate: '新增分销商资格证',
                mainPerCarDisPic: '分销证照片',
                mainPerCarDisProveNum: '分销证号',
                mainPerCarAddress: '地址',
                mainPerCarCity: '城市',
                mainPerCarCountry: '国家',
                mainPerCarEnterCoun: '请选择国家',
                mainPerCarChina: '中国',
                mainPerCarUsa: '美国',
                mainPerCarState: '州',
                mainPerCarEnterState: '请选择州',
                mainPerCarDeco: '得克萨斯州',
                mainPerCarWashington: '华盛顿州',
                mainPerCarCali: '加利福尼亚州',
                mainPerCarZip: '邮编',
                mainPerCarFromDate: '有效期至',
                mainPerCarSelDate: '选择日期',
                mainPerCarSave: '保存',
                mainPerCarEnterSale: '请输入分销证号',
                mainPerCarEnterAddr: '请输入地址',
                mainPerCarEnterCity: '请输入城市',
                mainPerCarSeleCount: '请选择国家',
                mainPerCarSeleState: '请选择州',
                mainPerCarPutZip: '请输入邮编',
            },
            password: {
                mainPerPwdsetter: '密码设置',
                mainPerPwdOldPwd: '旧密码',
                mainPerPwdNewPwd: '新密码',
                mainPerPwdConfirmPwd: '确认密码',
                mainPerPwdEnterOldPwd: '请输入旧密码',
                mainPerPwdEnterNew: '请输入新密码',
                mainPerPwdConfirmNew: '请确认新密码'
            },
            personalMsg: {
                mainPerPerData: '个人资料',
                mainPerPerEmail: '邮箱',
                mainPerPerSex: '性别',
                mainPerPermale: '男',
                mainPerPerFemale: '女',
                mainPerPerContactPhone: '联系手机',
                mainPerPerCompany: '公司名',
                mainPerPerCompanyMode: '公司联系方式',
                mainPerPerEnterEmail: '请输入邮箱',
                mainPerPerEnterSex: '请选择性别',
                mainPerPerEnterName: '请输入姓名',
                mainPerPerEnterCont: '请输入联系电话',
                mainPerPerUploadJpg: '上传头像图片只能是JPG 格式',
                mainPerPer2MB: '上传头像图片大小不能超过 2MB!',
            },
            receiveAdd: {
                mainPerReNewCreate: '新增收获地址',
                mainPerRePhone: '手机号码',
                mainPerReEnterCont: '请输入内容',
                mainPerReTeleNum: '电话号码',
                mainPerReEnterPhone: '请输入手机号'
            },
        },
        repayMent: {
            readyPay: {
                mainReReRepayment: '账期还款',
                mainReReRepayAmount: '还款金额',
                mainReReUseBala: '使用账户余额',
                mainReReYourBala: '您的账户余额为',
                mainReReDollar: '美元',
                mainReReRepayBala: '还款余额',
                mainReRePayType: '支付方式',
                mainReReCard: '信用卡',
                mainReReOnlinePay: '在线支付',
                mainReReGoPay: '去支付',
            },
            repayList: {
                mainRePayPayTime: '应还款时间',
                mainRePayTo: '至',
                mainRePayStartTime: '开始日期',
                mainRePayEndTime: '结束日期',
                mainRePayRepayTime: '还款时间',
                mainRePayPeState: '还款状态',
                mainRePayBatch: '批量还款',
                mainRePayShouldPay: '应还金额',
                mainRePayRelation: '关联单号',
                mainRePayNoPay: '未付款',
                mainRePayNoRepay: '未还款',
                mainRePayRepayed: '已还款',
            }
        },
        reverse: {
            detail: {
                mainRevDeWaitLts: '请等待LTS处理',
                mainRevDeSuccRefund: '您已经成功发起退款处理，请耐心等待lts处理',
                mainRevDeApplyTime: '申请时间',
                mainRevDeSaler: '销售员',
                mainRevDeSaleNum: '销售数量',
                mainRevDeRefundMoney: '退货金额',
                mainRevDeAcceptInfo: '收货信息',
                mainRevDeSomeInfo: '退货/退款信息',
                mainRevDeRefund: '退货/退款',
                mainRevDeRefundType: '退款类型',
                mainRevDeOnlyRefund: '仅退款',
                mainRevDeFundReason: '退款原因',
                mainRevDeTalk: '留言/沟通记录',
                mainRevDeEngineer: '工程商',
            },
            list: {
                mainRevLiOrder: '订单编号',
                mainRevLiInfo: '商品信息',
                mainRevLiMoneyNum: '退货金额',
                mainRevLiReturnGoods: '退货数量',
                mainRevLiSubmitTime: '提交时间',
                mainRevLiGooodsType: '退货类型',
                mainRevLiReturnGoodPay: '退货退款',
                mainRevLiOnlyNotGood: '仅退款',
                mainRevLiReason: '退货原因',
                mainRevLiStatus: '退款状态',
                mainRevLiHandle: '操作',
                mainRevLiGoodsInfo: '退货详情',
                mainRevLiIsSure: '确定撤销申请吗？',
                mainRevLiCanle: '取消',
                mainRevLiConfirm: '确定',
                mainRevLiApply: '撤销申请',
                mainRevLiLogis: '填写物流信息',
                mainRevLiLogising: '填写物流',
                mainRevLiLogisCompany: '物流公司',
                mainRevLiSelect: '请选择物流公司',
                mainRevLiLogisNum: '物流单号',
                mainRevLiOrderNum: '订单号',
                mainRevLiGoodName: '商品名称',
                mainRevLiCreateTime: '创建时间',
                mainRevLiStats: '状态',
                mainRevLiAllStats: '所有状态',
                mainRevLiAppling: '退款申请中',
                mainRevLiAccept: '退款接受',
                mainRevLiReject: '退款驳回',
                mainRevLiSeller: '卖家已赔',
                mainRevLiSuccess: '退款成功',
                mainRevLiClose: '退款关闭',
                mainRevLiSearch: '搜索',
                mainRevLiErr: '查询失败，请稍后重试:',
                mainRevLiCtrlZ: '撤销成功',
                mainRevLiSubmitS: '提交成功',
            },
            dialog: {
                mainRevDiaReturnHandle: '退货退款操作',
                mainRevDiaOrderNum: '订单号',
                mainRevDiaEngineer: '工程商',
                mainRevDiaGoodsName: '商品名称',
                mainRevDiaSize: '规格',
                mainRevDiaPrice: '单价',
                mainRevDiaOldNum: '原订单数量',
                mainRevDiaReason: '退款原因',
                mainRevDiaDetail: '明细',
                mainRevDiaNotEnough: '缺货',
                mainRevDiaReturn: '退货',
                mainRevDiaTalk: '留言记录',
                mainRevDiaHandleRecord: '操作记录',
                mainRevDiaCancle: '取消',
                mainRevDiaAlert: '修改',
                mainRevDiaReturnStore: '退货入库',
                mainRevDiaReturnStroge: '退货出库',
                mainRevDiaReject: '驳回',
                mainRevDiaCloseAll: '关闭退货退款',
                mainRevDiaReturnTalk: '退货退款留言',
                mainRevDiaNotSupport: '不支持的操作类型',
                mainRevDiaHandleSucc: '操作成功',
                mainRevDiaHandleErr: '操作失败',
            }
        },
        search: {
            mainSeaGoods: '商品',
            mainSeaMoreSelect: '更多选项',
            mainSeaUp: '收起',
            mainSeaCompre: '综合',
            mainSeaPrice: '价格',
            mainSeaShelf: '上架时间',
            mainSeaLogin: '登录之后查看价格',
            mainSeaPre: '上一页',
            mainSeaNext: '下一页',
        },
        someinfo: {
            mainSomeDear: '尊敬的',
            mainSomeHello: '您好',
            mainSomeLever: '会员等级',
            mainSomeAccountBala: '账户余额',
            mainSomePayBalance: '账期余额',
            mainSomeUsed: '已使用',
            mainSomeShopCoupon: '购物券',
            mainSomeCoupon: '优惠券',
            mainSomeFullCoupon: '满减劵',
            mainSomeFull: '满',
            mainSomeDollar: '美元使用',
            mainSomeUsedTime: '使用时间',
            mainSomeRange: '至',
            mainSomeEvery: '个',
            mainSomeHistory: '历史购买记录',
        }
    }
}

