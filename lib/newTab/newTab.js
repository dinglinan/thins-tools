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