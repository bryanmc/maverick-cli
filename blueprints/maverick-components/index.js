var fs = require('fs');
var path = require('path');
var shell = require("shelljs");

/*jshint node:true*/
module.exports = {
    description: 'Installs all core Maverick components.',

    normalizeEntityName: function (entityName) {
        return entityName;
    },

    beforeInstall: function () {
        var self = this;
        
        var appPath = path.join(this.project.root, 'app');

        var appFiles = {
            templates_login_hbs: path.join(appPath, 'templates/login.hbs'),
            component_login_hbs: path.join(appPath, 'templates/components/login-form.hbs'),
            component_login_js: path.join(appPath, 'components/login-form.js'),
            controllers_login: path.join(appPath, 'controllers/login.js'),
            routes_login: path.join(appPath, 'routes/login.js'),
            routes_logout: path.join(appPath, 'routes/logout.js'),
            controllers_index: path.join(appPath, 'controllers/index.js'),
            controllers_application: path.join(appPath, 'controllers/application.js'),
            templates_application_hbs: path.join(appPath, 'templates/application.hbs')
        };

        var nodeModsPath = path.join(this.project.root, 'node_modules');
        var addonPath = path.join(nodeModsPath, 'maverick-cli');
        var addonBlueprintsPath = path.join(addonPath, 'blueprints');
        var addonBlueprintSrcPath = path.join(addonBlueprintsPath, '/maverick-components/src');

        var srcFiles = {
            templates_login_hbs: path.join(addonBlueprintSrcPath, 'templates-login.hbs'),
            component_login_hbs: path.join(addonBlueprintSrcPath, 'components-login-form.hbs'),
            component_login_js: path.join(addonBlueprintSrcPath, 'components-login-form.js'),
            controllers_login: path.join(addonBlueprintSrcPath, 'controllers-login.js'),
            routes_login: path.join(addonBlueprintSrcPath, 'routes-login.js'),
            routes_logout: path.join(addonBlueprintSrcPath, 'routes-logout.js'),
            controllers_index: path.join(addonBlueprintSrcPath, 'controllers-index.js'),
            controllers_application: path.join(addonBlueprintSrcPath, 'controllers-application.js'),
            templates_application_hbs: path.join(addonBlueprintSrcPath, 'templates-application.hbs')
        };

        try {
            var templateFile = fs.readFileSync(appFiles.component_login_hbs, 'utf8');
            if ( templateFile.indexOf('username') === -1){
                //Cause the try statement to error  
                JSON.parse(templateFile);
            }
            self.ui.writeLine('{"status":"success", "message":"Maverick Components Installation step was previously completed."}');
        } catch (error) {
            console.log("GOT AN ERROR!"); 
            //Install the component blueprint
            shell.exec("ember g component login-form");
            
            //Install the login / logout routes
            shell.exec("ember g route login && ember g route logout");
            
            //Install the login controller
            shell.exec("ember g controller login");
            
            //Install the index controller
            shell.exec("ember g controller index");
            
            //Install the index route
            shell.exec("ember g route index");

            for (var key in appFiles) {
                if (appFiles.hasOwnProperty(key)) {
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
