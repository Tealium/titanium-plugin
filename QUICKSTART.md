# Titanium SDK

This plugin bridges Titanium's system to our existing [Android](http://www.github.com/tealium/android-library) and [iOS](http://www.github.com/tealium/ios-library) native libraries.

To integrate: 

* [Add the modules to the Titanium SDK](#1-add-the-modules-to-the-titanium-sdk) 
* [Reference the modules in the tiapp.xml file](#2-reference-the-modules-in-the-tiappxml-file)
* [Add the tealium.js file](#3-add-the-tealiumjs-file)
* [Import the modules](#4-import-the-modules)
* [Add view track calls](#5-add-view-track-calls)
* [Add event track calls](#6-add-event-track-calls)
 
## 1. Add the modules to the Titanium SDK

* Paste the ```Modules/com.tealium.appcelerator.android``` module in the Titanium's ```android``` module directory.
* Paste the ```Modules/com.tealium.appcelerator.ios``` module in the Titanium's ```iphone``` module directory. 

## 2. Reference the modules in the tiapp.xml file 

```xml
<ti:app xmlns:ti="http://ti.appcelerator.org">
    <!---...-->
    <modules>
        <module platform="android">com.tealium.appcelerator.android</module>
        <module platform="iphone">com.tealium.appcelerator.ios</module>
    </modules>
    <!---...-->
</ti:app>
```

## 3. Add the tealium.js file

Copy ```Source/tealium.js``` into the project:

**Alloy**

In ```<PROJECT ROOT>/app/assets/```

**Classic**

In ```<PROJECT ROOT>/Resources/```

## 4. Import the modules

Add the include and initialization code: 

```javascript
Ti.include("tealium.js");
/* 
Tealium.initialize(
	<Tealium account name>, 
	<Tealium profile name>, 
	<Tealium environment name>, 
	isRelease);
*/
Tealium.initialize("tealiummobile", "demo", "dev", false);
``` 

**Alloy**

In ```<PROJECT ROOT>/app/alloy.js```

**Classic**

In ```<PROJECT ROOT>/Resources/app.js```

> When ```isRelease``` is false, Tealium Library logs will be visible in the console.  

## 5. Add view track calls

```javascript
/*
Tealium.trackView(<view name>, <view data>);
*/
Tealium.trackView('view_name', {
	'data_source-key' : 'data_source-value'
});
```

## 6. Add event track calls

```javascript
/*
Tealium.trackEvent(<event name>, <event data>);
*/
Tealium.trackEvent('button_name', {
	'data_source-key' : 'data_source-value'
});
```