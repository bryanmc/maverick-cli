/**
 * Maverick CLI: Maverick Builder
 * Blueprint which builds the GUI for the Maverick CLI and does some other minor
 * startup stuff that is required to get Maverick Builder GUI off the ground.
 * 
 * Tasks include:
 * 1. Generate a `maverick-builder` route with three required files
 *      - app/router.js
 *      - app/routers/maverick-builder.js
 *      - app/templates/maverick-builder.js
 * 
 * 2. Generate http-mock server for api/maverick via `ember g http-mock maverick`
 * 
 * 3. Update mock server file at `server/mocks/maverick.js` to include action routes
 * 
 * 4. Install following required dependencies for the application
 *      - shelljs
 * 
 * 5. Runs maverick-cli blueprint `update-ember` which handles some additional startup tasks
 * like updating the ember & ember-data versions in bower.json to the latest versions and running
 * `bower install` to force changes into effect.
 * 
 * To get started with Maverick CLI:
 * 
 * $ ember install https://github.com/bryanmc/maverick-cli.git
 * $ ember g maverick-builder
 * $ ember server
 * 
 * Navigate to: http://localhost:4200/maverick-builder to continue using Maverick CLI in GUI form
 * 
 * $ ember g maverick-help (for the purists)
 * 
 * Please submit any issues here: https://github.com/bryanmc/maverick-cli/issues
 */

var fs = require('fs');
var path = require('path');
var shell = require("shelljs");

/*jshint node:true*/
module.exports = {
    description: 'Create a GUI for Maverick',

    normalizeEntityName: function (entityName) {
        return entityName;
    },

    beforeInstall: function () {
        var self = this;

        var rootPath = this.project.root;
        var appPath = path.join(this.project.root, 'app');

        var appFiles = {
            templates_mb: path.join(appPath, 'templates/maverick-builder.hbs'),
            routes_mb: path.join(appPath, 'routes/maverick-builder.js'),
            app_router: path.join(appPath, 'router.js'),
            server_mocks_mb: path.join(rootPath, 'server/mocks/maverick.js')
        };

        var nodeModsPath = path.join(rootPath, 'node_modules');
        var addonPath = path.join(nodeModsPath, 'maverick-cli');
        var addonBlueprintsPath = path.join(addonPath, 'blueprints');
        var addonBlueprintSrcPath = path.join(addonBlueprintsPath, '/maverick-builder/src');

        var srcFiles = {
            templates_mb: path.join(addonBlueprintSrcPath, 'templates-maverick-builder.hbs'),
            routes_mb: path.join(addonBlueprintSrcPath, 'routes-maverick-builder.js'),
            app_router: path.join(addonBlueprintSrcPath, 'router.js'),
            server_mocks_mb: path.join(addonBlueprintSrcPath, 'server-mocks-maverick.js')
        };
        
        try {
            fs.readFileSync(appFiles.templates_mb, 'utf8');
            self.ui.writeLine('{"status":"success", "message":"Maverick Builder Setup step was already completed."}');
        } catch (error) {

            //Generate HTTP mock server
            shell.exec("ember g http-mock maverick");

            //Install required dependencies
            shell.exec("npm install --save shelljs");
            shell.exec("npm install --save-dev body-parser");
                
            //Run initial Ember update
            shell.exec("ember g update-ember");
            
            //Write all files   
            for (var key in appFiles) {
                if (appFiles.hasOwnProperty(key)) {
                    var appFile = appFiles[key];
                    var srcFilePath = srcFiles[key];
                    var srcFile = fs.readFileSync(srcFilePath, 'utf8');
                    //Write file...
                    fs.writeFileSync(appFile, srcFile);
                }
            }
            
            self.ui.writeLine('{"status":"success", "message":"Maverick Builder Setup step complete"}');

        }

    }

};
