"undefined" == typeof Tealium.logger && function() {
    var LEVELS = {
        info: "logInfo",
        warn: "logWarn",
        error: "logError",
        debug: "logDebug",
        trace: "logTrace"
    };
    var SILENT_LOGGER = function() {};
    var logger = {};
    var staticLogger = {
        config: function(config) {
            for (var level in LEVELS) {
                var levelSet = config[LEVELS[level]];
                void 0 != typeof levelSet && (logger[level] = levelSet ? function(msg) {
                    Ti.API.info(level, "TEALIUM:" + msg);
                } : SILENT_LOGGER);
            }
        },
        i: function(msg) {
            logger.info(msg);
        },
        w: function(msg) {
            logger.warn(msg);
        },
        e: function(msg) {
            logger.error(msg);
        },
        d: function(msg) {
            logger.debug(msg);
        },
        t: function(msg) {
            logger.trace(msg);
        }
    };
    Tealium.__defineGetter__("logger", function() {
        return staticLogger;
    });
    Tealium.logger.config({
        logInfo: true,
        logWarn: true,
        logError: true,
        logDebug: true,
        logTrace: true
    });
}();