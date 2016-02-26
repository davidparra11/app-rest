/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
//variable global del controlador para encriptar las contraseñas de las personas que se loguean en la APP
var Passwords = require('machinepack-passwords');

module.exports = {
  
  
		// Método para el login de la persona.
		login: function(req,res){ 
			 		console.log(req.param('username'));

	        User.find({username: req.param('username') })
	            .exec(function(error, user) {
	                    if (error){
	                        sails.log.error({"code":409,"response":"ERROR","method":"find", "controller":"User"});
	                        return res.send(409, {"message":"Conflict to get user","data":error});
	                     }
	                     else {
	                     	if (user[0] == null){
	                     		sails.log.info(403, {"response":"Not Found","method":"find", "controller":"User"});
		                        return res.send(403, {"message": "no se encontró la informacion de esta persona.","data": user});
		                       //return  res.forbidden();
				                }

				                else {

				                //var Passwords = require('machinepack-passwords');

									       	// Compare a plaintext password attempt against an already-encrypted version.
      										Passwords.checkPassword({
      										passwordAttempt: req.param('password'),
      										encryptedPassword: user[0].encryptedPassword,
      										}).exec({
      										// An unexpected error occurred.
      										error: function (err){
      										  	return res.forbidden();
      										},
      										// Password attempt does not match already-encrypted version
      										incorrect: function (){
      											sails.log.info({"code":200,"response":"OK","method":"find", "controller":"User"});
      						                    return res.send(200, {"message": "User data (se obtuvo la informacion del usuario consultado).","data":[user[0].id]});
      										 
      										},
      										// OK.
      										success: function (){
      										 return res.send(200, {message : "User data (se obtuvo la informacion del usuario consultado).","data":[user[0].id]});
      										},
      									});

							         }
							       } 
	          		  });
     },  

  

    findAll: function(req,res){
        User.find()
            .exec(function(error, user) {
                    if (error){
                        sails.log.error({"code":409,"response":"ERROR","method":"findAll", "controller":"User"});
                        return res.send(409,{"message":"Conflict to get users","data":error});  
                     }
                     else{

                     		if (user){
                        sails.log.info({"code":200,"response":"OK","method":"findAll", "controller":"User"});
                        return res.send(200,{"message":"All users data(se obtuvo la informacion de nuestros usuarios)" ,"data": user});
                        //return res.ok();
                        	}else{
                        		sails.log.info({"code":404,"response":"Not Found","method":"findAll", "controller":"User"});
                        return res.send(404,{"message":"no se recuperaron datos de las personas" ,"data": user});
                        	}
                    }
            });
     },  

    

     //Metodo para loguear a las personas.
      create: function(req, res) {
        var Passwords = require('machinepack-passwords');
          // Encrypt a string using the BCrypt algorithm.
          Passwords.encryptPassword({
            password: req.param('password'),
            difficulty: 10,
          }).exec({
            // An unexpected error occurred.
            error: function(err) {
               sails.log.error({"code":404,"response":"ERROR","method":"create", "controller":"User"});
                return res.send({"code":404,"message":"Error to get user(error al intentar encontrar el usuario)","data":err});
              //return res.negotiate(err);
            },
            // OK.
            success: function(encryptedPassword) {
              require('machinepack-gravatar').getImageUrl({
                emailAddress: req.param('email')
              }).exec({
                error: function(err) {
                  return res.negotiate(err);
                },
                success: function(gravatarUrl) {
                // Create a User with the params sent from
                // the sign-up form --> signup.ejs
                      User.find({username: req.param('username')})
                  .exec(function(error, exist) {
                      if (error){
                          sails.log.error({"code":404,"response":"ERROR","method":"signup", "controller":"User"});
                          return res.send(404,{"message":"Error to get user(error al intentar encontrar el usuario)","data":error});
                      }
                      if (exist.length == 0) {
                          User.create( {username: req.param('username'),
                            lastName: req.param('lastName'),
                            firstName: req.param('firstName'),
                            email: req.param('email'),
                            encryptedPassword: encryptedPassword,
                           // password: req.param('password'),
                            lastLoggedIn: new Date(),
                            gravatarUrl: gravatarUrl})
                              .exec(function(error,user){
                                  if (error){
                                      sails.log.error({"code":409,"response":"ERROR","method":"create", "controller":"User"});
                                      return res.send(409,{"message":"Conflict to create user","data":error});
                                  }
                                  else{
                                      sails.log.info({"code":201,"response":"OK","method":"create", "controller":"User"});
                                      return res.send(201,{"message":"Create success(usuario creado exitosamente)" ,"data": [{id: user.id}]});   
                                  }
                          });
                      }
                      else {
                          sails.log.info({"code":409,"response":"WARNING","method":"create", "controller":"User"});
                          return res.send(409,{"message":'User already exist(este usario ya esta en el sistema)',"data":[{id:exist[0].id}]});
                      }
                  });




                }
              });
            }
          });
  },







        delete: function(req, res){
            User.find({username: req.param('username')})
                .exec(function(error, exist) {      
                if (error){
                    sails.log.error({"code":404,"response":"ERROR","method":"delete", "controller":"User"});
                    return res.send({"code":404,"message":"Error to get user(error al encontrar a este usuario en la base de datos)","data":error});
                }
                if (exist.length != 0) {
                    User.destroy({username: req.param('username')})
                        .exec(function(error,user){
                        if (error){
                            sails.log.error({"code":404,"response":"ERROR","method":"delete", "controller":"User"});
                                return res.send(404, {"message":"Error deleting user(error al eliminar el usuario)","data":error});
                        }
                        else{
                            sails.log.info({"code":200,"response":"OK","method":"delete", "controller":"User"});
                            return res.send(200, {"message":"Delete succes(eliminacion del usario realizado)" ,"data": [{id: user[0].id}]}); 
                        }
                    });
                }
                else {
                    sails.log.info({"code":404,"response":"WARNING","method":"delete", "controller":"User"});
                    return res.send(404, {"message":'User does not exist(esta persona no existe en nuestra base de datos)',"data":[]});
                }
            });
        }, 


    
       statistic: function(req, res){
                            User.native(function(err, collection) {
                            if (err) return res.serverError(err);
                            collection.aggregate([
                                    { '$group': { _id: "null", 
                                                   total: {'$sum': 1}, 
                                                   admintrue: { "$sum": { "$cond": [ "$admin", 1, 0 ]}},
                                                   adminfalse: { "$sum": {
                                                                         "$cond": [ { "$eq": [ "$admin", false ] }, 1, 0 ]
                                                                        }},
                                                   activetrue: { "$sum": { "$cond": [ "$active", 1, 0 ]}},  
                                                   activefalse: { "$sum": {
                                                                         "$cond": [ { "$eq": [ "$active", false ] }, 1, 0 ]  
                                                                         }},                             
                                                }
                                    }]).toArray(function (error, lamp) {
                                if (error){
                                    sails.log.error({"code":404,"response":"ERROR","method":"statistics","controller":"User"});
                                    return res.send({"code":404,"message":"Error to get statistics","data":error});
                                }
                                else{
                                    sails.log.info({"code":200,"response":"OK","method":"statistics","controller":"User"});
                                    return res.send({"code":200,"message":"Success statistics" ,"data": "user" });
                                }
                            });
                        });
                    },





          update: function(req, res){
            if (!req.param('username')){
                sails.log.info({"code":400,"response":"WARNING","method":"update","controller":"User"});
                return res.send({"code":400, "message":'parametro invalido',"data":[]});   // hace la verificacion con username pero podria se conn
            }
            else{
            	User.find({username: req.param('username') }) ///verificando si el usuario existe
                	.exec(function(error,user){
	                	if (user.length!=0){
                            if (exist.length != 0) {
		                        User.update({username: req.param('username')},req.allParams())
		                             .exec(function(error,user){
				                       if (error){
				                        sails.log.error({"code":404,"response":"ERROR","method":"update","controller":"User"});
				                        return res.send({"code":404,"message":"Error updating person (error al actualizar a la persona","data":error});
				                       }
				                        else{
				                            sails.log.info({"code":200,"response":"OK","method":"update","controller":"User"});
				                            return res.send({"code":200,"message":"Update success(actualizacion exitosa)" ,"data": [user[0].id]});
				                        }
		                        	});
		                    }
		                    else{
		                        sails.log.info({"code":404,"response":"WARNING","method":"update","controller":"User"});
		                        return res.send({"code":404, "message":'Id does not exist',"data":[]});
		                    }
		           		} else{
	                    sails.log.info({"code":404,"response":"WARNING","method":"update","controller":"User"});
	                    return res.send({"code":404, "message":'User does not exist (la persona no existe en nuestro sistema)',"data":[]});
	                }
		                });
					 
	                
	               
            }        
        },//update


	
};

