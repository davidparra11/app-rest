/**
 * Created by David Parra on 15/03/2016.
 */
'use strict';
var gcm = require('node-gcm-iid'),
    controller = "Registercontroller",
    ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID,
    utils = require('../services/Utils');

//make it just when the account has been verified with text message. params: (id, phoneNumber)
module.exports = {
    //update mobilePhone number.
    update: function (req, res) {

        if (!req.param("id") || !req.param("phoneNumber") || req.param("phoneNumber").length !== 13) {
            return res.send(400, "phoneNumber/id Property Missing");
        }

        var objId = new ObjectId(req.param('id')),
            method = "update",
            codeAndNumber = phoneSplit(req.param('phoneNumber'));
        console.log('codeAN' + codeAndNumber.interCode);
        User.native(function (error, collection) {
            if (error) {
                utils.showLogs(404, "ERROR", method, controller, error);
                return res.send(404, {
                    "message": "Error to get user",
                    "data": error
                });
            }
            collection.find({
                _id: objId
            }).toArray(function (err, result) {
                if (err) {
                    utils.showLogs(404, "ERROR", method, controller, err);
                    return res.send(404, {
                        "message": "Error to find user",
                        "data": err
                    });
                }
                console.log('result' + result);
                if (result.length !== 0) {
                    User.update({
                            _id: objId
                        }, {
                            phoneNumber: codeAndNumber.phoneNumber,
                            interCode: codeAndNumber.interCode
                        })
                        .exec(function (error, user) {
                            if (error) {
                                utils.showLogs(404, "ERROR", method, controller, error);
                                return res.send(404, {
                                    "message": "Error updating phoneNumber user",
                                    "data": error
                                });
                            } else {
                                var instanceId = new gcm.InstanceId(process.env.APPROVED_API_KEY_INSTANCEID);
                                instanceId.addToTopicNoRetry('TOPIC_NAME', 'cEyLywsLzAs:APA91bFtxqP-ugT6KH071q1IQOjSnwWfX9s3uzEOui_Vyq43qrVGfCSOpT5jHG9sQW7a-O8ssMBrru0S04gWV50t80h2KNqGGZ_QUM016-uC2rz1fB4y8nIl_LADOXr-iO_JW2hMxe68', function (err, response) {
                                    if (err) console.error(err);
                                    else console.log(response);
                                });

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
    getFriends: function (req, res) {

        var method = "getFriends";
        var topicPhoneNumber = req.param('topicPhoneNumber'); //var which is used to create a topic for this current person
        var ar = convertString(req.param('arrayAgenda'));

        User.native(function (err, collection) {
            if (err) return res.serverError(err);
            collection.find({
                    phoneNumber: {
                        $in: ar
                    }
                }) //req.param('arrayAgenda')['311','321']
                .toArray(function (error, exist) {
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

                        var APPROVED_API_KEY_INSTANCEID = process.env.APPROVED_API_KEY_INSTANCEID;
                        // Set up the Instance ID with you API key
                        var instanceId = new gcm.InstanceId(APPROVED_API_KEY_INSTANCEID);

                        // Subscribe many frieds tokens to a topic
                        instanceId.addToTopicNoRetry(topicPhoneNumber, friendsTokens, function (err, response) {
                            if (err) console.error(err);
                            else console.log(response);
                        });
                    }

                });
        });
    }
};

/**
 Function that captures req.params String and return an array of characters
 data   = char1,char2,charN
 return = [array of numbers]
 **/

function convertString(data) {

    var arra = data.split(", ");
    var number = [];
    for (i = 0; i < arra.length; i++) {

        if (arra[i].length == 10) {
            number.push(arra[i]);
        } else if (arra[i].length == 12) {
            var only10 = arra[i].substr(2, 10);
            number.push(only10);
        } else {
            console.log('its phoneNumber dont aproved length policy for: IC3XXXXXXXXX');
        }

        return number;

    };
    /**
     Function that captures req.param("phoneNumber") String and return a  split varible on code & phone
     data   = phoneNumber
     return = {interCode: codeInternational,
            phoneNumber: phone}
     **/

    function phoneSplit(data) {

        var codeNumber = {};

        var codeInternational = data.substring(0, 3);
        var phone = data.substring(3, 13);
        codeNumber = {
            interCode: codeInternational,
            phoneNumber: phone
        };

        return codeNumber;


    }
    return number;
};
/**
 Function that captures req.param("phoneNumber") String and return a  split varible on code & phone
 data   = phoneNumber
 return = {interCode: codeInternational,
                    phoneNumber: phone}
 **/
function phoneSplit(data) {
    console.log('corriendo la func ');
    //var codeNumber = {};
    var codeInternational = data.substring(0, 3);
    var phone = data.substring(3, 13);
     var codeNumber = {
        interCode: codeInternational,
        phoneNumber: phone
    };
    console.log('dentro de la func ' + codeNumber['phoneNumber']);
    return codeNumber;

};