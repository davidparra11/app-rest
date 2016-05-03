'use strict';
/**
 * Created by HP error4 V0error4 on 22/03/20error6.
 */
var utils = require('../utilities/Utils'),
    ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID,
    controller = "TokenController";

module.exports = {
    //update mobile number.  (recibe parametros id, token)
    update: function(req, res) {

        if (!req.param("id") || !req.param("token")) {
            return res.send(400, "phoneNumber/id Property Missing");
        }
        var objId = new ObjectId(req.param('id'));
        var method = "update";

        User.native(function(error, collection) {
            if (error) {
                utils.showLogs(405, "ERROR", method, controller, error);
                return res.send(405, {
                    "message": "Error on token method (not Allowed)",
                    "data": error
                });
            }
            collection.findOneAndUpdate({
                _id: objId
            }, {
                $set: {
                    token: req.param('token')
                }
            }, {
                returnOriginal: false,
                upsert: false
            }, function(err, r) {
                if (err) {
                    utils.showLogs(403, "ERROR", method, controller, err);
                    return res.send(403, {
                        "message": "Error to get user by Id (Error updating token user)",
                        "data": err
                    });
                } else {
                    if (r.length !== 0) {
                        utils.showLogs(200, "OK", method, controller, 0);
                        return res.send(200, {
                            "message": "OK token updated and success process",
                            "data": r.value.username
                        });
                        var instanceId = new gcm.InstanceId(process.env.APPROVED_API_KEY_INSTANCEID);
                        instanceId.addToTopicNoRetry(r.value.phoneNumber, 'PRUEBAsLzAs:APA91bFtxqP-ugT6KH071q1IQOjSnwWfX9s3uzEOui_Vyq43qrVGfCSOpT5jHG9sQW7a-O8ssMBrru0S04gWV50t80h2KNqGGZ_QUM016-uC2rz1fB4y8nIl_LADOXr-iO_JW2hMxe68', function(err, response) {
                            if (err) console.error(err);
                            else console.log(response);
                        });
                    } else {
                        utils.showLogs(404, "WARNING", method, controller, 0);
                        return res.send(404, {
                            "message": "Id does not exist",
                            "data": []
                        });
                    }
                }
            });
        });

    }
}