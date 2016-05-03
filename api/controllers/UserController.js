/**
 * Usercontroller,
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/controller,s
 */
"use strict";

var Passwords = require('machinepack-passwords'),
    controller = "Usercontroller",
    ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID,
    utils = require('../utilities/Utils');

module.exports = {

    // Método para el login de la persona.
    login: function(req, res) {

        var method = "login";
        if (!req.param("username") || !req.param("password")) {
            return res.send(400, "username/password Property Missing");
        }
        User.find({
                username: req.param('username')
            })
            .exec(function(error, user) {
                if (error) {
                    utils.showLogs(409, error, method, controller, error);
                    return res.send(409, {
                        "message": "Conflict to get user",
                        "data": error
                    });
                } else {
                    if (user[0] == null) {
                        utils.showLogs(403, "not found", method, controller, 0);
                        return res.send(403, {
                            "message": "not found information about this person (username dont exist)",
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
                                utils.showLogs(404, "error when compare both password", method, controller, 0);
                                return res.send(404, {
                                    "message": "error when compare both password (wrong password)",
                                    "data": [{
                                        id: user[0].id
                                    }]
                                });
                            },
                            success: function() {
                                utils.showLogs(200, "OK", method, controller, 0);
                                return res.send(200, {
                                    "message": "User loged and data retrieved.",
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
        console.log('findall');
        var method = "findAll";
        User.find()
            .exec(function(error, user) {
                if (error) {
                    utils.showLogs(409, error, method, controller, error);
                    return res.send(409, {
                        "message": "Conflict to get users",
                        "data": error
                    });
                } else {
                    if (user) {
                        utils.showLogs(200, "OK", method, controller, 0);
                        return res.send(200, {
                            "message": "OK",
                            "data": user
                        });
                    } else {
                        utils.showLogs(404, "Not Found", method, controller, 0);
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
        if (!req.param("email") || !req.param("username") || !req.param("password")) {
            return res.send(400, "username/password/email Property Missing");
        }
        var method = "create";
        var Passwords = require('machinepack-passwords');
        // Encrypt a string using the BCrypt algorithm.
        Passwords.encryptPassword({
            password: req.param('password'),
            difficulty: 10,
        }).exec({
            // An unexpected error occurred.
            error: function(err) {
                utils.showLogs(404, "ERROR", method, controller, err);
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
                                email: req.param('email')
                            }) //changed username by email property
                            .exec(function(error, exist) {
                                if (error) {
                                    utils.showLogs(404, "ERROR", method, controller, 1);
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
                                                utils.showLogs(409, "ERROR", method, controller, 1);
                                                return res.send(409, {
                                                    "message": "Conflict to create user",
                                                    "data": error
                                                });
                                            } else {
                                                utils.showLogs(200, "OK", method, controller, 0);
                                                return res.send(200, {
                                                    "message": "Create user success",
                                                    "data": [{
                                                        id: user.id
                                                    }]
                                                });
                                            }
                                        });
                                } else {
                                    utils.showLogs(409, "WARNING", method, controller, 0);
                                    return res.send(409, {
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
                console.log('user ' + user);
                if (error) {
                    utils.showLogs(404, "ERROR", method, controller, error);
                    return res.send(404, {
                        "message": "Error to get use",
                        "data": error
                    });
                } else {
                    utils.showLogs(200, "OK", method, controller, 0);
                    return res.send(200, {
                        "message": "User data",
                        "data": [user[0]]
                    });
                }
            });
    },

    unsubscribe: function(req, res) {

        if (!req.param("id") || !req.param("state")) {
            return res.send(400, "state/id Property Missing");
        }
        var method = "unsubscribe";
        var objId = new ObjectId(req.param('id'));
        console.log(objId);

        User.native(function(error, collection) {
            if (error) {
                utils.showLogs(405, "ERROR", method, controller, error);
                return res.send(405, {
                    "message": "Error on unsubscribe method (not Allowed)",
                    "data": error
                });
            }
            collection.findOneAndUpdate({
                _id: objId
            }, {
                $set: {
                    active: req.param('state')
                }
            }, {
                returnOriginal: true,
                upsert: false
            }, function(err, result) {
                if (err) {
                    utils.showLogs(403, "ERROR", method, controller, err);
                    return res.send(403, {
                        "message": "Error to get user by Id (Error updating state user)",
                        "data": err
                    });
                } else {
                    if (result.length != 0) {
                        utils.showLogs(200, "OK", method, controller, 0);
                        return res.send(200, {
                            "message": "OK User state updated and success process",
                            "data": result.value.username
                        });
                    } else {
                        utils.showLogs(404, "WARNING", method, controller, 0);
                        return res.send(404, {
                            "message": "Id does not exist",
                            "data": []
                        });
                    }
                }
            });
        });
    },

    //delete count for weird cases users
    delete: function(req, res) {
        var method = "delete";
        User.find({
                _id: req.param('_id')
            })
            .exec(function(error, exist) {
                if (error) {
                    utils.showLogs(404, "ERROR", method, controller, error);
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
                                utils.showLogs(404, "ERROR", method, controller, error);
                                return res.send(404, {
                                    "message": "Error deleting use",
                                    "data": error
                                });
                            } else {
                                utils.showLogs(200, "OK", method, controller, 0);
                                return res.send(200, {
                                    "message": "Delete succes",
                                    "data": [{
                                        id: user[0].id
                                    }]
                                });
                            }
                        });
                } else {
                    utils.showLogs(400, "WARNING", method, controller, 0);
                    return res.send(400, {
                        "message": "User does not exist",
                        "data": []
                    });
                    utils.sendInfoFunc(400, "User does not exist", res, []);
                }
            });
    },

    update: function(req, res) {

        if (!req.param("id") || !req.param("firstName") || !req.param("lastName")) {
            return res.send(400, "firstName/lastName/id Property Missing");
        }

        var method = "update";
        var objId = new ObjectId(req.param('id'));


        User.native(function(error, collection) {
            if (error) {
                utils.showLogs(405, "ERROR", method, controller, error);
                return res.send(405, {
                    "message": "Error on update method (not Allowed)",
                    "data": error
                });
            }
            collection.findOneAndUpdate({
                _id: objId
            }, {
                $set: req.allParams()
            }, {
                returnOriginal: true,
                upsert: false
            }, function(err, result) {
                if (err) {
                    utils.showLogs(403, "ERROR", method, controller, err);
                    return res.send(403, {
                        "message": "Error to get user by Id (Error updating user)",
                        "data": err
                    });
                } else {
                    if (result.length != 0) {
                        utils.showLogs(200, "OK", method, controller, 0);
                        return res.send(200, {
                            "message": "OK User updated and success process",
                            "data": result.value.username
                        });

                    } else {
                        utils.showLogs(404, "WARNING", method, controller, 0);
                        return res.send(404, {
                            "message": "Id does not exist",
                            "data": []
                        });
                    }
                }
            });
        });



    }

};