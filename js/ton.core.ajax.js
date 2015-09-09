/***
 * some easy method for ajax
 */
(function(ton) {
	function A(url, type, data, callback) {
		console.log("ajax");
	}
	A.post = function(url, data, callback) {
		console.log("post");
	}
	A.get = function(url, data, callback) {
		console.log("get");
	}
	ton.Ajax = A;
	window.Ton = ton;
})(typeof Ton !== "undefined" ? Ton : {});