﻿/**
 * JavaScript Validation tools of Ton
 * power by[young,by701]
 * function call：Ton.Validation.xxx
 * 1,Method comment
 * func1(params);
 */
(function(__ton, window) {
	__ton.Validation = {
		//判断是否是邮箱,返回bool
		isEmail: function(str) {
			var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
			return reg.test(str);
		},
		//中英文数字下划线1-16个字符
		isAccount: function(str) {
			var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,16}$/;
			//var reg = /^[a-zA-Z0-9_]{6,16}$/;
			return reg.test(str);
		},
		//中英文数字下划线6-16个字符
		isLoginAccount: function(str) {
			var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{6,16}$/;
			//var reg = /^[a-zA-Z0-9_]{6,16}$/;
			return reg.test(str);
		},
		//判断是否是邮编，判断3位数到12位数,并包含字母和空格，返回bool
		isPost: function(str) {
			var patrn = /^[a-zA-Z0-9 ]{3,12}$/;
			if (!patrn.exec(str)) return false
			return true
		},
		//校验手机号码：必须以数字开头,返回bool //00852验证香港区号
		isMobile: function(str) {
			//严格
			//var patrn = /^(13[0-9]|15[012356789]|18[0-9]|14[57]|00852)[0-9]{8}$/;
			//宽松
			var patrn = /^(1)[0-9]{10}$/;
			return patrn.test(str);
		},
		//校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”
		isTel: function(str) {
			var patrn = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
			if (!patrn.exec(str)) return false;
			return true;
		},
		//判断是否是QQ号码，返回bool
		isQQ: function(str) {
			return /^\d{5,11}$/.test(str);
		},
		//判断是否日期类型(例:2005-12-12)，返回bool
		isDate: function(str) {
			var reg = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/;
			if (reg.test(str)) {
				return true;
			}
			return false;
		},
		//判断是否是合法的身份证号，返回bool
		isIdCardNo: function(num) {
			//reg15  reg15=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
			//reg18  reg18=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
			//reg 综合15,18位量种，并可检测尾部X
			var reg = /^(\d{6})(18|19|20)?(\d{2})([01]\d)([0123]\d)(\d{3})(\d|X)?$/;
			if (reg.test(num)) {
				return true;
			}
			return false;
		},
		//判断是否是合法IP，返回bool
		isIP: function(str) {
			var reg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
			if (reg.test(str)) {
				return true;
			}
			return false;
		},
		//校验密码：只能输入6-15个字母、数字
		isPasswd: function(s) {
			var patrn = /^[a-zA-Z0-9]{6,15}$/;
			if (!patrn.exec(s)) return false;
			return true;
		},
		//判断判断是否中文,返回bool
		isChinese: function(str) {
			var str = str.replace(/(^\s*)|(\s*$)/g, '');
			if (!(/^[\u4E00-\uFA29]*$/.test(str) && (!/^[\uE7C7-\uE7F3]*$/.test(str)))) {
				return false;
			}
			return true;
		},
		//1-16个中英文，不含数字
		isChEn: function(s) {
			var patrn = /^[a-zA-Z\u4E00-\u9FA5]{2,16}$/;
			if (!patrn.exec(s)) return false;
			return true;
		},
		//判断是否是一个图片格式的文件jpg|jpeg|png|swf|gif，返回bool
		isImg: function(str) {
			var objReg = new RegExp("[.]+(jpg|jpeg|png|swf|gif)$", "gi");
			if (objReg.test(str)) {
				return true;
			}
			return false;
		},
		//判断是否是整型,返回bool
		isInteger: function(str) {
			return /^-?\d+$/.test(str);
		},
		//判断是否是一个浮点数，返回bool
		isFloat: function(str) {
			return /^(-?\d+)(\.\d+)?$/.test(str);
		},
		//验证url拼写
		isUrl: function(str) {
            		var reg = /^((http|https|ftp):\/\/)?(\w(\:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(\:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/i;
            		return reg.test(str);
		}
	};
	window.Ton = __ton;
})(typeof Ton !== "undefined" ? Ton : {}, window);
