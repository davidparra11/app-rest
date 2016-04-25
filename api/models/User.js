'use strict';
/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    tableName: 'users',


    attributes: {

        /* id: {
             type: 'string',
             unique: true,
             primaryKey: true,
             columnName: 'the_primary_key',
             autoIncrement: true
         },

         */
        username: {
            type: 'string',
            required: true,
            unique: true
        },

        phoneNumber: {
            type: 'string',
            primaryKey: true,
            defaultsTo: '111-222-3333',
            size: 15,
            unique: true
        },
        interCode: {
            type: 'string',
            defaultsTo: '+57'
        },

        encryptedPassword: {
            type: 'string',
            required: true
        },


        firstName: {
            type: 'string',
            defaultsTo: ''
        },

        lastName: {
            type: 'string',
            defaultsTo: ''
        },
        email: {
            type: 'string',
            email: true,
            unique: true,
            required: true

        },

        token: {
            type: 'string',
            required: true,
            //unique: true,
            defaultsTo: 'token_null'

        },

        active: {
            type: 'boolean',
            defaultsTo: 1

        },

        imageUser: {
            type: 'string',
            defaultsTo: 'http://vignette3.wikia.nocookie.net/the-enigma-corporation/images/0/01/Users-User-icon.png/revision/latest?cb=20140213102228'
        },

        friends: {
            collection: 'friends',
            via: 'relations'
        }
        // The timestamp when the the user last logged in
        // (i.e. sent a username and password to the server)
        lastLoggedIn: {
            type: 'date',
            required: true,
            defaultsTo: new Date(0)
        }
    }
};