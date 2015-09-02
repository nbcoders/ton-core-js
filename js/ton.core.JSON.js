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