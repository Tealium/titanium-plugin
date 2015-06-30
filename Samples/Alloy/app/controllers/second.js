var args = arguments[0] || {};

function doClick(e) {
	Tealium.trackEvent("back_click", {
		"controller" : "second.js"
	});
	
	$.second.close();	
}

Tealium.trackView("second", {
	"controller" : "second.js"
});
