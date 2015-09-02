//命名空间 TON
var TON = {};
var callBack = function () { };

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