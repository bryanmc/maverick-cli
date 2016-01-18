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
        var addonPath = path.join(this.project.root, 'addon');
        var routesPath = path.join(addonPath, 'routes');
        var maverickBuilderRouteFile = path.join(routesPath, 'maverick-builder.js');
        
        if( maverickBuilderRouteFile ){
            self.ui.writeLine("Skipping: The Maverick Builder route already exists...");
        }else{
            self.ui.writeLine("Creating: New `maverick-builer` route...");
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
