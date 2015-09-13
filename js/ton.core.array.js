/**
 * JavaScript Array tools of Ton
 * power by[young,by701]
 * function call：Ton.Array.xxx
 * 1,去除数组重复项
 * uniqArray(arr);
 *
 * 2,xxxxxxxx
 * shuffleArray(arr);
 */
(function(__ton, window) {
	var Arr = {
		//去除数组重复项
		uniqArray: function(arr) {
			var a = [],
				o = {},
				i,
				v,
				cv, // corrected value
				len = arr.length;

			if (len < 2) {
				return arr;
			}

			for (i = 0; i < len; i++) {
				v = arr[i];
				cv = 0 + v;
				if (!o[cv]) {
					a.push(v);
					o[cv] = true;
				}
			}
			return a;
		},
		shuffleArray: function(array) {
			for (var i = array.length - 1; i > 0; i--) {
				var j = Math.floor(Math.random() * (i + 1));
				var temp = array[i];
				array[i] = array[j];
				array[j] = temp;
			}
			return array;
		},
		getNElementFromArray: function(array, n) {
			var nArray = [],
				j;
			var originalArray = array;
			if (n > 0) {
				for (var i = 0; i < n;) {
					j = Math.floor(Math.random() * (array.length));
					if ($.inArray(array[j], nArray) < 0) {
						nArray.push(array[j]);
						i++;
					}
				}
			}
			return nArray;
		}
	};
	__ton.Array = Arr;
	window.Ton = __ton;
})(typeof Ton !== "undefined" ? Ton : {}, window);