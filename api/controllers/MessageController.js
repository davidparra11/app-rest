/**
 * Created by David  on 11/03/2016.
 */

//send data to actually  users´s friends.
sendMyFriends: function send(req, res) {

        if(!req.param("from") || !req.param("message")) {
            return res.send(400, "from/msg Property Missing")
        }


      // Find the sender
        User.findOne({where: {
            username: req.param("username")}  //must be id, but now we´re working with this when the login has been made.
        }, function (err, sender) {
            if (err)    return res.send(409, {"message": "Conflict to get users", "data": error});
            if(!sender) return res.send(404, {"message": "Sender (Place´s person) was not found", "data": user});

                Message.create({
                    to: sender.friends,
                    from: sender,
                    message: req.param("msg") //mesage to send
                }, function(err, msg) {
                    if (err) return res.send(409, {"message": "Conflict to create message", "data": error});
                    if (!msg) return res.send(409, {"message": "there is not message to send", "data": error});

                    sails.services.pushnotification.sendGCMNotification(sender.friends,
                        {
                            data: {
                                key1: 'message1',
                                key2: 'message2'
                            },
                            notification: {
                                title: sender.username,
                                icon: "ic_launcher",
                                body: msg.message,
                                sound: "default"
                            }
                        }, true, function(err, results) {
                            if(err) {
                                return res.negotiate(err);
                            }
                            return res.send(200, results);
                        });
                })

        })
}