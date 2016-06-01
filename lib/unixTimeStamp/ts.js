//创建图标
var objImg = new Image();
objImg.src = chrome.extension.getURL("assets/UNIX_TS_2.png");
//objImg.src =" http://exp.bdstatic.com/static/article/widget/top-nav-bar/img/logo_2414da4.png";
objImg.alt = 'Unix TimeStamp';
objImg.title = 'Unix TimeStamp';
objImg.style.display = 'none';
objImg.style.position = 'absolute';
objImg.style.cursor = 'pointer';
document.body.appendChild(objImg);


//绑定鼠标抬起事件
document.onmouseup = function (ev) {
    var ev = ev || window.event,
    //left = ev.clientX,
    //top = ev.clientY;
    //left = ev.screenX,
    //top = ev.screenY;

        left = ev.pageX,
        top = ev.pageY;

    //alert(left + "--" + top);
    if (selectText().length > 0) {
        //解决IE下图标与鼠标对不齐的问题
        setTimeout(function () {
            var stxt = $.trim(selectText());
            if (isNum(stxt)) {
                objImg.style.display = 'block';
                objImg.style.left = left + 15 + 'px';
                objImg.style.top = top - 20 + 'px';
            }
        }, 10);
    }
}

objImg.onclick = function (ev) {
    alert(getTime($.trim(selectText())));
}

//鼠标松开会触发document的mouseup事件/冒泡
objImg.onmouseup = function (ev) {
    var ev = ev || window.event;
    ev.cancelBubble = true;

}

document.onclick = function (ev) {
    objImg.style.display = 'none';
}

function selectText() {
    if (document.selection) {//For ie
        return document.selection.createRange().text;
    } else {
        //alert(window.getSelection().toString());
        return window.getSelection().toString();
    }
}

function isNum(prm){//alert(prm);
    if (!prm || isNaN(prm)) {
        return false;
    }
    return true;
}

//1433728923
function getTime() {
    var ts = arguments[0] || 0;
    if (!isNum(ts)) {
        return "nil";
    }
    ts = parseFloat(ts);
    if (ts < 9999999999) {
        ts = ts * 1000;
    }
    var t, y, m, d, h, i, s;
    t = new Date(ts);
    y = t.getFullYear();
    m = t.getMonth() + 1;
    d = t.getDate();
    h = t.getHours();
    i = t.getMinutes();
    s = t.getSeconds();
    // 可根据需要在这里定义时间格式
    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + (h < 10 ? '0' + h : h) + ':' + (i < 10 ? '0' + i : i) + ':' + (s < 10 ? '0' + s : s);
}

function convertTime() {
    var unixtime = 1433728923;
    var unixTimestamp = new Date(unixtime * 1000);
    commonTime = unixTimestamp.toLocaleString();
    alert(+commonTime);
}





