﻿/**
 * JavaScript LocalData tools of Ton
 * power by[young,by701]
 * function call：Ton.LocalData.xxx
 * 1,Method comment
 * func1(params);
 */
(function(__ton, window) {
	//本地存储支持IE6+,Chrome,FF
	__ton.LocalData = {
		hname: location.hostname ? location.hostname : 'localStatus',
		isLocalStorage: window.localStorage ? true : false,
		dataDom: null,

		initDom: function() { //初始化userData
			if (!this.dataDom) {
				try {
					this.dataDom = document.createElement('input'); //这里使用hidden的input元素
					this.dataDom.type = 'hidden';
					this.dataDom.style.display = "none";
					this.dataDom.addBehavior('#default#userData'); //这是userData的语法
					document.body.appendChild(this.dataDom);
					var exDate = new Date();
					exDate = exDate.getDate() + 30;
					this.dataDom.expires = exDate.toUTCString(); //设定过期时间
				} catch (ex) {
					return false;
				}
			}
			return true;
		},
		set: function(key, value) {
			if (this.isLocalStorage) {
				window.localStorage.setItem(key, value);
			} else {
				if (this.initDom()) {
					this.dataDom.load(this.hname);
					this.dataDom.setAttribute(key, value);
					this.dataDom.save(this.hname)
				}
			}
		},
		get: function(key) {
			if (this.isLocalStorage) {
				return window.localStorage.getItem(key);
			} else {
				if (this.initDom()) {
					this.dataDom.load(this.hname);
					return this.dataDom.getAttribute(key);
				}
			}
		},
		remove: function(key) {
			if (this.isLocalStorage) {
				localStorage.removeItem(key);
			} else {
				if (this.initDom()) {
					this.dataDom.load(this.hname);
					this.dataDom.removeAttribute(key);
					this.dataDom.save(this.hname)
				}
			}
		}
	};
	window.Ton = __ton;
})(typeof Ton !== "undefined" ? Ton : {}, window);