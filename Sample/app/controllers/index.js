if (Ti.Platform.name == "android") {
  tealium = require("com.tealium.titaniumandroid");
} else if (Ti.Platform.name == "iOS" || Ti.Platform.name == "iPhone OS") {
  tealium = require("com.tealium.titaniumios");
}
function doClick(e) {
  var item = e.section.getItemAt(e.itemIndex);
  console.log(item);
	tealium.trackEvent("main", "titaniumEvent", {"sample_event": "true"});
	alert("Tealium Event Tracked");
}

function trackView(e) {
	tealium.trackView("main", "titaniumView", {"sample_view": "true"});
	alert("Tealium View Tracked");
}

$.index.open();
