/**
 * Created by HP 14 V014 on 22/03/2016.
 */

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
                    User.update({_id: req.param('_id')}, req.param('token'))
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
                                    "method": "update the token",
                                    "controller": "Register"
                                });
                                return res.send({
                                    "code": 200,
                                    "message": "Update token success.",
                                    "data": [{id: user.id}]
                                });
                            }
                        });
                }
                else {
                    sails.log.info({
                        "code": 409,
                        "response": "WARNING",
                        "method": "update",
                        "controller": "Register"
                    });
                    return res.send(409, {
                        "message": 'User already exist',
                        "data": [{id: exist.id}]
                    });
                }
            });


    }
}
