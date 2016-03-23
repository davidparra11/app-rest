/**
 * Created by HP 14 V014 on 22/03/2016.
 */
var PusherService = require("sails-service-pusher");

module.exports =
    PusherService('android', {
            device: [],
            provider: {
                apiKey: 'AIzaSyD3PB6dW6SHpK2_WF1foQKoUHi2aopgTmI', // Your Google Server API Key
                maxSockets: 12, // Max number of sockets to have open at one time
                //proxy: 'http://your-proxy.com' // This is [just like passing a proxy on to request](https://github.com/request/request#proxies)
            },
            notification: {
                title: 'Place Test Push', // Indicates notification title
                body: 'body', // Indicates notification body text
                icon: '', // Indicates notification icon
                sound: '', // Indicates sound to be played
                badge: '', // Indicates the badge on client app home icon
                payload: {} // Custom data to send within Push Notification
            }
        }
    );
