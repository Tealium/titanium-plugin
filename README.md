# Tealium Titanium Plugin

The Tealium Titanium plugin provides the means to integrate iQ Tag Management and Tealium's suite of Universal Data Hub products into an Appcelerator Titanium application. 

## Installation

These instructions explain how to install the plugin by downloading it from the Tealium GitHub repository. It is also available to download from Axway's [Marketplace](https://marketplace.axway.com).

## API Definition

### [require]

	var Tealium;
	// initialize the relevant plugin for the current platform
	if (Ti.Platform.name == "android") {
	  tealium = require("com.tealium.titaniumandroid");
	} else if (Ti.Platform.name == "iOS" || Ti.Platform.name == "iPhone OS") {
	  tealium = require("com.tealium.titaniumios");
	}

### initTealium

	/**
	 * Initializes a Tealium instance.
	 * @param instanceName	a constant instance name used to refer to this instance of the Tealium class
	 * @param account	your tealium account name
	 * @param profile	your tealium profile name
	 * @param environment	usually dev, qa, or prod
	 * @param dataSourceID	optional tealium data source ID (for UDH)
	 * @param collectDispatchURL	optional URL override for tealium collect. Pass null if not required.
	 * @param collectDispatchProfile	optional profile override for tealium collect. Full URL takes precedence over just the profile if both are provided. Pass null if not required.
	 * @param isLifecycleEnabled	boolean value. True if automatic lifecycle tracking is required.
	 * @param isCrashReporterEnabled	boolean value. True if crash reporting should be enabled on Android.
	 * @param isConsentManagerEnabled	 boolean value. True if consent manager should be enabled (Android and iOS).
	 */
	tealium.initTealium("main","tealiummobile","demo","dev","abc123",null,null,true,true, true);

### enableAdIdentifier

	/**
	 * Enables collection of IDFA(iOS)/ADID(Android).
	 * @param instanceName	the tealium instance name used when initializing the tealium instance
	 * @param	persistent	boolean value; true value stores the identifier in persistent data (recommended), false stores as volatile data.
	 * @param
	 */
	tealium.enableAdIdentifier("main", true);

### triggerCrash

	/**
	 * Triggers a crash. Only works if tealiumenvironment is set to "dev". Android only.
	 */
	 tealium.triggerCrash();

### trackView

	/**
	 * Tracks a screen view
	 * @param instanceName	the tealium instance name used when initializing the tealium instance	
	 * @param	screenName	the name of the screen/activity to be tracked.
	 * @param	dataLayer	the JavaScript object representing the data layer to be tracked
	 */
	 tealium.trackView("main", "Home Screen", {"customer_id": "12345", "customer_type": "registered_user"});


### trackEvent

	/**
	 * Tracks an interaction event e.g. user clicks a "Buy Now" or other call-to-action button
	 * @param instanceName	the tealium instance name used when initializing the tealium instance	
	 * @param	eventName	the name of the event/interaction to be tracked.
	 * @param	dataLayer	the JavaScript object representing the data layer to be tracked
	 */
	 tealium.trackEvent("main", "Buy Now Clicked", {"customer_id": "12345", "customer_type": "registered_user"});
 
### setVolatile


	/**
	 * Stores a defined set of values in volatile data and sends them on each hit until the app is terminated or cleared from main memory
	 * @param instanceName	the tealium instance name used when initializing the tealium instance	
	 * @param	data	the JavaScript object representing the data to be saved in volatile storage. If a key contains a null value (null, undefined or empty string), it will be deleted.
	 */
	 tealium.setVolatile("main", {"session_id": "12345"});


### setPersistent

	/**
	 * Stores a defined set of values in persistent data and sends them on each hit until the app is uninstalled from the device
	 * @param instanceName	the tealium instance name used when initializing the tealium instance	
	 * @param	data	the JavaScript object representing the data to be saved in volatile storage. If a key contains a null value (null, undefined or empty string), it will be deleted.
	 */
	 tealium.setPersistent("main", {"session_id": "12345"});
	 

