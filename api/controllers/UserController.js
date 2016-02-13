/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		 find: function(req,res){ 
        User.find({username: req.param('username') })
            .exec(function(error, user) {
                    if (error){
                        sails.log.error({"code":500,"response":"ERROR","method":"find", "controller":"User"});
                        return res.send({"code":500,"message":"Error to get user","data":error});
                     }
                     else{
                        sails.log.info({"code":200,"response":"OK","method":"find", "controller":"User"});
                        return res.send({"code":200,"message": "User data (se obtuvo la informacion del usuario consultado).","data":[user[0]]});
                    }
            });
     },  


    /**
     * {SERVER_URL}:{SERVER_PORT}/users/
     * GET
     *          {
                "code": 200,
                "message":"All user data",
                "data": [
                    {
                        "username": "user1",
                        "admin"   : true,
                        "active"  : true,
                        "id": "1"
                    },
                    {
                        "username": "user2",
                        "admin"   : false,
                        "active"  : true,
                        "id": "1"
                    },
                    ........
                            ]
                }
     *
     * 
     **/
    findAll: function(req,res){
        User.find()
            .exec(function(error, user) {
                    if (error){
                        sails.log.error({"code":500,"response":"ERROR","method":"findAll", "controller":"User"});
                        return res.send({"code":500,"message":"Error to get users","data":error});  
                     }
                     else{
                        sails.log.info({"code":200,"response":"OK","method":"findAll", "controller":"User"});
                        return res.send({"code":200,"message":"All user data(se obtuvo la informacion de nuestros usuarios)" ,"data": user});
                        //return res.ok();
                    }
            });
     },  

     /**
	 * {SERVER_URL}:{SERVER_PORT}/users/:username
     * POST
     *      
                {
                    "code": 201,
                    "message":"Create success",
                    "data": {
                    "id": "1"
                    }
                }       
     *
     * 
	 **/
     create: function(req,res){
        if(!req.param('admin'))
            req.allParams().admin = false;
        if(!req.param('active'))
            req.allParams().active= true;

 		User.find({username: req.param('username')})
            .exec(function(error, exist) {
            	if (error){
                    sails.log.error({"code":500,"response":"ERROR","method":"create", "controller":"User"});
                    return res.send({"code":500,"message":"Error to get user(error al intentar encontrar el usuario)","data":error});
                }
            	if (exist.length == 0) {
     				User.create(req.allParams())
     					.exec(function(error,user){
     						if (error){
                                sails.log.error({"code":500,"response":"ERROR","method":"create", "controller":"User"});
                        		return res.send({"code":500,"message":"Error creating user","data":error});
                            }
                     		else{
                                sails.log.info({"code":201,"response":"OK","method":"create", "controller":"User"});
                        		return res.send({"code":201,"message":"Create success(usuario creado exitosamente)" ,"data": [{id: user.id}]});   
                            }
     				});
    			}
    			else {
                    sails.log.info({"code":409,"response":"WARNING","method":"create", "controller":"User"});
    				return res.send({"code":409, "message":'User already exist(este usario ya esta en el sistema)',"data":[{id:exist[0].id}]});
                }
     		});
     	},

        /**
     * {SERVER_URL}:{SERVER_PORT}/users/:username
     *  DELETE
     *   
        {
            "code": 200,
            "message":"delete success",
            "data": {
                "id": "1"
            }
        }
    
     *
     * 
     **/
        delete: function(req, res){
            User.find({username: req.param('username')})
                .exec(function(error, exist) {      
                if (error){
                    sails.log.error({"code":500,"response":"ERROR","method":"delete", "controller":"User"});
                    return res.send({"code":500,"message":"Error to get user(error al encontrar a este usuario en la base de datos)","data":error});
                }
                if (exist.length != 0) {
                    User.destroy({username: req.param('username')})
                        .exec(function(error,user){
                        if (error){
                            sails.log.error({"code":500,"response":"ERROR","method":"delete", "controller":"User"});
                                return res.send({"code":500,"message":"Error deleting user(error al eliminar el usuario)","data":error});
                        }
                        else{
                            sails.log.info({"code":200,"response":"OK","method":"delete", "controller":"User"});
                            return res.send({"code":200,"message":"Delete succes(eliminacion del usario realizado)" ,"data": [{id: user[0].id}]}); 
                        }
                    });
                }
                else {
                    sails.log.info({"code":404,"response":"WARNING","method":"delete", "controller":"User"});
                    return res.send({"code":404, "message":'User does not exist(esta persona no existe en nuestra base de datos)',"data":[]});
                }
            });
        }, 


    /**
     * {SERVER_URL}:{SERVER_PORT}/statistics/users/
     * GET
     *    
        {
        "code": 200,
        "message": "Success statistics",
        "data": [
            {
                "_id": "null",
                "total": 15,           //total de usuarios
                "admintrue": 1,        //cantidad usuarios administrativos
                "adminfalse": 8,       //cantidad usuarios normales
                "activetrue": 2,       //cantidad usuarios activos
                "activefalse": 1
            }
        ]
}
    
     *
     * 
     **/
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
                                    sails.log.error({"code":500,"response":"ERROR","method":"statistics","controller":"User"});
                                    return res.send({"code":500,"message":"Error to get statistics","data":error});
                                }
                                else{
                                    sails.log.info({"code":200,"response":"OK","method":"statistics","controller":"User"});
                                    return res.send({"code":200,"message":"Success statistics" ,"data": lamp});
                                }
                            });
                        });
                    }


	
};

