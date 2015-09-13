/**
 * ton.core.js
 * power by[young,by701]
 * http:tonjs.nbcoders.com
 */
(function(window) {

/**
 * JavaScript Ajax tools of Ton  base on https://github.com/snandy/io thanks
 * power by[young,by701]
 * 1,执行基本ajax请求,返回XMLHttpRequest
 * Ajax.request(url, {
 *	 async   	是否异步 true(默认)
 *	 method  	请求方式 POST or GET(默认)
 *	 type	  	数据格式 json(默认) or xml or text
 *	 encode  	请求的编码 UTF-8(默认)
 *	 timeout 	请求超时时间 0(默认)
 *	 credential 跨域请求时是否带证书(默认false，不带http认证信息如cookie)
 *	 data	  	请求参数 (字符串或json)
 *	 scope   	成功回调执行上下文
 *	 success 	请求成功后响应函数 参数为text,json,xml数据
 *	 failure 	请求失败后响应函数 参数为xmlHttp, msg, exp
 * });
 *
 * 2,执行ajax请求,返回纯文本
 * Ajax.text(url,{
 *		 ...
 * });
 *
 * 3,执行ajax请求,返回JSON
 * Ajax.json(url,{
 *		 ...
 * });
 *
 * 4,执行ajax请求,返回XML
 * Ajax.xml(url,{
 *		 ...
 * });
 */
(function(__ton, window) {
	// Iterator
	function forEach(obj, iterator, context) {
		if (obj.length === +obj.length) {
			for (var i = 0; i < obj.length; i++) {
				if (iterator.call(context, obj[i], i, obj) === true) return
			}
		} else {
			for (var k in obj) {
				if (iterator.call(context, obj[k], k, obj) === true) return
			}
		}
	}

	// parse json string
	function parseJSON(str) {
		try {
			return JSON.parse(str)
		} catch (e) {
			try {
				return (new Function('return ' + str))()
			} catch (e) {}
		}
	}

	// create xhr object
	var createXHR = window.XMLHttpRequest ?
		function() {
			try {
				return new XMLHttpRequest()
			} catch (e) {}
		} :
		function() {
			try {
				return new window.ActiveXObject('Microsoft.XMLHTTP')
			} catch (e) {}
		}

	// object to queryString
	function serialize(obj) {
		var a = []
		forEach(obj, function(val, key) {
			if (IO.isArray(val)) {
				forEach(val, function(v, i) {
					a.push(key + '=' + encodeURIComponent(v))
				})
			} else {
				a.push(key + '=' + encodeURIComponent(val))
			}
		})
		return a.join('&')
	}

	// empty function
	function noop() {}

	function request(url, options) {
		if (typeof url === 'object') {
			options = url
			url = options.url
		}
		var xhr, isTimeout, timer, options = options || {}
		var async = options.async !== false,
			method = options.method || 'GET',
			type = options.type || 'json',
			encode = options.encode || 'UTF-8',
			timeout = options.timeout || 0,
			credential = options.credential,
			data = options.data,
			scope = options.scope,
			success = options.success || noop, //TODO
			failure = options.failure || noop //TODO maybe is not a function so should typeof

		// 大小写都行，但大写是匹配HTTP协议习惯	
		method = method.toUpperCase()

		// 对象转换成字符串键值对
		if (data && typeof data === 'object') {
			data = serialize(data)
		}
		if (method === 'GET' && data) {
			url += (url.indexOf('?') === -1 ? '?' : '&') + data
		}

		xhr = createXHR()
		if (!xhr) {
			return
		}

		isTimeout = false
		if (async && timeout > 0) {
			timer = setTimeout(function() {
				// 先给isTimeout赋值，不能先调用abort
				isTimeout = true
				xhr.abort()
			}, timeout)
		}
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (isTimeout) {
					failure(xhr, 'request timeout')
				} else {
					onStateChange(xhr, type, success, failure, scope)
					clearTimeout(timer)
				}
			}
		}
		xhr.open(method, url, async)
		if (credential) {
			xhr.withCredentials = true
		}
		if (method == 'POST') {
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=' + encode)
		}
		xhr.send(data)
		return xhr
	}

	function onStateChange(xhr, type, success, failure, scope) {
		var s = xhr.status,
			result
		if (s >= 200 && s < 300) {
			switch (type) {
				case 'text':
					result = xhr.responseText
					break
				case 'json':
					result = parseJSON(xhr.responseText)
					break
				case 'xml':
					result = xhr.responseXML
					break
			}
			// text, 返回空字符时执行success
			// json, 返回空对象{}时执行suceess，但解析json失败，函数没有返回值时默认返回undefined
			result !== undefined && success.call(scope, result)

		} else {
			failure(xhr, xhr.status)
		}
		xhr = null
	}
	var A = (function() {
		var i, Ajax = {
				request: request
			},
			types = ['text', 'json', 'xml']
		for (i = 0, len = types.length; i < len; i++) {
			Ajax[types[i]] = function(i) {
				return function(url, opt) {
					opt = opt || {}
					opt.type = types[i]
					return request(url, opt)
				}
			}(i)
		}
		return Ajax
	})();
	__ton.Ajax = A;
	window.Ton = __ton;
})(typeof Ton !== "undefined" ? Ton : {}, window);﻿/**
 * JavaScript Array tools of Ton
 * power by[young,by701]
 * function call：Ton.Array.xxx
 * 1,去除数组重复项
 * uniqArray(arr);
 *
 * 2,xxxxxxxx
 * shuffleArray(arr);
 */
