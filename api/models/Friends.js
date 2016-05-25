'use strict';
/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    tableName: 'friends',


    attributes: {

        followerId: {
            type: 'string',
            required: true
        },

        friendsId: {
            type: 'string',
            required: true
        },

        relations: {
      		collection: 'user'
   		 }

        
    }
};