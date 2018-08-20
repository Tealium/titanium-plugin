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
var tealium;
var typeOf = function(e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
// initialize the relevant plugin for the current platform
if (Ti.Platform.name === "android") {
  tealium = require("com.tealium.titaniumandroid");
} else if (Ti.Platform.name === "iOS" || Ti.Platform.name === "iPhone OS") {
  tealium = require("com.tealium.titaniumios");
}
// params: instance name, account, profile, environment, data source,
tealium.initTealium("main", "tealiummobile", "demo", "dev", "bbb111", null, null, true, true, true);
tealium.setUserConsentCategories("main",["analytics", "affiliates", "big_data", "cdp", "cookiematch", "crm", "displayads", "email", "engagement", "mobile", "monitoring", "personalization", "search", "social", "misc"]);
// // var tealium = require("com.tealium.titaniumandroid");/*
// tealium.initTealium("main","tealiummobile", "demo", "dev", "abc123", null, null, true, true);
// // setTimeout(function(){tealium.triggerCrash()},6000);
//
// tealium.addRemoteCommand("main", "logger", function(response){
//   alert("tagbridge called!");
// });
tealium.addRemoteCommand("main", "log", function(response){
  alert("Remote command 'log' called!");
  if (typeOf(response) === "string") {
    response = JSON.parse(response);
  }
  if (response.response) {
    console.log("response.response is: " + response.response);
    alert("Response: " + response.command_id);
  }
});
tealium.setVolatile("main", {"zzzstringvolatile": "I've Changed"});
tealium.setVolatile("main", {"zzzarraynew": ["I've Changed", "again"]});
tealium.setVolatile("main", {"hello": {"hello":["I've Changed", "again"]}});
tealium.setPersistent("main", {"zzzstring": "Hello"});
tealium.setPersistent("main", {"zzzarraypersist": ["Hello Again", "Dave"]});
tealium.enableAdIdentifier("main", false);
// // broadcast receiver for install referrer
// var installReferrerReceiver = Ti.Android.createBroadcastReceiver({
//   onReceived : function(e) {
//         var intent = e.intent,
//             referrer = intent.getStringExtra("referrer");
//             if (referrer) {
//               tealium.setVolatile("main", {"install_referrer": referrer});
//             }
//     }
// });
// Ti.Android.registerBroadcastReceiver(installReferrerReceiver, ["com.android.vending.INSTALL_REFERRER"]);
setTimeout(function(){
  alert(tealium.getVolatile("main", "zzzstringvolatile"));
}, 1000);
setTimeout(function(){
  var item = tealium.getVolatile("main", "zzzarraynew");
  item = item.toString();
  alert("Item is: " + item);
}, 2000);
setTimeout(function(){
  var item = tealium.getVolatile("main", "hello");
  item = item["hello"];
  item = item.toString();
  alert("Item is: " + item);
}, 2000);
setTimeout(function(){
  var item = tealium.getPersistent("main", "zzzstring");
  alert("Item is: " + item);
}, 2000);
setTimeout(function(){
  var item = tealium.getPersistent("main", "zzzarraypersist");
  item = item.toString();
  alert("Item is: " + item);
}, 4000);
tealium.trackView("main", "Hello", {"ahello": "Craig"});
tealium.trackEvent("main", "MyTealiumEvent", {"zzzhi": "Craig"});
