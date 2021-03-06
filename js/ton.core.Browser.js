﻿/**
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
		isIE8e: d.firstChild.nodeType !== 3,

		/**
		 * @name IE7 and earlier, getSetAttribute
		 * @description {Boolean} 利用设置 class 来测试 get/setAttribute('class', 'class') 方法是否被支持，
		 *     在 ie6/7 中不支持（使用 get/setAttribute('className', 'class')）
		 *     因此 ie6/7 中会返回 true，其他浏览器中返回 false
		 * @const
		 */
		isIE7e: d.className === "t",

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
