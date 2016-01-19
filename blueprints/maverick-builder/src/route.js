/* global $ */
import Ember from 'ember';
import ic from 'ic-ajax';
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
        
        $.getJSON(fileCheckEndpoint+'setup-ui', function(response){ 
            console.log('Check: setupUi', response.output);     
            if ( response.output.indexOf("success") > -1 ){
                self.controller.set('check_setupUi', "success");
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
        }
    }
    
});