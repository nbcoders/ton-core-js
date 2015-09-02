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