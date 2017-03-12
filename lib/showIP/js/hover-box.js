var hov = document.createElement('div'), hovConfig = {},
	hbId = 'server_ip_sips_hover_box_id';
	//myFont = document.createStyleSheet();

//import fontawsome
var myStyle = document.createElement('link');
myStyle.href = chrome.extension.getURL('lib/common/font-awesome-4.7.0/css/font-awesome.min.css');
myStyle.rel = 'stylesheet';
myStyle.type = 'text/css';
document.getElementsByTagName('HEAD').item(0).appendChild(myStyle);

//create font awsome ico map marker
var mapMarker = document.createElement('i');
mapMarker.setAttribute("class", "fa fa-map-marker");
mapMarker.setAttribute("aria-hidden", "true");

//import jquery
var myJquery = document.createElement('script');
myJquery.src = chrome.extension.getURL('lib/common/jquery-3.1.0.slim.min.js');
myJquery.type = 'text/javascript';
document.getElementsByTagName('HEAD').item(0).appendChild(myJquery);

//alert($("#id").title);

function add_hover_box() {
	var hs = hov.style;
	hs.position = 'fixed';
	hs.top = '30px';
	hs.right = '20px';
	hs.padding = '4px 6px';
	hs.border = '1px solid #e2e2e2';
	hs.backgroundColor = '#ff0000';
	hs.webkitBorderRadius = '2px';
	hs.fontSize = '13px';
	hs.fontFamily = 'arial';
	hs.fontWeight = 'normal';
	hs.lineHeight = '14px';
	hs.color = '#0cbaff';
	hs.zIndex = 9999999999; /* above WP admin bar 0FCCFF*/
	hov.id = hbId;
	hov.dataset.sipState = 'right';

	hov.addEventListener('mouseover', mover);
}
function mover (e) {
	var el = this,
		sipRight = el.dataset.sipState === 'right';
	if (! hovConfig.still) {
		e.preventDefault();

		el.style.left = sipRight ? '20px' : 'inherit';
		el.style.right = sipRight ? 'inherit' : '20px';
		el.dataset.sipState = sipRight ? 'left' : 'right';
	}
}
function process_response (ipObj) {
	var el = document.getElementById(hbId);
	hovConfig = ipObj;
	if (ipObj && ipObj.myIP) {
		if (ipObj.color) {
			hov.style.backgroundColor = ipObj.color;
		}
		if (ipObj.visible && (! el)) {
			document.body.appendChild(hov);
		} else if ((! ipObj.visible) && el) {
			document.body.removeChild(el);
		}
		//hov.innerText = ipObj.myIP + "  &nbsp;&nbsp;";
		hov.innerHTML =  '<i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp;' + ipObj.myIP;
        //hov.append(mapMarker);
		//todo 当按住control键时，小框框不跑
		//todo 添加双击ip复制到粘贴板
    }
}

add_hover_box();

// send message to background.js to load this tab with relevant information
chrome.extension.sendMessage({'load':true}, process_response);
// receive message from the background.js from a person clicking on the badge
chrome.extension.onMessage.addListener(function (request, sender, response_func) {
	hovConfig.visible = ! hovConfig.visible;
	process_response(hovConfig);
});
