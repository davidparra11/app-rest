'use strict';
module.exports = function isAuth (req, res, next) {

	var APPROVED_API_KEY = process.env.APPROVED_API_KEY || '';

	if(process.env.APPROVED_API_KEY == req.header('token'))
    next();
	else{
  	console.warn(401, {"message":"Invalid autentication"});
  	res.send(401, {"message":"Invalid autentication"});
	}

};




