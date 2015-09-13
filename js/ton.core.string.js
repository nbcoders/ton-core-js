/**
 * JavaScript String tools of Ton
 * power by[young,by701]
 * function call：Ton.String.xxx
 * 1,Method comment
 * func1(params);
 */
(function(__ton, window) {
	__ton.String = {
		//去除左边和右边的空格,返回string
		trim: function(str) {
			return str.replace(/(^\s*)|(\s*$)/g, '');
		},
		//去除左边的空格，返回lstring
		ltrim: function(str) {
			return str.replace(/^\s*/g, '');
		},
		//去除右边的空格，返回rstring
		rtrim: function(str) {
			return str.replace(/\s*$/, '');
		},
		//判断字符串是否相等，返回bool
		equals: function(str1, str2) {
			return str1 == str2;
		},
		//判断忽略大小写比较两个字符串是否相等，返回bool
		equalsIgnoreCase: function(str1, str2) {
			return str1.toUpperCase() == str2.toUpperCase();
		},
		//将字符串转换为数组,两个参数：字符串，字符串分隔符
		stringToArray: function(str, delimiter) {
			return str.split(delimiter);
		}
	};
	window.Ton = __ton;
})(typeof Ton !== "undefined" ? Ton : {}, window);