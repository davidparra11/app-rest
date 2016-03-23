/**
 * Created by HP 14 V014 on 22/03/2016.
 */

module.exports = {

    attributes: {
        name: {
            type: 'text',
            unique: true,
            required: true,
            primaryKey: true
        },
        participants: {
            collection: 'user',
            via: 'subscriptions',
            dominant: true
        }

    }


    /**
     * Subscribes a user to a channel
     * @param  {Object}   inputs
     *           => channelID {Integer} ID of the channel to subscribe
     *           => userID {Integer} ID of the subscribing user
     * @param  {Function} cb     [description]
     * @return {[type]}          [description]
     */
    /*  subscribe: function (inputs, cb) {
     // Create a user
     Channel.findOne(inputs.channelID).exec(function(err, theChannel) {
     if(err) return cb(err);
     if(!theChannel) return cb(new Error("Channel not found."));
     User.findOne(inputs.userID).exec(function(err, theUser) {
     if(err) return cb(err);
     if()
     })
     theChannel.users.add(inputs.userId);
     theChanlle.save(cb);
     })
     }*/
};