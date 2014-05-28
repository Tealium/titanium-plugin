if(typeof Tealium$Cache == 'undefined') {
	function Tealium$Cache() {
	
		var DB_NAME = 'tealium.db';
		var FILE_NAME_EXTENSION = 'tealium.extension.json';
		var FILE_NAME_LIFECYCLE = 'tealium.lifecycle.json';
		var FILE_NAME_SLEEP = 'tealium.sleep.json';
		
		var db = Ti.Database.open(DB_NAME);
		db.execute('CREATE TABLE IF NOT EXISTS event (' + 
			'id INTEGER PRIMARY KEY' +
			', raw_js TEXT' +  
			', event TEXT' + 
			', timestamp INTEGER' +
			', evaluated INTEGER' + 
			');');
		var c = db.execute('SELECT COUNT(*) FROM event;');
		var queueCount = c.field(0, Titanium.Database.FIELD_TYPE_INT);
		c.close();
		db.close();
		c = null;
		db = null;
	
		this.storeEvent = function(event, evaluated) {
			var db = Ti.Database.open(DB_NAME);
			db.execute('INSERT INTO event (raw_js, event, timestamp, evaluated) VALUES (?, ?, ?, ?)',
				Tealium.Util.convertEventToJS(event),
				JSON.stringify(event), 
				(new Date()).getTime(),
				evaluated ? 1 : 0
			);
			db.close();
			queueCount++;
		};
		
		this.__defineGetter__('queueCount', function() {
			return queueCount;
		});
		
		var loadJSON = function(filename) {
			var file;
			try {
				file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
				if(file.exists()) {
					var blob = file.read();
					var config = JSON.parse(blob.text);
					blob = null;
					file = null;
					return config;
				}
				
			} catch(err) {
				file = null;
				Tealium.logger.e(err);
			}
			return {};
		};
		
		var storeJSON = function(filename, json) {
			var file;
			try {
				file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
				file.write(JSON.stringify(json));
				file = null;
			} catch(err) {
				file = null;
				Tealium.logger.e(err);
			}
		};
		
		this.loadEvents = function() {
			var loaded = [];
			var db = Ti.Database.open(DB_NAME);
			var c = db.execute('SELECT raw_js, event, evaluated FROM event');
			
			while(c.isValidRow()) {
				loaded.push({
					js : c.field(0, Titanium.Database.FIELD_TYPE_STRING),
					event : c.field(1, Titanium.Database.FIELD_TYPE_STRING),
					evaluated : c.field(2, Titanium.Database.FIELD_TYPE_INT) == 1
				});
				c.next();
			}
			
			c.close();
			db.execute('DELETE FROM event');
			db.close();
			queueCount = 0;
			return loaded;
		};
		
		this.loadExtensionConfig = function() {
			return loadJSON(FILE_NAME_EXTENSION);
		};
		
		this.storeExtensionConfig = function(extConfig) {
			storeJSON(FILE_NAME_EXTENSION, extConfig);
		};
		
		this.loadLifecycleValues = function() {
			return loadJSON(FILE_NAME_LIFECYCLE);
		};
		
		this.storeLifecycleValues = function(values) {
			storeJSON(FILE_NAME_LIFECYCLE, values);
		};
		
		this.onLifecycleSleep = function(timestamp) {
			var o = {
				'lastSleep' : timestamp
			};
			
			storeJSON(FILE_NAME_SLEEP, o);
		};
		
		this.popLifecycleLastSleep = function() {
			var json = loadJSON(FILE_NAME_SLEEP);
			
			var lastSleep = json.lastSleep || 0;
			
			var file;
			try {
				file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, FILE_NAME_SLEEP);
				file.deleteFile();
			} catch (err) {
				Tealium.logger.e(err);
				storeJSON(FILE_NAME_SLEEP, {
					'lastSleep' : 0
				});
			}
			file = null;
			
			return lastSleep;
		};
	}
}