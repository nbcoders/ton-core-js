/**
 * @description 特征检测
 * @todo 以下方法计划将全部改写。从UA迁移至特征检测
 * @contacts: Young, Cherishope
 */

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