/**
 * JavaScript Ajax tool  base on https://github.com/snandy/io thanks
 *
 * 1,执行基本ajax请求,返回XMLHttpRequest
 * Ajax.request(url, {
 *	 async   	是否异步 true(默认)
 *	 method  	请求方式 POST or GET(默认)
 *	 type	  	数据格式 json(默认) or xml or text
 *	 encode  	请求的编码 UTF-8(默认)
 *	 timeout 	请求超时时间 0(默认)
 *	 credential 跨域请求时是否带证书(默认false，不带http认证信息如cookie)
 *	 data	  	请求参数 (字符串或json)
 *	 scope   	成功回调执行上下文
 *	 success 	请求成功后响应函数 参数为text,json,xml数据
 *	 failure 	请求失败后响应函数 参数为xmlHttp, msg, exp
 * });
 *
 * 2,执行ajax请求,返回纯文本
 * Ajax.text(url,{
 *		 ...
 * });
 *
 * 3,执行ajax请求,返回JSON
 * Ajax.json(url,{
 *		 ...
 * });
 *
 * 4,执行ajax请求,返回XML
 * Ajax.xml(url,{
 *		 ...
 * });
 */
(function(ton) {
	// Iterator
	function forEach(obj, iterator, context) {
		if (obj.length === +obj.length) {
			for (var i = 0; i < obj.length; i++) {
				if (iterator.call(context, obj[i], i, obj) === true) return
			}
		} else {
			for (var k in obj) {
				if (iterator.call(context, obj[k], k, obj) === true) return
			}
		}
	}

	// parse json string
	function parseJSON(str) {
		try {
			return JSON.parse(str)
		} catch (e) {
			try {
				return (new Function('return ' + str))()
			} catch (e) {}
		}
	}

	// create xhr object
	var createXHR = window.XMLHttpRequest ?
		function() {
			try {
				return new XMLHttpRequest()
			} catch (e) {}
		} :
		function() {
			try {
				return new window.ActiveXObject('Microsoft.XMLHTTP')
			} catch (e) {}
		}

	// object to queryString
	function serialize(obj) {
		var a = []
		forEach(obj, function(val, key) {
			if (IO.isArray(val)) {
				forEach(val, function(v, i) {
					a.push(key + '=' + encodeURIComponent(v))
				})
			} else {
				a.push(key + '=' + encodeURIComponent(val))
			}
		})
		return a.join('&')
	}

	// empty function
	function noop() {}

	function request(url, options) {
		if (typeof url === 'object') {
			options = url
			url = options.url
		}
		var xhr, isTimeout, timer, options = options || {}
		var async = options.async !== false,
			method = options.method || 'GET',
			type = options.type || 'json',
			encode = options.encode || 'UTF-8',
			timeout = options.timeout || 0,
			credential = options.credential,
			data = options.data,
			scope = options.scope,
			success = options.success || noop, //TODO
			failure = options.failure || noop //TODO maybe is not a function so should typeof

		// 大小写都行，但大写是匹配HTTP协议习惯	
		method = method.toUpperCase()

		// 对象转换成字符串键值对
		if (data && typeof data === 'object') {
			data = serialize(data)
		}
		if (method === 'GET' && data) {
			url += (url.indexOf('?') === -1 ? '?' : '&') + data
		}

		xhr = createXHR()
		if (!xhr) {
			return
		}

		isTimeout = false
		if (async && timeout > 0) {
			timer = setTimeout(function() {
				// 先给isTimeout赋值，不能先调用abort
				isTimeout = true
				xhr.abort()
			}, timeout)
		}
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (isTimeout) {
					failure(xhr, 'request timeout')
				} else {
					onStateChange(xhr, type, success, failure, scope)
					clearTimeout(timer)
				}
			}
		}
		xhr.open(method, url, async)
		if (credential) {
			xhr.withCredentials = true
		}
		if (method == 'POST') {
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=' + encode)
		}
		xhr.send(data)
		return xhr
	}

	function onStateChange(xhr, type, success, failure, scope) {
		var s = xhr.status,
			result
		if (s >= 200 && s < 300) {
			switch (type) {
				case 'text':
					result = xhr.responseText
					break
				case 'json':
					result = parseJSON(xhr.responseText)
					break
				case 'xml':
					result = xhr.responseXML
					break
			}
			// text, 返回空字符时执行success
			// json, 返回空对象{}时执行suceess，但解析json失败，函数没有返回值时默认返回undefined
			result !== undefined && success.call(scope, result)

		} else {
			failure(xhr, xhr.status)
		}
		xhr = null
	}
	var A = (function() {
		var i, Ajax = {
				request: request
			},
			types = ['text', 'json', 'xml']
		for (i = 0, len = types.length; i < len; i++) {
			Ajax[types[i]] = function(i) {
				return function(url, opt) {
					opt = opt || {}
					opt.type = types[i]
					return request(url, opt)
				}
			}(i)
		}
		return Ajax
	})();
	ton.Ajax = A;
	window.Ton = ton;
})(typeof Ton !== "undefined" ? Ton : {});
