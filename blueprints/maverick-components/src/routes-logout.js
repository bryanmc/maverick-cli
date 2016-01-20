import Ember from 'ember';

export default Ember.Route.extend({
    init: function () {
        this.mav = this.get('maverick');
        this.router = this.get('router');
        this.auth = this.get('auth');
        this._super(...arguments);
    },

    auth: Ember.inject.service('authentication'),

    beforeModel: function () {
        this.auth.parseLogout(this);
    }

});