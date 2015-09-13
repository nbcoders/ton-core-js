/**
 * JavaScript Utils tools of Ton
 * power by[young,by701]
 * function call：Ton.Utils.xxx
 * 1,Method comment
 * func1(params);
 */
(function(__ton, window) {
	__ton.Utils = {
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
})(typeof Ton !== "undefined" ? Ton : {}, window);