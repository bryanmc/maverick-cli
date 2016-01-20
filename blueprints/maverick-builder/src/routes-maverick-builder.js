/* global $ */
import Ember from 'ember';

var endpoint = "/api/maverick/";
var actionEndpoint = endpoint+"action/";
var fileCheckEndpoint = endpoint+"maverick-file-check/";

export default Ember.Route.extend({
    
    setupController: function(){
        var self = this;
        
        //Check: Update Ember
        $.getJSON(endpoint+'check/update-ember', function(response){ 
            console.log('Check: updateEmber', response.output);     
            if ( response.output.indexOf("success") > -1 ){
                self.controller.set('check_updateEmber', "success");
            }
        });
        
        $.getJSON(fileCheckEndpoint+'bower_components,bootstrap/package.json', function(response){ 
            console.log('Check: setupUi', response.output);     
            if ( response.output.indexOf("success") > -1 ){
                self.controller.set('check_setupUi', "success");
            }
        });
        
        $.getJSON(fileCheckEndpoint+'app,services/maverick.js', function(response){ 
            console.log('Check: setupMaverickCore', response.output);     
            if ( response.output.indexOf("success") > -1 ){
                self.controller.set('check_setupMaverickCore', "success");
            }
        });
        
        $.getJSON(fileCheckEndpoint+'app,components/login-form.js', function(response){ 
            console.log('Check: check_installMaverickComponents', response.output);     
            if ( response.output.indexOf("success") > -1 ){
                self.controller.set('check_installMaverickComponents', "success");
            }
        });
       
        $.getJSON(fileCheckEndpoint+'config/maverick.js', function(response){ 
            console.log('Check: check_setupEnvironment', response.output);     
            if ( response.output.indexOf("success") > -1 ){
                self.controller.set('check_setupEnvironment', "success");
            }
        });
  
    },
    
    actions: {  
          
        MB_updateEmber: function(){
            var self = this;
            $.getJSON(endpoint+'update-ember', function(response){ 
                self.controller.set('check_updateEmber', 'success');
                console.log('Do: updateEmber', response.output);     
            });
        },
        
        MB_setupUi: function(){
            var self = this;
            $.getJSON(actionEndpoint+'maverick-setup-ui', function(response){ 
                self.controller.set('check_setupUi', 'success');
                console.log('Do: setupUi', response.output);     
            });
        },
        
        MB_setupMaverickCore: function(){
            var self = this;
            $.getJSON(actionEndpoint+'maverick-implement-core', function(response){ 
                self.controller.set('check_setupMaverickCore', 'success');
                console.log('Do: setupMaverickCore', response.output);     
            });
        },
        
        MB_installMaverickComponents: function(){
            var self = this;
            $.getJSON(actionEndpoint+'maverick-components', function(response){ 
                self.controller.set('check_installMaverickComponents', 'success');
                console.log('Do: installMaverickComponents', response.output);     
            });
        },
        
        MB_setupEnvironment: function(){
            var self = this;
            $.getJSON(actionEndpoint+'maverick-environment', function(response){ 
                self.controller.set('check_setupEnvironment', 'success');
                console.log('Do: setupEnvironment', response.output);     
            });
        },

    }
    
});