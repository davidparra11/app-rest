'use strict';
/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    tableName: 'topics',


    attributes: {

        topicName: {
            type: 'string',
            required: true,
            unique: true
        },

        token: {
            type: 'string',
            required: true,
            unique: true
        },

        owners: {
      		model: 'user',
      		via: 'topics'
   		 }

        
    }
};