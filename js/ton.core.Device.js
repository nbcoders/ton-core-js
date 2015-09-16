/**
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
        // 'ontouchstart' in window works on most browsers, 'onmsgesturechange' in window works on ie10
        isTouchDevice: ('ontouchstart' in window) || ('onmsgesturechange' in window),

        //if IE mobile device
        isIEMobile: !!(navigator.msPointerEnabled),

        //if mobile device, this function is recomend by MDN
        //if this mobile device means mobile phones, except tablets, like this

        //Phone UA:
        //Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>) AppleWebKit/<WebKit Rev> (KHTML, like Gecko) Chrome/<Chrome Rev> Mobile Safari/<WebKit Rev>

        //Tablet UA:
        //Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>) AppleWebKit/<WebKit Rev>(KHTML, like Gecko) Chrome/<Chrome Rev> Safari/<WebKit Rev>

        isMobile: /Mobi/i.test(UA),

        //this function is only used for Android Tablet
        isTablet: /Tablet/i.test(UA),

        //apple device
        isAppleDevice: this.isIPHONE() || this.isIPOD() || this.isIPAD(),

        //android device
        isAndroidDevice: /Android/i.test(UA),

        //navigator.platform iPhone device return "iPhone", iPad device return "iPad"
        //navigator.platform Linux and Android device will return "Linux aarch64"
        //navigator.platform Windows will return "Win32"
        isIPHONE: /iPhone/i.test(UP),
        isIPOD: /iPod/i.test(UP),
        isIPAD: /iPad/i.test(UP),

        //if it is iPod or iPhone
        isAppleMobile: /iPhone/i.test(UA) || /iPod/i.test(UA)
    };

    window.Ton = __ton;

})(typeof Ton !== "undefined" ? Ton : {}, window);
