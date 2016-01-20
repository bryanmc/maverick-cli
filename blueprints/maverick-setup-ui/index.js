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
        
        var appPath = path.join(this.project.root, 'app');
        var appStyleFile = path.join(appPath, 'styles/app.css');
        
        var bowerPath = path.join(this.project.root, 'bower_components');
        var bowerBootstrapPath = path.join(bowerPath, 'bootstrap');
        var bowerBootstrapFile  = path.join(bowerBootstrapPath, 'package.json');
        
        var nodeModsPath = path.join(this.project.root, 'node_modules');
        var addonPath = path.join(nodeModsPath, 'maverick-cli');
        var addonBlueprintsPath = path.join(addonPath, 'blueprints');
        var addonBlueprintSrcPath = path.join(addonBlueprintsPath, '/maverick-setup-ui/src');
        var addonBlueprintSrcStyleFile = path.join(addonBlueprintSrcPath, 'style.txt');
        
        try {
            fs.readFileSync(bowerBootstrapFile, 'utf8');
            self.ui.writeLine('{"status":"success", "message":"Maverick Setup UI step was previously completed."}');
        } catch (error) {
            shell.exec("ember install ember-bootstrap");
            shell.exec("ember install ember-toastr");
            shell.exec("ember install ember-cli-font-awesome");
            
            //Write styles to app/app.css
            var srcStyleFile = fs.readFileSync(addonBlueprintSrcStyleFile, 'utf8');
            fs.writeFileSync(appStyleFile, srcStyleFile);
            
            self.ui.writeLine('{"status":"success", "message":"Maverick Setup UI step complete"}');
        }
        
    }
};
