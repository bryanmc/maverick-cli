import Ember from 'ember';
import layout from '../templates/components/mav-crud-list-row-item';

var MavCrudListRowComponent = Ember.Component.extend({
    layout: layout,
    isEditing: false,
    init: function(){
        this._super(...arguments);
        this.normalizeWebUrl();
    },
    classNames: ['maverick-crud-list-row-item'],
    normalizeWebUrl: function(){

        //Import component and record component params
        //component has a property `webUrl` which
        //is an object with properties `key` and `transorm`.
        //the key is retrieved from the record and replaces
        //the {{key}} token in the `transform` string.
        var component = this.component;
        var record = this.record;
        
        if ( typeof component.webUrl !== 'undefined' && typeof component.webUrl.static !== 'undefined' )
            return Ember.set(record, 'webUrl', component.webUrl.static);
        
        //Defines which property of the record represents
        //the site's URL.
        var targetKey = component.webUrl.key;
        
        //Checks the record for a property with the same
        //name as was set to `targetKey`
        var thumbKey = Ember.get(record, targetKey);
        
        //If we have the transform string, we massage it to
        //replace the {{key}} token with the actual value as
        //retrieved from the record above and then set the 
        //transformed value to the record property `webUrl`
        if ( typeof component.webUrl !== 'undefined' && typeof component.webUrl.transform !== 'undefined' )
            return Ember.set(record, 'webUrl', component.webUrl.transform.replace(/{{key}}/g, thumbKey));
    },
    
    click() {
        alert('clicked');
        // this.$().fadeOut();
        console.log('this', this);
        this.set('isEditing', true);
    }
    
});

MavCrudListRowComponent.reopenClass({
  positionalParams: ['component', 'record']
});

export default MavCrudListRowComponent;