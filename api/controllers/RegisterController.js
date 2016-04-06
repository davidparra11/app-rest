/**
 * Created by David Parra on 15/03/2016.
 */


gcm = require('node-gcm-iid');
var controller = "Registercontroller";
var logsGlobal = 1;

//make it just when the account has been verified with text message.
module.exports = {

    //update mobile number.
    update: function(req, res) {
        var method = "update";
        User.find({
                _id: req.param('_id')
            }) //changed username by _id property
            .exec(function(error, exist) {
                if (error) {
                    showLogs(404, "ERROR", method, controller, logsGlobal);
                    sendInfoFunc(404, "User no exist", res, error);

                }
                if (exist.length == 0) {
                    showLogs(404, "WARNING", method, controller, logsGlobal, logsGlobal);
                    sendInfoFunc(404, "Error finding user", res, [{
                        id: exist.id
                    }]);



                } else {


                    User.update({
                            _id: req.param('_id')
                        }, req.param('phoneNumber'))
                        .exec(function(error, user) {
                            if (error) {
                                showLogs(404, "ERROR", method, controller, logsGlobal);
                                sendInfoFunc(404, "Error updating phoneNumber", res, error);
                            } else {
                                showLogs(200, "OK", method, controller, logsGlobal);
                                sendInfoFunc(200, "Update phoneNumber success.", res, [{
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
                        showLogs(404, "ERROR", method, controller, logsGlobal);
                        sendInfoFunc(404, "Error finding users", res, error);


                    }
                    if (exist.length == 0) {
                        console.log(exist);

                        showLogs(409, "WARNING", method, controller, logsGlobal);
                        sendInfoFunc(409, "Users no exist", res, [{
                            phoneNumber: exist.phoneNumber
                        }]);



                    } else {


                        for (i = 0; i < exist.length; i++) {
                            var text = [];
                            text.push(exist[i].phoneNumber);
                            console.log(text);
                            return text;
                        }

                        showLogs(200, "OK", method, controller, logsGlobal);
                        sendInfoFunc(200, "Ok", res, [text]);


                        var APPROVED_API_KEY_INSTANCEID = process.env.APPROVED_API_KEY_INSTANCEID
                        // Set up the Instance ID with you API key
                        var instanceId = new gcm.InstanceId(APPROVED_API_KEY_INSTANCEID);

                        // Subscribe many frieds tokens to a topic
                        instanceId.addToTopicNoRetry(topicPhoneNumber, ['SUBSCRIBER_TOKEN1', 'SUBSCRIBER_TOKEN2'], function(err, response) {
                            if (err) console.error(err);
                            else console.log(response);
                        });


                    }

                });


        });

    }

}

// Function that captures req.params Sting and return an array of characters
function convertString(data) {

    arra = data.split("'")
    var texto = [];
    for (i = 0; i < arra.length; i++) {

        texto.push(arra[i]);
        console.log('texto ' + texto);
    }
    return texto;


}