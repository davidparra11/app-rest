/**
 * Created by David  on 11/03/2016.
 */
var PusherService = require("sails-service-pusher");

module.exports =
    PusherService('android', {
            device: ["cEyLywsLzAs:APA91bFtxqP-ugT6KH071q1IQOjSnwWfX9s3uzEOui_Vyq43qrVGfCSOpT5jHG9sQW7a-O8ssMBrru0S04gWV50t80h2KNqGGZ_QUM016-uC2rz1fB4y8nIl_LADOXr-iO_JW2hMxe68","dF7981c0t18:APA91bFqIhdCtDiPQNjPq-bV5cbMWsBZI_shu4TtpiSHJ12iWebPF_B3ZDGN78x05m6TajUjBv_y-ArYDIj16GIbO9IR-hIXDeU46-ong0JsYVqcMeYAii1mX9XDJfmNeIU9PFr9kq3c","APA91bHE6wWiEn5Um9YKWZ-DRHC5MgHISYT3JfmI5FJ-_w9TO1LJ4XkQA613YlNkDFfXm5ZWmkE3oKn9GvUml9qdWnqKxqGwB9x0JEDb51Rog-K6XuNCjtLKB4opEFR-ytfQPOXTbXFR"], // Array of string with device tokens
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

    //AIzaSyC9Pg64djV4HP5JOHqFJVnGAXKJDY5xZRc  LLave Yu
    //AIzaSyBBh4ddPa96rQQNxqiq_qQj7sq1JdsNQUQ  llave yahoo
    //AIzaSyD3PB6dW6SHpK2_WF1foQKoUHi2aopgTmI   llave Place

    //llave tokens subscribe
 //   dF7981c0t18:APA91bFqIhdCtDiPQNjPq-bV5cbMWsBZI_shu4TtpiSHJ12iWebPF_B3ZDGN78x05m6TajUjBv_y-ArYDIj16GIbO9IR-hIXDeU46-ong0JsYVqcMeYAii1mX9XDJfmNeIU9PFr9kq3c"]