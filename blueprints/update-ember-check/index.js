var fs = require('fs');
var path = require('path');
var shell = require("shelljs");

/*jshint node:true*/
module.exports = {
    description: 'Checks whether update ember has been performed.',

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
                // self.ui.writeLine('Parsing bower.json...');
                projectBowerFileContents = JSON.parse(data);
            } catch (error) {
                // self.ui.writeLine('Error parsing bower.json...', error);
                self.ui.writeLine('{"status":"fail", "message":"'+error+'"}');
                return error;
            }

            if (projectBowerFileContents) {
            
                var emberVersionNumber = projectBowerFileContents.dependencies.ember;
                var emberDataVersionNumber = projectBowerFileContents.dependencies['ember-data'];
                
                if ( emberVersionNumber == "2.2.0" && emberDataVersionNumber == "2.2.0" ) {
                    self.ui.writeLine('{"status":"success", "message":"Ember / bower version is up to date at 2.2.0"}');        
                    return;
                }
                
            }

        });     
        
    }
};