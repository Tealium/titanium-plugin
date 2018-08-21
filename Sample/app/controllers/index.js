if (Ti.Platform.name == "android") {
  tealium = require("com.tealium.titaniumandroid");
} else if (Ti.Platform.name == "iOS" || Ti.Platform.name == "iPhone OS") {
  tealium = require("com.tealium.titaniumios");
}
// used for iOS
function doClick(e) {
  var item = e.section.getItemAt(e.itemIndex);
  if (item.properties.id === "trackEvent") {
    trackEvent()
  } else if (item.properties.id === "trackView") {
    trackView();
  } else if (item.properties.id === "setOptIn") {
    setOptIn();
  }  else if (item.properties.id === "setOptOut") {
    setOptOut();
  }  else if (item.properties.id === "setOptInWithCategories") {
    setOptInWithCategories();
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

function setOptIn() {
  tealium.setUserConsentStatus("main","consented");
  alert("Consent Status: " + tealium.getUserConsentStatus("main"));
}

function setOptInWithCategories() {
  tealium.setUserConsentCategories("main", ["analytics", "personalization"]);
  alert("Consent Status: Consented with categories: " + tealium.getUserConsentCategories("main").toString());
}

function setOptOut() {
  tealium.setUserConsentStatus("main","notConsented");
  alert("Consent Status: " + tealium.getUserConsentStatus("main"));
}

$.index.open();
