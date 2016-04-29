/**
 * Created by David Parra on 15/03/2016.
 */
'use strict';
var gcm = require('node-gcm-iid'),
    controller = "Registercontroller",
    ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID,
    utils = require('../utils/Utils');

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
                    returnOriginal: false,
                    upsert: true
                }, function(err, r) {
                    if (err) {
                        utils.showLogs(404, "ERROR", method, controller, error);
                        return res.send(404, {
                            "message": "Error to get user",
                            "data": err
                        });
                    } else {

                        utils.showLogs(200, "OK", method, controller, 0);
                        return res.send(200, {
                            "message": "OK",
                            "data": r.value.username
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
            var ar = utils.convertString(req.param('agenda'));

            User.native(function(err, collection) {
                if (err) return res.serverError(err);
                collection.find({
                        phoneNumber: {
                            $in: ar
                        }
                    })
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
        }
                };