var fs = require('fs');
var path = require('path');
var shell = require("shelljs");

/*jshint node:true*/
module.exports = {
    description: 'Adds Twitter bootstrap and related UI elements to the project.',

    normalizeEntityName: function (entityName) {
        return entityName;
    },

    beforeInstall: function () {
        var self = this;
        
        var bowerPath = path.join(this.project.root, 'bower_components');
        var bowerBootstrapPath = path.join(bowerPath, 'bootstrap');
        var bowerBootstrapFile  = path.join(bowerBootstrapPath, 'package.json');
        
        try {
            fs.readFileSync(bowerBootstrapFile, 'utf8');
            self.ui.writeLine('{"status":"success", "message":"Maverick Setup UI step was previously completed."}');
        } catch (error) {
            shell.exec("ember install ember-bootstrap");
            shell.exec("ember install ember-toastr");
            self.ui.writeLine('{"status":"success", "message":"Maverick Setup UI step complete');
        }
        
    }
};