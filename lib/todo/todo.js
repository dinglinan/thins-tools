/**
 * Created by dingjiang on 8/3/16.
 */
//1.load data from localstorage,contents configs and todo datas
//2.append html
//3.comn method
//    a. append node
//    b. del node
//    c. mark as done
//    d. drag and drop
//    e.e
//alert("www");
;$(function(){
    var hover_html = '<div class="item_hover"> <a href="#" class="item_move" onclick="moveTodo(todo)">ltr</a> <a href="#" class="item_delete" onclick="remove(todo)">del</a> </div>';
    var input_html = '<input type="checkbox"/> <input type="text" id="id_dy_inpt" value="333333333">';

    var tabt_lis = $("#id_tab_t li");
    var tabc_divs = $("#id_tab_c .dv");
    //选项卡切换
    tabt_lis.click(function() {
        $(this).addClass('act').siblings().removeClass('act');
        var index = tabt_lis.index(this);
        tabc_divs.eq(index).removeClass('hide').siblings('div').addClass('hide');
    });

    //鼠标移到item上显示快捷操作按钮
    $("#id_tab_c li").on({
        "mouseover" : function(){
            $("this").siblings().find(".item_hover").remove();
            $(this).append(hover_html);
        },
        "mouseout" : function(){
            $("#id_tab_c .item_hover").remove();
        }

    });

    //双击todo item进入编辑模式
    $("#id_tab_c li label").on({
        "click" : function(){
            $("#id_tab_c .item_hover").remove();
            var item_txt = $(this).text();
            $(this).text("");
            $(this).next().val(item_txt).removeClass("hide");
        }
    });

    $("#id_tab_c li input:text").on({
        "blur" : function(){
            //alert(222);
        },
        "keydown" : function(event){
            if(event.keyCode == "13"){
                alert("enter");
            }
        }

    });


});