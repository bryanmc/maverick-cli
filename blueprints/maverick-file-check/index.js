/**
 * Maverick CLI
 * Blueprint: maverick-check-file
 * Check to see if a file exists.
 * Usage: ember g maverick-file-check <path,comma_separated> <file name>
 * Example: ember g maverick-file-check bower_components,bootstrap package.json 
 */
var fs = require('fs');
var path = require('path');
var shell = require("shelljs");

/*jshint node:true*/
module.exports = {
    description: 'Checks to see if a given file or directory exists.',

    normalizeEntityName: function (entityName) {
        return entityName;
    },

    beforeInstall: function (options) {
        var self = this; 

        if ( options.args.length > 2 ){
            var rootPath = this.project.root;
            
            //File Path
            var step = options.args[1];
            var filePath = step.replace(',', '/');
            
            //Full Path
            var fileName = options.args[2];
            var checkFile = path.join(rootPath, filePath, fileName);
            
            try {
                fs.readFileSync(checkFile, 'utf8');
                self.ui.writeLine('{"status":"success", "message":"File exists: "'+checkFile+'}');
            } catch (error) {
                self.ui.writeLine('{"status":"fail", "message":"No file exists: "'+checkFile+'}');
            }

        }else{
            self.ui.writeLine('{"status":"fail", "message":"Invalid arguments were provided:"}');
            console.log('Arguments:', options.args); 
        }

    }
};