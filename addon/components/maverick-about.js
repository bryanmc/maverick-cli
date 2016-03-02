import Ember from 'ember';
import layout from '../templates/components/maverick-about';

export default Ember.Component.extend({
    layout: layout,
    heading: "About Component",
    itemsInserted: 0,
    becomeFocused: function() {
        var numInserted = this.get('itemsInserted');
        numInserted++;
        console.log("num inserted", numInserted);
        if ( numInserted === 3 ){
            this.$().after("</div><div class='row'>");
            this.set('itemsInserted', 0);
        }
    }.on('didInsertElement'),
    actions: {
        didInsertElement: function(element){
        console.log("element inserted", element);
    }
  }
});