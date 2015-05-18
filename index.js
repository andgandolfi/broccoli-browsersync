'use strict';
var Writer = require('broccoli-writer');
var RSVP = require('rsvp');
var bs = require('browser-sync');

// TODO: add options for port and ms of delay

function BrowserSyncWatcher(options) {
    if (!(this instanceof BrowserSyncWatcher)) {
        return new BrowserSyncWatcher(options);
    }

    options = options || {};
    this.delay = (options.delay > 0 ? options.delay : 500 );
    this.port = (options.port > 0 ? options.port : 4200 );

    if (!this.bsInstance){
        this.bsInstance = bs.create();

        this.bsInstance.init({
            proxy: 'http://localhost:' + this.port
        });

        this.reload = function () {
            this.bsInstance.reload();
        }
    }
}

BrowserSyncWatcher.prototype = Object.create(Writer.prototype);
BrowserSyncWatcher.prototype.constructor = BrowserSyncWatcher;

BrowserSyncWatcher.prototype.write = function (readTree, destDir) {
    if (this.fireTimer)
        clearTimeout(this.fireTimer);

    this.fireTimer = setTimeout(function () {
        this.reload();
        this.fireTimer = null;
    }.bind(this), this.delay);
};

module.exports = BrowserSyncWatcher;