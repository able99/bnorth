var exec = cordova.require('cordova/exec');

var ACPSTemplate = function(options) {
    this._handlers = {
        'data': [],
        'success': [],
        'error': []
    };
    this.options = options||{};
    var that = this;

    var success = function(result) {
        if (result && typeof result.type !== 'undefined') {
            that.emit(result.type, result);
        } else if (result) {
            that.emit('success', result);
        }
    };

    var fail = function(msg) {
        var e = (typeof msg === 'string') ? new Error(msg) : msg;
        that.emit('error', e);
    };

    setTimeout(function() {
        exec(success, fail, 'ACPSTemplate', 'init', [options]);
    }, 10);

    this.success = success;
    this.fail = fail;
};


PushNotification.prototype.funcA = function(options) {
    exec(this.success, this.error, 'ACPSTemplate', this.caller.name, [options]);
};



ACPSTemplate.prototype.on = function(eventName, callback) {
    if (!this._handlers.hasOwnProperty(eventName)) {
        this._handlers[eventName] = [];
    }
    this._handlers[eventName].push(callback);
};
ACPSTemplate.prototype.off = function (eventName, handle) {
    if (this._handlers.hasOwnProperty(eventName)) {
        var handleIndex = this._handlers[eventName].indexOf(handle);
        if (handleIndex >= 0) {
            this._handlers[eventName].splice(handleIndex, 1);
        }
    }
};
ACPSTemplate.prototype.emit = function() {
    var args = Array.prototype.slice.call(arguments);
    var eventName = args.shift();

    if (!this._handlers.hasOwnProperty(eventName)) {
        return false;
    }

    for (var i = 0, length = this._handlers[eventName].length; i < length; i++) {
        var callback = this._handlers[eventName][i];
        if (typeof callback === 'function') {
            callback.apply(undefined,args);
        } else {
            console.log('event handler: ' + eventName + ' must be a function');
        }
    }

    return true;
};

module.exports = {
    init: function(options) {
        return new ACPSTemplate(options);
    },

    funcA: function(successCallback, errorCallback, options) {
        exec(successCallback, errorCallback, 'ACPSTemplate', this.caller.name, [options||{}]);
    },

    ACPSTemplate: ACPSTemplate
};
