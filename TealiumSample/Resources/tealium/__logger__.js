if(typeof Tealium.logger == 'undefined') {	
	(function() {
			
		var LEVELS = {
			'info' : 'logInfo',
			'warn' : 'logWarn',
			'error' : 'logError',
			'debug' : 'logDebug',
			'trace' : 'logTrace'
		};
		
		var SILENT_LOGGER = function(msg) {
			// doing nothing
		};
		
		var staticLogger = {
			config : function(config) {
				for(var level in LEVELS) {
					var levelSet = config[LEVELS[level]];
					if(typeof levelSet != undefined) {
						staticLogger[level.charAt(0)] = levelSet ? function(msg) {
							Titanium.API[level]("TEALIUM: " + msg);
						} : SILENT_LOGGER;	
					}
				}
			}
		};
			
		Tealium.__defineGetter__('logger', function() {
			return staticLogger;
		});
			
		Tealium.logger.config({
			logInfo : true,
			logWarn : true,
			logError : true,
			logDebug : true,
			logTrace : true
		});
	})();
}
