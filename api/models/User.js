/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    //connection : 'mongoProduction',
    tableName: 'user',

    attributes: {
        username: {
            type: 'string',
            unique: true
        },
        email: {
            type: "email",
            unique: true
        },
        telephone: {
            type: 'string',
            unique: true
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
        gravatar: {
            type: "string"
        },
        contacts: {
            type: "json"
        },
        active: {
            type: 'boolean'
        }
    }
};
