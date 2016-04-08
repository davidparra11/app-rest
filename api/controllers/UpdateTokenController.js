/**
 * Created by HP 14 V014 on 22/03/2016.
 */
var utilidades = require('../services/Utils'),
    logsGlobal = 1,
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
                    utilidades.showLogs(404, error, method, controller, logsGlobal, 1);
                    utilidades.sendInfoFunc(404, "Error finding user", res, error);
                }
                if (exist.length == 0) {
                    User.update({
                            _id: req.param('_id')
                        }, req.param('token'))
                        .exec(function(error, user) {
                            if (error) {
                                utilidades.showLogs(404, error, method, controller, logsGlobal, 1);
                                utilidades.sendInfoFunc(404, "Error updating user", res, error);

                            } else {
                                utilidades.showLogs(200, "OK", method, controller, logsGlobal, 0);
                                utilidades.sendInfoFunc(200, "User already exist", res, [{
                                    id: exist.id
                                }]);
                            }
                        });
                } else {
                    utilidades.showLogs(409, "WARNING", method, controller, logsGlobal, 0);
                    utilidades.sendInfoFunc(409, "Error updating user", res, error);

                }
            });
    }
}