'use strict';
var Filter = require('broccoli-filter');
var RSVP = require('rsvp');
var bs = require('browser-sync');

// TODO: add options for port and ms of delay

function BrowserSyncFilter(inputTree, options) {
    if (!(this instanceof BrowserSyncFilter)) {
        return new BrowserSyncFilter(inputTree, options);
    }

    this.inputTree = inputTree;
    if (!this.bsInstance){
        this.bsInstance = bs.create();

        this.bsInstance.init({
            proxy: 'http://localhost:4200'
        });

        this.reload = function () {
            console.log('##### RELOAD #####');
        }
    }
}

BrowserSyncFilter.prototype = Object.create(Filter.prototype);
BrowserSyncFilter.prototype.constructor = BrowserSyncFilter;

//BrowserSyncFilter.prototype.extensions = [''];
//BrowserSyncFilter.prototype.targetExtension = '';

BrowserSyncFilter.prototype.processString = function (str) {
    if (this.fireTimer)
        clearTimeout(this.fireTimer);

    this.fireTimer = setTimeout(function () {
        this.reload();
        this.fireTimer = null;
    }.bind(this), 500);
};

module.exports = BrowserSyncFilter;