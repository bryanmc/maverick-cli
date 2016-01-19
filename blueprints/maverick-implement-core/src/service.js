import Ember from 'ember';
import maverick from '../utils/maverick';

export default Ember.Service.extend({

    auth: Ember.inject.service('authentication'),
	
	is: maverick('production'),

});
