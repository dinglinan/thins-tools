chrome.runtime.onInstalled.addListener(function () {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([
            {
                // That fires when a page's URL contains a 'g' ...
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {schemes: ['https', 'http']}
                    })
                ],
                // And shows the extension's page action.
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });
});



//unix ts
var selection = chrome.contextMenus.create({
    "title": "UNIX TS",
    "contexts": ["selection"],
    "onclick": selectionOnClick
});

function selectionOnClick(info, tab) {
    if (isNum(info.selectionText)) {
        alert(info.selectionText + "\n\r" + getTime(info.selectionText));
    }
}
function isNum(prm) {
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
    //       1435161600000
    if (ts < 9999999999) {
        ts = ts * 1000;
    }
    //alert(ts);
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



