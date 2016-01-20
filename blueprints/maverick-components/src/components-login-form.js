/* global $ */
import Ember from 'ember';
// import maverick from '../utils/maverick';

export default Ember.Component.extend({

    init: function () {
        this.mav = this.get('maverick');
        this.auth = this.get('auth');
        this._super(...arguments);
    },

    auth: Ember.inject.service('authentication'),

    actions: {
        attemptUserLogin: function () {
            this.login(this.getProperties("username", "password"));
        }
    },

    login: function (credentials) {
        this.auth.parseLogin(credentials, this);
    },

    success: function (response) {
        let user = response;
        this.auth.parseLoginSuccess(user, this);
    },

    failure: function (response) {
        this.auth.parseLoginFailure(response, this);
    },

    toastr: function (type, message, title) {
        let toast = this.get('toast');
        toast[type](message, title);
    }

});