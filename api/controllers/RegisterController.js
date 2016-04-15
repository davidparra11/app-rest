/**
 * Created by David Parra on 15/03/2016.
 */
'use strict';
var gcm = require('node-gcm-iid'),
    controller = "Registercontroller";
ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID,
    utils = require('../services/Utils');

//make it just when the account has been verified with text message. params: (id, phoneNumber)
module.exports = {
        //update mobilePhone number.
        update: function(req, res) {

            var objId = new ObjectId(req.param('id'));
            var method = "update";
            User.native(function(error, collection) {
                if (error) {
                    utils.showLogs(404, "ERROR", method, controller, error);
                    return res.send(404, {
                        "message": "Error to get user",
                        "data": error
                    });
                }
                collection.find({
                    _id: objId
                }).toArray(function(err, result) {
                    if (err) {
                        utils.showLogs(404, "ERROR", method, controller, err);
                        return res.send(404, {
                            "message": "Error to find user",
                            "data": err
                        });
                    }
                    console.log('result' + result);
                    if (result.length != 0) {
                        User.update({
                                _id: objId
                            }, {
                                phoneNumber: req.param('phoneNumber')
                            })
                            .exec(function(error, user) {
                                if (error) {
                                    utils.showLogs(404, "ERROR", method, controller, error);
                                    return res.send(404, {
                                        "message": "Error updating phoneNumber user",
                                        "data": error
                                    });
                                } else {
                                    utils.showLogs(200, "OK", method, controller, 0);
                                    return res.send(200, {
                                        "message": "mobilePhone updated",
                                        "data": [{
                                            id: user.id
                                        }]
                                    });
                                }
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
        },
        //attemp to will get the users from our databases when pass array of agenda numbers.
        getFriends: function(req, res) {

            var method = "getFriends";
            var topicPhoneNumber = req.param('topicPhoneNumber'); //var which is used to create a topic for this current person
            var ar = convertString(req.param('arrayAgenda'));

            User.native(function(err, collection) {
                if (err) return res.serverError(err);
                collection.find({
                        phoneNumber: {
                            $in: ar
                        }
                    }) //req.param('arrayAgenda')['311','321']
                    .toArray(function(error, exist) {
                        if (error) {
                            utils.showLogs(404, "ERROR", method, controller, error);
                            return res.send(404, {
                                "message": "Error finding user",
                                "data": error
                            });
                        }
                        if (exist.length == 0) {
                            console.log(exist);

                            utils.showLogs(409, "WARNING", method, controller, 0);
                            return res.send(409, {
                                "message": "Users no exist",
                                "data": [{
                                    phoneNumber: exist
                                }]
                            });
                        } else {
                            var friedsToDevices = [];
                            var friendsTokens = [];


                            for (i = 0; i < exist.length; i++) {
                                var onlyNumber = exist[i].phoneNumber.split(" ");
                                friedsToDevices.push(onlyNumber[1]);
                                friendsTokens.push(exist[i].token);
                                friendsDictionary.push({
                                    'username': exist[i].username,
                                    'token': exist[i].token,
                                    'phoneNumber': exist[i].phoneNumber,
                                    'imageUser': exist[i].imageUser
                                })
                            }
                            console.log('getFriends' + friedsToDevices);

                            utils.showLogs(200, "OK", method, controller, 0);
                            return res.send(200, {
                                "message": "OK",
                                "data": friedsToDevices
                            });

                            var APPROVED_API_KEY_INSTANCEID = process.env.APPROVED_API_KEY_INSTANCEID
                                // Set up the Instance ID with you API key
                            var instanceId = new gcm.InstanceId(APPROVED_API_KEY_INSTANCEID);

                            // Subscribe many frieds tokens to a topic
                            instanceId.addToTopicNoRetry(topicPhoneNumber, friendsTokens, function(err, response) {
                                if (err) console.error(err);
                                else console.log(response);
                            });
                        }

                    });
            });
        }
    },
    /**
         Function that captures req.params String and return an array of characters
         data   = char1,char2,charN
         return = [array of numbers]
        **/

    function convertString(data) {

        arra = data.split("'");
        var texto = [];
        for (i = 0; i < arra.length; i++) {
            if (arra[i].length == 14) {
                texto.push(arra[i]);
            }else{
                console.log('its phoneNumber dont aproved length policy for: +57 3XXXXXXXXX')
            }
        }
        return texto;

    }