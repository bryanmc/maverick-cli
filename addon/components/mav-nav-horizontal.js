import Ember from 'ember';
import layout from '../templates/components/mav-nav-horizontal';

var MavNavHorizontalComponent =  Ember.Component.extend({
    layout: layout
});

MavNavHorizontalComponent.reopenClass({
    positionalParams: ['component', 'components']
});

export default MavNavHorizontalComponent;