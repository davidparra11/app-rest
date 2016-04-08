/**
 * Created by David Parra on 15/03/2016.
 */

gcm = require('node-gcm-iid');
var controller = "Registercontroller";
var logsGlobal = 1;
var utilidades = require('../services/Utils');

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
                        utilidades.showLogs(404, "ERROR", method, controller, logsGlobal);
                        utilidades.sendInfoFunc(404, "User no exist", res, error);
                    }
                    if (exist.length == 0) {
                        utilidades.showLogs(404, "WARNING", method, controller, logsGlobal, logsGlobal);
                        utilidades.sendInfoFunc(404, "Error finding user", res, [{
                            id: exist.id
                        }]);
                    } else {
                        User.update({
                                _id: req.param('_id')
                            }, req.param('phoneNumber'))
                            .exec(function(error, user) {
                                if (error) {
                                    utilidades.showLogs(404, "ERROR", method, controller, logsGlobal);
                                    utilidades.sendInfoFunc(404, "Error updating phoneNumber", res, error);
                                } else {
                                    utilidades.showLogs(200, "OK", method, controller, logsGlobal);
                                    utilidades.sendInfoFunc(200, "Update phoneNumber success.", res, [{
                                        id: user.id
                                    }]);
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
                            utilidades.showLogs(404, "ERROR", method, controller, logsGlobal);
                            utilidades.sendInfoFunc(404, "Error finding users", res, error);
                        }
                        if (exist.length == 0) {
                            console.log(exist);

                            utilidades.showLogs(409, "WARNING", method, controller, logsGlobal);
                            utilidades.sendInfoFunc(409, "Users no exist", res, [{
                                phoneNumber: exist
                            }]);
                        } else {
                            console.log('exist '+exist.phoneNumber);
                            
                            var friedsToDevices = [];
                            var friendsTokens = [];

                            for (i = 0; i < exist.length; i++) {
                                
                                friedsToDevices.push(exist[i].phoneNumber);
                                friendsTokens.push(exist[i].token);
                            }
                            console.log('getFriends'+friedsToDevices);

                           utilidades.showLogs(200, "OK", method, controller, logsGlobal, 0);
                           utilidades.sendInfoFunc(200, "Ok", res, friedsToDevices);

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
    console.log('texto ' + texto);
    return texto;
    
}