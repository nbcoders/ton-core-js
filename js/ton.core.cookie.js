/**
 * JavaScript Cookie tools of Ton
 * power by[young,by701]
 * function call：Ton.Cookie.xxx
 * 1,Method comment
 * func1(params);
 */
(function(__ton, window) {
	__ton.Cookie = {
		//读取
		get: function(name) {
			var cookieStr = "; " + document.cookie + "; ";
			var index = cookieStr.indexOf("; " + name + "=");
			if (index != -1) {
				var s = cookieStr.substring(index + name.length + 3, cookieStr.length);
				return unescape(s.substring(0, s.indexOf("; ")));
			} else {
				return null;
			}
		},
		set: function(name, value, days) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				var expires = "; expires=" + date.toGMTString();
			} else var expires = "";
			document.cookie = name + "=" + value + expires + "; path=/";
		},
		del: function(name) {
			var exp = new Date(new Date().getTime() - 1);
			var s = this.get(name);
			if (s != null) {
				document.cookie = name + "=" + s + ";expires=" + exp.toGMTString() + ":path=/"
			};
		}
	};
	window.Ton = __ton;
})(typeof Ton !== "undefined" ? Ton : {}, window);