(function(__ton, window) {
	var Arr = {
		//去除数组重复项
		uniqArray: function(arr) {
			var a = [],
				o = {},
				i,
				v,
				cv, // corrected value
				len = arr.length;

			if (len < 2) {
				return arr;
			}

			for (i = 0; i < len; i++) {
				v = arr[i];
				cv = 0 + v;
				if (!o[cv]) {
					a.push(v);
					o[cv] = true;
				}
			}
			return a;
		},
		shuffleArray: function(array) {
			for (var i = array.length - 1; i > 0; i--) {
				var j = Math.floor(Math.random() * (i + 1));
				var temp = array[i];
				array[i] = array[j];
				array[j] = temp;
			}
			return array;
		},
		getNElementFromArray: function(array, n) {
			var nArray = [],
				j;
			var originalArray = array;
			if (n > 0) {
				for (var i = 0; i < n;) {
					j = Math.floor(Math.random() * (array.length));
					if ($.inArray(array[j], nArray) < 0) {
						nArray.push(array[j]);
						i++;
					}
				}
			}
			return nArray;
		}
	};
	__ton.Array = Arr;
	window.Ton = __ton;
})(typeof Ton !== "undefined" ? Ton : {}, window);/**
 * JavaScript Base64 tools of Ton
 * power by[young,by701]
 * function call：Ton.Base64.xxx
 * 1,bas464编码
 * encode(str);
 *
 * 2，base64解码
 * decode(str)
 */
