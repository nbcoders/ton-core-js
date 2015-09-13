/**
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
})(typeof Ton !== "undefined" ? Ton : {}, window);