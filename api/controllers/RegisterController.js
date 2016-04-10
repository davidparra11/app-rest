/**
 * Created by David Parra on 15/03/2016.
 */

gcm = require('node-gcm-iid');
var controller = "Registercontroller";

var utils = require('../services/Utils');
//process.env.LOGS_GLOBAL
//make it just when the account has been verified with text message. params: (id, phoneNumber)

module.exports = {
        //update mobilePhone number.
        update: function(req, res) {
            var method = "update";
            User.find({
                    _id: req.param('_id')
                }) //changed username by _id property
                .exec(function(error, exist) {
                    if (error) {
                        utils.showLogs(404, "ERROR", method, controller, process.env.LOGS_GLOBAL, error);
                        return res.send(404, {
                            "message": "Error finding user",
                            "data": error
                        });
                    }
                    if (exist.length == 0) {
                        utils.showLogs(400, "WARNING", method, controller, process.env.LOGS_GLOBAL);
                        return res.send(400, {
                            "message": "warninig finding user",
                            "data": [{
                                id: exist.id
                            }]
                        });
                    } else {
                        User.update({
                                _id: req.param('_id')
                            }, {phoneNumber: req.param('phoneNumber')})
                            .exec(function(error, user) {
                                if (error) {
                                    utils.showLogs(404, "ERROR", method, controller, process.env.LOGS_GLOBAL, error);
                                    return res.send(404, {
                                        "message": "Error finding user",
                                        "data": error
                                    });
                                } else {
                                    utils.showLogs(200, "OK", method, controller, process.env.LOGS_GLOBAL);
                                    return res.send(200, {
                                        "message": "mobilePhone updated",
                                        "data": [{
                                            id: user.id
                                        }]
                                    });
                                }
                            });
                    }
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
                            utils.showLogs(404, "ERROR", method, controller, process.env.LOGS_GLOBAL, error);
                            return res.send(404, {
                                "message": "Error finding user",
                                "data": error
                            });
                        }
                        if (exist.length == 0) {
                            console.log(exist);

                            utils.showLogs(409, "WARNING", method, controller, process.env.LOGS_GLOBAL);
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

                                friedsToDevices.push(exist[i].phoneNumber);
                                friendsTokens.push(exist[i].token);
                                friendsDictionary.push({
                                    'username': exist[i].username,
                                    'token': exist[i].token

                                })
                            }
                            console.log('getFriends' + friedsToDevices);

                            utils.showLogs(200, "OK", method, controller, process.env.LOGS_GLOBAL, 0);
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
            texto.push(arra[i]);
        }
        return texto;

    }