(function(__ton, window) {
	var b64 = {};
	var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
	/** 
	 * base64编码
	 * @param {Object} str
	 */
	function base64encode(str) {
			var out, i, len;
			var c1, c2, c3;
			len = str.length;
			i = 0;
			out = "";
			while (i < len) {
				c1 = str.charCodeAt(i++) & 0xff;
				if (i == len) {
					out += base64EncodeChars.charAt(c1 >> 2);
					out += base64EncodeChars.charAt((c1 & 0x3) << 4);
					out += "==";
					break;
				}
				c2 = str.charCodeAt(i++);
				if (i == len) {
					out += base64EncodeChars.charAt(c1 >> 2);
					out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
					out += base64EncodeChars.charAt((c2 & 0xF) << 2);
					out += "=";
					break;
				}
				c3 = str.charCodeAt(i++);
				out += base64EncodeChars.charAt(c1 >> 2);
				out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
				out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
				out += base64EncodeChars.charAt(c3 & 0x3F);
			}
			return out;
		}
		/** 
		 * base64解码
		 * @param {Object} str
		 */

	function base64decode(str) {
			var c1, c2, c3, c4;
			var i, len, out;
			len = str.length;
			i = 0;
			out = "";
			while (i < len) {
				/* c1 */
				do {
					c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
				}
				while (i < len && c1 == -1);
				if (c1 == -1)
					break;
				/* c2 */
				do {
					c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
				}
				while (i < len && c2 == -1);
				if (c2 == -1)
					break;
				out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
				/* c3 */
				do {
					c3 = str.charCodeAt(i++) & 0xff;
					if (c3 == 61)
						return out;
					c3 = base64DecodeChars[c3];
				}
				while (i < len && c3 == -1);
				if (c3 == -1)
					break;
				out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
				/* c4 */
				do {
					c4 = str.charCodeAt(i++) & 0xff;
					if (c4 == 61)
						return out;
					c4 = base64DecodeChars[c4];
				}
				while (i < len && c4 == -1);
				if (c4 == -1)
					break;
				out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
			}
			return out;
		}
		/** 
		 * utf16转utf8
		 * @param {Object} str
		 */

	function utf16to8(str) {
			var out, i, len, c;
			out = "";
			len = str.length;
			for (i = 0; i < len; i++) {
				c = str.charCodeAt(i);
				if ((c >= 0x0001) && (c <= 0x007F)) {
					out += str.charAt(i);
				} else
				if (c > 0x07FF) {
					out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
					out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
					out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
				} else {
					out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
					out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
				}
			}
			return out;
		}
		/** 
		 * utf8转utf16
		 * @param {Object} str
		 */

	function utf8to16(str) {
		var out, i, len, c;
		var char2, char3;
		out = "";
		len = str.length;
		i = 0;
		while (i < len) {
			c = str.charCodeAt(i++);
			switch (c >> 4) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
					// 0xxxxxxx  
					out += str.charAt(i - 1);
					break;
				case 12:
				case 13:
					// 110x xxxx 10xx xxxx  
					char2 = str.charCodeAt(i++);
					out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
					break;
				case 14:
					// 1110 xxxx10xx xxxx10xx xxxx  
					char2 = str.charCodeAt(i++);
					char3 = str.charCodeAt(i++);
					out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
					break;
			}
		}
		return out;
	}
	b64.encode = function(str) {
		return base64encode(utf16to8(str));
	};
	b64.decode = function(str) {
		return utf8to16(base64decode(str));
	};
	__ton.Base64 = b64;
	window.Ton = __ton;
})(typeof Ton !== "undefined" ? Ton : {}, window);﻿/**
 * JavaScript moduleName tools of Ton
 * power by[young,by701]
 * function call：Ton.moduleName.xxx
 * 1,Method comment
 * func1(params);
 */

