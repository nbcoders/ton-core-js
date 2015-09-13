/**
 * JavaScript Type tools of Ton
 * power by[young,by701]
 * function call：Ton.Type.xxx
 * 1,Method comment
 * func1(params);
 */
(function(__ton, window) {
	//类型判断（come from 《高质量的js》）
	__ton.Type = {
		//是否是数字,1或者"1"都通过
		isNumber: function(s) {
			return !isNaN(s);
		},
		isString: function(s) {
			return typeof s === "string";
		},
		isBoolean: function(s) {
			return typeof s === "boolean";
		},
		isFunction: function(s) {
			return typeof s === "function";
		},
		isNull: function(s) {
			return s === null;
		},
		isUndefined: function(s) {
			return typeof s === "undefined";
		},
		//带有空格的字符串也为true
		isEmpty: function(s) {
			return /^\s*$/.test(s);
		},
		isArray: function(s) {
			//jQuery code
			//return Object.prototype.toString.call(obj) === '[object Array]';  
			//《高质量的js》 code
			return s instanceof Array;
		}
	};
	window.Ton = __ton;
})(typeof Ton !== "undefined" ? Ton : {}, window);