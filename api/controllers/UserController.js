/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Passwords = require('machinepack-passwords');


module.exports = {

    // Método para el login de la persona.
    login: function (req, res) {
    
        User.find({username: req.param('username')})
            .exec(function (error, user) {
                if (error) {
                    sails.log.error({"code": 409, "response": "ERROR", "method": "login", "controller": "User"});
                    return res.send(409, {"message": "Conflict to get user", "data": error});
                }
                else {
                    if (user[0] == null) {
                        sails.log.info(403, {"response": "Not Found", "method": "login", "controller": "User"});
                        return res.send(403, {
                            "message": "not found informacion about this person.",
                            "data": user
                        });
                        
                    }

                    else {
                        // Compare a plaintext password attempt against an already-encrypted version.
                        Passwords.checkPassword({
                            passwordAttempt: req.param('password'),
                            encryptedPassword: user[0].encryptedPassword,
                        }).exec({
                            // An unexpected error occurred.
                            error: function (err) {
                                return res.forbidden();
                            },
                            // Password attempt does not match already-encrypted version
                            incorrect: function () {
                                sails.log.info({"code": 404, "response": "error when compare both password", "method": "login", "controller": "User"});
                                return res.send(404, {
                                    "message": "error when compare both password.",
                                    "data": [user[0].id]
                                });

                            },
                            // OK.
                            success: function () {
                                return res.send(200, {
                                    message: "User data retrieved.",
                                    "data": [user[0].id]
                                });
                            },
                        });

                    }
                }
            });
    },


    findAll: function (req, res) {
        User.find()
            .exec(function (error, user) {
                if (error) {
                    sails.log.error({"code": 409, "response": "ERROR", "method": "findAll", "controller": "User"});
                    return res.send(409, {"message": "Conflict to get users", "data": error});
                }
                else {

                    if (user) {
                        sails.log.info({"code": 200, "response": "OK", "method": "findAll", "controller": "User"});
                        return res.send(200, {
                            "message": "All users data",
                            "data": user
                        });
                    
                    } else {
                        sails.log.info({
                            "code": 404,
                            "response": "Not Found",
                            "method": "findAll",
                            "controller": "User"
                        });
                        return res.send(404, {"message": "resources was not found", "data": user});
                    }
                }
            });
    },


    //Method to create persons who sign up our app.
    create: function (req, res) {
        var Passwords = require('machinepack-passwords');
        // Encrypt a string using the BCrypt algorithm.
        Passwords.encryptPassword({
            password: req.param('password'),
            difficulty: 10,
        }).exec({
            // An unexpected error occurred.
            error: function (err) {
                sails.log.error({"code": 404, "response": "ERROR", "method": "create", "controller": "User"});
                return res.send(404, {
                    "message": "Error to get user",
                    "data": err
                });
                //return res.negotiate(err);
            },
            // OK.
            success: function (encryptedPassword) {
                require('machinepack-gravatar').getImageUrl({
                    emailAddress: req.param('email')
                }).exec({
                    error: function (err) {
                        return res.negotiate(err);
                    },
                    success: function (gravatarUrl) {
                        // Create a User with the params sent from
                        // the sign-up form --> signup.ejs
                        User.find({username: req.param('username')})
                            .exec(function (error, exist) {
                                if (error) {
                                    sails.log.error({404,
                                        "response": "ERROR",
                                        "method": "signup",
                                        "controller": "User"
                                    });
                                    return res.send(404, {
                                        "message": "Error creating user",
                                        "data": error
                                    });
                                }
                                if (exist.length == 0) {
                                    User.create({
                                            username: req.param('username'),
                                            lastName: req.param('lastName'),
                                            firstName: req.param('firstName'),
                                            email: req.param('email'),
                                            encryptedPassword: encryptedPassword,
                                            lastLoggedIn: new Date(),
                                            gravatarUrl: gravatarUrl
                                        })
                                        .exec(function (error, user) {
                                            if (error) {
                                                sails.log.error({
                                                    "code": 409,
                                                    "response": "ERROR",
                                                    "method": "create",
                                                    "controller": "User"
                                                });
                                                return res.send(409, {
                                                    "message": "Conflict to create user",
                                                    "data": error
                                                });
                                            }
                                            else {
                                                sails.log.info({
                                                    "code": 201,
                                                    "response": "OK",
                                                    "method": "create",
                                                    "controller": "User"
                                                });
                                                return res.send(201, {
                                                    "message": "Create user success",
                                                    "data": [{id: user.id}]
                                                });
                                            }
                                        });
                                }
                                else {
                                    sails.log.info({
                                        "code": 409,
                                        "response": "WARNING",
                                        "method": "create",
                                        "controller": "User"
                                    });
                                    return res.send(409, {
                                        "message": 'User already exist',
                                        "data": [{id: exist[0].id}]
                                    });
                                }
                            });


                    }
                });
            }
        });
    },


    find: function(req,res){ 
        User.find({username: req.param('username') })
            .exec(function(error, user) {
                    if (error){
                        sails.log.error({"code":404,"response":"ERROR","method":"find", "controller":"User"});
                        return res.send(404, {"message":"Error to get user","data":error});
                     }
                     else{
                        sails.log.info({"code":200,"response":"OK","method":"find", "controller":"User"});
                        return res.send(200, {"message": "User data","data":[user[0]]});
                    }
            });
     },  


    delete: function (req, res) {
        User.find({_id : req.param('_id')})
            .exec(function (error, exist) {
                if (error) {
                    sails.log.error({"code": 404, "response": "ERROR", "method": "delete", "controller": "User"});
                    return res.send(404, {
                        "message": "Error to get user(error al encontrar a este usuario en la base de datos)",
                        "data": error
                    });
                }
                if (exist.length != 0) {
                    User.destroy({_id: req.param('_id')})
                        .exec(function (error, user) {
                            if (error) {
                                sails.log.error({
                                    "code": 404,
                                    "response": "ERROR",
                                    "method": "delete",
                                    "controller": "User"
                                });
                                return res.send(404, {
                                    "message": "Error deleting user(error al eliminar el usuario)",
                                    "data": error
                                });
                            }
                            else {
                                sails.log.info(200, {
                                    "response": "OK",
                                    "method": "delete",
                                    "controller": "User"
                                });
                                return res.send(200, {
                                    "message": "Delete succes(eliminacion del usario realizado)",
                                    "data": [{id: user[0].id}]
                                });
                            }
                        });
                }
                else {
                    sails.log.info({"code": 404, "response": "WARNING", "method": "delete", "controller": "User"});
                    return res.send(404, {
                        "message": 'User does not exist(esta persona no existe en nuestra base de datos)',
                        "data": []
                    });
                }
            });
    },


    

    update: function (req, res) {
        if (!req.param('_id')) {
            sails.log.info({"code": 400, "response": "WARNING", "method": "update", "controller": "User"});
            return res.send({"code": 400, "message": 'invalid parameter', "data": []});   
        }
        else {
            User.find({_id: req.param('_id')}) ///verificando si el usuario existe
                .exec(function (error, user) {
                    if (user.length != 0) {
                        if (exist.length != 0) {
                            User.update({username: req.param('_id')}, req.allParams())
                                .exec(function (error, user) {
                                    if (error) {
                                        sails.log.error({
                                            "code": 404,
                                            "response": "ERROR",
                                            "method": "update",
                                            "controller": "User"
                                        });
                                        return res.send({
                                            "code": 404,
                                            "message": "Error updating person (error al actualizar a la persona)",
                                            "data": error
                                        });
                                    }
                                    else {
                                        sails.log.info({
                                            "code": 200,
                                            "response": "OK",
                                            "method": "update",
                                            "controller": "User"
                                        });
                                        return res.send({
                                            "code": 200,
                                            "message": "Update success(actualizacion exitosa)",
                                            "data": [user[0].id]
                                        });
                                    }
                                });
                        }
                        else {
                            sails.log.info({
                                "code": 404,
                                "response": "WARNING",
                                "method": "update",
                                "controller": "User"
                            });
                            return res.send({"code": 404, "message": 'Id does not exist', "data": []});
                        }
                    } else {
                        sails.log.info({"code": 404, "response": "WARNING", "method": "update", "controller": "User"});
                        return res.send({
                            "code": 404,
                            "message": 'User does not exist (la persona no existe en nuestro sistema)',
                            "data": []
                        });
                    }
                });


        }
    },//update


};

