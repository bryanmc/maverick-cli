/**
 * Maverick Reconcile
 * 
 * While developing the add-on changes to files are often made to app files
 * directly.  These changes need to be reflected back to the source files,
 * so instead of manually copying from app to source file, we automate the
 * process by updating every source file with the content of it's equivalent
 * app file.
 * 
 * usage: ember g maverick-cli-reconcile
 * 
 */
var fs = require('fs');
var path = require('path');
var shell = require("shelljs");

/*jshint node:true*/
module.exports = {
    description: 'Updates all add-on files from application to source.',

    normalizeEntityName: function (entityName) {
        return entityName;
    },

    beforeInstall: function () {
        
        var rootPath = this.project.root;
        var appPath = path.join(this.project.root, 'app');

        var appFiles = {
            //Maverick Builder
            templates_mb: path.join(appPath, 'templates/maverick-builder.hbs'),
            routes_mb: path.join(appPath, 'routes/maverick-builder.js'),
            //app_router: path.join(appPath, 'router.js'), //Don't need to update this as it won't change from here out
            server_mocks_mb: path.join(rootPath, 'server/mocks/maverick.js'),
            //Setup UI
            //app_style: path.join(appPath, 'styles/app.css'), //TODO: Fix this and include it later
            //Implement Core
            app_services_maverick: path.join(appPath, 'services/maverick.js'),
            app_utilities_maverick: path.join(appPath, 'utils/maverick.js'),
            app_services_authentication: path.join(appPath, 'services/authentication.js'),
            app_initializers_maverick: path.join(appPath, 'initializers/maverick.js'),
            app_initializers_router: path.join(appPath, 'initializers/router.js'),
            app_adapters_application: path.join(appPath, 'adapters/application.js'),
            app_serializers_application: path.join(appPath, 'serializers/application.js'),
            //Environment
            //config_environment: path.join(rootPath, 'config/environment.js'), //TODO: deal with partial files
            //config_maverick: path.join(rootPath, 'config/maverick.js'), empty, unused for now
            //Components
            templates_login_hbs: path.join(appPath, 'templates/login.hbs'),
            component_login_hbs: path.join(appPath, 'templates/components/login-form.hbs'),
            component_login_js: path.join(appPath, 'components/login-form.js'),
            controllers_login: path.join(appPath, 'controllers/login.js'),
            routes_login: path.join(appPath, 'routes/login.js'),
            routes_logout: path.join(appPath, 'routes/logout.js'),
            controllers_index: path.join(appPath, 'controllers/index.js'),
            controllers_application: path.join(appPath, 'controllers/application.js'),
            templates_application_hbs: path.join(appPath, 'templates/application.hbs'),
            component_mb_hbs: path.join(appPath, 'templates/components/maverick-editor.hbs'),
            component_mb_js: path.join(appPath, 'components/maverick-editor.js')
        };
        

        var nodeModsPath = path.join(this.project.root, 'node_modules');
        var addonPath = path.join(nodeModsPath, 'maverick-cli');
        var addonBlueprintsPath = path.join(addonPath, 'blueprints');
        var addonMaverickBuilderBlueprintSrcPath = path.join(addonBlueprintsPath, '/maverick-builder/src');
        var addonSetupUiBlueprintSrcPath = path.join(addonBlueprintsPath, '/maverick-setup-ui/src');
        var addonImplementCoreBlueprintSrcPath = path.join(addonBlueprintsPath, '/maverick-implement-core/src');
        var addonEnvironmentBlueprintSrcPath = path.join(addonBlueprintsPath, '/maverick-environment/src');
        var addonComponentsBlueprintSrcPath = path.join(addonBlueprintsPath, '/maverick-components/src');
        
        var srcFiles = {
            //Maverick Builder
            templates_mb: path.join(addonMaverickBuilderBlueprintSrcPath, 'templates-maverick-builder.hbs'),
            routes_mb: path.join(addonMaverickBuilderBlueprintSrcPath, 'routes-maverick-builder.js'),
            app_router: path.join(addonMaverickBuilderBlueprintSrcPath, 'router.js'),
            server_mocks_mb: path.join(addonMaverickBuilderBlueprintSrcPath, 'server-mocks-maverick.js'),
            //Setup UI
            app_style: path.join(addonSetupUiBlueprintSrcPath, 'styles.txt'),
            //Implement Core
            app_services_maverick: path.join(addonImplementCoreBlueprintSrcPath, 'service.js'),
            app_utilities_maverick: path.join(addonImplementCoreBlueprintSrcPath, 'utility.js'),
            app_services_authentication: path.join(addonImplementCoreBlueprintSrcPath, 'service-authentication.js'),
            app_initializers_maverick: path.join(addonImplementCoreBlueprintSrcPath, 'initializer-maverick.js'),
            app_initializers_router: path.join(addonImplementCoreBlueprintSrcPath, 'initializer-router.js'),
            app_adapters_application: path.join(addonImplementCoreBlueprintSrcPath, 'adapter-application.js'),
            app_serializers_application: path.join(addonImplementCoreBlueprintSrcPath, 'serializer-application.js'),
            //Environment
            config_environment: path.join(addonEnvironmentBlueprintSrcPath, 'config-environment.txt'), //partial replacement
            config_maverick: path.join(addonEnvironmentBlueprintSrcPath, 'config-maverick.js'),
            //Components
            templates_login_hbs: path.join(addonComponentsBlueprintSrcPath, 'templates-login.hbs'),
            component_login_hbs: path.join(addonComponentsBlueprintSrcPath, 'components-login-form.hbs'),
            component_login_js: path.join(addonComponentsBlueprintSrcPath, 'components-login-form.js'),
            controllers_login: path.join(addonComponentsBlueprintSrcPath, 'controllers-login.js'),
            routes_login: path.join(addonComponentsBlueprintSrcPath, 'routes-login.js'),
            routes_logout: path.join(addonComponentsBlueprintSrcPath, 'routes-logout.js'),
            controllers_index: path.join(addonComponentsBlueprintSrcPath, 'controllers-index.js'),
            controllers_application: path.join(addonComponentsBlueprintSrcPath, 'controllers-application.js'),
            templates_application_hbs: path.join(addonComponentsBlueprintSrcPath, 'templates-application.hbs'),
            component_mb_hbs: path.join(addonComponentsBlueprintSrcPath, 'components-maverick-editor.hbs'),
            component_mb_js: path.join(addonComponentsBlueprintSrcPath, 'components-maverick-editor.js')
        };
        
        for (var key in appFiles) {
            if (appFiles.hasOwnProperty(key)) {
                var appFilePath = appFiles[key];
                var srcFilePath = srcFiles[key];
                try {
                    var appFileContents = fs.readFileSync(appFilePath, 'utf8');
                    console.log("Success! Found file!");
                    console.log("---------------------------");
                    //Write file...
                    fs.writeFileSync(srcFilePath, appFileContents);
                } catch (error) {
                    console.log("Error!", error);
                    console.log("---------------------------");
                }
            }
        }

    }
};
