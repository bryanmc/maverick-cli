var fs = require('fs');
var path = require('path');
var shell = require("shelljs");

/*jshint node:true*/
module.exports = {
    description: 'Updates Ember and Ember Data version in bower.json and then runs `bower install`',

    normalizeEntityName: function (entityName) {
        return entityName;
    },

    beforeInstall: function () {
        var self = this;
        var projectBowerFileContents = null;
        var projectBowerFilePath = path.join(this.project.root, 'bower.json');
        
        fs.readFile(projectBowerFilePath, 'utf8', function (err, data) {
            //Parse it
            try {
                self.ui.writeLine('Parsing bower.json...');
                projectBowerFileContents = JSON.parse(data);
            } catch (error) {
                self.ui.writeLine('Error parsing bower.json...', error);
                return error;
            }

            if (projectBowerFileContents) {

                self.ui.writeLine('Found \'ember\' version: ' + projectBowerFileContents.dependencies.ember);
                self.ui.writeLine('Found \'ember-data\' version: ' + projectBowerFileContents.dependencies['ember-data']);
            
                var emberVersionNumber = projectBowerFileContents.dependencies.ember;
                var emberDataVersionNumber = projectBowerFileContents.dependencies['ember-data'];
                
                if ( emberVersionNumber == "2.2.0" && emberDataVersionNumber == "2.2.0" ) {
                    self.ui.writeLine('Ember / bower version is up to date at 2.2.0');
                    return;
                }
                
                //Update version numbers
                projectBowerFileContents.dependencies.ember = "2.2.0";
                projectBowerFileContents.dependencies['ember-data'] = "2.2.0";
                
                //Update resolutions
                projectBowerFileContents.resolutions = {};
                projectBowerFileContents.resolutions.ember = "2.2.0";
                   
                //FIX: Temporary Ember bug:  http://stackoverflow.com/questions/34703545/uncaught-error-could-not-find-module-ember-imported-from-ui-app-loader-js1
                projectBowerFileContents.dependencies.jquery = "1.11.3";
                
                //Reconstruct formatted string
                var updatedBowerFileContents = JSON.stringify(projectBowerFileContents, null, "\t");
                
                console.log("Update Bower File Contents:", updatedBowerFileContents);
                
                fs.writeFileSync(projectBowerFilePath, updatedBowerFileContents);
                shell.exec("echo 'updating bower...' && bower install");

            }

        });     
        
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
