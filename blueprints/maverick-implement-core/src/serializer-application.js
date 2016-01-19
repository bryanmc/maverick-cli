 /*jshint unused:false*/
 
import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONSerializer.extend({
    /**
     * Set up custome primary key for 'objectId' which Parse uses instead of 'id' or '_id' 
     */
    primaryKey: 'objectId',
    
    /**
     * FIX
     * ---------------
     * Error: Assertion Failed: An adapter cannot assign a new id to a record that already has an id. 
     * <appname@model:user::ember464:LvZ43IjhWY> had id: LvZ43IjhWY and you tried to update it with 
     * null. This likely happened because your server returned data in response to a find or update 
     * that had a different id than the one you sent.
     * 
     * Serializer searches for a property 'id' being returned from backend 
     * when a record is updated.  However Parse does not have an 'id' property.
     * Therefore we must add a column to Parse named 'id_' for the User class
     * and have it populated with the real ID of the record when it gets created.
     * 
     * The 'resourceHash' object here contains the entire record from the database
     * except the 'objectId' property, otherwise we could simply use that.
     * 
     * http://emberjs.com/api/data/classes/DS.JSONSerializer.html#method_extractId
     * https://github.com/emberjs/data/tree/v2.2.1/packages/ember-data/lib/serializers/json-serializer.js#L519
     * 
     */
    extractId: function (modelClass, resourceHash) {
        return resourceHash.id_;
    },
    
    /**
     * FIX
     * --------------
     * payload.map is not a function TypeError: payload.map is not a function
     * 
     * When a response to call such as 'findAll' contains multiple records, Parse returns them in the 
     * following format: data: { [{record}, {record}] }
     * 
     * The native Ember normalize function search for the records in the 'data' index of the payload obj,
     * like payload.data.map.  We need to change that so that it searches instead payload.results - the
     * same index returned by parse that contains the array of results.
     * 
     * The following line is the important one:
     * documentHash.data = payload.results.map(function (item) {
     * 
     * http://discuss.emberjs.com/t/payload-with-metadata-on-jsonserializer/9092
     * 
     */
    normalizeArrayResponse: function (store, primaryModelClass, payload, id, requestType) {

        var _this = this;
    
        var documentHash = {
            data: null,
            included: []
        };
    
        var meta = this.extractMeta(store, primaryModelClass, payload);
        if (meta) {
            Ember.assert("The `meta` returned from `extractMeta` has to be an object, not \"" + Ember.typeOf(meta) + "\".", Ember.typeOf(meta) === "object");
            documentHash.meta = meta;
        }
    
        documentHash.data = payload.results.map(function (item) {
            var _normalize2 = _this.normalize(primaryModelClass, item);
            var data = _normalize2.data;
            data.id_ = data.id;
            return data;
        });
    
        return documentHash;
    }
            
});