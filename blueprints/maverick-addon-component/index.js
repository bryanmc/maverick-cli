var fs = require('fs');
var path = require('path');
var shell = require("shelljs");
 
/*jshint node:true*/
module.exports = {
    description: 'Generates component files within the Maverick CLI addon.',

    normalizeEntityName: function (entityName) {
        return entityName;
    },

    beforeInstall: function (options) {

        if ( options.args.length > 1 ){
           
            var rootPath = this.project.root;
            var nodeModsPath = path.join(rootPath, 'node_modules');
            var addonPath = path.join(nodeModsPath, 'maverick-cli');
            var addonSubPath = path.join(addonPath, 'addon');
            var appSubPath = path.join(addonPath, 'app');
            var addonBlueprintsPath = path.join(addonPath, 'blueprints');
            var addonBlueprintSrcPath = path.join(addonBlueprintsPath, '/maverick-addon-component/src')
            
            //File Path
            var componentName = options.args[1];
            
            var addonFiles = {
                //Maverick Builder
                components_componentname: path.join(addonSubPath, 'components/'+componentName+'.js'),
                templates_components_componentname: path.join(addonSubPath, 'templates/components/'+componentName+'.hbs'),
                app_components_componentname: path.join(appSubPath, 'components/'+componentName+'.js')
            };

            var srcFiles = {
                components_componentname: path.join(addonBlueprintSrcPath, 'addon-components-componentname.js'),
                templates_components_componentname: path.join(addonBlueprintSrcPath, 'addon-templates-components-componentname.hbs'),
                app_components_componentname: path.join(addonBlueprintSrcPath, 'app-components-componentname.js')
            };      
            
            // console.log('Source Files', srcFiles);
            for (var key in addonFiles) {
                if (addonFiles.hasOwnProperty(key)) {
                    var addonFilePath = addonFiles[key];
                    var srcFilePath = srcFiles[key];
                    try {
                        var srcFileContents = fs.readFileSync(srcFilePath, 'utf8');
                        srcFileContents = srcFileContents.replace(/__componentname__/g, componentName);
                        console.log("Success! Found file!");
                        console.log("---------------------------");
                        //Write file...
                        fs.writeFileSync(addonFilePath, srcFileContents);
                    } catch (error) {
                        console.log("Error!", error);
                        console.log("---------------------------");
                    }
                }
            }

        }else{
            self.ui.writeLine('{"status":"fail", "message":"Invalid arguments were provided:"}');
            console.log('Arguments:', options.args); 
        }

    }
};