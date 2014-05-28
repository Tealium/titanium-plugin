function Tealium$Queue(cache, extension) {
    var is_loaded = false;
    var wv = Titanium.UI.createWebView({
        height: 0,
        width: 0
    });
    wv.addEventListener("error", function(e) {
        Tealium.Logger.e(JSON.stringify(e));
    });
    wv.addEventListener("load", function() {
        is_loaded = true;
        try {
            var data = JSON.parse(wv.evalJS('(function(){var e=document.childNodes;if(e.length>0){var t=0;var n=46;var r=e[0].data;if(r!=undefined&&r.length>n+12){var i=r.substring(n,n+4);var s=r.substring(n+4,n+6);var o=r.substring(n+6,n+8);var u=r.substring(n+8,n+10);var a=r.substring(n+10,n+12);t=Date.parse(s+"/"+o+"/"+i+" "+u+":"+a+" UTC");if(isNaN(t)){t=0}}}var f=window["utag"]!==undefined?Object.keys(utag.loader.cfg).length:-1;var l=window["nativeAppLiveHandlerData"]===undefined?{}:nativeAppLiveHandlerData;return JSON.stringify({tags:f,published:t,config:l})})()'));
            if (0 == data.tags) {
                Tealium.Logger.w("No tags were loaded, please check your tealiumiq configuration.");
                extension.trackNothing();
                return;
            }
            if (-1 == data.tags) return;
            extension.updateConfig(data.config);
            if (cache.queueCount > extension.powerSaveCallLimit) {
                var events = cache.loadEvents();
                var e;
                for (var i = 0; events.length > i; i++) {
                    e = events[i];
                    if (!e.evaluated && !extension.approve(JSON.parse(e.event))) continue;
                    wv.evalJS(e.js);
                }
            }
        } catch (err) {
            Tealium.logger.e(err);
        }
    });
    this.getWebView = function() {
        return wv;
    };
    this.enqueue = function(event) {
        Tealium.logger.d(event[Tealium.Key.CALL_TYPE] + " : " + JSON.stringify(event, null, "	"));
        if (extension.hasBeenInitiallyConfigured) if (extension.approve(event)) if (is_loaded && cache.queueCount + 1 > extension.powerSaveCallLimit && Titanium.Network.networkType != Titanium.Network.NETWORK_NONE) {
            var events = cache.loadEvents();
            events.push({
                js: Tealium.Util.convertEventToJS(event),
                evaluated: true
            });
            var e;
            for (var i = 0; events.length > i; i++) {
                e = events[i];
                if (!e.evaluated && !extension.approve(JSON.parse(e.event))) continue;
                wv.evalJS(e.js);
            }
        } else cache.storeEvent(event, true); else Tealium.logger.d("event was suppressed"); else cache.storeEvent(event, false);
    };
}

"undefined" == typeof Tealium$Queue;