﻿/**
 * JavaScript moduleName tools of Ton
 * power by[young,by701]
 * function call：Ton.moduleName.xxx
 * 1,Method comment
 * func1(params);
 */

(function (__ton, window) {

    var UA = navigator.userAgent;
    var UP = navigator.platform;

    __ton.Device = {

        //if touch device
        isTouchDevice: function () {
            return ('ontouchstart' in window) // works on most browsers
				|| ('onmsgesturechange' in window); // works on ie10
        },

        //if IE mobile device
        isIEMobile: function () {
            return !!(navigator.msPointerEnabled);
        },

        //if mobile device, this function is recomend by MDN
        //if this mobile device means mobile phones, except tablets, like this

        //Phone UA:
        //Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>) AppleWebKit/<WebKit Rev> (KHTML, like Gecko) Chrome/<Chrome Rev> Mobile Safari/<WebKit Rev>

        //Tablet UA:
        //Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>) AppleWebKit/<WebKit Rev>(KHTML, like Gecko) Chrome/<Chrome Rev> Safari/<WebKit Rev>

        isMobile: function () {
            return UA.match(/Mobi/i);
        },

        //this function is only used for Android Tablet
        isTablet: function () {
            return UA.match(/Tablet/i);
        },

        //apple device
        isAppleDevice: function () {
            return this.isIPHONE() || this.isIPOD() || this.isIPAD();
        },

        //android device
        isAndroidDevice: function () {
            return UA.match(/Android/i);
        },

        //navigator.platform iPhone device return "iPhone", iPad device return "iPad"
        //navigator.platform Linux and Android device will return "Linux aarch64"
        //navigator.platform Windows will return "Win32"
        isIPHONE: function () {
            return UP.match(/iPhone/i);
        },
        isIPOD: function () {
            return UP.match(/iPod/i);
        },
        isIPAD: function () {
            return UP.match(/iPad/i);
        },

        //if it is iPod or iPhone
        isAppleMobile: function () {
            return UA.match(/iPhone/i) || UA.match(/iPod/i);
        }
    };

    window.Ton = __ton;

})(typeof Ton !== "undefined" ? Ton : {}, window);