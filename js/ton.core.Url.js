/**
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
})(typeof Ton !== "undefined" ? Ton : {}, window);