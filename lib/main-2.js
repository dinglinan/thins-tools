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


var flagutils = {

    ajaxtimeout: 10000,
    cachetimeout: 3600 * 24 * 30,
    apiversion: "1.0",
    extversion: chrome.runtime.getManifest().version,
    source: navigator.vendor.substring(0, 5).toLowerCase() == "opera" ? "operaext" : "chromeext",
    tabid: -1,
    debugmode: true

};

window.onload = loadconfig();


function loadconfig() {
    alert(111);
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "loading") onUpdated(tab);
});

function onUpdated(tab) {
    alert(111);
    //getTime();
    //alert(getTime(1433728923207));

    flagutils.tabid = tab.id;
    var hostname = getHostname(tab.url);
    if (hostname) {
        hostname = punycode.toASCII(hostname);
        if (ispvt(hostname)) {
            setflag('pvt', 'Private IP address');
            locache.set(hostname, ['pvt', 'Private IP address', hostname, 'n/a', 'n/a', 'n/a', 'n/a', 'n/a'], flagutils.cachetimeout);
        } else {
            var cache = locache.get(hostname);
            if (cache !== null) {
                if (flagutils.debugmode) console.log('cache hit - ' + hostname);
                setflag(cache[0], cache[1]);
            } else {
                if (flagutils.debugmode) console.log('start api call - ' + hostname);
                apicall(hostname);
            }
        }
    }

}

function setflag(country_code, title) {
    if (flagutils.debugmode) console.log('set icon -' + flagutils.tabid + ' ' + country_code + ' ' + title);
    chrome.pageAction.setIcon({path: 'images/flags/' + country_code + '.png', tabId: flagutils.tabid});
    chrome.pageAction.setTitle({title: title, tabId: flagutils.tabid});
    chrome.pageAction.show(flagutils.tabid);
}
/*
 *
 * */
function onApiResultSuccess(result) {
    try {
        api = JSON.parse(result);
        if (api.status == "succeed" && api.country_code !== null) {
            setflag(api.country_code, api.location_name);
            locache.set(api.hostname, [api.country_code, api.location_name, api.ip, api.domain, api.alexa, api.wotrep0, api.pagerank, api.quantcast], flagutils.cachetimeout);
        } else {
            onApiResultError();
            locache.set(api.hostname, ['u1', 'Unknown location', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a'], flagutils.cachetimeout);
        }
    } catch (e) {
        onApiResultError();
    }
}

function onApiResultError(result) {
    if (flagutils.debugmode) console.log('api call error');
    setflag('u1', 'Unknown location');
}

function apicall(hostname) {
    var urlparams = {
        version: flagutils.apiversion,
        type: 'flaginfo',
        hostname: hostname,
        source: flagutils.source,
        extversion: flagutils.extversion
    };
    var components = [];
    for (var i in urlparams) {
        components.push(i + "=" + encodeURIComponent(urlparams[i]));
    }
    jQuery.ajax({
        url: 'https://www.utlsapi.com/plugin.php?' + components.join("&"),
        success: onApiResultSuccess,
        error: onApiResultError,
        timeout: flagutils.ajaxtimeout
    });
}


function getHostname(str) {
    try {
        var re = new RegExp('^(?:f|ht)tp(?:s)?\://([^/|:]+)', 'im');
        return str.match(re)[1].toString();
    } catch (e) {
        return null;
    }
}

function ispvt(hostname) {
    var re = /^((^[a-z0-9-_]+$)|((10|127)\.\d+|(172\.(1[6-9]|2[0-9]|3[01])|192\.168))\.\d+\.\d+)$/i;
    return re.test(hostname);
}

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



