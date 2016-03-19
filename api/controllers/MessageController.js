/**
 * Created by David  on 11/03/2016.
 */
module.exports = {
//send data to actually  users´s friends.
sendMyFriends: function send(req, res) {

        if(!req.param("from") || !req.param("message")) {
            return res.send(400, "from/msg Property Missing")
        }

             sails.log.error({"code": 200, "response": "entro y paso filtros", "method": "sendMyFriends", "controller": "MessageControler"});
      // Find the sender
        User.findOne({where: {
            username: req.param("username")}  //must be id, but now we´re working with this when the login has been made.
        }, function (err, sender) {
            if (err)    return res.send(409, {"message": "Conflict to get users", "data": error});
            if(!sender) return res.send(404, {"message": "Sender (Place´s person) was not found", "data": user});

                Message.create({
                    to: ["dlz1kzkMSBU:APA91bFFuw55dMLw8rUH8WPw--g_U237Nk0HelA7071EWGCmwFwsQX-4lTOY_JcN-hpz20xPPELYYF1AY309RstwPuyNum3qAzh73AYjuDW8NkkPFUmnNqcwBk_qbmLTxwSrrG-7UhH2"],//sender.friends
                    from: "510296754641",//sender
                    msg: req.param("message") //mesage to send
                }, function(err, msg) {
                    if (err) return res.send(409, {"message": "Conflict to create message", "data": err});
                    if (!msg) return res.send(409, {"message": "there is not message to send", "data": err});

                    sails.services.pushnotification.sendGCMNotification(["dlz1kzkMSBU:APA91bFFuw55dMLw8rUH8WPw--g_U237Nk0HelA7071EWGCmwFwsQX-4lTOY_JcN-hpz20xPPELYYF1AY309RstwPuyNum3qAzh73AYjuDW8NkkPFUmnNqcwBk_qbmLTxwSrrG-7UhH2"],
                        {
                            data: {
                                key1: 'message1',
                                key2: 'message2'
                            },
                            notification: {
                                title: "titulp",//sender.username
                                icon: "ic_launcher",
                                body: "cuerpo",//
                                sound: "default"
                            }
                        }, true, function(err, results) {
                            if(err) {
                                return res.negotiate(err);
                                sails.log.error({"code": 400, "response": "eroro", "method": "sendMyFriends", "controller": "MessageControler"});
                            }
                            return res.send(200, results);
                            sails.log.error({"code": 200, "response": "ok", "method": "sendMyFriends", "controller": "MessageControler"});
                        });
                })

        })
}       //key yahoo
}//AIzaSyBBh4ddPa96rQQNxqiq_qQj7sq1JdsNQUQ

//key Place´s
//dF7981c0t18:APA91bFqIhdCtDiPQNjPq-bV5cbMWsBZI_shu4TtpiSHJ12iWebPF_B3ZDGN78x05m6TajUjBv_y-ArYDIj16GIbO9IR-hIXDeU46-ong0JsYVqcMeYAii1mX9XDJfmNeIU9PFr9kq3c