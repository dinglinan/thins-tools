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
;$(function () {
    // ����ģ��
    $(function () {
        var tpls = $.tpls = {};
        $('[type=x-html-template]').each(function (ind, tpl) {
            tpls[tpl.id] = _.template(tpl.innerHTML);
        });
    });


    var tabt_lis = $("#id_tab_t li");
    var tabc_divs = $("#id_tab_c .dv");
    //ѡ��л�
    tabt_lis.click(function () {
        $(this).addClass('act').siblings().removeClass('act');
        var index = tabt_lis.index(this);
        tabc_divs.eq(index).removeClass('hide').siblings('div').addClass('hide');
    });

    //����Ƶ�item����ʾ��ݲ�����ť
    $("#id_tab_c").on("mouseover", "li", function (e) {
        $(this).find(".item_hover").show();
    });
    $("#id_tab_c").on("mouseout", "li", function (e) {
        $(this).find(".item_hover").hide();
    });

    //˫��todo item����༭ģʽ
    $("#id_tab_c").on("click", "li", function (e) {
        $("#id_tab_c .item_hover").hide();
        var lab = $(this).find("label");
        var ipt = $(this).find("input:text");
        ipt.val(lab.text()).removeClass("hide");
        lab.text("");
    });

    //�����ʧȥ������»س����¼�,�˳��༭ģʽ
    $("#id_tab_c").on("blur", " li input:text", function (e) {
        exitEditMode($(this));
    });
    $("#id_tab_c").on("keydown", " li input:text", function (event) {
        if (event.keyCode == "13") {
            exitEditMode($(this));
        }
    });

    $("#id_tab_c .glb_ipt").on({
        "blur": function () {
            //alert(222);
        },
        "keydown": function (event) {
            if (event.keyCode == "13") {
                var data = [];
                data.push({ctnt: $(this).val()}, {ctnt: $(this).val()});

                li_html_cp = generateHtml("id_item_tpl", data);
                $("#id_tab_c div").not(".hide").find("ul").append(li_html_cp);
                $(this).val("");
            }
        }

    });

    //�˳��༭ģʽ
    function exitEditMode(obj) {
        //TODO ���
        var cnt = obj.val();
        if ($.trim(cnt) == "") {
            return;
        }
        obj.prev().text(cnt);
        obj.addClass("hide").val("");
        return;
    }


    //ʹ��ģ������html
    function generateHtml(tmplId, data) {
        var t = $.tpls[tmplId];
        return t(data);
    }


    //���� localStorage ���
    function makeid() {
        for (var text = "", possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", i = 0; 5 > i; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        alert(text);
        return text
    }


});