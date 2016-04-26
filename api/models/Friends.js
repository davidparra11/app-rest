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
            required: true,
            unique: true
        },

        friendId: {
            type: 'string',
            required: true,
            unique: true
        },

        relations: {
            model: 'user',
            via: 'friends',
            dominant: true
        }


    }
};