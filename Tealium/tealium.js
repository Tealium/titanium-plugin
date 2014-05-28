// In the event of multiple imports, this prevents from overwriting. 
if((typeof Tealium).toLowerCase() == 'undefined') {   

	Tealium = {};

	Titanium.include('__logger__.js');
	Titanium.include('__key__.js');
	Titanium.include('__util__.js');
	Titanium.include('__cache__.js');
	Titanium.include('__lifecycle__.js');
	Titanium.include('__stateinfo__.js');
	Titanium.include('__extension__.js');
	Titanium.include('__queue__.js');
	
	(function() {
		
		var statuses = {
			UNINITIALIZED : "UNINITIALIZED",
			INITIALIZED : "INITIALIZED"
		};
		var currentStatus = statuses.UNINITIALIZED;
	
		Tealium.EVENT_NAME_LINK = 'link';
		Tealium.EVENT_NAME_VIEW = 'view';
		Tealium.VERSION = '1.0';
		Tealium.getStatus = function() {
			return currentStatus;
		};
	
		var cache = new Tealium$Cache();
		var lifecycle;
		var stateInfo = new Tealium$StateInfo();
		var extension = new Tealium$Extension(cache);
		var queue = new Tealium$Queue(cache, extension);
		var lastScreenTitle = '';
	
		Tealium.initialize = function(config) {
			
			var logsOn = !(config.suppressLogs || false);
			var errorsOn = !(config.suppressErrors || false);

			Tealium.logger.config({
				'logInfo' : logsOn,
				'logWarn' : errorsOn,
				'logError' : errorsOn,
				'logDebug' : logsOn,
				'logTrace' : errorsOn		
			});
			
			if (!('window' in config) || !('account' in config) || !('profile' in config) || !('environment' in config)) {
				Tealium.logger.e('Passed configuration is missing keys; the keys "window", "account", "profile", "environment" are required.');
				return false;
			} 
	
			try {
				var url = (config.disableHTTPS || false ?  "http://tags.tiqcdn.com/utag/" : "https://tags.tiqcdn.com/utag/") + 
					config.account + "/" + 
					config.profile + "/" + 
					config.environment + "/mobile.html";
					
				if(!(config.disableLifeCycleTracking || false)) {
					lifecycle = new Tealium$Lifecycle(cache);	
				}
				
				queue.webView.setUrl(url);
				config.window.add(queue.webView);
				currentStatus = statuses.INITIALIZED;
				return true;
			} catch(err) {
				Tealium.logger.e('Invalid arguments given. Shutting down...');
				return false;
			}
		};
	
		Tealium.trackControlEvent = function(name, additionalData) {
			
			var start = (new Date()).getTime();
			
			var nameType = typeof name;
			
			if(nameType.toLowerCase() != 'string') {
				Tealium.logger.w('Received ' + nameType + ' in Tealium.trackEvent(name, additionalData); expecting string.');
				return false;
			}
			
			var data = additionalData || {};
			data[Tealium.Key.LINK_ID] = name;
			data[Tealium.Key.SCREEN_TITLE] = lastScreenTitle;  
			
			var result = Tealium.trackCustomEvent(Tealium.EVENT_NAME_LINK, data);
			
			Titanium.API.log('TRACK: ' + ((new Date()).getTime() - start) + ' ms');
			
			return result;
		};
		
		Tealium.trackViewEvent = function(name, additionalData) {
			
			var start = (new Date()).getTime();
			
			var nameType = typeof name;
			
			if(nameType.toLowerCase() != 'string') {
				Tealium.logger.w('Received ' + nameType + ' in Tealium.trackView(name, additionalData); expecting string.');
				return false;
			}
			
			var data = additionalData || {};
			lastScreenTitle = name;
		
			data[Tealium.Key.SCREEN_TITLE] = name;
			
			var result = Tealium.trackCustomEvent(Tealium.EVENT_NAME_VIEW, data);
			
			Titanium.API.log('TRACK: ' + ((new Date()).getTime() - start) + ' ms');
			
			return result;
		};
		
		Tealium.trackCustomEvent = function(eventName, additionalData) {
			if (currentStatus !== statuses.INITIALIZED) {
				Tealium.logger.w('Tealium.track*(...) called when the Library is not initialized.');
				return false;
			}
	
			var data = stateInfo.get();
			if((typeof additionalData).toLowerCase() == 'object') {
				for(var key in additionalData) {
					data[key] = additionalData[key];	
				}	
			}
			
			if(!(Tealium.Key.TEALIUM_ID in data)) {
				if(Tealium.Key.SCREEN_TITLE in data || Tealium.Key.LINK_ID in data) {
					data[Tealium.Key.TEALIUM_ID] = Tealium.Util.convertIntToBase62(Tealium.Util.strHash(
						(data[Tealium.Key.SCREEN_TITLE] || '') +
						(data[Tealium.Key.LINK_ID] || '') 
					));
				} else {
					var concat = '';
					for(var key in data) {
						concat += key;
					}
					data[Tealium.Key.TEALIUM_ID] = Tealium.Util.convertIntToBase62(Tealium.Util.strHash(concat));
				}
			}
			
			data[Tealium.Key.CALL_TYPE] = eventName;
			queue.enqueue(data);
		
			return true;
		};
	
		Tealium.onFocus = function() {
			if (currentStatus !== statuses.INITIALIZED) {
				Tealium.logger.w('Tealium.onFocus() called when the Library is not initialized.');
				return false;
			}

			if(typeof(lifecycle) != 'undefined') {
				return lifecycle.onFocus();				
			} else {
				Tealium.logger.w('Tealium.onFocus() called when Tealium Library was initialized with disableLifeCycleTracking = true.');
				return false;
			}
		};
		
		Tealium.onBlur = function() {
			if (currentStatus !== statuses.INITIALIZED) {
				Tealium.logger.w('Tealium.onBlur() called when the Library is not initialized.');
				return false;
			}

			if(typeof(lifecycle) != 'undefined') {
				return lifecycle.onBlur();
			} else {
				Tealium.logger.w('Tealium.onBlur() called when Tealium Library was initialized with disableLifeCycleTracking = true.');
				return false;
			}
		};
	})();
}