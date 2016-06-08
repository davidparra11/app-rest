/**
 * Created by David Parra on 15/03/2016.
 */
'use strict';
var controller = "Friendcontroller",
    ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID,
    utils = require('../utilities/Utils'),
    topicHandle = require('../utilities/Topic');

//make it just when the account has been verified with text message. params: (id, phoneNumber)
module.exports = {

    /**
     * Adds two numbers
     * @param {String} phoneNumber = phoneNumber of the follower 
     * @param {String} toFollow(phoneNumber) = number of person to follow
     * @return {Object} Object of  Status response.
     */
    follow: function(req, res) {
        
        if (!req.param("toFollow") || !req.param("phoneNumber")) {
            return res.send(400, "phoneNumber/id Property Missing");
        }

        var method = "follow";
        var phoneNum = req.param('phoneNumber');
        var toFollow = req.param('toFollow');
        User.native(function(error, collection) {
            if (error) {
                utils.showLogs(404, "ERROR", method, controller, error);
                return res.send(404, {
                    "message": "Error getting user",
                    "data": error
                });
            }
            collection.find({
                phoneNumber: toFollow
            }).toArray(function(err, result) {
                if (err) {
                    utils.showLogs(404, "ERROR", method, controller, err);
                    return res.send(404, {
                        "message": "Error to find user with to follow phoneNumber on our databases",
                        "data": err
                    });
                }
                if (result.length !== 0) {
                    User.find({
                        where: {
                            phoneNumber: phoneNum
                        }
                    }).limit(1).exec(function(err, usuario) {

                        if (usuario.length !== 0) {
                            usuario[0].friend.push(toFollow);
                            usuario[0].save(function(err, resp) {

                                if (err) {
                                    utils.showLogs(404, "ERROR", method, controller, error);
                                    return res.send(404, {
                                        "message": "Error finding user by his phoneNumber",
                                        "data": err
                                    });
                                } else {
                                    console.log('usuario.token ' + JSON.stringify(result[0].token));
                                    topicHandle.addTokenToTopic('test', result[0].token, utils, res, method, controller);

                                }
                            });
                        } else {
                            utils.showLogs(400, "WARNING", method, controller, 0);
                            return res.send(400, {
                                "message": "phoneNumber of person who´s using app dont exits",
                                "data": []
                            });

                        }

                    });
                } else {
                    utils.showLogs(400, "WARNING", method, controller, 0);
                    return res.send(400, {
                        "message": "to follow phoneNumber dont exits",
                        "data": []
                    });
                }
            });
        });
    }
};