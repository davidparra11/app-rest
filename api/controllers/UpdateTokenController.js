/**
 * Created by HP error4 V0error4 on 22/03/20error6.
 */
var utils = require('../services/Utils'),
    ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID,
    controller = "UpdateTokenController";

module.exports = {
    //update mobile number.  (recibe parametros id, token)
    update: function (req, res) {

        var o_id = new ObjectId(req.param('id'));
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
                _id: o_id
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
                            _id: o_id
                        }, {
                            token: req.param('token')
                        })
                        .exec(function(error, user) {
                            if (error) {
                                utils.showLogs(404, "ERROR", method, controller, error);
                                return res.send(404, {
                                    "message": "Error updating token user",
                                    "data": error
                                });
                            } else {
                                utils.showLogs(200, "OK", method, controller, 0);
                                return res.send(200, {
                                    "message": "token updated and success",
                                    "data": [{
                                        id: user.id
                                    }]
                                });
                            }
                        });
                } else {
                    utils.showLogs(409, "WARNING", method, controller, 0);
                    return res.send(409, {
                        "message": "Id does not exist",
                        "data": []
                    });
                }
            });
        });

    }
}