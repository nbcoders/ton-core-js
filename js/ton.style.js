/**
 * JavaScript moduleName tools of Ton
 * power by[young,by701]
 * function call：Ton.moduleName.xxx
 * 1,Method comment
 * func1(params);
 */
(function(__ton, window) {
	var tmpName = {};
	tmpName.func1 = function() {};
	tmpName.func2 = function() {};

	//.....

	__ton.moduleName = tmpName;
	window.Ton = __ton;
})(typeof Ton !== "undefined" ? Ton : {}, window);