(function(__ton, window) {

	var UA = navigator.userAgent;
	var UP = navigator.platform;

	//prepared Feature Detection parameters;
	var d = document.createElement("div");
	d.innerHTML = "   <i>i</i>";
	d.setAttribute("className", "t");

	//Successfully tested in: Firefox 0.8 - 41. Chrome 1.0 - 45. Opera 8.0 - 31. Safari 3.0 - 8. IE 6 - 11 (NOT Edge)
	//infomation from http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
	__ton.Browser = {

		// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
		isOpera: !!window.opera || UA.indexOf(' OPR/') >= 0,

		//Feature detection. Firefox 1.0+
		isFirefox: typeof InstallTrigger !== 'undefined',

		//Feature detection. At least Safari 3+: "[object HTMLElementConstructor]"
		isSafari: Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0,

		//Feature detection. Chrome 1+
		isChrome: !!window.chrome && !this.isOpera,

		//Feature detection. At least IE6
		isIE: false || !!document.documentMode,

		/**
		 * @name IE8 and earlier, leadingWhitespace
		 * @description {Boolean} IE8- 会去掉开头的空格，所以 nodeType 不是 3（文本），即 IE8 & IE8- 中返回 true
		 * @const
		 */
		isIE8e: (function() {
			return d.firstChild.nodeType !== 3;
		})(),

		/**
		 * @name IE7 and earlier, getSetAttribute
		 * @description {Boolean} 利用设置 class 来测试 get/setAttribute('class', 'class') 方法是否被支持，
		 *     在 ie6/7 中不支持（使用 get/setAttribute('className', 'class')）
		 *     因此 ie6/7 中会返回 true，其他浏览器中返回 false
		 * @const
		 */
		isIE7e: (function() {
			return d.className === "t";
		})(),

		/**
		 * @name html5Clone
		 * @description {Boolean} 判断创建一个 HTML5 元素是否会出现问题
		 *     IE6 为 false
		 * @const
		 */
		isIE6: (function() {
			//fix IE6 background image can not cache problem
			if (document.execCommad) {
				document.execCommad('backgroundimagecache', false, false);
			}
			return document.createElement("nav").cloneNode(true).outerHTML === "<:nav></:nav>";
		})(),

		//get IE version
		getIEVersion: function() {

			var v = 0;
			//if it is IE
			if (!this.isIE) {
				return v;
			}

			if (document.documentMode == 11) {
				v = 11;
			} else if ('WebSocket' in window) {
				v = 10;
			} else if ('HTMLElement' in window) {
				v = 9;
			} else if (this.isIE8e && !this.isIE7e) {
				v = 8;
			} else if (this.isIE7e && !this.isIE6) {
				v = 7;
			} else if (this.isIE6) {
				v = 6;
			}

			return v;

		}

	}

	window.Ton = __ton;

})(typeof Ton !== "undefined" ? Ton : {}, window);
/**
* jQuery Cookie Plugin v1.4.1 * tools of Ton
* power by[young,by701]
* function call：$.cookie & $.removeCookie
* this plugin must depend on jQuery
* Released under the MIT license
*/

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch (e) { }
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write

        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }

            return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {};

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }

        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };

}));﻿/**
 * JavaScript Utils tools of Ton
 * power by[young,by701]
 * function call：Ton.Utils.xxx
 * 1,Method comment
 * func1(params);
 */
(function(__ton, window) {
	__ton.copy = {
		copyToClipboard: function(txt) {
			if (window.clipboardData) {
				window.clipboardData.clearData();
				window.clipboardData.setData("Text", txt);
			} else {
				window.prompt("您可以复制以下游戏地址", txt);
			}
		}
	};
	window.Ton = __ton;
})(typeof Ton !== "undefined" ? Ton : {}, window);/**
 * JavaScript Date tools of Ton
 * power by[young,by701]
 * function call：Ton.Date.xxx
 * 1,Method comment
 * func1(params);
 */
(function(__ton,window) {
	var D = {};
	//TODO should suport 24 and 12 
	/**
	 * format the date
	 * @param {Object} date the date you will format
	 * @param {Object} [str] the string of format the date eg: YYYY-MM-DD hh:mm:ss
	 */
	D.format = function(date, str) {
		if (arguments.length === 0) {
			console.log("parameter is not correct!");
			return;
		}
		str = str || "YYYY-MM-DD hh:mm:ss";
		var _date = new Date(date); //maybe some browers are not supported
		var _year = _date.getFullYear();
		var _month = _date.getMonth() + 1;
		var _day = _date.getDate();
		var _hours = _date.getHours();
		var _minutes = _date.getMinutes();
		var _seconds = _date.getSeconds();
		_month = _month < 10 ? "0" + _month : _month;
		_day = _day < 10 ? "0" + _day : _day;
		_hours = _hours < 10 ? "0" + _hours : _hours;
		_minutes = _minutes < 10 ? "0" + _minutes : _minutes;
		_seconds = _seconds < 10 ? "0" + _seconds : _seconds;
		str = str.replace(/YYYY/, _year);
		str = str.replace(/MM/, _month);
		str = str.replace(/DD/, _day);
		str = str.replace(/hh/, _hours);
		str = str.replace(/mm/, _minutes);
		str = str.replace(/ss/, _seconds);
		return str;
	};
	/**
	 *
	 * @param {Object} str
	 */
	D.getDate = function(str) {
		return D.format(new Date(), str);
	};
	__ton.Date = D;
	window.Ton = __ton;
})(typeof Ton !== "undefined" ? Ton : {},window);
﻿/**
 * JavaScript moduleName tools of Ton
 * power by[young,by701]
 * function call：Ton.moduleName.xxx
 * 1,Method comment
 * func1(params);
 */

