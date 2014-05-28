function Tealium$Extension(cache) {
    function Condition() {
        var filter;
        var filterType;
        var source;
        this.setField = function(field, value) {
            field = field.toLowerCase();
            "filter" == field ? filter = value : "filtertype" == field ? filterType = value : "source" == field ? source = "Tealium Reference ID" == value ? Tealium.Key.TEALIUM_ID : "Object Class" == value ? Tealium.Key.OBJECT_CLASS : value : Tealium.logger.w("unknown field:" + field);
        };
        this.approve = function(event) {
            value = event[source] || "";
            return "equals" == filterType ? filter == value : filter != value;
        };
        this.__defineGetter__("filter", function() {
            return filter;
        });
        this.__defineGetter__("filterType", function() {
            return filterType;
        });
        this.__defineGetter__("source", function() {
            return source;
        });
    }
    function Cluster() {
        var conditions = {};
        this.add = function(conditionId, field, value) {
            condition = conditions[conditionId];
            if (void 0 == condition) {
                condition = new Condition();
                conditions[conditionId] = condition;
            }
            condition.setField(field, value);
        };
        this.approve = function(event) {
            for (var conditionId in conditions) if (!conditions[conditionId].approve(event)) return false;
            return true;
        };
        this.__defineGetter__("conditions", function() {
            return conditions;
        });
    }
    var hasBeenInitiallyConfigured = false;
    var isCustomTracking;
    var powerSaveCallLimit;
    var isPowerSaveOn;
    var isTrackingAllEvents;
    var isTrackingAllViews;
    var clusters = {};
    var configure = function(config) {
        if ("object" != (typeof config).toLowerCase()) return false;
        clusters = {};
        hasBeenInitiallyConfigured = true;
        var key, comps, cluster, clusterId, keys = Object.keys(config);
        for (var i = 0; keys.length > i; i++) {
            key = keys[i];
            if ("customTracking" == key) isCustomTracking = config[key]; else if ("trackAllEvents" == key) isTrackingAllEvents = config[key]; else if ("trackAllViews" == key) isTrackingAllViews = config[key]; else if ("powerSaveCallLimit" == key) powerSaveCallLimit = config[key]; else if ("mobilePowerSaveOn" == key) isPowerSaveOn = config[key]; else if (key.indexOf("_filter") > -1 || key.indexOf("_filtertype") > -1 || key.indexOf("_source") > -1) {
                comps = key.split("_");
                clusterId = comps[0];
                cluster = clusters[clusterId];
                if (void 0 == cluster) {
                    cluster = new Cluster();
                    clusters[clusterId] = cluster;
                }
                2 == comps.length ? cluster.add(clusterId, comps[1], config[key]) : 3 == comps.length ? cluster.add(comps[1], comps[2], config[key]) : Tealium.logger.w(new Error("I do not know how to handle " + key));
            } else "hasBeenInitiallyConfigured" == key && (hasBeenInitiallyConfigured = config[key]);
        }
        return true;
    };
    this.__defineGetter__("initiallyConfigured", function() {
        return hasBeenInitiallyConfigured;
    });
    this.updateConfig = function(config) {
        if (configure(config)) {
            cache.storeExtensionConfig(config);
            return true;
        }
        return false;
    };
    this.trackNothing = function() {
        isCustomTracking = false;
        powerSaveCallLimit = 0;
        isPowerSaveOn = false;
        isTrackingAllEvents = false;
        isTrackingAllViews = false;
    };
    this.trackDefault = function() {
        isCustomTracking = false;
        powerSaveCallLimit = 0;
        isPowerSaveOn = false;
        isTrackingAllEvents = true;
        isTrackingAllViews = true;
    };
    this.toString = function() {
        return "Tealium$Extension : " + JSON.stringify({
            isCustomTracking: isCustomTracking,
            isTrackingAllEvents: isTrackingAllEvents,
            isTrackingAllViews: isTrackingAllViews,
            powerSaveCallLimit: isPowerSaveOn ? powerSaveCallLimit : 0,
            clusters: clusters
        }, null, "	");
    };
    this.approve = function(event) {
        if ("object" != (typeof event).toLowerCase()) return false;
        var callType = event[Tealium.Key.CALL_TYPE];
        if ("view" == callType && isTrackingAllViews) return true;
        if ("link" == callType && isTrackingAllEvents) return true;
        if (isCustomTracking) for (var clusterId in clusters) if (clusters[clusterId].approve(event)) return true;
        return false;
    };
    this.__defineGetter__("powerSaveCallLimit", function() {
        return isPowerSaveOn ? powerSaveCallLimit : 0;
    });
    this.trackDefault();
    configure(cache.loadExtensionConfig());
}

"undefined" == typeof Tealium$Extension;