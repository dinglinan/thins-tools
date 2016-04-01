var flagutils = {

	ajaxtimeout : 10000,
	cachetimeout: 3600*24*30,
	apiversion : "1.0",
	extversion: chrome.runtime.getManifest().version,
	source: navigator.vendor.substring(0,5).toLowerCase()=="opera" ? "operaext" : "chromeext",
	tabid: -1,
	debugmode: false

};

window.onload = loadconfig();

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.status == "loading") onUpdated(tab);
});

function loadconfig () {
	locache.cleanup();
}

function setflag (country_code,title) {
	if (flagutils.debugmode) console.log('set icon -' + flagutils.tabid + ' ' + country_code + ' ' + title);
	chrome.pageAction.setIcon({path: 'images/flags/' + country_code + '.png',tabId: flagutils.tabid});
	chrome.pageAction.setTitle({title: title,tabId: flagutils.tabid});
	chrome.pageAction.show(flagutils.tabid);
}

function onApiResultSuccess(result) {
	try {
		api=JSON.parse(result);
		if (api.status == "succeed" && api.country_code != null) {
			setflag(api.country_code,api.location_name);
			locache.set(api.hostname, [api.country_code,api.location_name,api.ip,api.domain,api.alexa,api.wotrep0,api.pagerank,api.quantcast], flagutils.cachetimeout);
		} else {
			onApiResultError();
			locache.set(api.hostname, ['u1','Unknown location','n/a','n/a','n/a','n/a','n/a','n/a'], flagutils.cachetimeout);
		}
	} catch(e){
		onApiResultError();
	}
}

function onApiResultError(result) {
	if (flagutils.debugmode) console.log('api call error');
	setflag('u1','Unknown location');
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
	jQuery.ajax({url: 'https://www.utlsapi.com/plugin.php?' + components.join("&"),
		 success: onApiResultSuccess,
		 error: onApiResultError,
		 timeout: flagutils.ajaxtimeout
	});
}

function onUpdated(tab) {alert(111);
	flagutils.tabid=tab.id;
	var hostname = getHostname(tab.url);
	if (hostname) {
		hostname=punycode.toASCII(hostname);
		if (ispvt(hostname)) {
			setflag('pvt','Private IP address');
			locache.set(hostname, ['pvt','Private IP address',hostname,'n/a','n/a','n/a','n/a','n/a'], flagutils.cachetimeout);
		} else {
			var cache = locache.get(hostname);
			if (cache!=null) {
				if (flagutils.debugmode) console.log('cache hit - ' + hostname);
				setflag(cache[0],cache[1]);
			} else {
				if (flagutils.debugmode) console.log('start api call - ' + hostname);
				apicall(hostname);
			}
		}
	}
}

function getHostname(str) {
	try {
		var re = new RegExp('^(?:f|ht)tp(?:s)?\://([^/|:]+)', 'im');
		return str.match(re)[1].toString();
	} catch (e) {
		return null;
	}
};

function ispvt(hostname) {
	var re = /^((^[a-z0-9-_]+$)|((10|127)\.\d+|(172\.(1[6-9]|2[0-9]|3[01])|192\.168))\.\d+\.\d+)$/i;
	return re.test(hostname);
}