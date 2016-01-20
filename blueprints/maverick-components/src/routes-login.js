import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        signout: {
            refreshModel: true
        }
    },
    beforeModel: function(transition){
        let params = transition.queryParams;
        if ( params.signout == "1" ){
            location.replace('/login');
        }
    }
});