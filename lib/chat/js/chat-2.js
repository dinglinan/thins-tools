
;$(document).ready(function() {


    //输入框获得焦点
    $("#id_input_area").focus();
    //alert(1);
    //监听回车事件
    $("body").keydown(function() {
        if (event.ctrlKey && event.keyCode == "13") {//同时按下ctrl和enter，换行
            addLineBreak();
        }else if (event.keyCode == "13") {//keyCode=13是回车键，执行发送消息
            sendMsg();
        }
    });

});

//show time
var websocket = null;

//判断当前浏览器是否支持WebSocket
if ('WebSocket' in window) {
    websocket = new WebSocket("ws://localhost:8080/websocket");
} else {
    alert("当前浏览器 Not support websocket，请联系管理员");
}

//连接发生错误的回调方法
websocket.onerror = function () {
    showSysInfo("WebSocket连接发生错误");
};

//连接成功建立的回调方法
websocket.onopen = function () {
    showSysInfo("WebSocket连接成功");
}

//接收到消息的回调方法
websocket.onmessage = function (event) {
    showSysInfo(event.data);
    //展示消息等一系列操作：1-展示消息 2-播放声音
    newMsgIn();
    //给服务端发送消息，告诉他消息接收成功，可以删掉队列里内容
    websocket.send(event.data);

}

//连接关闭的回调方法
websocket.onclose = function () {
    showSysInfo("WebSocket连接关闭");
}

//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
    closeWebSocket();
}


//关闭WebSocket连接
function closeWebSocket() {
    websocket.close();
}

//发送消息
function sendMsg() {
    var msg = $("#id_input_area").text();
    websocket.send(msg);
    $("#id_input_area").text("");
}

//追加换行符
function addLineBreak() {
    var msg = $("#id_input_area").text()+"\n";
    $("#id_input_area").content(msg);
    return;
}

function showSysInfo(info) {
    //todo
    alert(info);
}

//超链接的模板
var hrefHtml = '<a href="##href##" target="_blank"> ##href## </a>'

var itsMeCls = "layim-chat-mine";
var msgTpl = '<li class="##itsMe##">'+
                '<div class="layim-chat-user">'+
                    '<img src="##avtar##" />'+
                    '<cite>##userName##<i>##msgDate##</i></cite>'+
                '</div>'+
                '<div class="layim-chat-text">'+
                    '##msgBody##'+
                '</div>'+
            '</li>';

var imgTpl = '<img alt="##alt##" title="##title##" src="##src##" />';

function newMsgIn() {
    //有新消息时播放提示音
    $("#id_new_mgs_audio").get(0).play();
}

function appendMsg(data) {
    //当前消息是不是我发出的
    var itsMe = data.uid == "get it from session storage";
    //当前消息靠左还是靠右（我发出的靠右）
    var _itsMeCls = itsMe ? "" : itsMeCls;
    //用户头像
    var _avtar = getUserAvtarByUid(data.uid);
    var mgsHtml = msgTpl.replace("##itsMe##", _itsMeCls)
            .replace("##avtar##", _avtar)
            .replace("##userName##", data.userName)
            .replace("##msgDate##", data.msgDate)
            .replace("##msgBody##", data.msgBody);
    //todo 我发消息时的转圈圈
    $("#").append(mgsHtml);

}

function getUserAvtarByUid(uid) {
    return;
}

var reg = /^[a-zA-z]+://(/w+(-/w+)*)(/.(/w+(-/w+)*))*(/?/S*)?$/;
function isUrl(str) {
    return reg.test(str);
}