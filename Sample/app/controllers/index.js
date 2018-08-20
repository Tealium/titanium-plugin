if (Ti.Platform.name == "android") {
  tealium = require("com.tealium.titaniumandroid");
} else if (Ti.Platform.name == "iOS" || Ti.Platform.name == "iPhone OS") {
  tealium = require("com.tealium.titaniumios");
}
function doClick(e) {
  var item = e.section.getItemAt(e.itemIndex);
  if (item.properties.id === "trackEvent") {
    trackEvent()
  } else {
    trackView();
  }
}

function trackView() {
	tealium.trackView("main", "titaniumView", {"sample_view": "true"});
	alert("Tealium View Tracked");
}

function trackEvent() {
	tealium.trackEvent("main", "titaniumEvent", {"sample_event": "true"});
	alert("Tealium Event Tracked");
}

$.index.open();
