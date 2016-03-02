/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');
var shell = require("shelljs");

module.exports = {
    name: 'maverick-cli',
    
    // contentFor: function(type, config){
    //     if (type === 'body-footer'){ 
    //         var html =  `
    //             <script>
    //                 var resizefunc = [];
    //             </script>

    //             <!-- jQuery  -->
    //             <script src="assets/js/detect.js"></script>
    //             <script src="assets/js/fastclick.js"></script>
    //             <script src="assets/js/jquery.slimscroll.js"></script>
    //             <script src="assets/js/jquery.blockUI.js"></script>
    //             <script src="assets/js/waves.js"></script>
    //             <script src="assets/js/wow.min.js"></script>
    //             <script src="assets/js/jquery.nicescroll.js"></script>
    //             <script src="assets/js/jquery.scrollTo.min.js"></script>
    //             <script src="assets/plugins/peity/jquery.peity.min.js"></script>
    //             <script src="assets/plugins/jquery-sparkline/jquery.sparkline.min.js"></script>
    //             <script src="assets/pages/jquery.dashboard_3.js"></script>
    //             <script src="assets/js/jquery.core.js"></script>
    //             <script src="assets/js/jquery.app.js"></script>
    //         `;
    //         return html;
    //     } 
    // },

    included: function files_included(app) {
        var _this = this;
        this._super.included.apply(this, arguments);    
         
        var bowerPath = path.join(this.project.root, 'bower_components');
        var jqueryCookieFile = path.join(app.bowerDirectory, 'jquery-cookie/jquery.cookie.js');
        this.app.import(jqueryCookieFile);
        
        function walk(currentDirPath, callback) {
            var fs = require('fs'); 
            var path = require('path');
            fs.readdir(currentDirPath, function (err, files) {
                if (err) {
                    throw new Error(err);
                }
                files.forEach(function (name) {
                    var filePath = path.join(currentDirPath, name);
                    var stat = fs.statSync(filePath);
                    if (stat.isFile()) {
                        callback(filePath, stat);
                    } else if (stat.isDirectory()) {
                        walk(filePath, callback);
                    }
                });
            });
        }
        
        //CSS Assets
        app.import(path.join(app.bowerDirectory, 'maverick-cli/css/bootstrap.min.css'));
        app.import(path.join(app.bowerDirectory, 'maverick-cli/css/bootstrap-theme.min.css'));
        app.import(path.join(app.bowerDirectory, 'maverick-cli/css/_variables.css'));
        app.import(path.join(app.bowerDirectory, 'maverick-cli/css/components.css'));
        app.import(path.join(app.bowerDirectory, 'maverick-cli/css/core.css'));
        app.import(path.join(app.bowerDirectory, 'maverick-cli/css/elements.css'));
        app.import(path.join(app.bowerDirectory, 'maverick-cli/css/icons.css'));
        app.import(path.join(app.bowerDirectory, 'maverick-cli/css/menu.css'));
        app.import(path.join(app.bowerDirectory, 'maverick-cli/css/pages.css'));
        app.import(path.join(app.bowerDirectory, 'maverick-cli/css/responsive.css'));
        app.import(path.join(app.bowerDirectory, 'maverick-cli/css/typicons.css'));
        app.import(path.join(app.bowerDirectory, 'maverick-cli/css/variables.css'));
        
        //JS Assets
        // app.import(path.join(app.bowerDirectory, 'maverick-cli/js/jquery.min.js'));a
        // app.import(path.join(app.bowerDirectory, 'maverick-cli/js/bootstrap.js'));
        // app.import(path.join(app.bowerDirectory, 'maverick-cli/js/bootstrap.min.js'));
        app.import(path.join(app.bowerDirectory, 'maverick-cli/js/detect.js'));
        app.import(path.join(app.bowerDirectory, 'maverick-cli/js/fastclick.js'));
        app.import(path.join(app.bowerDirectory, 'maverick-cli/js/jquery.slimscroll.js'));
        app.import(path.join(app.bowerDirectory, 'maverick-cli/js/jquery.blockUI.js'));
        app.import(path.join(app.bowerDirectory, 'maverick-cli/js/waves.js'));
        app.import(path.join(app.bowerDirectory, 'maverick-cli/js/wow.min.js'));
        app.import(path.join(app.bowerDirectory, 'maverick-cli/js/jquery.nicescroll.js'));
        app.import(path.join(app.bowerDirectory, 'maverick-cli/js/jquery.scrollTo.min.js')); 
        app.import(path.join(app.bowerDirectory, 'maverick-cli/js/jquery.core.js'));
        app.import(path.join(app.bowerDirectory, 'maverick-cli/js/jquery.app.js'));
        
        app.import(path.join(app.bowerDirectory, 'maverick-cli/js/modernizr.min.js'));
        // app.import(path.join(app.bowerDirectory, 'maverick-cli/js/npm.js'));
        app.import(path.join(app.bowerDirectory, 'maverick-cli/js/pace.min.js'));
        
        //Image Assets
        app.import(path.join(app.bowerDirectory, 'maverick-cli/images/geometry.png'), {
            destDir: '/public/fonts'
        });
        
        // var cssAssets = path.join(app.bowerDirectory, 'maverick-cli/css');
        // walk(cssAssets, function(cssAssets, stat){
        //     var file = cssAssets;
        //     if ( file.indexOf('bootstrap') === -1 && file.indexOf('map') === -1 ){
        //         var fileArray = file.split('/');
        //         var fileName = fileArray[3];
        //         console.log('file', "app.import(path.join(app.bowerDirectory, 'maverick-cli/css/"+fileName+"'));"); 
        //         app.import(file);    
        //     }
        // });
        
        var jsAssets = path.join(app.bowerDirectory, 'maverick-cli/js');
        walk(jsAssets, function(jsAssets, stat){
            var file = jsAssets;
            if ( true ){
                var fileArray = file.split('/');
                var fileName = fileArray[3];
                console.log("app.import(path.join(app.bowerDirectory, 'maverick-cli/js/"+fileName+"'));"); 
            }
        });

    }

};
