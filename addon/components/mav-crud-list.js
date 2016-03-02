import Ember from 'ember';
import layout from '../templates/components/mav-crud-list';

var MavCrudComponent = Ember.Component.extend({
    init: function(){
        this._super(...arguments);
        this.setConfigValues();
    },
    layout: layout,
    component: {},
    defaultConfigSettings: {
        isAutoStructured: false,
        labels: {
            c_singular: 'Item',
            c_plural: 'Items',
            l_singular: 'item',
            l_plural: 'items'
        },
        webThumbEnabled: true,
        webUrl: {
            key: "",
            static: "http://emberjs.com",
            transform: ""
        },
        deleteButtonEnabled: true,
        cloneButtonEnabled: true,
        refreshButtonEnabled: true,
        externalLinkButtonEnabled: true,
        loadButtonEnabled: true,
        archiveButtonEnabled: true
    },
    /**
     * Sets component config values
     * Optionally this component accepts a `config` param which can
     * be used to override the component's default configuration as
     * defined in the `configs` property.
     */
    setConfigValues: function(){
        console.log('this.config', this.config);
        if ( typeof this.config !== 'undefined' ){

            var defaults = this.get('defaultConfigSettings');

            for (var key in defaults) {
                if (defaults.hasOwnProperty(key)) {

                    var setValue;
                    var defaultValue = defaults[key];
                    
                    var isFunction = typeof this.config[key] === 'function' ? true : false;
                    var isTransform = typeof this.config[key] === 'object' && typeof this.config[key].transform === 'function' ? true : false;

                    if ( isFunction) {
                        setValue = this.config[key]();
                    } else if ( isTransform ) {
                        setValue = this.config[key];
                    }else{
                        setValue = this.config[key];
                    }
                    
                    this.set(key, setValue);
                    var component = this.get('component');
                    component[key] = setValue;
                    this.set('component', component);
                }

            }
        }
            
        
    },
});

MavCrudComponent.reopenClass({
  positionalParams: ['config', 'records']
});

export default MavCrudComponent;