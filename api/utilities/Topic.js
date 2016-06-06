"use strict";
var gcm = require('node-gcm-iid'),
    utils = require('./Utils'),
    instanceId = new gcm.InstanceId(process.env.APPROVED_API_KEY_INSTANCEID);
module.exports = {
    /**
    Function that add an user token to an especific GCM Topic
    data   = topic, userToken, utils, res, method, controller
    return = response with an ok or a failure
    **/
    addTokenToTopic: function(topic, userToken, utils, res, method, controller) {

        if (res) {
            instanceId.addToTopicNoRetry(topic, userToken,
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
                        console.log('res topic OK ' + JSON.stringify(res));
                        return res.send(200, {
                            "message": "friend phoneNumber add to array success & token has been relationated with token",
                            "data": [{
                                response: responses
                            }]
                        });
                    }
                });

        } else {
            instanceId.addToTopicNoRetry(topic, userToken,
                function(err, responses) {
                    if (err) {
                        console.log('error instance id (on test)');
                        return false;
                    } else {
                        console.log('Ok on Test ');
                        return true;
                    }
                });
        }
    }
}