(function (__ton, window) {

    var UA = navigator.userAgent;
    var UP = navigator.platform;

    __ton.Device = {

        //if touch device
        isTouchDevice: function () {
            return ('ontouchstart' in window) // works on most browsers
				|| ('onmsgesturechange' in window); // works on ie10
        },

        //if IE mobile device
        isIEMobile: function () {
            return !!(navigator.msPointerEnabled);
        },

        //if mobile device, this function is recomend by MDN
        //if this mobile device means mobile phones, except tablets, like this

        //Phone UA:
        //Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>) AppleWebKit/<WebKit Rev> (KHTML, like Gecko) Chrome/<Chrome Rev> Mobile Safari/<WebKit Rev>

        //Tablet UA:
        //Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>) AppleWebKit/<WebKit Rev>(KHTML, like Gecko) Chrome/<Chrome Rev> Safari/<WebKit Rev>

        isMobile: function () {
            return UA.match(/Mobi/i);
        },

        //this function is only used for Android Tablet
        isTablet: function () {
            return UA.match(/Tablet/i);
        },

        //apple device
        isAppleDevice: function () {
            return this.isIPHONE() || this.isIPOD() || this.isIPAD();
        },

        //android device
        isAndroidDevice: function () {
            return UA.match(/Android/i);
        },

        //navigator.platform iPhone device return "iPhone", iPad device return "iPad"
        //navigator.platform Linux and Android device will return "Linux aarch64"
        //navigator.platform Windows will return "Win32"
        isIPHONE: function () {
            return UP.match(/iPhone/i);
        },
        isIPOD: function () {
            return UP.match(/iPod/i);
        },
        isIPAD: function () {
            return UP.match(/iPad/i);
        },

        //if it is iPod or iPhone
        isAppleMobile: function () {
            return UA.match(/iPhone/i) || UA.match(/iPod/i);
        }
    };

    window.Ton = __ton;

})(typeof Ton !== "undefined" ? Ton : {}, window);
﻿/**
 * JavaScript Events tools of Ton
 * power by[young,by701]
 * function call：Ton.Events.xxx
 * 1,Method comment
 * func1(params);
 */
(function(__ton, window) {
	__ton.Events = {
		//阻止冒泡
		stopBubble: function(e) {
			if (e && e.stopPropagation) {
				e.stopPropagation();
			} else {
				window.event.cancelBubble = true;
			}
		}
	};
	window.Ton = __ton;
})(typeof Ton !== "undefined" ? Ton : {}, window);﻿/**
 * JavaScript JSON tools of Ton
 * power by[young,by701]
 * function call：Ton.JSON.xxx
 * 1,Method comment
 * func1(params);
 */
(function(__ton, window) {
	__ton.JSON = {
		isEmpty: function(o) {
			for (var i in o) {
				return false
			};
			return true;
		},
		getLength: function(o) {
			var l = 0;
			for (var i in o) {
				if (o.hasOwnProperty(i)) {
					l++;
				}
			};
			return l;
		}
	};
	window.Ton = __ton;
})(typeof Ton !== "undefined" ? Ton : {}, window);﻿/**
 * JavaScript LocalData tools of Ton
 * power by[young,by701]
 * function call：Ton.LocalData.xxx
 * 1,Method comment
 * func1(params);
 */
