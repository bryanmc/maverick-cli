/*jshint unused:false*/

import Ember from 'ember';
import DS from 'ember-data';
import maverick from '../utils/maverick';
var mav = maverick('production');

export default DS.RESTAdapter.extend({
    host: 'https://api.parse.com',
    namespace: '1',
    pathForType: function(type) {
        if ( type === 'user' ){
            return this._super(...arguments);;
        }else{
            let path = Ember.String.pluralize(type);
            path = 'classes/' + Ember.String.classify(path);
            return path;
        }
    },
    headers: Ember.computed(function() {
        return {
            'X-Parse-Application-Id': mav.parse.appId,
            'X-Parse-REST-API-Key': mav.parse.apiKey,
            'X-Parse-Session-Token': DS.Store.currentUser.sessionToken
        };
    }).volatile(),
    
    buildURL: function (modelName, id, snapshot, requestType, query) {
        return this._super(...arguments);
    },

    urlForQuery: function (query, modelName) {
		
        //Check to see if it is a valid query set in the model
        //And if so, build the proper Parse endpoint URL
        if (query.hasOwnProperty('filter')) {
            //Parse the query which should be an object with a root of 'filter'
            //This is passed in from the model when using the query function
            let queryString = JSON.stringify(query.filter);	
			
            //Set up paramater 'where=' required to query Parse endpoint
            //https://parse.com/docs/rest/guide#queries 
            let parseUrlQuery = `where=${queryString}`;
			
            //output: https://api.parse.com/1/<modelName>
            let buildUrl = this._super(...arguments);  
			
            //Build full, final URL for point query endpoint
            let fullUrl = `${buildUrl}?${parseUrlQuery}`;
			
            //console.log('FULL URL >>>', fullUrl); 
			
            return fullUrl;
		
            //If not, just return the default build URL via super
        } else {
            return this._super(...arguments);
        }

    }
});