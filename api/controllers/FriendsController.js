/**
 * Created by David Parra on 15/05/2016.
 */
'use strict';
var gcm = require('node-gcm-iid'),
    controller = "Friendcontroller",
    ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID,
    utils = require('../utilities/Utils'),
    Friends = require('../models/Friends');

//make it just when the account has been verified with text message. params: (id, phoneNumber)
module.exports = {

    

    /**
     * Adds two numbers
     * @param {String} Id = id of the follower 
     * @param {String} toFollow(phoneNumber) = number of person to follow
     * @return {Object} Object of response Status
     */
    follow: function(req, res) {

        if (!req.param("id") || !req.param("toFollow") || !req.param("phoneNumber")) {
            return res.send(400, "toFollow/id/phoneNumber Property Missing");
        }

        var method = "follow";
        var objId = new ObjectId(req.param('id'));
        var phoneNum = req.param('phoneNumber');
        var toFollow = req.param('toFollow');
        var instanceId = new gcm.InstanceId(process.env.APPROVED_API_KEY_INSTANCEID);

/*
        User.native(function(error, user) {
            if (error) {
                utils.showLogs(404, "ERROR", method, controller, error);
                return res.send(404, {
                    "message": "Error getting user",
                    "data": error
                });
            }
            user.find({
                phoneNumber: toFollow
            }).toArray(function(err, result) {
                if (err) {
                    utils.showLogs(404, "ERROR", method, controller, err);
                    return res.send(404, {
                        "message": "Error to find user with phoneNumber on our databases",
                        "data": err
                    });
                }


                console.log('result.token' + result);
                if (result.length !== 0) {
                    /*instanceId.addToTopicNoRetry(phoneNum, result.token, function(err, response) {
                        if (err) {
                            utils.showLogs(404, "ERROR", method, controller, error);
                            return res.send(404, {
                                "message": "Error adding token user",
                                "data": error
                            });
                        }
                    });
                    //  console.log('collection ' + collection);
                    // return res.send    57280ea90e4807bc03e33cab   
   

                    User.findOne({
                        username: 'camila'
                    }).exec(function(err, collection) {
                        if (err) {
                            utils.showLogs(404, "ERROR", method, controller, error);
                            return res.send(404, {
                                "message": "Error finding user to follow",
                                "data": error
                            });
                        } // handle error
                        //console.debug(collection);
                        console.log(JSON.stringify(collection));

 */

                        Friends.create({
                                followerId: '57280ea90e4807bc03e33cab',
                            friendId: '5281e8c205e91e02e2ee698',

                                // Set the User's Primary Key to associate the Pet with the User.
                                relations: '57280ea90e4807bc03e33cab'
                            })
                            .exec(function(err, respuesta) {
                            if (err) {
                                utils.showLogs(404, "ERROR", method, controller, err);
                                return res.send(404, {
                                    "message": "Error executing both associations",
                                    "data": collection
                                });
                            } else {
                                utils.showLogs(200, "OK", method, controller, 0);
                                return res.send(200, {
                                    "message": "friend associations succes",
                                    "data": [{
                                        res: respuesta
                                    }]
                                });
                            }
                        });

/*


                    });



                } else {
                    utils.showLogs(400, "WARNING", method, controller, 0);
                    return res.send(400, {
                        "message": "Id does not exist",
                        "data": []
                    });
                }
            });
        });
*/
    }
};