/**
 * Created by David  on 11/03/2016.
 */
module.exports = {
    send: function(req, res) {
        PusherService
            .send(['DEVICE_TOKEN_1', 'DEVICE_TOKEN_2'], {
                title: req.param('title') || 'Pusher',
                body: req.param('body') || 'Hello from sails-service-pusher'
            })
            .then(res.ok)
            .catch(res.negotiate);
    }

};

var PusherService = require("sails-service-pusher");

module.exports =
    PusherService('android', {
            device: [], // Array of string with device tokens
            provider: {
                apiKey: 'AIzaSyC9Pg64djV4HP5JOHqFJVnGAXKJDY5xZRc', // Your Google Server API Key
                maxSockets: 12, // Max number of sockets to have open at one time
                //proxy: 'http://your-proxy.com' // This is [just like passing a proxy on to request](https://github.com/request/request#proxies)
            },
            notification: {
                title: 'Place Test Push', // Indicates notification title
                body: '', // Indicates notification body text
                icon: '', // Indicates notification icon
                sound: '', // Indicates sound to be played
                badge: '', // Indicates the badge on client app home icon
                payload: {} // Custom data to send within Push Notification
            }
        }
    );