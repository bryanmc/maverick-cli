import Ember from 'ember';

export default Ember.Route.extend({
    
    actions: {      
        MB_destroyBuilder: function(){
            alert("Destroying Maverick Builder");
        }
    }
    
});