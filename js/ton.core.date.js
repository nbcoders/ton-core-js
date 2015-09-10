/***
 * some method for format date
 */
(function(ton) {
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
	ton.Date = D;
	window.Ton = ton;
})(typeof Ton !== "undefined" ? Ton : {});