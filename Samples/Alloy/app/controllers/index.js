function doClick(e) {
	Tealium.trackEvent("next_click", {
		"controller" : "index.js"
	});
	
	Alloy.createController('second').getView().open();
}

$.index.open();

Tealium.trackView("index", {
	"controller" : "index.js"
});
