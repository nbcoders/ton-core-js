/**
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
})(typeof Ton !== "undefined" ? Ton : {}, window);