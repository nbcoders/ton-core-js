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