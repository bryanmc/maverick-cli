import Ember from 'ember';

export default Ember.Controller.extend({
    appName:'Maverick App',
    auth: Ember.inject.service('authentication'),
    hideLayout: false,
    isLogged: Ember.computed(function() {
        let auth = this.get('auth');
        return auth.currentUser;
    })
});