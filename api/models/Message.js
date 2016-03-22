/**
 * Message.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName       : 'messages',
  attributes: {
    // Sender
    from: {
      //model: 'user',
      //required: true
      type: 'string'
    },
    // Receiver
    to: {
      //model: 'user',
      //required: true
      type: 'text'
    },
    msg: {
      type: 'text',
     // required: true
    }


  }
};
