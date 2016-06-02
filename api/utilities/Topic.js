"use strict"; 
var gcm = require('node-gcm-iid'),
utils = require('./Utils'),
instanceId = new gcm.InstanceId(process.env.APPROVED_API_KEY_INSTANCEID);
module.exports = {
    
    /**
 Function that captures req.params String and return an array of characters
 data   = char1,char2,charN  //array of character which are retrived like aagenda phone numbers from device.
 return = [array of numbers]
 **/
    addTokenToTopic: function(topic, userToken, utils, res, method, controller) {

        instanceId.addToTopicNoRetry(topic, userToken,
                                        function(err, responses) {
                                            if (err) {
                                                console.log('error instance id');
                                              //  utils.showLogs(404, "ERROR", method, controller, err);
                                                return res.send(404, {
                                                    "message": "Error adding token user",
                                                    "data": err
                                                });
                                            } else {
                                              //  utils.showLogs(200, "OK", method, controller, 0);
                                                return res.send(200, {
                                                    "message": "friend phoneNumber add to array success & token has been relationated with token",
                                                    "data": [{
                                                        response: responses
                                                    }]
                                                });
                                            }
                                        });
     
    }
}

