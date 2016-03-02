var fs = require('fs');
var path = require('path');
var shell = require("shelljs");

/*jshint node:true*/
module.exports = {
    description: 'Generates the Maverick services, utilities (eg, core and authentication)',

    normalizeEntityName: function (entityName) {
        return entityName;
    },
    
    beforeInstall: function () {
        var self = this;
        var appPath = path.join(this.project.root, 'app');
        var servicesPath = path.join(appPath, 'services');
        var utilitiesPath = path.join(appPath, 'utils');
        var initializersPath = path.join(appPath, 'initializers');
        var adaptersPath = path.join(appPath, 'adapters');
        var serializersPath = path.join(appPath, 'serializers');
        var appServiceFile = path.join(servicesPath, 'maverick.js');
        var appUtilityFile = path.join(utilitiesPath, 'maverick.js');
        var appServiceAuthenticationFile = path.join(servicesPath, 'authentication.js');
        var appInitializerMaverickFile = path.join(initializersPath, 'maverick.js');
        var appInitializerRouterFile = path.join(initializersPath, 'router.js');
        var appAdapterAppFile = path.join(adaptersPath, 'application.js');
        var appSerializerAppFile = path.join(serializersPath, 'application.js');
        
        
        var nodeModsPath = path.join(this.project.root, 'node_modules');
        var addonPath = path.join(nodeModsPath, 'maverick-cli');
        var addonBlueprintsPath = path.join(addonPath, 'blueprints');
        var addonBlueprintSrcPath = path.join(addonBlueprintsPath, '/maverick-implement-core/src');
        var addonBlueprintSrcServiceFile = path.join(addonBlueprintSrcPath, 'service.js');
        var addonBlueprintSrcUtilityFile = path.join(addonBlueprintSrcPath, 'utility.js');
        var addonBlueprintSrcServiceAuthenticationFile = path.join(addonBlueprintSrcPath, 'service-authentication.js');
        var addonBlueprintSrcInitializerMaverickFile = path.join(addonBlueprintSrcPath, 'initializer-maverick.js');
        var addonBlueprintSrcInitializerRouterFile = path.join(addonBlueprintSrcPath, 'initializer-router.js');
        var addonBlueprintSrcAdapterAppFile = path.join(addonBlueprintSrcPath, 'adapter-application.js');
        var addonBlueprintSrcSerializerAppFile = path.join(addonBlueprintSrcPath, 'serializer-application.js');
        
        try {
            fs.readFileSync(appServiceFile, 'utf8');
            self.ui.writeLine('{"status":"success", "message":"Maverick Core Implementation step was previously completed."}');
        } catch (error) {
            shell.exec("mkdir "+servicesPath);
            shell.exec("mkdir "+utilitiesPath);
            shell.exec("mkdir "+initializersPath);
            shell.exec("mkdir "+adaptersPath);
            shell.exec("mkdir "+serializersPath);
            
            var srcServiceFile = fs.readFileSync(addonBlueprintSrcServiceFile, 'utf8');
            var srcUtilityFile = fs.readFileSync(addonBlueprintSrcUtilityFile, 'utf8');
            var srcServiceAuthenticationFile = fs.readFileSync(addonBlueprintSrcServiceAuthenticationFile, 'utf8');
            var srcInitializerMaverickFile = fs.readFileSync(addonBlueprintSrcInitializerMaverickFile, 'utf8');
            var srcInitializerRouterFile = fs.readFileSync(addonBlueprintSrcInitializerRouterFile, 'utf8');
            
            /**
             * Remove old adapter and serializer generation
            var srcAdapterAppFile = fs.readFileSync(addonBlueprintSrcAdapterAppFile, 'utf8');
            var srcSerializerAppFile = fs.readFileSync(addonBlueprintSrcSerializerAppFile, 'utf8');
            */
            
            fs.writeFileSync(appServiceFile, srcServiceFile);
            fs.writeFileSync(appUtilityFile, srcUtilityFile);
            fs.writeFileSync(appServiceAuthenticationFile, srcServiceAuthenticationFile);
            fs.writeFileSync(appInitializerMaverickFile, srcInitializerMaverickFile);
            fs.writeFileSync(appInitializerRouterFile, srcInitializerRouterFile);
            fs.writeFileSync(appAdapterAppFile, srcAdapterAppFile);
            fs.writeFileSync(appSerializerAppFile, srcSerializerAppFile);
                
            self.ui.writeLine('{"status":"success", "message":"Maverick Core Implementation step complete"}');
        }
        
        //Install Parse Adapter
        shell.exec("ember install ember-parse-adapter");
    }
};
