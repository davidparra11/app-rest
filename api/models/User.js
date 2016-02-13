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
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName: 'the_primary_key',
      autoIncrement: true
    },

    username :{

  	 type: 'string',
  	 required: true
  	},
    phoneNumber: {
      type: 'string',
      primaryKey: true,
      defaultsTo: '111-222-3333',
      size: 15     

    },
    password: {
      type: 'string',
      required: true,
      columnName: 'encrypted_password'
    },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    email: {
      type: 'string',
      email: true,
      unique: true
    },
  	active : {
  		type : 'boolean'

  	}
  }
};

