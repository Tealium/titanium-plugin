if(typeof Tealium$Extension == 'undefined') {
	function Tealium$Extension(cache) {
	
		function Condition() {
			var filter;
			var filterType;
			var source;
			
			this.setField = function(field, value) {
				field = field.toLowerCase();
	
				if('filter' == field) {
					filter = value;			
				} else if ('filtertype' == field) {
					filterType = value;
				} else if ('source' == field) {
					if('Tealium Reference ID' == value) {
						source = Tealium.Key.TEALIUM_ID;
					} else if ('Object Class' == value) {
						source = Tealium.Key.OBJECT_CLASS;
					} else {
						source = value;
					}
				} else {
					Tealium.logger.w('unknown field:' + field);
				}
			};
			
			this.approve = function(event) {
				value = event[source] || '';
				
				if(filterType == 'equals') {
					return filter == value;
				} else {
					return filter != value;
				}
			};
			
			// Make these items Printable
			this.__defineGetter__('filter', function() {
				return filter;
			});
			
			this.__defineGetter__('filterType', function() {
				return filterType;
			});
			
			this.__defineGetter__('source', function() {
				return source;
			});
		}
	
		function Cluster() {
			var conditions = {};
			
			this.add = function(conditionId, field, value) {
				condition = conditions[conditionId];
				if(condition == undefined) {
					condition = new Condition();
					conditions[conditionId] = condition;
				}
				condition.setField(field, value);
			};
			
			this.approve = function(event) {
				for(var conditionId in conditions) {
					if(!conditions[conditionId].approve(event)) {
						return false;
					}
				}
				return true;
			};
			
			// So conditions can be printed.
			this.__defineGetter__('conditions', function() {
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
			if((typeof config).toLowerCase() != 'object') {
				return false;
			}
	
			clusters = {};
			hasBeenInitiallyConfigured = true;
	
			var key, comps, cluster, clusterId, keys = Object.keys(config);
			
			for(var i = 0; i < keys.length; i++) {
				key = keys[i];
				
				if(key == 'customTracking') {
					isCustomTracking = config[key];
				} else if(key == 'trackAllEvents') {
					isTrackingAllEvents = config[key];
				} else if(key == 'trackAllViews') {
					isTrackingAllViews = config[key];
				} else if(key == 'powerSaveCallLimit') {
					powerSaveCallLimit = config[key];
				} else if(key == 'mobilePowerSaveOn') {
					isPowerSaveOn = config[key];
				} else if (
					(key.indexOf('_filter') > -1) || 
					(key.indexOf('_filtertype') > -1) || 
					(key.indexOf('_source') > -1)) {
							
					comps = key.split('_');
	
					clusterId = comps[0];
					cluster = clusters[clusterId];
	
					if(cluster == undefined) {
						cluster = new Cluster();
						clusters[clusterId] = cluster;
					}		
					
					if(comps.length == 2) {
						cluster.add(clusterId, comps[1], config[key]);
					} else if (comps.length == 3) {
						cluster.add(comps[1], comps[2], config[key]);
					} else {
						Tealium.logger.w(new Error('I do not know how to handle ' + key));
					}
				} else if (key == 'hasBeenInitiallyConfigured') {
					hasBeenInitiallyConfigured = config[key];	
				}
			}
	
			return true;
		};
		
		this.__defineGetter__('initiallyConfigured', function() {
			return hasBeenInitiallyConfigured;
		});
		
		this.updateConfig = function(config) {
			if(configure(config)) {
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
			return 'Tealium$Extension : ' +
				JSON.stringify({
					isCustomTracking : isCustomTracking,
					isTrackingAllEvents : isTrackingAllEvents,
					isTrackingAllViews : isTrackingAllViews,
					powerSaveCallLimit : isPowerSaveOn ? powerSaveCallLimit : 0,
					clusters : clusters
				}, null, '\t');
		};
		
		this.approve = function(event) {
			if((typeof event).toLowerCase() != 'object') {
				return false;
			}
			
			var callType = event[Tealium.Key.CALL_TYPE];
			
			if(callType == 'view' && isTrackingAllViews) {
				return true;
			} else if(callType == 'link' && isTrackingAllEvents) {
				return true;
			} else if (isCustomTracking) {
				for(var clusterId in clusters) {
					if(clusters[clusterId].approve(event)) {
						return true;
					}
				}
			}
			
			return false;
		};
		
		this.__defineGetter__('powerSaveCallLimit', function() {
			return isPowerSaveOn ? powerSaveCallLimit : 0;
		});
		
		this.trackDefault();
		configure(cache.loadExtensionConfig());
	};
}