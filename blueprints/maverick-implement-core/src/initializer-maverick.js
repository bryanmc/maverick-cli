/**
 * Maverick Service Initializer
 * Injects the Maverick service globally into routes, controllers and
 * componenents.  Access the service inside one of these by using 
 * this.get('maverick')
 * 
 * ````
 * let mav = this.get('maverick');
 * console.log('mav.is.appName'); //output: An App Name
 * ````
 */

export function initialize(application) {
  application.inject('route', 'maverick', 'service:maverick');
  application.inject('controller', 'maverick', 'service:maverick');
  application.inject('component', 'maverick', 'service:maverick');
}

export default {
  name: 'maverick',
  initialize
};