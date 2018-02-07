import BaseConstant from "./abstract/BaseConstant";
/**
 * 退款原因类型
 * @Author Nation
 * @cdate 2018-01-26
 */
export default class ReverseReasonConstant extends BaseConstant {
    static REFUND_BAD_CDATE 	= new BaseConstant("REFUND_BAD_CDATE",	        1,    "已收到货 - 生产日期不好");
    static REFUND_ERROR_ITEM 	= new BaseConstant("REFUND_ERROR_ITEM",	        2,    "发错货");
    static REFUND_ERROR_PROPS 	= new BaseConstant("REFUND_ERROR_PROPS",	    3,    "已收到货 - 口味/规格不对");
    static REFUND_STOCK_OUT 	= new BaseConstant("REFUND_STOCK_OUT",	        5,    "未收到货 - 要求退款");
    static REFUND_ERROR_NUM 	= new BaseConstant("REFUND_ERROR_NUM",	        6,    "已收到货 - 数量不对");
    static REFUND_BAD_PACKING	= new BaseConstant("REFUND_BAD_PACKING",	    7,    "已收到货 - 包装缺损");
    static REFUND_BAD_QUALITY	= new BaseConstant("REFUND_BAD_QUALITY",	    8,    "已收到货 - 商品质量问题");
    static REFUND_OTHER		    = new BaseConstant("REFUND_OTHER",		        4,    "其它原因");
    static REFUND_CONSULT		= new BaseConstant("REFUND_CONSULT",		    9,    "协商一致退款");
}
