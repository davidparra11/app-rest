/**
 * Created by David  on 11/03/2016.
 */
module.exports = {
//send data to actually  users´s friends.
sendMyFriends: function send(req, res) {
    if(!req.param("to") || !req.param("message") || !req.param("title")) {
            return res.send(400, "from/msg Property Missing")
        }

    PusherService
      .send(['APA91bF__Oi-JLsEr-2YxaHDJ7jdTiaxkwIE9BqgwCdBYlqlxYdgD0C4tRjoBDpAAABQfRkT4v7EZwoHEXSGNBwjUB-mHTM-sJy3J8qFIsKXM0SxrIzi_zhZiaFbTYbI1CMOPf3w99EUrOJqUrhZj4sKw0sDNVNOkg', 'dF7981c0t18:APA91bFqIhdCtDiPQNjPq-bV5cbMWsBZI_shu4TtpiSHJ12iWebPF_B3ZDGN78x05m6TajUjBv_y-ArYDIj16GIbO9IR-hIXDeU46-ong0JsYVqcMeYAii1mX9XDJfmNeIU9PFr9kq3c', 'dlz1kzkMSBU:APA91bFFuw55dMLw8rUH8WPw--g_U237Nk0HelA7071EWGCmwFwsQX-4lTOY_JcN-hpz20xPPELYYF1AY309RstwPuyNum3qAzh73AYjuDW8NkkPFUmnNqcwBk_qbmLTxwSrrG-7UhH2','dF7981c0t18:APA91bFqIhdCtDiPQNjPq-bV5cbMWsBZI_shu4TtpiSHJ12iWebPF_B3ZDGN78x05m6TajUjBv_y-ArYDIj16GIbO9IR-hIXDeU46-ong0JsYVqcMeYAii1mX9XDJfmNeIU9PFr9kq3c'], {
        title: req.param('title') || 'titulp',
        body: req.param('message') || 'mensaje de la notification'
      })
      .then(res.ok) //return res.send(200, {"message": "ok", "data": "ok"});
      .catch(res.negotiate); 
        //sails.log.error({"code": 200, "response": "ok", "method": "sendMyFriends", "controller": "MessageControler"});

     
}       //key yahoo
}//AIzaSyBBh4ddPa96rQQNxqiq_qQj7sq1JdsNQUQ

//key Place´s
//dF7981c0t18:APA91bFqIhdCtDiPQNjPq-bV5cbMWsBZI_shu4TtpiSHJ12iWebPF_B3ZDGN78x05m6TajUjBv_y-ArYDIj16GIbO9IR-hIXDeU46-ong0JsYVqcMeYAii1mX9XDJfmNeIU9PFr9kq3c

//dF7981c0t18:APA91bFqIhdCtDiPQNjPq-bV5cbMWsBZI_shu4TtpiSHJ12iWebPF_B3ZDGN78x05m6TajUjBv_y-ArYDIj16GIbO9IR-hIXDeU46-ong0JsYVqcMeYAii1mX9XDJfmNeIU9PFr9kq3c


//dlz1kzkMSBU:APA91bFFuw55dMLw8rUH8WPw--g_U237Nk0HelA7071EWGCmwFwsQX-4lTOY_JcN-hpz20xPPELYYF1AY309RstwPuyNum3qAzh73AYjuDW8NkkPFUmnNqcwBk_qbmLTxwSrrG-7UhH2

//APA91bF__Oi-JLsEr-2YxaHDJ7jdTiaxkwIE9BqgwCdBYlqlxYdgD0C4tRjoBDpAAABQfRkT4v7EZwoHEXSGNBwjUB-mHTM-sJy3J8qFIsKXM0SxrIzi_zhZiaFbTYbI1CMOPf3w99EUrOJqUrhZj4sKw0sDNVNOkg