### getVolatile

	/**
	 * Returns a value for a specified key from the volatile data store
	 * @param instanceName	the tealium instance name used when initializing the tealium instance	
	 * @param	keyName	the key name of the value to be retrieved
	 */
	 tealium.getVolatile("main", "session_id");

### getPersistent

	/**
	 * Returns a value for a specified key from the persistent data store
	 * @param instanceName	the tealium instance name used when initializing the tealium instance	
	 * @param	keyName	the key name of the value to be retrieved
	 */
	 tealium.getPersistent("main", "session_id");


### addRemoteCommand


	/**
	 * Adds a remote command that can be executed later on by the TagBridge Remote Command tag in Tealium iQ
	 * @param instanceName	the tealium instance name used when initializing the tealium instance	
	 * @param	commandId	the name of the remote command. Must match the command ID set up in Tealium iQ.
	 * @param	callback	a standard JavaScript function taking a single parameter as a JSON string
	 */
	 tealium.addRemoteCommand("main", "log", function(response){
	  alert("Remote command 'log' called!");
	  if (typeOf(response) === "string") {
	    response = JSON.parse(response);
	  }
	  if (response.myvalue) {
	    console.log("response.myvalue is: " + response.myvalue)
	  }
	});
	
### setUserConsentStatus

	/**
	 * Sets the user's consent status to consented or not consented
	 * @param instanceName	the tealium instance name used when initializing the tealium instance	
	 * @param	consentStatus	string value. "consented" or "notConsented".
	 */
	 tealium.setUserConsentStatus("main", "consented");

### setUserConsentCategories

	/**
	 * Sets the user's consent status to consented and allows tracking for specific categories only (partial consent)
	 * @param instanceName	the tealium instance name used when initializing the tealium instance	
	 * @param	consentCategories string array. List of categories the user has consented to be tracked under.
	 */
	 tealium.setUserConsentCategories("main", ["analytics", "personalization"]);

### resetUserConsentPreferences

	/**
	 * Resets the user's consent preferences to defaults
	 * @param instanceName	the tealium instance name used when initializing the tealium instance	
	 */
	 tealium.resetUserConsentPreferences("main");
 
### setConsentLoggingEnabled

	/**
	 * Resets the user's consent preferences to defaults
	 * @param instanceName	the tealium instance name used when initializing the tealium instance	
	 * @param enabled boolean value. Enables (true) or disables (false) the consent logging feature
	 */
	 tealium. setConsentLoggingEnabled("main", true); 
  
### getUserConsentStatus

	/**
	 * Gets the user's current consent status
	 * @param instanceName	the tealium instance name used when initializing the tealium instance	
	 */
	var status = tealium.getUserConsentStatus("main"); // returns "Consented" or "NotConsented"
	
### getUserConsentCategories

	/**
	 * Gets the user's current consent categories
	 * @param instanceName	the tealium instance name used when initializing the tealium instance	
	 */
	var categories = tealium.getUserConsentCategories("main"); // returns e.g. ["analytics", "personalization"]
	
### setUserConsentPolicy

 	/**
	 * Sets the current consent policy to a new string value
	 * @param instanceName	the tealium instance name used when initializing the tealium instance	
	 * @param policy	string value. The consent policy value to be sent when consent logging is enabled
	 */
	tealium.setUserConsentPolicy("main", "mynewpolicy"); 	

### resetUserConsentPolicy
 
 	/**
	 * Resets the current consent policy to default
	 * @param instanceName	the tealium instance name used when initializing the tealium instance	
	 */
	tealium.resetUserConsentPolicy("main"); 
	
### Install Referrer (Android Only)

To collect the install referrer information on Android, the following snippet can be used, which will register a new Broadcast Receiver.

	// broadcast receiver for install referrer
	var installReferrerReceiver = Ti.Android.createBroadcastReceiver({
	  onReceived : function(e) {
	        var intent = e.intent,
	            referrer = intent.getStringExtra("referrer");
	            if (referrer) {
	              tealium.setVolatile("main", {"install_referrer": referrer});
	            }
	    }
	});
	Ti.Android.registerBroadcastReceiver(installReferrerReceiver, ["com.android.vending.INSTALL_REFERRER"]);	