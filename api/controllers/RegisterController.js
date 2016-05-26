/**
 * Created by David Parra on 15/03/2016.
 */
'use strict';
var gcm = require('node-gcm-iid'),
    controller = "Registercontroller",
    ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID,
    utils = require('../utilities/Utils'),
    Friends = require('../models/Friends');

//make it just when the account has been verified with text message. params: (id, phoneNumber)
module.exports = {

    //update mobilePhone number.
    update: function(req, res) {

        if (!req.param("id") || !req.param("phoneNumber") || req.param("phoneNumber").length !== 13) {
            return res.send(400, "phoneNumber/id Property Missing");
        }
        var objId = new ObjectId(req.param('id')),
            method = "update",
            codeAndNumber = utils.phoneSplit(req.param('phoneNumber'));
        User.native(function(error, collection) {
            if (error) {
                utils.showLogs(404, "ERROR", method, controller, error);
                return res.send(404, {
                    "message": "Error to get user",
                    "data": error
                });
            }
            collection.findOneAndUpdate({
                _id: objId
            }, {
                $set: {
                    phoneNumber: codeAndNumber.phoneNumber,
                    interCode: codeAndNumber.interCode
                }
            }, {
                returnOriginal: true,
                upsert: false
            }, function(err, r) {
                if (err) {
                    utils.showLogs(404, "ERROR", method, controller, err);
                    return res.send(404, {
                        "message": "Error to get user",
                        "data": err
                    });
                } else {

                    utils.showLogs(200, "OK", method, controller, 0);
                    return res.send(200, {
                        "message": "OK",
                        "data": [{
                            "id": r.value.id,
                            "username": r.value.username
                        }]
                    });
                    var instanceId = new gcm.InstanceId(process.env.APPROVED_API_KEY_INSTANCEID);
                    instanceId.addToTopicNoRetry(r.value.phoneNumber, 'cEyLywsLzAs:APA91bFtxqP-ugT6KH071q1IQOjSnwWfX9s3uzEOui_Vyq43qrVGfCSOpT5jHG9sQW7a-O8ssMBrru0S04gWV50t80h2KNqGGZ_QUM016-uC2rz1fB4y8nIl_LADOXr-iO_JW2hMxe68', function(err, response) {
                        if (err) console.error(err);
                        else console.log(response);
                    });
                }
            });
        });
    },
    //attemp to get the users from our databases when pass array of agenda numbers.
    getFriends: function(req, res) {

        var method = "getFriends";

        if (!req.param("agenda")) {
            return res.send(400, "agenda Property Missing");
        }

        var agenda = utils.convertString(req.param('agenda'));

        User.native(function(error, collection) {
            if (error) return res.serverError(error);
            collection.find({
                    phoneNumber: {
                        $in: agenda
                    }
                })
                .toArray(function(error, user) {
                    if (error) {
                        utils.showLogs(404, "ERROR", method, controller, error);
                        return res.send(404, {
                            "message": "Error finding users array",
                            "data": error
                        });
                    }
                    if (user.length == 0) {
                        console.log(user);

                        utils.showLogs(409, "WARNING", method, controller, 0);
                        return res.send(409, {
                            "message": "It´s posible nothing recived number exits on Place",
                            "data": [{
                                phoneNumber: user
                            }]
                        });
                    } else {
                        var friedsToDevices = [];
                        var friendsTokens = [];
                        var friendsDictionary = [];
                        var i = 0;
                        for (i = 0; i < user.length; i++) {
                            var onlyNumber = user[i].phoneNumber.split(" ");
                            friedsToDevices.push(user[i].phoneNumber);
                            friendsTokens.push(user[i].token);
                            friendsDictionary.push({
                                'username': user[i].username,
                                'token': user[i].token,
                                'phoneNumber': user[i].phoneNumber,
                                'imageUser': user[i].imageUser
                            });
                        }
                        console.log('getFriends' + friedsToDevices);

                        utils.showLogs(200, "OK", method, controller, 0);
                        return res.send(200, {
                            "message": "OK",
                            "data": friedsToDevices
                        });
                    }

                });
        });
    },


    /**
     * Adds two numbers
     * @param {String} phoneNumber = phoneNumber of the follower 
     * @param {String} toFollow(phoneNumber) = number of person to follow
     * @return {Object} Object of response Status
     */
    follow: function(req, res) {

        if (!req.param("toFollow") || !req.param("phoneNumber")) {
            return res.send(400, "toFollow/phoneNumber Property Missing");
        }

        var method = "follow";
        var phoneNum = req.param('phoneNumber');
        var toFollow = req.param('toFollow');
        var instanceId = new gcm.InstanceId('AIzaSyCTj1R9ALophNp_4XMkHAJABxUER1Z3Bzc');
        var objId = new ObjectId(req.param('id'));


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
                        console.log('usuario ' + JSON.stringify(usuario));
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
                                    instanceId.addToTopicNoRetry('topicualquieras', 'f67sRWiGXxU:APA91bFNyIA2Wpfo_0gfS33hIYSEa3-p-Qyaf5BSyBdZ6tRjAJbGmBf5XlWYBhsOhQUUit6Avwu5HASylol0l930raune0cAb14GlI2eIZy-i_R98fccv8sXenlvSzDrSCeWqdYVVAgk',
                                        function(err, responses) {
                                            if (err) {
                                                console.log('error instance id');
                                                utils.showLogs(404, "ERROR", method, controller, err);
                                                return res.send(404, {
                                                    "message": "Error adding token user",
                                                    "data": err
                                                });
                                            } else {
                                                utils.showLogs(200, "OK", method, controller, 0);
                                                return res.send(200, {
                                                    "message": "friend phoneNumber add to array success & token has been relationated with token",
                                                    "data": [{
                                                        res: responses
                                                    }]
                                                });
                                            }
                                        });
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