(function(__ton, window) {
	//本地存储支持IE6+,Chrome,FF
	__ton.LocalData = {
		hname: location.hostname ? location.hostname : 'localStatus',
		isLocalStorage: window.localStorage ? true : false,
		dataDom: null,

		initDom: function() { //初始化userData
			if (!this.dataDom) {
				try {
					this.dataDom = document.createElement('input'); //这里使用hidden的input元素
					this.dataDom.type = 'hidden';
					this.dataDom.style.display = "none";
					this.dataDom.addBehavior('#default#userData'); //这是userData的语法
					document.body.appendChild(this.dataDom);
					var exDate = new Date();
					exDate = exDate.getDate() + 30;
					this.dataDom.expires = exDate.toUTCString(); //设定过期时间
				} catch (ex) {
					return false;
				}
			}
			return true;
		},
		set: function(key, value) {
			if (this.isLocalStorage) {
				window.localStorage.setItem(key, value);
			} else {
				if (this.initDom()) {
					this.dataDom.load(this.hname);
					this.dataDom.setAttribute(key, value);
					this.dataDom.save(this.hname)
				}
			}
		},
		get: function(key) {
			if (this.isLocalStorage) {
				return window.localStorage.getItem(key);
			} else {
				if (this.initDom()) {
					this.dataDom.load(this.hname);
					return this.dataDom.getAttribute(key);
				}
			}
		},
		remove: function(key) {
			if (this.isLocalStorage) {
				localStorage.removeItem(key);
			} else {
				if (this.initDom()) {
					this.dataDom.load(this.hname);
					this.dataDom.removeAttribute(key);
					this.dataDom.save(this.hname)
				}
			}
		}
	};
	window.Ton = __ton;
})(typeof Ton !== "undefined" ? Ton : {}, window);/**
 * JavaScript MD5 tools of Ton
 * power by[young,by701]
 * function call：Ton.MD5.xxx
 * 1,Method comment
 * func1(params);
 */
