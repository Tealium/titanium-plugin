if(typeof Tealium$StateInfo == 'undefined') {
	function Tealium$StateInfo() {
		var static_data = {};
		static_data[Tealium.Key.LIBRARY_VERSION] = Tealium.VERSION;
		
		(function() {
			var appName = Titanium.App.name || "";
			var appVersion = Titanium.App.version || "";
			
			if(appName.length > 0) {
				static_data[Tealium.Key.APP_NAME] = appName;
				
				if(appVersion.length > 0) {
					static_data[Tealium.Key.APP_VERSION] = appVersion;
					static_data[Tealium.Key.APP_ID] = appName + " " + appVersion;	
				}	
			} else if(appVersion.length > 0) {
				static_data[Tealium.Key.APP_VERSION] = appVersion;	
			}
			
			var deviceName = Titanium.Platform.name || "";
			if(deviceName.length > 0) {
				static_data[Tealium.Key.DEVICE] = deviceName;
			}
			
			var width = Titanium.Platform.displayCaps.platformWidth || 0;
			var height = Titanium.Platform.displayCaps.platformHeight || 0;
			if(width > 0 && height > 0) {
				static_data[Tealium.Key.DEVICE_RESOLUTION] = width + "x" + height;
			}
			
			var osName = Titanium.Platform.osname || "";
			if(osName.length > 0) {
				static_data[Tealium.Key.PLATFORM] = osName;
			}
			
			var osVersion = Titanium.Platform.version || "";
			if(osVersion.length > 0) {
				static_data[Tealium.Key.OS_VERSION] = osVersion;
			}
		})();
		
		this.get = function() {
			// DeepCopy
			var data = {};
			for(var key in static_data) {
				data[key] = static_data[key];
			}
			
			var networkTypeName = Titanium.Network.networkTypeName || "";
			if(networkTypeName.length  > 0) {
				data[Tealium.Key.CONNECTION_TYPE] = networkTypeName;
			}
			
			var orientation = Titanium.Gesture.orientation;
			if(orientation == Titanium.UI.PORTRAIT) {
				data[Tealium.Key.ORIENTATION] = "Portrait";
			} else if(orientation == Titanium.UI.UPSIDE_PORTRAIT) {
				data[Tealium.Key.ORIENTATION] = "Portrait UpsideDown";
			} else if(orientation == Titanium.UI.LANDSCAPE_LEFT) {
				data[Tealium.Key.ORIENTATION] = "Landscape Left";
			} else if(orientation == Titanium.UI.LANDSCAPE_RIGHT) {
				data[Tealium.Key.ORIENTATION] = "Landscape Right";
			} else {
				data[Tealium.Key.ORIENTATION] = "Undefined";
			}
			// TODO: carrier, carrier_iso, carrier_mcc, carrier_mnc 
			var now = new Date();
			data[Tealium.Key.TIMESTAMP] = Tealium.Util.formatAsISO8601(now);
			data[Tealium.Key.TIMESTAMP_LOCAL] = Tealium.Util.formatAsISO8601Local(now);
			data[Tealium.Key.TIMESTAMP_OFFSET] = Tealium.Util.getOffset(now);
			data[Tealium.Key.TIMESTAMP_UNIX] = Tealium.Util.getUnixTimestamp(now);
			
			return data;
		};
	}
}