if ("undefined" == (typeof Tealium).toLowerCase()) {
    Tealium = {};
    Titanium.include("__logger__.js");
    Titanium.include("__key__.js");
    Titanium.include("__util__.js");
    Titanium.include("__cache__.js");
    Titanium.include("__lifecycle__.js");
    Titanium.include("__stateinfo__.js");
    Titanium.include("__extension__.js");
    Titanium.include("__queue__.js");
    (function() {
        var statuses = {
            UNINITIALIZED: "UNINITIALIZED",
            INITIALIZED: "INITIALIZED"
        };
        var currentStatus = statuses.UNINITIALIZED;
        Tealium.EVENT_NAME_LINK = "link";
        Tealium.EVENT_NAME_VIEW = "view";
        Tealium.VERSION = "1.0";
        Tealium.getStatus = function() {
            return currentStatus;
        };
        var cache = new Tealium$Cache();
        var lifecycle = new Tealium$Lifecycle(cache);
        var stateInfo = new Tealium$StateInfo();
        var extension = new Tealium$Extension(cache);
        var queue = new Tealium$Queue(cache, extension);
        var lastScreenTitle = "";
        Tealium.initialize = function(config) {
            var verboseLogs = !(config.suppressLogs || false);
            var verboseErrors = !(config.suppressErrors || false);
            Tealium.logger.config({
                logInfo: verboseLogs,
                logWarn: verboseErrors,
                logError: verboseErrors,
                logDebug: verboseLogs,
                logTrace: verboseErrors
            });
            if (!("window" in config && "account" in config && "profile" in config && "environment" in config)) {
                Tealium.logger.e('Passed configuration is missing keys; the keys "window", "account", "profile", "environment" are required.');
                return false;
            }
            var url = (config.disableHTTPS || false ? "http://tags.tiqcdn.com/utag/" : "https://tags.tiqcdn.com/utag/") + config.account + "/" + config.profile + "/" + config.environment + "/mobile.html";
            var wv = queue.getWebView();
            wv.setUrl(url);
            Tealium.logger.i("Fetching <" + url + ">...");
            config.window.add(wv);
            currentStatus = statuses.INITIALIZED;
            return true;
        };
        Tealium.trackControlEvent = function(name, additionalData) {
            var nameType = typeof name;
            if ("string" != nameType.toLowerCase()) {
                Tealium.logger.w("Received " + nameType + " in Tealium.trackEvent(name, additionalData); expecting string.");
                return false;
            }
            var data = additionalData || {};
            data[Tealium.Key.LINK_ID] = name;
            data[Tealium.Key.SCREEN_TITLE] = lastScreenTitle;
            return Tealium.trackCustomEvent(Tealium.EVENT_NAME_LINK, data);
        };
        Tealium.trackViewEvent = function(name, additionalData) {
            var nameType = typeof name;
            if ("string" != nameType.toLowerCase()) {
                Tealium.logger.w("Received " + nameType + " in Tealium.trackView(name, additionalData); expecting string.");
                return false;
            }
            var data = additionalData || {};
            lastScreenTitle = name;
            data[Tealium.Key.SCREEN_TITLE] = name;
            return Tealium.trackCustomEvent(Tealium.EVENT_NAME_VIEW, data);
        };
        Tealium.trackCustomEvent = function(eventName, additionalData) {
            if (currentStatus !== statuses.INITIALIZED) {
                Tealium.logger.warn("Tealium.track*(...) called when the Library is not initialized.");
                return false;
            }
            var data = stateInfo.get();
            if ("object" == (typeof additionalData).toLowerCase()) for (var key in additionalData) data[key] = additionalData[key];
            if (Tealium.Key.SCREEN_TITLE in data || Tealium.Key.LINK_ID in data) data[Tealium.Key.TEALIUM_ID] = Tealium.Util.convertIntToBase62(Tealium.Util.strHash((data[Tealium.Key.SCREEN_TITLE] || "") + (data[Tealium.Key.LINK_ID] || ""))); else {
                var concat = "";
                for (var key in data) concat += key;
                data[Tealium.Key.TEALIUM_ID] = Tealium.Util.convertIntToBase62(Tealium.Util.strHash(concat));
            }
            data[Tealium.Key.CALL_TYPE] = eventName;
            queue.enqueue(data);
            return true;
        };
        Tealium.onFocus = function() {
            lifecycle.onFocus();
        };
        Tealium.onBlur = function() {
            lifecycle.onBlur();
        };
    })();
}