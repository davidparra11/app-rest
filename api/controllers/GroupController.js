/**
 * Created by David  on 28/03/2016.
 */

 var gcm = require('node-gcm')

module.exports = {
//send data to actually  users´s friends.
sendMyGroup: function send(req, res) {


    // Create a message
// ... with default values
var message = new gcm.Message();

// ... or some given values
var message = new gcm.Message({
    collapseKey: 'demo',
    priority: 'high',
    contentAvailable: true,
    delayWhileIdle: true,
    timeToLive: 3,
    restrictedPackageName: "somePackageName",
    dryRun: true,
    data: {
        key1: 'message1',
        key2: 'message2'
    },
    notification: {
        title: "Hello, World",
        icon: "ic_launcher",
        body: "This is a notification that will be displayed ASAP."
    }
});
    
          gcm.Sender('AIzaSyCTj1R9ALophNp_4XMkHAJABxUER1Z3Bzc').sendNoRetry(message, { registrationTokens: registrationTokens }, function(err, response) {
  if(err) console.error(err);
  else    console.log(response);
});


/*
    GroupGcmService
      .send('/topics/andres', {
     //   message: 'This is a GCM Topic Message!'

       title: req.param('title') || 'titulp',
        message: req.param('message') || 'mensaje de la notification',
          body: req.param('body') || 'mensaje de la notification'

      })
      .then(res.ok) //return res.send(200, {"message": "ok", "data": "ok"});
      .catch(res.negotiate); 
        //sails.log.error({"code": 200, "response": "ok", "method": "sendMyFriends", "controller": "MessageControler"});
     */
 }
    //key yahoo  
}//AIzaSyBBh4ddPa96rQQNxqiq_qQj7sq1JdsNQUQ
