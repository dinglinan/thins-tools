document.addEventListener('DOMContentLoaded', function () {
	var id=chrome.extension.getBackgroundPage();
	chrome.tabs.query( {'active': true, currentWindow: true}, function(tabArray) {
		var hostname=id.getHostname(tabArray[0].url);
		var cache = locache.get(hostname);
		var location_name=cache[1].split(',');
		var country=location_name[location_name.length-1];
		location_name.pop();
		var ip=cache[2];
		var domain=cache[3];
		var alexa=cache[4];
		var wotrep0=cache[5];
		var pagerank=cache[6];
		var quantcast=cache[7];
		$("#location_name").html('<h1>' + country + '</h1><h2>' + location_name.toString() + '</h2>');
		$("#ipaddress").html('<p>IP: <a href="http://www.tcpiputils.com/browse/ip-address/' + ip + '">' + ip + '</a></p>');
		$("#domain").html('<p>Domain: <a href="http://www.tcpiputils.com/browse/domain/' + domain + '">' + domain + '</a></p>');
		$("#alexa").html('Alexa ranking: ' + alexa);
		$("#quantcast").html('Quantcast ranking: ' + quantcast);
		$("#wotrep0").html('WOT reputation: ' + wotrep0);
		$("#pagerank").html('Pagerank: ' + pagerank);
	});

});