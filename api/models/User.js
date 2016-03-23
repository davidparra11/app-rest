/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

 tableName       : 'our_users',


  attributes: {

    _id: {
      type: 'string',
      unique: true,
      primaryKey: true,
      columnName: 'the_primary_key',
      autoIncrement: true
    },

    username :{
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
      unique: true,
      defaultsTo: ''

    },
    subscriptions: {
      collection: 'channel',
      via: 'participants'
    },
    active : {
      type : 'boolean'

    },
    /*  password: {
     type: 'string',
     required: true,
     columnName: 'encrypted_password'
     },
     */
    // The timestamp when the the user last logged in
    // (i.e. sent a username and password to the server)
    lastLoggedIn: {
      type: 'date',
      required: true,
      defaultsTo: new Date(0)
    }
  }
};

