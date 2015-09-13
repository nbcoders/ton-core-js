/**
 * JavaScript WEIXIN tools of Ton
 * power by[young,by701]
 * function call：Ton.WEIXIN.xxx
 * 1,Method comment
 * func1(params);
 */
(function(__ton, window) {
	__ton.WEIXIN = {
		weixinCount: 20,
		hasWeixinAPI: false,
		run: function(callback) {
			var that = this;
			this.hasWeixinAPI = (typeof window.WeixinJSBridge == 'undefined' || typeof window.WeixinJSBridge.invoke == 'undefined') ? false : true;
			if (this.weixinCount == 0) {
				return;
			};
			if (!this.hasWeixinAPI) {
				this.weixinCount--;
				setTimeout(function() {
					that.run(callback);
				}, 1000);
			} else {
				callback();
			}
		},
		resetTimelineData: function(ObjData) {
			if (this.hasWeixinAPI) {
				WeixinJSBridge.on("menu:share:timeline", function() {
					WeixinJSBridge.invoke("shareTimeline", {
						"img_url": ObjData.imgURL,
						"img_width": ObjData.imgWidth,
						"img_height": ObjData.imgHeight,
						"link": ObjData.appLink,
						"desc": ObjData.appDesc,
						"title": ObjData.appTitle
					});
				});
			};
		},
		resetShareFriendsData: function(ObjData) {
			if (this.hasWeixinAPI) {
				WeixinJSBridge.on('menu:share:appmessage', function() {
					WeixinJSBridge.invoke('sendAppMessage', {
						"appid": "",
						"img_url": ObjData.imgURL,
						"img_width": ObjData.imgWidth,
						"img_height": ObjData.imgHeight,
						"link": ObjData.appLink,
						"desc": ObjData.appDesc,
						"title": ObjData.appTitle
					});
				});
			};
		},
		resetShareTXWeiboData: function(ObjData) {
			if (this.hasWeixinAPI) {
				WeixinJSBridge.on('menu:share:weibo', function() {
					WeixinJSBridge.invoke('shareWeibo', {
						"content": ObjData.appTitle + ' ' + ObjData.appLink,
						"url": ObjData.appLink
					});
				});
			};
		},
		resetWXShareData: function(ObjData) {
			this.resetTimelineData(ObjData);
			this.resetShareFriendsData(ObjData);
			this.resetShareTXWeiboData(ObjData);
		}
	};
	window.Ton = __ton;
})(typeof Ton !== "undefined" ? Ton : {}, window);