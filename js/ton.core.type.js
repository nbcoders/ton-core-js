//类型判断（come from 《高质量的js》）
TON.Type = {
    //是否是数字,1或者"1"都通过
    isNumber: function (s) {
        return !isNaN(s);
    },
    isString: function (s) {
        return typeof s === "string";
    },
    isBoolean: function (s) {
        return typeof s === "boolean";
    },
    isFunction: function (s) {
        return typeof s === "function";
    },
    isNull: function (s) {
        return s === null;
    },
    isUndefined: function (s) {
        return typeof s === "undefined";
    },
    //带有空格的字符串也为true
    isEmpty: function (s) {
        return /^\s*$/.test(s);
    },
    isArray: function (s) {
        //jQuery code
        //return Object.prototype.toString.call(obj) === '[object Array]';  
        //《高质量的js》 code
        return s instanceof Array;
    }
};