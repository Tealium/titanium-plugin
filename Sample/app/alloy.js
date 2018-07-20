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
var tealium = require("com.tealium.titaniumandroid");
tealium.example();
tealium.initTealium("main","tealiummobile", "demo", "qa", "abc123", null, null, true);
tealium.setVolatile("main", {"zzzstringvolatile": "I've Changed"});
tealium.setVolatile("main", {"zzzarraynew": ["I've Changed", "again"]});
tealium.setPersistent("main", {"zzzstring": "Hello"});
tealium.setPersistent("main", {"zzzarraypersist": ["Hello Again", "Dave"]});
//tealium.trackView("main", "Hello", {"ahello": "Craig"});
console.log(tealium.printDataType({"array" : ["Hello", "Craig"]}, "array"));
console.log(tealium.printDataType({"int" : 1}, "int"));
console.log(tealium.printDataType({"float" : 1.5}, "float"));
console.log(tealium.printDataType({"bool" : true}, "bool"));
console.log(tealium.printDataType({"bool" : false}, "bool"));
// console.log(tealium.printDataType({"hello" : ["Hello", "Craig"]}));
// console.log(tealium.printDataType(1));
console.log(tealium.printDataType({"hello": "Hello, Craig"}, "hello"));
console.log(tealium.printDataType({"hello": {"hello" : "Hello, Craig"}}, "hello"));
