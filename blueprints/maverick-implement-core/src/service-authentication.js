/* global $ */
import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Service.extend({
    /** 
     * Initialize service, inject Maverick service
     * variable.
     */
    init: function () {
        this.mav = this.get('maverick');
        this.router = this.get('router');
        this._super(...arguments);

        this.setCurrentUser();
    },

    parseLogout: function (instance) {

        let currentUser = this.get('currentUser');

        if (!currentUser) {
            instance.router.transitionTo('login', {
                queryParams: { signout: '1' }
            });
            return false;
        } else {
            let request = $.ajax({
                type: "POST",
                url: instance.mav.is.parse.endpoints.logout,
                headers: {
                    "X-Parse-Application-Id": instance.mav.is.parse.appId,
                    "X-Parse-REST-API-Key": instance.mav.is.parse.apiKey,
                    "X-Parse-Session-Token": currentUser.sessionToken
                }
            });
            request.then(function (response) {
                //Clear Cookies
                Ember.$.cookie('auth_user', null);
                Ember.$.cookie('auth_user_sid', null);
                instance.router.transitionTo('login', {
                    queryParams: { signout: '1' }
                });
            }, function (response) {
                //TODO: Handle this error
                instance.router.transitionTo('login', {
                    queryParams: { signout: '1' }
                });
            });
        }
    },

    /** 
     * Returns a promise from a call to the Parse REST API
     * user login endpoint.
     */
    parseLogin: function (credentials, instance) {
        let request = $.ajax({
            type: "GET",
            url: instance.mav.is.parse.endpoints.login,
            data: credentials,
            headers: {
                "X-Parse-Application-Id": instance.mav.is.parse.appId,
                "X-Parse-REST-API-Key": instance.mav.is.parse.apiKey,
                "X-Parse-Revocable-Session": 1
            }
        });
        request.then(instance.success.bind(instance), instance.failure.bind(instance));
    },

    parseLoginSuccess: function (user, instance) {
        //Notify Alert
        instance.toastr('success', instance.mav.is.components.loginRegForm.successText[1], instance.mav.is.components.loginRegForm.successText[0]);
        //Set Cookies
        Ember.$.cookie('auth_user', JSON.stringify(user));
        Ember.$.cookie('auth_user_sid', user.sessionToken);
        //Make Transition
        this.setCurrentUser();
        // instance.get('router').transitionTo(instance.mav.is.loginSuccessRoute);
        instance.get('router').transitionTo(instance.mav.is.loginSuccessRoute, {
            queryParams: { signin: '1' }
        });
    },

    parseLoginFailure: function (response, instance) {
        instance.toastr('error', instance.mav.is.components.loginRegForm.errorText[1], instance.mav.is.components.loginRegForm.errorText[0]);
        console.error(response);
    },

    currentUser: null,

    getCurrentUser: function () {
        let currentUser;

        try {
            currentUser = JSON.parse(Ember.$.cookie('auth_user'));
        } catch (e) {
            currentUser = null;
        }

        return currentUser;
    },

    setCurrentUser: function () {

        let currentUser = this.get('getCurrentUser')();

        DS.Store.reopenClass({
            currentUser: currentUser
        });

        this.set('currentUser', currentUser);

        return currentUser;
    },

    doRouteCheck: function (instance) {

        let currentUser = this.get('getCurrentUser')();

        if (currentUser === null) {
            return false;
        } else {
            let user = typeof user !== 'undefined' ? user : currentUser;
            let request = $.ajax({
                type: "GET",
                url: instance.mav.is.parse.endpoints.me,
                headers: {
                    "X-Parse-Application-Id": instance.mav.is.parse.appId,
                    "X-Parse-REST-API-Key": instance.mav.is.parse.apiKey,
                    "X-Parse-Session-Token": currentUser.sessionToken
                }
            });
            request.then(instance.auth.authenticatedRouteSuccess.bind(instance), instance.auth.authenticatedRouteFailure.bind(instance));
            return true;
        }

    },

    checkRoute: function (instance) {
        if (!instance.auth.doRouteCheck(instance)) {
            instance.transitionTo('login', {
                queryParams: { signout: '1' }
            });
        }
    },

    authenticatedRouteSuccess: function (response) {
        // Nothing to do...
    },

    authenticatedRouteFailure: function (response) {
        let failure = response;
        console.log('Route Authentication Failure', failure);
        this.router.transitionTo('login', {
            queryParams: { signout: '1' }
        });

        let toast = this.get('toast');
        toast["error"]("You have been logged out as your session has expired", "Please Login Now");
    }

});