(function(__ton, window) {
	/**
	 * 对文本进行MD5加密js脚本
	 */

	var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase */
	var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance */
	var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode */
	/*
	 * These are the functions you'll usually want to call
	 * They take string arguments and return either hex or base-64 encoded strings
	 */
	function hex_md5(s) {
		return binl2hex(core_md5(str2binl(s), s.length * chrsz));
	}

	function b64_md5(s) {
		return binl2b64(core_md5(str2binl(s), s.length * chrsz));
	}

	function hex_hmac_md5(key, data) {
		return binl2hex(core_hmac_md5(key, data));
	}

	function b64_hmac_md5(key, data) {
			return binl2b64(core_hmac_md5(key, data));
		}
		/* Backwards compatibility - same as hex_md5() */

	function calcMD5(s) {
			return binl2hex(core_md5(str2binl(s), s.length * chrsz));
		}
		/*
		 * Perform a simple self-test to see if the VM is working
		 */

	function md5_vm_test() {
			return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
		}
		/*
		 * Calculate the MD5 of an array of little-endian words, and a bit length
		 */

	function core_md5(x, len) {
			/* append padding */
			x[len >> 5] |= 0x80 << ((len) % 32);
			x[(((len + 64) >>> 9) << 4) + 14] = len;
			var a = 1732584193;
			var b = -271733879;
			var c = -1732584194;
			var d = 271733878;
			for (var i = 0; i < x.length; i += 16) {
				var olda = a;
				var oldb = b;
				var oldc = c;
				var oldd = d;
				a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
				d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
				c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
				b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
				a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
				d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
				c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
				b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
				a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
				d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
				c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
				b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
				a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
				d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
				c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
				b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
				a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
				d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
				c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
				b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
				a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
				d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
				c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
				b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
				a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
				d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
				c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
				b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
				a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
				d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
				c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
				b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
				a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
				d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
				c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
				b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
				a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
				d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
				c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
				b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
				a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
				d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
				c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
				b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
				a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
				d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
				c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
				b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
				a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
				d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
				c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
				b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
				a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
				d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
				c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
				b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
				a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
				d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
				c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
				b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
				a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
				d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
				c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
				b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
				a = safe_add(a, olda);
				b = safe_add(b, oldb);
				c = safe_add(c, oldc);
				d = safe_add(d, oldd);
			}
			return Array(a, b, c, d);
		}
		/*
		 * These functions implement the four basic operations the algorithm uses.
		 */

	function md5_cmn(q, a, b, x, s, t) {
		return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
	}

	function md5_ff(a, b, c, d, x, s, t) {
		return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}

	function md5_gg(a, b, c, d, x, s, t) {
		return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}

	function md5_hh(a, b, c, d, x, s, t) {
		return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}

	function md5_ii(a, b, c, d, x, s, t) {
			return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
		}
		/*
		 * Calculate the HMAC-MD5, of a key and some data
		 */

	function core_hmac_md5(key, data) {
			var bkey = str2binl(key);
			if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);
			var ipad = Array(16),
				opad = Array(16);
			for (var i = 0; i < 16; i++) {
				ipad[i] = bkey[i] ^ 0x36363636;
				opad[i] = bkey[i] ^ 0x5C5C5C5C;
			}
			var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
			return core_md5(opad.concat(hash), 512 + 128);
		}
		/*
		 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
		 * to work around bugs in some JS interpreters.
		 */

	function safe_add(x, y) {
			var lsw = (x & 0xFFFF) + (y & 0xFFFF);
			var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
			return (msw << 16) | (lsw & 0xFFFF);
		}
		/*
		 * Bitwise rotate a 32-bit number to the left.
		 */

	function bit_rol(num, cnt) {
			return (num << cnt) | (num >>> (32 - cnt));
		}
		/*
		 * Convert a string to an array of little-endian words
		 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
		 */

	function str2binl(str) {
			var bin = Array();
			var mask = (1 << chrsz) - 1;
			for (var i = 0; i < str.length * chrsz; i += chrsz)
				bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
			return bin;
		}
		/*
		 * Convert an array of little-endian words to a hex string.
		 */

	function binl2hex(binarray) {
			var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
			var str = "";
			for (var i = 0; i < binarray.length * 4; i++) {
				str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
					hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
			}
			return str;
		}
		/*
		 * Convert an array of little-endian words to a base-64 string
		 */

	function binl2b64(binarray) {
		var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		var str = "";
		for (var i = 0; i < binarray.length * 4; i += 3) {
			var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
			for (var j = 0; j < 4; j++) {
				if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
				else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
			}
		}
		return str;
	}
	var M = function(str, abc) {
		var str = hex_md5(str);
		if (abc === "lower") {
			str = str.toLocaleLowerCase();
		}
		if (abc === "upper") {
			str = str.toLocaleUpperCase();
		}
		return str;
	};
	__ton.MD5 = M;
	window.Ton = __ton;
})(typeof Ton !== "undefined" ? Ton : {}, window);﻿/**
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
})(typeof Ton !== "undefined" ? Ton : {}, window);﻿/**
 * JavaScript Template tools of Ton
 * power by[young,by701]
 * function call：Ton.Template.xxx
 * 1,Method comment
 * func1(params);
 */
