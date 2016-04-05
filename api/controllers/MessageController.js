/**
 * Created by David  on 11/03/2016.
 */

module.exports = {

//send data to actually  users´s friends.
    sendMyFriends: function send(req, res) {
        if (!req.param("to") || !req.param("message") || !req.param("title")) {
            return res.send(400, "from/msg Property Missing")
        }

        PusherService
            .send('/topics/'+req.param("to"), { // req.param("to") same phonenumber
               
                title: req.param('title') || 'titulp',
                message: req.param('message') || 'mensaje de la notification'
               // body: req.param('body') || 'mensaje de la notification'

            })
            .then(res.ok) 
            .catch(res.negotiate)
       
    }
}