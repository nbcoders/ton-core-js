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