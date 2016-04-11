/**
 * Created by HP error4 V0error4 on 22/03/20error6.
 */
var utils = require('../services/Utils'),
    controller = "UpdateController";

module.exports = {
    //update mobile number.  (recibe parametros id, token)
    update: function(req, res) {
        var method = "update";
        User.find({
                _id: req.param('_id')
            }) //changed username by _id property
            .exec(function(error, exist) {
                if (error) {
                    utils.showLogs(404, error, method, controller, process.env.LOGS_GLOBAL, error);
                    return res.send(404, {
                        "message": "Error finding user",
                        "data": error
                    });
                }
                if (exist.length == 0) {
                    User.update({
                            _id: req.param('_id')
                        }, req.param('token'))
                        .exec(function(error, user) {
                            if (error) {
                                utils.showLogs(404, error, method, controller, process.env.LOGS_GLOBAL, error);
                                return res.send(404, {
                                    "message": "Error updating user",
                                    "data": error
                                });
                            } else {
                                utils.showLogs(200, "OK", method, controller, process.env.LOGS_GLOBAL, 0);
                                return res.send(200, {
                                    "message": "update token success",
                                    "data": [{
                                        id: exist.id
                                    }]
                                });
                            }
                        });
                } else {
                    utils.showLogs(409, "WARNING", method, controller, process.env.LOGS_GLOBAL, 0);
                    return res.send(409, {
                        "message": "Error updating user token",
                        "data": error
                    });
                }
            });
    }
}