"undefined" == typeof Tealium.Util && function() {
    var REF = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var BASE = REF.length;
    var utils = {
        formatAsISO8601: function(ts) {
            var month = ts.getUTCMonth() + 1;
            var day = ts.getUTCDate();
            var hour = ts.getUTCHours();
            var min = ts.getUTCMinutes();
            var sec = ts.getUTCSeconds();
            return ts.getUTCFullYear() + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day) + "T" + (hour > 9 ? hour : "0" + hour) + ":" + (min > 9 ? min : "0" + min) + ":" + (sec > 9 ? sec : "0" + sec) + "Z";
        },
        formatAsISO8601Local: function(ts) {
            var month = ts.getMonth() + 1;
            var day = ts.getDate();
            var hour = ts.getHours();
            var min = ts.getMinutes();
            var sec = ts.getSeconds();
            return ts.getFullYear() + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day) + "T" + (hour > 9 ? hour : "0" + hour) + ":" + (min > 9 ? min : "0" + min) + ":" + (sec > 9 ? sec : "0" + sec);
        },
        formatAsMMDDYYYY: function(date) {
            {
                date.getUTCMonth() + 1;
            }
            {
                date.getUTCDate();
            }
            return;
        },
        getOffset: function(ts) {
            return ts.getTimezoneOffset() / 60;
        },
        getUnixTimestamp: function(ts) {
            return Math.round(ts.getTime() / 1e3);
        },
        convertEventToJS: function(event) {
            return 'utag.track("' + event[Tealium.Key.CALL_TYPE] + '", ' + JSON.stringify(event) + ");";
        },
        strHash: function(str) {
            if ("string" != (typeof str).toLowerCase()) return 0/0;
            var h = 0;
            var n = str.length;
            for (var i = 0; n > i; i++) {
                h = (h << 5) - h + str.charCodeAt(i);
                h &= h;
            }
            return h;
        },
        convertIntToBase62: function(num) {
            if ("number" != (typeof num).toLowerCase()) return void 0;
            num = Math.abs(num);
            var s = "";
            var again = true;
            while (again) {
                s = REF[num % BASE] + s;
                num = Math.floor(num / BASE);
                again = num > 0;
            }
            return s;
        }
    };
    Tealium.__defineGetter__("Util", function() {
        return utils;
    });
}();