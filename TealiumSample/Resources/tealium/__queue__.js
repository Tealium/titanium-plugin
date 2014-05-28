if(typeof Tealium$Queue == 'undefined') {
	
	function Tealium$Queue(cache, extension) { 
		
		var ATTACH_TIMEOUT = 500;
		var is_loaded = false;
		var is_attached = false;
		
		var wv = Titanium.UI.createWebView({
			height : 0,
			width : 0
		});
	
		wv.addEventListener('error', function(e) {
			Tealium.logger.e('ERROR loading <' + wv.getUrl() + '>: ' + e);
		});
		
		wv.addEventListener('beforeload', function(e) {
			Tealium.logger.i('Fetching <' + wv.url + '>...');
		});
	
		wv.addEventListener('load', function() {
			Tealium.logger.i('successfully loaded configuration');
			is_loaded = true;
			try {
				var data = JSON.parse(wv.evalJS('(function(){var e=document.childNodes;if(e.length>0){var t=0;var n=46;var r=e[0].data;if(r!=undefined&&r.length>n+12){var i=r.substring(n,n+4);var s=r.substring(n+4,n+6);var o=r.substring(n+6,n+8);var u=r.substring(n+8,n+10);var a=r.substring(n+10,n+12);t=Date.parse(s+"/"+o+"/"+i+" "+u+":"+a+" UTC");if(isNaN(t)){t=0}}}var f=window["utag"]!==undefined?Object.keys(utag.loader.cfg).length:-1;var l=window["nativeAppLiveHandlerData"]===undefined?{}:nativeAppLiveHandlerData;return JSON.stringify({tags:f,published:t,config:l})})()'));
				if(data.tags == 0) {
					Tealium.Logger.w('No tags were loaded, please check your tealiumiq configuration.');
					extension.trackNothing();
					return;
				} else if(data.tags == -1) {
					// Page did not sucessfully load.
					return;
				} 
	
				extension.updateConfig(data.config);
			
				if(cache.queueCount > extension.powerSaveCallLimit) {
					var events = cache.loadEvents();
					var e;
						
					for(var i = 0; i < events.length; i++) {
						e = events[i];
						
						if(!e.evaluated) {
							if(!extension.approve(JSON.parse(e.event))) {
								continue;
							}
						}   					
						wv.evalJS(e.js);
					}
				}
			
			} catch(err) {
				Tealium.logger.e('ERROR: ' + err);
			}
	
		});
		
		this.__defineGetter__('webView', function() {
			return wv;
		});
						
		this.setUrl = function(url) {
			wv.setUrl(url);
			/*Tealium.logger.i('Fetcching <' + url + '>');
			var client = Titanium.Network.createHTTPClient({
				onload : function() {
					wv.setHtml(this.responseText, {
						baseURL : url
					});
					
					Tealium.logger.i(wv.evalJS('return JSON.stringify(utag.loader.cfg);'));
				}
			});
			client.open('GET', url);
			client.send();*/
		};
		
		this.enqueue = function (event) {
			
			Tealium.logger.d(
				event[Tealium.Key.CALL_TYPE] + ' : ' +
				JSON.stringify(event, null, '\t'));
			
			if(extension.initiallyConfigured) {
				if(extension.approve(event)) {
					var count = cache.queueCount + 1;
					
					if (is_loaded && 
						(count > extension.powerSaveCallLimit) &&
						(Titanium.Network.networkType != Titanium.Network.NETWORK_NONE)) {
						var events = cache.loadEvents();
						events.push({
							js : Tealium.Util.convertEventToJS(event),
							evaluated : true
						});
						
						var e;
						
						for(var i = 0; i < events.length; i++) {
							e = events[i];
							
							if(!e.evaluated) {
								if(!extension.approve(JSON.parse(e.event))) {
									continue;
								}
							}   
							
							wv.evalJS(e.js);
						}
						Tealium.logger.d('Dispatched ' + count + ' events.');
					} else {
						cache.storeEvent(event, true);
						Tealium.logger.d('Queued event.');
					} 
				} else {
					Tealium.logger.d('Event with id:' + event[Tealium.Key.TEALIUM_ID] + ' was suppressed');
				}
			} else {
				cache.storeEvent(event, false);
				Tealium.logger.d('Awaiting initial config; queued event.');
			}
		};
	}
}