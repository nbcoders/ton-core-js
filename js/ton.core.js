//命名空间 TON
var TON = {};
var callBack = function () { };

//字符串操作
TON.String = {
    //去除左边和右边的空格,返回string
    trim: function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    //去除左边的空格，返回lstring
    ltrim: function (str) {
        return str.replace(/^\s*/g, '');
    },
    //去除右边的空格，返回rstring
    rtrim: function (str) {
        return str.replace(/\s*$/, '');
    },
    //判断字符串是否相等，返回bool
    equals: function (str1, str2) {
        return str1 == str2;
    },
    //判断忽略大小写比较两个字符串是否相等，返回bool
    equalsIgnoreCase: function (str1, str2) {
        return str1.toUpperCase() == str2.toUpperCase();
    },
    //将字符串转换为数组,两个参数：字符串，字符串分隔符
    stringToArray: function (str, delimiter) {
        return str.split(delimiter);
    }
};

//数组操作
TON.Arr = {
    //去除数组重复项
    uniqArray: function (arr) {
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
    shuffleArray:function(array){
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    },
    getNElementFromArray:function(array, n){
        var nArray = [], j;
        var originalArray = array;
        if (n > 0) {
            for (var i = 0; i < n; ) {
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

//JSON
TON.JSON = {
    isEmpty:function(o){
        for (var i in o) {
            return false
        };
        return true;
    },
    getLength:function(o){
        var l = 0;
        for (var i in o) {
            if (o.hasOwnProperty(i)) {
                l++;
            }
        };
        return l;
    }
};

//表单验证
TON.Validation = {
    //判断是否是邮箱,返回bool
    isEmail: function (str) {
        var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        return reg.test(str);
    },
    //中英文数字下划线1-16个字符
    isAccount: function (str) {
        var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,16}$/;
        //var reg = /^[a-zA-Z0-9_]{6,16}$/;
        return reg.test(str);
    },
    //中英文数字下划线6-16个字符
    isLoginAccount: function (str) {
        var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{6,16}$/;
        //var reg = /^[a-zA-Z0-9_]{6,16}$/;
        return reg.test(str);
    },
    //判断是否是邮编，判断3位数到12位数,并包含字母和空格，返回bool
    isPost: function (str) {
        var patrn = /^[a-zA-Z0-9 ]{3,12}$/;
        if (!patrn.exec(str)) return false
        return true
    },
    //校验手机号码：必须以数字开头,返回bool //00852验证香港区号
    isMobile: function (str) {
        //严格
        //var patrn = /^(13[0-9]|15[012356789]|18[0-9]|14[57]|00852)[0-9]{8}$/;
        //宽松
        var patrn = /^(1)[0-9]{10}$/;
        return patrn.test(str);
    },
    //校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”
    isTel: function (str) {
        var patrn = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
        if (!patrn.exec(str)) return false;
        return true;
    },
    //判断是否是QQ号码，返回bool
    isQQ: function (str) {
        return /^\d{5,11}$/.test(str);
    },
    //判断是否日期类型(例:2005-12-12)，返回bool
    isDate: function (str) {
        var reg = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/;
        if (reg.test(str)) {
            return true;
        }
        return false;
    },
    //判断是否是合法的身份证号，返回bool
    isIdCardNo: function (num) {
        //reg15  reg15=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
        //reg18  reg18=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
        //reg 综合15,18位量种，并可检测尾部X
        var reg = /^(\d{6})(18|19|20)?(\d{2})([01]\d)([0123]\d)(\d{3})(\d|X)?$/;
        if (reg.test(num)) {
            return true;
        }
        return false;
    },
    //判断是否是合法IP，返回bool
    isIP: function (str) {
        var reg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
        if (reg.test(str)) {
            return true;
        }
        return false;
    },
    //校验密码：只能输入6-15个字母、数字
    isPasswd: function (s) {
        var patrn = /^[a-zA-Z0-9]{6,15}$/;
        if (!patrn.exec(s)) return false;
        return true;
    },
    //判断判断是否中文,返回bool
    isChinese: function (str) {
        var str = str.replace(/(^\s*)|(\s*$)/g, '');
        if (!(/^[\u4E00-\uFA29]*$/.test(str)
                && (!/^[\uE7C7-\uE7F3]*$/.test(str)))) {
            return false;
        }
        return true;
    },
    //1-16个中英文，不含数字
    isChEn: function (s) {
        var patrn = /^[a-zA-Z\u4E00-\u9FA5]{2,16}$/;
        if (!patrn.exec(s)) return false;
        return true;
    },
    //判断是否是一个图片格式的文件jpg|jpeg|png|swf|gif，返回bool
    isImg: function (str) {
        var objReg = new RegExp("[.]+(jpg|jpeg|png|swf|gif)$", "gi");
        if (objReg.test(str)) {
            return true;
        }
        return false;
    },
    //判断是否是整型,返回bool
    isInteger: function (str) {
        return /^-?\d+$/.test(str);
    },
    //判断是否是一个浮点数，返回bool
    isFloat: function (str) {
        return /^(-?\d+)(\.\d+)?$/.test(str);
    }
};

//表单验证提示信息
TON.ValTips = {
    
};

//URL Handle
TON.Url = {
    getURLParameter: function(param){
        var url = window.location.search;
        var reg = "/^.*[\\?|\\&]" + param + "\\=([^\\&]*)/";  
        reg = eval(reg);
        var ret = url.match(reg);
        if (ret != null) {
            return ret[1];
        } else {
            return "";
        }
    }
};

//类型判断（come from 《高质量的js》）
TON.Type = {
    //是否是数字,1或者"1"都通过
    isNumber: function (s) {
        return !isNaN(s);
    },
    isString: function (s) {
        return typeof s === "string";
    },
    isBoolean: function (s) {
        return typeof s === "boolean";
    },
    isFunction: function (s) {
        return typeof s === "function";
    },
    isNull: function (s) {
        return s === null;
    },
    isUndefined: function (s) {
        return typeof s === "undefined";
    },
    //带有空格的字符串也为true
    isEmpty: function (s) {
        return /^\s*$/.test(s);
    },
    isArray: function (s) {
        //jQuery code
        //return Object.prototype.toString.call(obj) === '[object Array]';  
        //《高质量的js》 code
        return s instanceof Array;
    }
};

TON.Lang = {
    extend: function (subClass, superClass) {
        var F = function () { };
        F.prototype = superClass.prototype;
        subClass.prototype = new F();
        subClass.prototype.constructor = subClass;
        subClass.superclass = superClass.prototype;
        if (superClass.prototype.constructor == Object.prototype.constructor) {
            superClass.prototype.constructor = superClass;
        }
    }
};

TON.Cookie = {
    //读取
    get: function (name) {
        var cookieStr = "; " + document.cookie + "; ";
        var index = cookieStr.indexOf("; " + name + "=");
        if (index != -1) {
            var s = cookieStr.substring(index + name.length + 3, cookieStr.length);
            return unescape(s.substring(0, s.indexOf("; ")));
        } else {
            return null;
        }
    },
    set: function (name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    },
    del: function (name) {
        var exp = new Date(new Date().getTime() - 1);
        var s = this.get(name);
        if (s != null) {
            document.cookie = name + "=" + s + ";expires=" + exp.toGMTString() + ":path=/"
        };
    }
};

TON.Utils = {
    copyToClipboard:function(txt){
        if(window.clipboardData){
            window.clipboardData.clearData();  
            window.clipboardData.setData("Text", txt);
        }else{
            window.prompt("您可以复制以下游戏地址", txt);  
        }
    }
};

//本地存储支持IE6+,Chrome,FF
TON.LocalData = {
    hname: location.hostname ? location.hostname : 'localStatus',
    isLocalStorage: window.localStorage ? true : false,
    dataDom: null,

    initDom: function () { //初始化userData
        if (!this.dataDom) {
            try {
                this.dataDom = document.createElement('input');//这里使用hidden的input元素
                this.dataDom.type = 'hidden';
                this.dataDom.style.display = "none";
                this.dataDom.addBehavior('#default#userData');//这是userData的语法
                document.body.appendChild(this.dataDom);
                var exDate = new Date();
                exDate = exDate.getDate() + 30;
                this.dataDom.expires = exDate.toUTCString();//设定过期时间
            } catch (ex) {
                return false;
            }
        }
        return true;
    },
    set: function (key, value) {
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
    get: function (key) {
        if (this.isLocalStorage) {
            return window.localStorage.getItem(key);
        } else {
            if (this.initDom()) {
                this.dataDom.load(this.hname);
                return this.dataDom.getAttribute(key);
            }
        }
    },
    remove: function (key) {
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

TON.Template = {
    cache: {},
    tmpl: function (str, data) {
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
              .split("\r").join("\\'")
          + "');}return p.join('');");
        return data ? fn(data) : fn;
    }
};

TON.UA = {
    isTouchDevice:function(){
        return !!('ontouchstart' in window) // works on most browsers 
            || !!('onmsgesturechange' in window); // works on ie10 
    },
    isIEMobile:function(){
        return !!(window.navigator.msPointerEnabled);
    },
    isAppleDevice:function(){
        return (navigator.platform.indexOf('iPad') != -1);
    },
    //is iPod or iPhone
    isIPHONE:function(){
        return navigator.userAgent.match(/iPhone/i);
    },
    isIPOD:function(){
        return navigator.userAgent.match(/iPod/i);
    },
    isIPAD:function(){
        return navigator.userAgent.match(/iPod/i);
    },
    //is iPod or iPhone
    isAppleMobile:function(){
        return navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i);
    }
};

TON.Events = {
    //阻止冒泡
    stopBubble:function(e){
        if ( e && e.stopPropagation ) {
            e.stopPropagation();
        }else {
            window.event.cancelBubble = true;
        }
    }
};

TON.WEIXIN = {
    weixinCount:20,
    hasWeixinAPI:false,
    run:function(callback){
        var that = this;
        this.hasWeixinAPI = (typeof window.WeixinJSBridge == 'undefined' || typeof window.WeixinJSBridge.invoke == 'undefined') ? false : true;
        if(this.weixinCount == 0) { return; };
        if(!this.hasWeixinAPI){
            this.weixinCount-- ;
            setTimeout(function(){
                that.run(callback);
            },1000);
        }else{
            callback();
        }
    },
    resetTimelineData:function(ObjData){
        if (this.hasWeixinAPI) {
            WeixinJSBridge.on("menu:share:timeline", function(){
                WeixinJSBridge.invoke("shareTimeline",{
                    "img_url":    ObjData.imgURL,
                    "img_width":  ObjData.imgWidth,
                    "img_height": ObjData.imgHeight,
                    "link":       ObjData.appLink,
                    "desc":       ObjData.appDesc,
                    "title":      ObjData.appTitle
                });
            });
        };
    },
    resetShareFriendsData:function(ObjData){
        if (this.hasWeixinAPI) {
            WeixinJSBridge.on('menu:share:appmessage', function(){
                WeixinJSBridge.invoke('sendAppMessage',{
                    "appid":     "",
                    "img_url":   ObjData.imgURL,
                    "img_width": ObjData.imgWidth,
                    "img_height":ObjData.imgHeight,
                    "link":      ObjData.appLink,
                    "desc":      ObjData.appDesc,
                    "title":     ObjData.appTitle
                });
            });
        };
    },
    resetShareTXWeiboData:function(ObjData){
        if (this.hasWeixinAPI) {
            WeixinJSBridge.on('menu:share:weibo', function(){
                WeixinJSBridge.invoke('shareWeibo',{
                    "content":ObjData.appTitle+' '+ObjData.appLink,
                    "url":ObjData.appLink
                });
            });
        };
    },
    resetWXShareData:function(ObjData){
        this.resetTimelineData(ObjData);
        this.resetShareFriendsData(ObjData);
        this.resetShareTXWeiboData(ObjData);
    }
};
