/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');
var shell = require("shelljs");

module.exports = {
    name: 'maverick-cli',

    included: function files_included(app) {
        this._super.included.apply(this, arguments);
        
        var bowerPath = path.join(this.project.root, 'bower_components');
        console.log('bowerPath', bowerPath); 
        var jqueryCookieFile = path.join('bower_components', 'jquery-cookie/jquery.cookie.js');
        console.log('jqueryCookieFile', jqueryCookieFile); 
        this.app.import(jqueryCookieFile);
    }

};
