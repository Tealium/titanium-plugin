## Getting Started ##

### Table of Contents ###

- [Requirements](#requirements)
- [Quick Start](#quick-start)
    - [1. Clone/Copy Library](#1-clonecopy-library)
    - [2. Add to Project](#2-add-to-project)
    - [3. Run](#3-run)
- [What next](#what-next)

### Requirements ###

* Titanium 3+

### Quick Start ###

This guide presumes you have already created an [Alloy app using it's development studio](http://docs.appcelerator.com/titanium/3.0/#!/guide/Quick_Start). Follow the below steps to add Tealium's Plugin to it.  


####1. Clone/Copy Library####
onto your dev machine by clicking on the *Clone to Desktop* or *Download ZIP* buttons on the main repo page.

![](https://github.com/Tealium/titanium-plugin/wiki/images/generic_githubclone.png)

####2. Add To Project 

2a. Copy the "tealium" directory into the "&lt;project-root&gt;/app/assets/" directory.

![](https://github.com/Tealium/titanium-plugin/wiki/images/copy-alloy.png)

2b. In your project's "/app/alloy.js" file, import the Tealium Library using:

```javascript
Titanium.include(‘Tealium/tealium.js'); 
```

2c. In the entry controller of your application (most likely "/app/controller/index.js") add the following line to initialize:

```javascript
Tealium.initialize({
    window : $.index, /* your first window */
    account : "tealiummobile",
    profile : "demo",
    environment : "dev",/* dev, qa, or prod */
    disableHTTPS : false, /* OPTIONAL; Default is false. */
    suppressLogs : true, /* OPTIONAL; Default is true. */
    suppressErrors : false, /* OPTIONAL; Default is false. */
    disableLifeCycleTracking : false /* OPTIONAL; Default is false. */
}); 
```

2d. (OPTIONAL) If you want lifecycle tracking be sure to add the following code to every window your app uses:

```javascript
$.index.addEventListener('focus', function() {
    Tealium.onFocus();
});

$.index.addEventListener('blur', function() {
    Tealium.onBlur();
});
``` 

> NOTE: If *Tealium.onFocus()* isn't called within 10 seconds of *Tealium.onBlur()* being called: the app will be considered to be asleep.

2e. (OPTIONAL) It is also highly recommended you add "*Tealium.trackViewEvent(...)*" into the "focus" transforming the *$.index.addEventListener('focus', ...)* to capture view events:

```javascript
$.index.addEventListener('focus', function() {
    Tealium.trackViewEvent('root-screen');
    Tealium.onFocus();
}); 
```

2f. When tagging controls, you should use the Tealium.trackControlEvent(...) method.

```javascript
function onClick(e) {
	Tealium.trackControlEvent('button:click');
	/* click logic */
}
```

####3. Run

Congratulations! You have successfully implemented the Tealium Plugin into your project. The following should be visible in the console: 

![](https://github.com/Tealium/titanium-plugin/wiki/images/logs.png)

### What Next ###

#### Use Proxy to verify (optional)

You can use an HTTP proxy to confirm successful retrieval of configuration data from our multi-CDN and to confirm successful delivery of a tracking call. Several popular third-party options are:

- [Charles Proxy](http://www.charlesproxy.com)
- [Wireshark](http://www.wireshark.org)
- [HTTP Scoop](http://www.tuffcode.com)

Tealium's multi-CDN configuration address is *http://tags.tiqcdn.com*.  You may have to use the [disable HTTPS Config option](../../../wiki/Tealium-API#initializeconfig--object) when you init the library to permit proxying.

If you have access to the Tealium Community site, detailed instructions on how to setup Charles Proxy on an iDevice can be found at: https://community.tealiumiq.com/posts/624994

Alternatively, you can use an analytic service with real-time reporting to confirm delivery of dispatches.  This verification method requires both an active analytics account (i.e. [Google Analytics](http://www.google.com/analytics/)) and an active [Tealium IQ](http://tealium.com) account to enable mapping.  If you have both of these, consult the Tealium community post at: https://community.tealiumiq.com/posts/568700

