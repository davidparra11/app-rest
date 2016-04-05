/**
 * Created by David Parra on 15/03/2016.
 */


gcm = require('node-gcm-iid');

//make it just when the account has been verified with text message.
module.exports = {
    //update mobile number.
    update: function (req, res) {

        User.find({_id: req.param('_id')})//changed username by _id property
            .exec(function (error, exist) {
                if (error) {
                    sails.log.error(404, {
                        "response": "ERROR",
                        "method": "update",
                        "controller": "Register"
                    });
                    return res.send(404, {
                        "message": "Error finding user",
                        "data": error
                    });
                }
                if (exist.length == 0) {

                    sails.log.info({
                        "code": 409,
                        "response": "WARNING",
                        "method": "update",
                        "controller": "Register"
                    });
                    return res.send(409, {
                        "message": 'User no exist',
                        "data": [{id: exist.id}]
                    });


                }
                else {


                    User.update({_id: req.param('_id')}, req.param('phoneNumber'))
                        .exec(function (error, user) {
                            if (error) {
                                sails.log.error({
                                    "code": 404,
                                    "response": "ERROR",
                                    "method": "update",
                                    "controller": "Register"
                                });
                                return res.send({
                                    "code": 404,
                                    "message": "Error updating person",
                                    "data": error
                                });
                            }
                            else {
                                sails.log.info({
                                    "code": 200,
                                    "response": "OK",
                                    "method": "update the phoneNumber",
                                    "controller": "Register"
                                });
                                return res.send({
                                    "code": 200,
                                    "message": "Update phoneNumber success.",
                                    "data": [{id: user.id}]
                                });
                            }
                        });


                }
            });


    },

    //attemp to will get the users from our databases when pass array of agenda numbers.
    getFriends: function (req, res) {


        console.log(req.param("arrayAgenda"));
        var name = 'nombre';
        var value = req.param("arrayAgenda");
        //parameter = req.param.arrayAgenda;
        // var doc = {String: Strings.fromString(parameter)}
        var ar = myfunc(req.param('arrayAgenda'));
        console.log('myfunc' + ar);
        User.native(function (err, collection) {
            if (err) return res.serverError(err);
            collection.find({phoneNumber: {$in: ar}})  //req.param('arrayAgenda')['311','321']
                .toArray(function (error, exist) {
                    if (error) {
                        sails.log.error(404, {
                            "response": "ERROR",
                            "method": "getFriends",
                            "controller": "Register"
                        });
                        return res.send(404, {
                            "message": "Error finding users",
                            "data": error
                        });
                    }
                    if (exist.length == 0) {
                        console.log(exist);
                        sails.log.info({
                            "code": 409,
                            "response": "WARNING",
                            "method": "getFriends",
                            "controller": "Register"
                        });
                        return res.send(409, {
                            "message": 'Users no exist',
                            "data": [{phoneNumber: exist.phoneNumber}]
                        });


                    }

                    else {

                        sails.log.info({
                            "code": 200,
                            "response": "OK",
                            "method": "getFriends",
                            "controller": "Register"
                        });

                        for (i = 0; i < exist.length; i++) {
                            var text = [];
                            text.push(exist[i].phoneNumber);
                            console.log(text);
                        }


                        // Set up the Instance ID with you API key
                        var instanceId = new gcm.InstanceId('YOUR_API_KEY_HERE');

                        // Subscribe many frieds tokens to a topic
                        instanceId.addToTopicNoRetry('current user number', ['SUBSCRIBER_TOKEN1', 'SUBSCRIBER_TOKEN2'], function (err, response) {
                            if (err) console.error(err);
                            else    console.log(response);
                        });


                    }

                });


        });

    }

}


function myfunc(data) {
    var array = []
    arra = data.split("'")
    var texto = [];
    for (i = 0; i < arra.length; i++) {

        texto.push(arra[i]);
        console.log('texto ' + texto);
    }

    return texto


}