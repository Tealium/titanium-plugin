if(typeof Tealium.Util == 'undefined') {
	(function() {
		var REF = '0123456789' +
			'ABCDEFGHIJKLM' +
			'NOPQRSTUVWXYZ' + 
			'abcdefghijklm' +
			'nopqrstuvwxyz';
		var BASE = REF.length;
		
		var utils = {
			//timestamp	
			//"(iOS2.0+, And1.1+) Timestamp to seconds of event occurrence (ie 2013-07-11T19:57:47Z) [ISO8601 at Zulu]"
			formatAsISO8601 : function(ts) {
				var month = (ts.getUTCMonth() + 1);
				var day = ts.getUTCDate();
				var hour = ts.getUTCHours();
				var min = ts.getUTCMinutes();
				var sec = ts.getUTCSeconds();
		
				return ts.getUTCFullYear() + '-' + 
				(month > 9 ? month : '0' + month) + '-' +
				(day > 9 ? day : '0' + day) + 'T' +
				(hour > 9 ? hour : '0' + hour) + ':' + 
				(min > 9 ? min : '0' + min) + ':' +
				(sec > 9 ? sec : '0' + sec) + 'Z';
			},
			//timestamp_local	
			//"(iOS2.2+, And2.0+) Local Timestamp to seconds of event occurrence (ie 2013-07-11T19:57:47) [ISO8601 without offset]
			formatAsISO8601Local : function(ts) {
				var month = (ts.getMonth() + 1);
				var day = ts.getDate();
				var hour = ts.getHours();
				var min = ts.getMinutes();
				var sec = ts.getSeconds();
		
				return ts.getFullYear() + '-' + 
				(month > 9 ? month : '0' + month) + '-' +
				(day > 9 ? day : '0' + day) + 'T' +
				(hour > 9 ? hour : '0' + hour) + ':' + 
				(min > 9 ? min : '0' + min) + ':' +
				(sec > 9 ? sec : '0' + sec);
			},
			formatAsMMDDYYYY : function(date) {
				var month = (date.getUTCMonth() + 1);
				var day = date.getUTCDate();
			
				return 
					(month > 9 ? month : '0' + month) + '' +
					(day > 9 ? day : '0' + day) + '' +			
					ts.getUTCFullYear();
			},
			//timestamp_offset	
			//"(iOS2.2+, And2.0+) Local timezone offset of device's location in hours (ie -3)"
			getOffset : function(ts) {
				return ts.getTimezoneOffset() / 60.0;
			},
			//timestamp_unix	
			//"(iOS2.2+, And1.1+) GMT/UTC Unix timestamp (ie 1373498679)"
			getUnixTimestamp : function(ts) {
				return Math.round(ts.getTime() / 1000);
			},
			convertEventToJS : function(event) {
				return 'utag.track("' + event[Tealium.Key.CALL_TYPE] + '", ' + JSON.stringify(event) + ');';
			},
			strHash : function(str) {
				if((typeof str).toLowerCase() != 'string') {
					return NaN;
				}
				
				var h = 0;
				var n = str.length;
				for(var i = 0; i < n; i++) {
					h = ((h << 5) - h) + str.charCodeAt(i);
					h = h & h;
				}
				return h;
			},
			convertIntToBase62 : function (num) {
				if((typeof num).toLowerCase() != 'number') {
					return undefined;
				}
				
				num = Math.abs(num);
				
				var s = '';
				var again = true;
				while(again) {
					s = REF[num % BASE] + s;
					num = Math.floor(num / BASE);
					again = num > 0;
				}
				return s;		
			}
		};
	
		Tealium.__defineGetter__('Util', function() {
			return utils;
		});
	})();
}