/**
 * Usercontroller, logsGlobal
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/controller, logsGlobals
 */

var Passwords = require('machinepack-passwords'),
    controller = "Usercontroller",
    logsGlobal = 1,
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
                    utils.showLogs(409, error, method, controller, logsGlobal, 1);
                    utils.sendInfoFunc(409, "Conflict to get user", res, error);

                } else {
                    if (user[0] == null) {
                        utils.showLogs(403, "not found", method, controller, logsGlobal, 0);
                        utils.sendInfoFunc(403, "not found information about this person.", res, user);
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
                                utils.showLogs(404, "error when compare both password", method, controller, logsGlobal);
                                utils.sendInfoFunc(404, "not found information about this person.", res, [{
                                    id: user[0].id
                                }]);
                            },
                            // OK.
                            success: function() {
                                utils.showLogs(200, "OK", method, controller, logsGlobal);
                                utils.sendInfoFunc(200, "User data retrieved.", res, [{
                                    id: user[0].id
                                }]);
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
                    utils.showLogs(409, error, method, controller, logsGlobal, 1);
                    utils.sendInfoFunc(409, "Conflict to get users", res, error);
                } else {

                    if (user) {
                        utils.showLogs(200, "OK", method, controller, logsGlobal, 0);
                        utils.sendInfoFunc(200, "OK", res, user);
                    } else {
                        utils.showLogs(404, "Not Found", method, controller, logsGlobal, 0);
                        utils.sendInfoFunc(404, "resources was not found", res, user);
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
            difficulty: 10,
        }).exec({
            // An unexpected error occurred.
            error: function(err) {
                utils.showLogs(404, "ERROR", method, controller, logsGlobal, 1);
                utils.sendInfoFunc(404, "Error when the pass has benn encrypted", res, err);
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
                                    utils.showLogs(404, "ERROR", method, controller, logsGlobal, 1);
                                    utils.sendInfoFunc(404, "Error creating user", res, error);
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
                                                utils.showLogs(409, "ERROR", method, controller, logsGlobal, 1);
                                                utils.sendInfoFunc(409, "Conflict to create user", res, error);

                                            } else {
                                                utils.showLogs(201, "OK", method, controller, logsGlobal, 0);
                                                utils.sendInfoFunc(201, "Create user success", res, [{
                                                    id: user.id
                                                }]);

                                            }
                                        });
                                } else {
                                    utils.showLogs(409, "WARNING", method, controller, logsGlobal, 0);
                                    utils.sendInfoFunc(409, "User already exist", res, [{
                                        id: exist[0].id
                                    }]);

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
                    utils.showLogs(404, "ERROR", method, controller, logsGlobal, 1);
                    utils.sendInfoFunc(404, "Error to get user", res, error);

                } else {
                    utils.showLogs(200, "OK", method, controller, logsGlobal, 0);
                    utils.sendInfoFunc(200, "User data", res, [user[0]]);
                }
            });
    },

    unsubscribe: function(req, res) {
        var method = "unsubscribe";
        if (!req.param('_id')) {
            utils.showLogs(400, "WARNING", method, controller, logsGlobal, 0);
            utils.sendInfoFunc(400, "invalid parameter", res, []);

        } else {
            User.find({
                    _id: req.param('_id')
                }) ///verificando si el usuario existe
                .exec(function(error, user) {
                    if (error) {
                        utils.showLogs(404, "ERROR", method, controller, logsGlobal, 1);
                        utils.sendInfoFunc(404, "Error to get user", res, error);
                    }
                    if (exist.length != 0) {
                        User.update({
                                username: req.param('unsubscribe')
                            }, req.allParams())
                            .exec(function(error, user) {
                                if (error) {
                                    utils.showLogs(404, "ERROR", method, controller, logsGlobal, 1);
                                    utils.sendInfoFunc(404, "Error updating person", res, error);

                                } else {
                                    utils.showLogs(200, "OK", method, controller, logsGlobal, 0);
                                    utils.sendInfoFunc(200, "Update success", res, [user[0].id]);

                                }
                            });
                    } else {
                        utils.showLogs(404, "WARNING", method, controller, logsGlobal, 0);
                        utils.sendInfoFunc(404, "Id does not exist", res, []);

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
                    utils.showLogs(404, "ERROR", method, controller, logsGlobal, 1);
                    utils.sendInfoFunc(404, "Error to get user", res, error);

                }
                if (exist.length != 0) {
                    User.destroy({
                            _id: req.param('_id')
                        })
                        .exec(function(error, user) {
                            if (error) {
                                utils.showLogs(404, "ERROR", method, controller, logsGlobal, 1);
                                utils.sendInfoFunc(404, "Error deleting user", res, error);

                            } else {
                                utils.showLogs(200, "OK", method, controller, logsGlobal, 0);
                                utils.sendInfoFunc(200, "Delete succes", res, [{
                                    id: user[0].id
                                }]);

                            }
                        });
                } else {
                    utils.showLogs(400, "WARNING", method, controller, logsGlobal, 0);
                    utils.sendInfoFunc(400, "User does not exist", res, []);

                }
            });
    },

    update: function(req, res) {
        var method = "update";
        if (!req.param('_id')) {
            utils.showLogs(400, "WARNING", method, controller, logsGlobal, 0);
            utils.sendInfoFunc(400, "invalid parameter", res, []);
        } else {
            User.find({
                    _id: req.param('_id')
                }) ///verificando si el usuario existe
                .exec(function(error, user) {
                    if (error) {
                        utils.showLogs(404, "ERROR", method, controller, logsGlobal, 1);
                        utils.sendInfoFunc(404, "Error to get user", res, error);
                    }
                    if (exist.length != 0) {
                        User.update({
                                username: req.param('_id')
                            }, req.allParams())
                            .exec(function(error, user) {
                                if (error) {
                                    utils.showLogs(404, "ERROR", method, controller, logsGlobal, 1);
                                    utils.sendInfoFunc(404, "Error updating person", res, error);

                                } else {
                                    utils.showLogs(200, "OK", method, controller, logsGlobal, 0);
                                    utils.sendInfoFunc(200, "Update success", res, [user[0].id]);
                                }
                            });
                    } else {
                        utils.showLogs(400, "WARNING", method, controller, logsGlobal, 0);
                        utils.sendInfoFunc(400, "Id does not exist", res, []);

                    }
                });
        }
    }, 

};