// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

Tealium = {};

if (Ti.Platform.name == "android") {
	Tealium = require('com.tealium.appcelerator.android');
} else if (Ti.Platform.name == "iPhone OS") {
	Tealium = require('com.tealium.appcelerator.ios');
	Tealium.initialize = function(accountName, profileName, environment, isRelease) {
		Tealium.enableWithOptions(accountName, profileName, environment, isRelease);
	};
	Tealium.trackView = function(viewName, data) {
		data = data || {};
		if(viewName) {
			data.screen_title = viewName;	
		}
		Tealium.trackViewWithData(data);
	};
	Tealium.trackEvent = function(eventName, data) {
		data = data || {};
		if(eventName) {
			data.link_id = eventName;
		}
		Tealium.trackEventWithData(data);
	};
} else {
	Tealium.initialize = function(accountName, profileName, environment, isRelease) {
		Ti.API.warn("Tealium plugin does not support " + Ti.Platform.name);
	};
	Tealium.trackView = function(viewName, data) {
		Ti.API.warn("Tealium plugin does not support " + Ti.Platform.name);
	};
	Tealium.trackEvent = function(eventName, data) {
		Ti.API.warn("Tealium plugin does not support " + Ti.Platform.name);
	};
}

Tealium.initialize("tealiummobile", "demo", "dev", false);