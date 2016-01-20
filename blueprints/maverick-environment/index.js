var fs = require('fs');
var path = require('path');
var shell = require("shelljs");

/*jshint node:true*/
module.exports = {
    description: 'Sets up the environment (eg, config files)',

    normalizeEntityName: function (entityName) {
        return entityName;
    },

    beforeInstall: function () {
        var self = this;
        
        var rootPath = this.project.root;
        var appPath = path.join(this.project.root, 'app');

        var appFiles = {
            config_environment_js: path.join(rootPath, '/config/environment.js'),
            config_maverick_js: path.join(rootPath, '/config/maverick.js')
        };

        var nodeModsPath = path.join(this.project.root, 'node_modules');
        var addonPath = path.join(nodeModsPath, 'maverick-cli');
        var addonBlueprintsPath = path.join(addonPath, 'blueprints');
        var addonBlueprintSrcPath = path.join(addonBlueprintsPath, '/maverick-environment/src');

        var srcFiles = {
            config_environment_js: path.join(addonBlueprintSrcPath, 'config-environment.txt'),
            config_maverick_js: path.join(addonBlueprintSrcPath, 'config-maverick.js')
        };

        try {
            var templateFile = fs.readFileSync(appFiles.config_environment_js, 'utf8');
            if ( templateFile.indexOf('contentSecurityPolicy') === -1){
                //Cause the try statement to error  
                JSON.parse(templateFile);
            }
            self.ui.writeLine('{"status":"success", "message":"Maverick Environment Setup step was previously completed."}');
        } catch (error) {
            
            //Add Config Environment settings to config/environment.js
            var appConfigEnvironmentFileContents = fs.readFileSync(appFiles.config_environment_js, 'utf8');
            var srcConfigEnvironmentFileContents = fs.readFileSync(srcFiles.config_environment_js, 'utf8');
            var updatedFile = appConfigEnvironmentFileContents.replace("locationType: 'auto',", srcConfigEnvironmentFileContents);
            //Write to config file
            fs.writeFileSync(appFiles.config_environment_js, updatedFile);
            
            for (var key in appFiles) {
                if (appFiles.hasOwnProperty(key) && key !== 'config_environment_js') {
                    var appFile = appFiles[key];
                    var srcFilePath = srcFiles[key];
                    var srcFile = fs.readFileSync(srcFilePath, 'utf8');
                    //Write file...
                    fs.writeFileSync(appFile, srcFile);
                }
            }

            self.ui.writeLine('{"status":"success", "message":"Maverick Components Installation step complete"}');
        }

    }
};
