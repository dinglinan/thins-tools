var hov = document.createElement('div'), hovConfig = {},
	hbId = 'server_ip_sips_hover_box_id';
function add_hover_box() {
	var hs = hov.style;
	hs.position = 'fixed';
	hs.top = '30px';
	hs.right = '20px';
	hs.padding = '4px 6px';
	hs.border = '1px solid grey';
	hs.backgroundColor = '#ff0000';
	hs.webkitBorderRadius = '0px';
	hs.fontSize = '13px';
	hs.fontFamily = 'arial';
	hs.fontWeight = 'normal';
	hs.lineHeight = '14px';
	hs.color = '#ff0000';
	hs.zIndex = 9900001; /* above WP admin bar 0FCCFF*/
	hov.id = hbId;
	hov.dataset.sipState = 'left';

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
		hov.innerText = ipObj.myIP;
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
