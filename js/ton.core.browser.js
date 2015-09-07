﻿/**
 * @description 特征检测
 * @todo 以下方法计划将全部改写。从UA迁移至特征检测
 * @contacts: Young, Cherishope
 */

TON.Browser = {

    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
    isOpera: !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,

    //Feature detection. Firefox 1.0+
    isFirefox: typeof InstallTrigger !== 'undefined',

    //Feature detection. At least Safari 3+: "[object HTMLElementConstructor]"
    isSafari: Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0,

    //Feature detection. Chrome 1+
    isChrome: !!window.chrome && !this.isOpera,

    //Feature detection. At least IE6
    isIE: false || !!document.documentMode

}

TON.Device = {

    //if touch device
    isTouchDevice:function(){
        return ('ontouchstart' in window) // works on most browsers
            || ('onmsgesturechange' in window); // works on ie10
    },

    //if IE mobile device
    isIEMobile:function(){
        return !!(navigator.msPointerEnabled);
    },

    //if mobile device, this function is recomend by MDN
    //if this mobile device means mobile phones, except tablets, like this

    //Phone UA:
    //Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>) AppleWebKit/<WebKit Rev> (KHTML, like Gecko) Chrome/<Chrome Rev> Mobile Safari/<WebKit Rev>

    //Tablet UA:
    //Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>) AppleWebKit/<WebKit Rev>(KHTML, like Gecko) Chrome/<Chrome Rev> Safari/<WebKit Rev>

    isMobile: function () {
        return navigator.userAgent.match(/Mobi/i);
    },

    //this function is only used for Android Tablet
    isTablet: function (){
        return navigator.userAgent.match(/Tablet/i);
    },

    //apple device
    isAppleDevice: function() {
        return this.isIPHONE() || this.isIPOD() || this.isIPAD();
    },
    
    //android device
    isAndroidDevice: function() {
        return navigator.userAgent.match(/Android/i);
    }

    //navigator.platform iPhone device return "iPhone", iPad device return "iPad"
    //navigator.platform Linux and Android device will return "Linux aarch64"
    //navigator.platform Windows will return "Win32"
    isIPHONE:function(){
        return navigator.platform.match(/iPhone/i);
    },
    isIPOD:function(){
        return navigator.platform.match(/iPod/i);
    },
    isIPAD:function(){
        return navigator.platform.match(/iPad/i);
    },

    //if it is iPod or iPhone
    isAppleMobile:function(){
        return navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i);
    }
};