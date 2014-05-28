function Tealium$StateInfo() {
    var static_data = {};
    static_data[Tealium.Key.LIBRARY_VERSION] = Tealium.VERSION;
    (function() {
        var appName = Titanium.App.name || "";
        var appVersion = Titanium.App.version || "";
        if (appName.length > 0) {
            static_data[Tealium.Key.APP_NAME] = appName;
            if (appVersion.length > 0) {
                static_data[Tealium.Key.APP_VERSION] = appVersion;
                static_data[Tealium.Key.APP_ID] = appName + " " + appVersion;
            }
        } else appVersion.length > 0 && (static_data[Tealium.Key.APP_VERSION] = appVersion);
        var deviceName = "android";
        deviceName.length > 0 && (static_data[Tealium.Key.DEVICE] = deviceName);
        var width = Titanium.Platform.displayCaps.platformWidth || 0;
        var height = Titanium.Platform.displayCaps.platformHeight || 0;
        width > 0 && height > 0 && (static_data[Tealium.Key.DEVICE_RESOLUTION] = width + "x" + height);
        var osName = "android";
        osName.length > 0 && (static_data[Tealium.Key.PLATFORM] = osName);
        var osVersion = Titanium.Platform.version || "";
        osVersion.length > 0 && (static_data[Tealium.Key.OS_VERSION] = osVersion);
    })();
    this.get = function() {
        var data = {};
        for (var key in static_data) data[key] = static_data[key];
        var networkTypeName = Titanium.Network.networkTypeName || "";
        networkTypeName.length > 0 && (data[Tealium.Key.CONNECTION_TYPE] = networkTypeName);
        var orientation = Titanium.Gesture.orientation;
        data[Tealium.Key.ORIENTATION] = orientation == Titanium.UI.PORTRAIT ? "Portrait" : orientation == Titanium.UI.UPSIDE_PORTRAIT ? "Portrait UpsideDown" : orientation == Titanium.UI.LANDSCAPE_LEFT ? "Landscape Left" : orientation == Titanium.UI.LANDSCAPE_RIGHT ? "Landscape Right" : "Undefined";
        var now = new Date();
        data[Tealium.Key.TIMESTAMP] = Tealium.Util.formatAsISO8601(now);
        data[Tealium.Key.TIMESTAMP_LOCAL] = Tealium.Util.formatAsISO8601Local(now);
        data[Tealium.Key.TIMESTAMP_OFFSET] = Tealium.Util.getOffset(now);
        data[Tealium.Key.TIMESTAMP_UNIX] = Tealium.Util.getUnixTimestamp(now);
        return data;
    };
}

"undefined" == typeof Tealium$StateInfo;