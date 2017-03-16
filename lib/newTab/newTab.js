/**
 * Created by dinglinan on 2016/3/29.
 */

//
//data struct
//id
//name
//type
//content
//create_time
//create_id
//create_name
//update_time
//update_id
//update_name
//delete_flag

//1.bind event
//2.common method
function getData(cData) {

    return "";
}

function insertData() {
    
}

function deleteData() {
    
}

function updateData() {
    
}

//
function postData2Server(url, data) {
    var resultData = {};
    $.ajax({
        type: 'POST',
        async : false,
        url: url,
        data: data,
        success: function (result) {
            resultData = result;
        },
        dataType: json
    });

    return resultData;
}

jQuery.fn.extend({
    /**
     * 描述:事件触发对象
     * true:为对象本身,否则为其它对象
     ***/
    triggerTarget:function(event){
        return $(this).is(event.target) || $(this).has(event.target).length > 0;
    }
});

$(".test").click(function(){
    $(".colorbox").css({"height":"0px","margin-top":"-200px"});
    $(".colorbox").slowMove(
        {"speed":10,"tween":"Bounce","ease":"easeOut"},
        {"height":"105px","opacity":1,"margin-top":"0px"}
    );
});
$(document).click(function(event){
    var $colorbox = $(".colorbox"),
        $button = $(".test");
    //当点击弹出按钮和弹出框本身的时候不触发关闭事件
    if(!$colorbox.triggerTarget(event) && !$button.triggerTarget(event)) {
        if(!$(".colorbox").isMove()) {
            $colorbox.stop(false,true).animate({"opacity":"0"},500);
        }
    }
});

