var fs = require('fs');
var path = require('path');
var shell = require("shelljs");

/*jshint node:true*/
module.exports = {
    description: 'Sets up admin UI assets',

    normalizeEntityName: function (entityName) {
        return entityName;
    },

    beforeInstall: function () {
        var self = this;
        
        var transferAssets = function( appPath, sourcePath, files ){
            for (var index = 0; index < files.length; index++) {
                var sourceFileName = files[index];
                var sourceFile = sourcePath + '/' + sourceFileName;
                var appFileName = files[index];
                var appFile = appPath + '/' + appFileName; 
                //Check type
                var stat = fs.statSync(sourceFile);
                if (stat.isFile()) {
                    //write file
                    console.log("Writing file...", appFile);
                    //var sourceFileContents = fs.readFileSync(sourceFile, 'utf8');
                    // fs.writeFileSync(appFile, sourceFileContents);
                    // fs.createReadStream(appFile).pipe(fs.createWriteStream(sourceFile));
                    shell.exec("cp "+sourceFile+" "+appFile);
                } else if (stat.isDirectory()) {
                    //run recursively
                    console.log("Running recursive directory...", sourceFile);
                    var sourceFileNames = fs.readdirSync(sourceFile);
                    //console.log('appSubDir', appFile); 
                    shell.exec("mkdir "+appFile);
                    //console.log('srcSubDir', sourceFile); 
                    transferAssets(appFile, sourceFile, sourceFileNames);
                }
            }
        };

        var rootPath = this.project.root;
        //var appPath = path.join(this.project.root, 'app');
        var publicPath = path.join(this.project.root, 'public');
        var publicAssetsPath = path.join(this.project.root, 'public/assets');
        var publicAssetsCheckFile = path.join(publicAssetsPath, '.check-global');
        try {
            fs.readFileSync(publicAssetsCheckFile, 'utf8');
            self.ui.writeLine('{"status":"success", "message":"The public/assets directory has been previously created."}');
        } catch (error) {
            shell.exec("mkdir "+publicAssetsPath);
            shell.exec("touch "+publicAssetsCheckFile);
        }
        
        var nodeModsPath = path.join(rootPath, 'node_modules');
        var addonPath = path.join(nodeModsPath, 'maverick-cli');
        var addonBlueprintsPath = path.join(addonPath, 'blueprints');
        var addonBlueprintSrcPath = path.join(addonBlueprintsPath, '/maverick-compile-assets/assets');

        var appAssetPaths = {
            css: path.join(publicAssetsPath, 'css'),
            images: path.join(publicAssetsPath, 'images'),
            fonts: path.join(publicPath, 'fonts'),
            js: path.join(publicAssetsPath, 'js'),
            plugins: path.join(publicAssetsPath, 'plugins'),
        };
        //console.log('appAssetPaths.css', appAssetPaths.css); 

        var srcAssetPaths = {
            css: path.join(addonBlueprintSrcPath, 'css'),
            images: path.join(addonBlueprintSrcPath, 'images'),
            fonts: path.join(addonBlueprintSrcPath, 'fonts'),
            js: path.join(addonBlueprintSrcPath, 'js'),
            plugins: path.join(addonBlueprintSrcPath, 'plugins'),
        };
        //console.log('srcAssetPaths.css', srcAssetPaths.css); 
        
        for (var type in srcAssetPaths) {
            if (srcAssetPaths.hasOwnProperty(type)) {
                shell.exec("mkdir "+publicAssetsPath+"/"+type);
                var appDir = appAssetPaths[type];
                var srcDir = srcAssetPaths[type];
                //Source File Names
                var sourceFileNames = fs.readdirSync(srcDir);
                transferAssets(appDir, srcDir, sourceFileNames);
            }
        }

    }

};
