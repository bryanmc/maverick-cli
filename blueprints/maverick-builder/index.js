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
        var appPath = path.join(this.project.root, 'app');
        var serverPath = path.join(this.project.root, 'server/mocks');
        var routesPath = path.join(appPath, 'routes');
        var templatesPath = path.join(appPath, 'templates');
        var appRouterFile = path.join(appPath, 'router.js');
        var appRouteFile = path.join(routesPath, 'maverick-builder.js');
        var appTemplateFile = path.join(templatesPath, 'maverick-builder.hbs');
        var appServerMocksFile = path.join(serverPath, 'maverick.js');

        var nodeModsPath = path.join(this.project.root, 'node_modules');
        var addonPath = path.join(nodeModsPath, 'maverick-cli');
        var addonBlueprintsPath = path.join(addonPath, 'blueprints');
        var addonBlueprintSrcPath = path.join(addonBlueprintsPath, '/maverick-builder/src');
        var addonBlueprintSrcRouterFile = path.join(addonBlueprintSrcPath, 'router.js');
        var addonBlueprintSrcTemplateFile = path.join(addonBlueprintSrcPath, 'template.js');
        var addonBlueprintSrcRouteFile = path.join(addonBlueprintSrcPath, 'route.js');
        var addonBlueprintSrcServerMocksFile = path.join(addonBlueprintSrcPath, 'mock-server.js');
        
        console.log('App Router File', appRouterFile); 
        console.log('Addon Blueprint MB Src Router File', addonBlueprintSrcRouterFile); 
        
        try {
            fs.readFileSync(appRouteFile, 'utf8');
            self.ui.writeLine("Skipping: The Maverick Builder route already exists...");
        } catch (error) {
            self.ui.writeLine("Creating: New `maverick-builer` route...");  
            try {
                var srcRouterFile = fs.readFileSync(addonBlueprintSrcRouterFile, 'utf8');
                var srcTemplateFile = fs.readFileSync(addonBlueprintSrcTemplateFile, 'utf8'); 
                var srcRouteFile = fs.readFileSync(addonBlueprintSrcRouteFile, 'utf8'); 
                var srcServerMocksFile = fs.readFileSync(addonBlueprintSrcServerMocksFile, 'utf8'); 
                //Writer Router.js template file to source
                fs.writeFileSync(appRouterFile, srcRouterFile);
                fs.writeFileSync(appTemplateFile, srcTemplateFile);
                fs.writeFileSync(appRouteFile, srcRouteFile);
                
                //Run Ember generate for route
                //shell.exec("ember g route maverick-builder");  
                
                //Generate HTTP mock server
                shell.exec("ember g http-mock maverick");
                fs.writeFileSync(appServerMocksFile, srcServerMocksFile);
                
            } catch (error) {
                self.ui.writeLine("Failure: Creating the maverick-builder route failed in the last step...");
            }
        }

    }

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  // afterInstall: function(options) {
  //   // Perform extra work here.
  // }
};