(function(__ton, window) {
	__ton.Template = {
		cache: {},
		tmpl: function(str, data) {
			var fn = !/\W/.test(str) ?
				this.cache[str] = this.cache[str] ||
				tmpl(document.getElementById(str).innerHTML) :
				new Function("obj",
					"var p=[],print=function(){p.push.apply(p,arguments);};" +
					"with(obj){p.push('" +
					str
					.replace(/[\r\t\n]/g, " ")
					.split("<%").join("\t")
					.replace(/((^|%>)[^\t]*)'/g, "$1\r")
					.replace(/\t=(.*?)%>/g, "',$1,'")
					.split("\t").join("');")
					.split("%>").join("p.push('")
					.split("\r").join("\\'") + "');}return p.join('');");
			return data ? fn(data) : fn;
		}
	};
	window.Ton = __ton;
})(typeof Ton !== "undefined" ? Ton : {}, window);﻿/**
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
})(typeof Ton !== "undefined" ? Ton : {}, window);﻿/**
 * JavaScript Url tools of Ton
 * power by[young,by701]
 * function call：Ton.Url.xxx
 * 1,Method comment
 * func1(params);
 */
(function(__ton, window) {
	//URL Handle
	__ton.Url = {
		getURLParameter: function(param) {
			var url = window.location.search;
			var reg = "/^.*[\\?|\\&]" + param + "\\=([^\\&]*)/";
			reg = eval(reg);
			var ret = url.match(reg);
			if (ret != null) {
				return ret[1];
			} else {
				return "";
			}
		}
	};
	window.Ton = __ton;
})(typeof Ton !== "undefined" ? Ton : {}, window);﻿/**
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
		}
	};
	window.Ton = __ton;
})(typeof Ton !== "undefined" ? Ton : {}, window);﻿/**
 * JavaScript WEIXIN tools of Ton
 * power by[young,by701]
 * function call：Ton.WEIXIN.xxx
 * 1,Method comment
 * func1(params);
 */
(function(__ton, window) {
	__ton.WEIXIN = {
		weixinCount: 20,
		hasWeixinAPI: false,
		run: function(callback) {
			var that = this;
			this.hasWeixinAPI = (typeof window.WeixinJSBridge == 'undefined' || typeof window.WeixinJSBridge.invoke == 'undefined') ? false : true;
			if (this.weixinCount == 0) {
				return;
			};
			if (!this.hasWeixinAPI) {
				this.weixinCount--;
				setTimeout(function() {
					that.run(callback);
				}, 1000);
			} else {
				callback();
			}
		},
		resetTimelineData: function(ObjData) {
			if (this.hasWeixinAPI) {
				WeixinJSBridge.on("menu:share:timeline", function() {
					WeixinJSBridge.invoke("shareTimeline", {
						"img_url": ObjData.imgURL,
						"img_width": ObjData.imgWidth,
						"img_height": ObjData.imgHeight,
						"link": ObjData.appLink,
						"desc": ObjData.appDesc,
						"title": ObjData.appTitle
					});
				});
			};
		},
		resetShareFriendsData: function(ObjData) {
			if (this.hasWeixinAPI) {
				WeixinJSBridge.on('menu:share:appmessage', function() {
					WeixinJSBridge.invoke('sendAppMessage', {
						"appid": "",
						"img_url": ObjData.imgURL,
						"img_width": ObjData.imgWidth,
						"img_height": ObjData.imgHeight,
						"link": ObjData.appLink,
						"desc": ObjData.appDesc,
						"title": ObjData.appTitle
					});
				});
			};
		},
		resetShareTXWeiboData: function(ObjData) {
			if (this.hasWeixinAPI) {
				WeixinJSBridge.on('menu:share:weibo', function() {
					WeixinJSBridge.invoke('shareWeibo', {
						"content": ObjData.appTitle + ' ' + ObjData.appLink,
						"url": ObjData.appLink
					});
				});
			};
		},
		resetWXShareData: function(ObjData) {
			this.resetTimelineData(ObjData);
			this.resetShareFriendsData(ObjData);
			this.resetShareTXWeiboData(ObjData);
		}
	};
	window.Ton = __ton;
})(typeof Ton !== "undefined" ? Ton : {}, window);if (typeof define === "function" && define.amd) {
	define("Ton", [], function() {
		var obj = window.Ton;
		window.Ton = undefined;
		return obj;
	});
}
})(window); //power by team of nbcoders [young,by701] http://nbcoders.com