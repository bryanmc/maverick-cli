var fs = require('fs');
var path = require('path');
var shell = require("shelljs");

/*jshint node:true*/
module.exports = {
    description: 'Checks whether update ember has been performed.',

    normalizeEntityName: function (entityName) {
        return entityName;
    },



    beforeInstall: function (options) {
        var self = this; 
        
        if ( options.args.length > 1 ){
            var step = options.args[1];
            
            var self = this;
            var bowerPath = path.join(this.project.root, 'bower_components');
            var bowerBootstrapPath = path.join(bowerPath, 'bootstrap');
            var bowerBootstrapFile  = path.join(bowerBootstrapPath, 'package.json');
            
            var appPath = path.join(this.project.root, 'app');
            var servicesPath = path.join(appPath, 'services');
            var appServiceFile = path.join(servicesPath, 'maverick.js');
        
            switch(step){
                case "setup-ui":
                    try {
                        fs.readFileSync(bowerBootstrapFile, 'utf8');
                        self.ui.writeLine('{"status":"success", "message":"File exists!"}');
                    } catch (error) {
                        self.ui.writeLine('{"status":"fail", "message":"No file exists"}');
                    }
                 break;
                case "implement-core":
                    try {
                        fs.readFileSync(appServiceFile, 'utf8');
                        self.ui.writeLine('{"status":"success", "message":"File exists!"}');
                    } catch (error) {
                        self.ui.writeLine('{"status":"fail", "message":"No file exists"}');
                    }
                 break;
            }
        }else{
            self.ui.writeLine('{"status":"fail", "message":"No valid step argument was passed in"}');
        }
        //console.log('options', options); 

    }
};