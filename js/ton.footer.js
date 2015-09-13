if (typeof define === "function" && define.amd) {
	define("Ton", [], function() {
		var obj = window.Ton;
		window.Ton = undefined;
		return obj;
	});
}
})(window); //power by team of nbcoders [young,by701] http://nbcoders.com