import Ember from 'ember';
import config from '../config/environment';
var appPrefix = config.modulePrefix;

export default Ember.Component.extend({
    init: function(){
        this.mav = this.get('maverick');
        this.router = this.get('router');
        this._super(...arguments);
    },
    
    appPrefix: appPrefix,
    
    currentRouteName: Ember.computed(function(){
        return this.router.currentRouteName;
    }),
    
    setupController: function(){
        currentRouteName: "index"
    }
});
