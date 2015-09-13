/**
 * JavaScript Template tools of Ton
 * power by[young,by701]
 * function call：Ton.Template.xxx
 * 1,Method comment
 * func1(params);
 */
(function(__ton, window) {
	__ton.Template = {
		cache: {},
		tmpl: function(str, data) {
			var fn = !/\W/.test(str) ?
				this.cache[str] = this.cache[str] ||
				tmpl(document.getElementById(str).innerHTML) :
				new Function("obj",
					"var p=[],print=function(){p.push.apply(p,arguments);};" +
					"with(obj){p.push('" +
					str
					.replace(/[\r\t\n]/g, " ")
					.split("<%").join("\t")
					.replace(/((^|%>)[^\t]*)'/g, "$1\r")
					.replace(/\t=(.*?)%>/g, "',$1,'")
					.split("\t").join("');")
					.split("%>").join("p.push('")
					.split("\r").join("\\'") + "');}return p.join('');");
			return data ? fn(data) : fn;
		}
	};
	window.Ton = __ton;
})(typeof Ton !== "undefined" ? Ton : {}, window);