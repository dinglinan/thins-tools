/**
 * Created by dinglinan on 2016/6/1.
 */

;$(document).ready(function(){
    $("#id_asicc2unicode").click(function(){
        //alert("eeee");
        $("#id_result").val(ASCII2Unicode($("#id_content").val()));
    });
    $("#id_unicode2asicc").click(function(){
        //alert("eeee");
        $("#id_result").val(Unicode2ASCII($("#id_content").val()));
    });
    $("#id_unicode2chn").click(function(){
        //alert("eeee");
        $("#id_result").val(ToGB2312($("#id_content").val()));
    });
    $("#id_chn2unicode").click(function(){
        //alert("eeee");
        $("#id_result").val(ToUnicode($("#id_content").val()));
    });
    $("#id_clear").click(function(){
        //alert("eeee");
        $("#id_result").val("");
        $("#id_content").val("");
    });

});

//Unicode ×ª»» ASCII
function Unicode2ASCII(content) {
    var ret = "error";
    if (isEmpty(content)) {
        return ret;
    }
    content = content.match(/&#(\d+);/g);
    if (content == null) {
        return ret;
    }
    for (var i = 0; i < content.length; i++){
        ret += String.fromCharCode(content[i].replace(/[&#;]/g, ''));
    }

    return ret;
}

//ASCII ×ª»» Unicode
function ASCII2Unicode(content) {
    var ret = "error";
    if (isEmpty(content)) {
        return ret;
    }

    for (var i = 0; i < content.length; i++){
        ret += '&#' + content.charCodeAt(i) + ';';
    }

    return ret;
}

function ToGB2312(str) {
    return unescape(str.replace(/\\u/gi, '%u'));
}

function ToUnicode(str) {
    var txt = escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
    return txt.replace(/%7b/gi, '{').replace(/%7d/gi, '}').replace(/%3a/gi, ':').replace(/%2c/gi, ',').replace(/%27/gi, '\'').replace(/%22/gi, '"').replace(/%5b/gi, '[').replace(/%5d/gi, ']').replace(/%3D/gi, '=').replace(/%20/gi, ' ').replace(/%3E/gi, '>').replace(/%3C/gi, '<').replace(/%3F/gi, '?');
}

function isEmpty(cnt) {
    return (!cnt && typeof(cnt) != "undefined" && cnt != 0);
}