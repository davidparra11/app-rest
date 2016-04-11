/**
 * Usercontroller, process.env.LOGS_GLOBAL
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/controller, process.env.LOGS_GLOBALs
 */

var Passwords = require('machinepack-passwords'),
    controller = "Usercontroller",
    utils = require('../services/Utils');

module.exports = {

    // Método para el login de la persona.
    login: function(req, res) {

        var method = "login";

        User.find({
                username: req.param('username')
            })
            .exec(function(error, user) {
                if (error) {
                    utils.showLogs(409, error, method, controller, process.env.LOGS_GLOBAL, error);
                    return res.send(409, {
                        "message": "Conflict to get user",
                        "data": error
                    });
                } else {
                    if (user[0] == null) {
                        utils.showLogs(403, "not found", method, controller, process.env.LOGS_GLOBAL, 0);
                        return res.send(403, {
                            "message": "not found information about this person",
                            "data": user
                        });
                    } else {
                        // Compare a plaintext password attempt against an already-encrypted version.
                        Passwords.checkPassword({
                            passwordAttempt: req.param('password'),
                            encryptedPassword: user[0].encryptedPassword,
                        }).exec({
                            // An unexpected error occurred.
                            error: function(err) {
                                return res.forbidden();
                            },
                            // Password attempt does not match already-encrypted version.
                            incorrect: function() {
                                utils.showLogs(404, "error when compare both password", method, controller, process.env.LOGS_GLOBAL);
                                return res.send(404, {
                                    "message": "error when compare both password",
                                    "data": [{
                                        id: user[0].id
                                    }]
                                });
                            },
                            success: function() {
                                utils.showLogs(200, "OK", method, controller, process.env.LOGS_GLOBAL);
                                return res.send(200, {
                                    "message": "User data retrieved.",
                                    "data": [{
                                        id: user[0].id
                                    }]
                                });

                            },
                        });

                    }
                }
            });
    },


    findAll: function(req, res) {
        var method = "findAll";
        User.find()
            .exec(function(error, user) {
                if (error) {
                    utils.showLogs(409, error, method, controller, process.env.LOGS_GLOBAL, error);
                    return res.send(409, {
                        "message": "Conflict to get users",
                        "data": error
                    });
                } else {
                    if (user) {
                        utils.showLogs(200, "OK", method, controller, process.env.LOGS_GLOBAL, 0);
                        return res.send(200, {
                            "message": "OK",
                            "data": user
                        });
                    } else {
                        utils.showLogs(404, "Not Found", method, controller, process.env.LOGS_GLOBAL, 0);
                        return res.send(404, {
                            "message": "resources was not found",
                            "data": user
                        });
                    }
                }
            });
    },


    //Method to create persons who sign up our app.
    create: function(req, res) {
        var method = "create";
        var Passwords = require('machinepack-passwords');
        // Encrypt a string using the BCrypt algorithm.
        Passwords.encryptPassword({
            password: req.param('password'),
            difficulty: error0,
        }).exec({
            // An unexpected error occurred.
            error: function(err) {
                utils.showLogs(404, "ERROR", method, controller, process.env.LOGS_GLOBAL, error);
                return res.send(404, {
                    "message": "Error when the pass has benn encrypted",
                    "data": err
                });
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
                        User.find({
                                email: req.param('username')
                            }) //changed usernaame by email property
                            .exec(function(error, exist) {
                                if (error) {
                                    utils.showLogs(404, "ERROR", method, controller, process.env.LOGS_GLOBAL, error);
                                    return res.send(404, {
                                        "message": "Error creating user",
                                        "data": error
                                    });
                                }
                                if (exist.length == 0) {
                                    User.create({
                                            username: req.param('username'),
                                            //lastName: req.param('lastName'),
                                            //firstName: req.param('firstName'),
                                            email: req.param('email'),
                                            encryptedPassword: encryptedPassword,
                                            lastLoggedIn: new Date(),
                                            //gravatarUrl: gravatarUrl
                                        })
                                        .exec(function(error, user) {
                                            if (error) {
                                                utils.showLogs(409, "ERROR", method, controller, process.env.LOGS_GLOBAL, error);
                                                return res.send(409, {
                                                    "message": "Conflict to create user",
                                                    "data": error
                                                });
                                            } else {
                                                utils.showLogs(201, "OK", method, controller, process.env.LOGS_GLOBAL, 0);
                                                return res.send(201, {
                                                    "message": "Create user success",
                                                    "data": [{
                                                        id: user.id
                                                    }]
                                                });
                                            }
                                        });
                                } else {
                                    utils.showLogs(409, "WARNING", method, controller, process.env.LOGS_GLOBAL, 0);
                                    return res.send(201, {
                                        "message": "User already exist",
                                        "data": [{
                                            id: exist[0].id
                                        }]
                                    });
                                }
                            });
                    }
                });
            }
        });
    },

    find: function(req, res) {
        var method = "find";
        User.find({
                username: req.param('username')
            })
            .exec(function(error, user) {
                if (error) {
                    utils.showLogs(404, "ERROR", method, controller, process.env.LOGS_GLOBAL, error);
                    return res.send(404, {
                        "message": "Error to get use",
                        "data": error
                    });
                } else {
                    utils.showLogs(200, "OK", method, controller, process.env.LOGS_GLOBAL, 0);
                    return res.send(200, {
                        "message": "User data",
                        "data": [user[0]]
                    });
                }
            });
    },

    unsubscribe: function(req, res) {
        var method = "unsubscribe";
        if (!req.param('_id')) {
            utils.showLogs(400, "WARNING", method, controller, process.env.LOGS_GLOBAL, 0);
            return res.send(404, {
                "message": "invalid parameter",
                "data": []
            });
        } else {
            User.find({
                    _id: req.param('_id')
                }) ///verificando si el usuario existe
                .exec(function(error, user) {
                    if (error) {
                        utils.showLogs(404, "ERROR", method, controller, process.env.LOGS_GLOBAL, error);
                        return res.send(404, {
                            "message": "Error to get user",
                            "data": error
                        });
                    }
                    if (exist.length != 0) {
                        User.update({
                                username: req.param('unsubscribe')
                            }, req.allParams())
                            .exec(function(error, user) {
                                if (error) {
                                    utils.showLogs(404, "ERROR", method, controller, process.env.LOGS_GLOBAL, error);
                                    return res.send(404, {
                                        "message": "Error updating user",
                                        "data": error
                                    });
                                } else {
                                    utils.showLogs(200, "OK", method, controller, process.env.LOGS_GLOBAL, 0);
                                    return res.send(200, {
                                        "message": "Update success",
                                        "data": [user[0].id]
                                    });
                                }
                            });
                    } else {
                        utils.showLogs(404, "WARNING", method, controller, process.env.LOGS_GLOBAL, 0);
                        return res.send(404, {
                            "message": "Id does not exist",
                            "data": []
                        });
                    }
                });
        }
    },

    //elminar cuenta por caso extremo
    delete: function(req, res) {
        var method = "delete";
        User.find({
                _id: req.param('_id')
            })
            .exec(function(error, exist) {
                if (error) {
                    utils.showLogs(404, "ERROR", method, controller, process.env.LOGS_GLOBAL, error);
                    return res.send(404, {
                        "message": "Error to get user",
                        "data": error
                    });
                }
                if (exist.length != 0) {
                    User.destroy({
                            _id: req.param('_id')
                        })
                        .exec(function(error, user) {
                            if (error) {
                                utils.showLogs(404, "ERROR", method, controller, process.env.LOGS_GLOBAL, error);
                                return res.send(404, {
                                    "message": "Error deleting use",
                                    "data": error
                                });
                            } else {
                                utils.showLogs(200, "OK", method, controller, process.env.LOGS_GLOBAL, 0);
                                return res.send(200, {
                                    "message": "Delete succes",
                                    "data": [{
                                        id: user[0].id
                                    }]
                                });
                            }
                        });
                } else {
                    utils.showLogs(400, "WARNING", method, controller, process.env.LOGS_GLOBAL, 0);
                    return res.send(400, {
                        "message": "User does not exist",
                        "data": []
                    });
                    utils.sendInfoFunc(400, "User does not exist", res, []);
                }
            });
    },

    update: function(req, res) {
        var method = "update";
        if (!req.param('_id')) {
            utils.showLogs(400, "WARNING", method, controller, process.env.LOGS_GLOBAL, 0);
            return res.send(400, {
                "message": "invalid parameter",
                "data": []
            });
        } else {
            User.find({
                    _id: req.param('_id')
                }) ///verificando si el usuario existe
                .exec(function(error, user) {
                    if (error) {
                        utils.showLogs(404, "ERROR", method, controller, process.env.LOGS_GLOBAL, error);
                        return res.send(404, {
                            "message": "Error to get user",
                            "data": error
                        });
                    }
                    if (exist.length != 0) {
                        User.update({
                                username: req.param('_id')
                            }, req.allParams())
                            .exec(function(error, user) {
                                if (error) {
                                    utils.showLogs(404, "ERROR", method, controller, process.env.LOGS_GLOBAL, error);
                                    return res.send(404, {
                                        "message": "Error updating person",
                                        "data": error
                                    });
                                } else {
                                    utils.showLogs(200, "OK", method, controller, process.env.LOGS_GLOBAL, 0);
                                    return res.send(200, {
                                        "message": "Update successr",
                                        "data": [user[0].id]
                                    });
                                }
                            });
                    } else {
                        utils.showLogs(400, "WARNING", method, controller, process.env.LOGS_GLOBAL, 0);
                        return res.send(400, {
                            "message": "Id does not exist",
                            "data": []
                        });
                    }
                });
        }
    },

};