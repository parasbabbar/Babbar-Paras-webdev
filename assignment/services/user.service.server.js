var app = require('../../express');
var userModel = require('../model/user/user.model.server');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var FacebookStrategy = require('passport-facebook').Strategy;

// var users = [
    //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    // ];

    var facebookConfig = {
    clientID     : '157561614795157',
    clientSecret : 'c4a4ed4f1af44fc1eae9c2c288cf5fd6',
    callbackURL  : '/auth/facebook/callback',
        profileFields : ['id', 'emails']
    };

    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));
    passport.use('local', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);
    app.post('/api/login',passport.authenticate('local'), login);
    app.get('/api/loggedin',loggedIn);
    app.post('/api/logout',logout);
    app.post('/api/register',register);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook',
    {successRedirect: '/#!/profile', failureRedirect: '/assignment/Assignment-4/#!/login'}));



function localStrategy(username, password, done) {
    console.log(username);
    userModel
        .findUserByUsername(username)
        .then(function(user){
            if(user) {
                if(user && bcrypt.compareSync(password,user.password)) {
                    done(null, user);
                }else {
                    done(null, false);
                }
            } else {
                done(null, false);
            }
        }, function (error) {
            done(error, false);
        });
}
function facebookLogin(token, refreshToken, profile, done){
    userModel
        .findFacebookUser(profile.id)
        .then(
            function(fbuser){
                if(fbuser) {
                    return done(null, fbuser);
                }
                else {
                    fbuser = {
                        username: profile.displayName.replace(/ /g,''),
                        facebook: {
                            token: token,
                            id: profile.id,
                            displayName: profile.displayName,
                        }
                    };
                    return userModel
                        .createUser(fbuser)
                        .then(
                            function(user){
                                done(null,user);
                            }
                        );
                }
            }
        )
}


function login(req, res) {
        var user= req.user;
        console.log(user);
        res.json(user);
}

    function register(req, res) {
    var nUser = req.body;
    nUser.password = bcrypt.hashSync(nUser.password);
    userModel
        .createUser(nUser)
        .then(function (user) {
            req.login(user, function (err) {
                if(err) {
                    res.status(400).send(err);
                } else {
                    res.json(user);
                }
            });
        });
}

    function logout(req, res){
    req.logout();
    res.send(200);
}

    function loggedIn(req,res){
    if(req.isAuthenticated()){
        console.log(req.user);
        res.json(req.user);
    }
    else {
        res.send('0');
    }
}
    function serializeUser(user, done) {
    // console.log("in serialize "+user);

    done(null, user);
}

    function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

    function deleteUser(req, res) {
        var uid = req.params.userId;
        userModel
            .deleteUser(uid)
            .then(
                function(status) {
                    res.sendStatus(200)
                },
                function(error){
                    res.sendStatus(400).send(error);
                });

        // for(var u in users) {
        //     if(users[u]._id == uid) {
        //         users.splice(u, 1);
        //     }
        // }
        // res.send(200);
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.userId;
        userModel
            .updateUser(userId, user)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });

        // for(var u in users) {
        //     if(users[u]._id == uid) {
        //         users[u] = user;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(function(nUser) {
                    res.json(nUser)
                },
                function(error){
                    res.sendStatus(404);
                });
        // users.push(user);
        // res.send(user);
    }

    function findUser(req, res) {
        var params = req.params;
        var query = req.query;
       if(query.password && query.username) {
           findUserByCredentials(req, res);
        } else if(query.username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        // console.log(username);
        // console.log(password);
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(users) {
                    if (users.length > 0) {
                        res.json(users[0]);
                    }
                    else {
                        res.send('0');
                    }

                },
                function(err){
                    res.sendStatus(404);
                });

    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        userModel
            .findUserByUsername(username)
            .then(
                function(users) {
                    if (users) {
                        res.send("0");

                    }
                    else{
                        res.send(username);
                    }
                });
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(
                function(user) {
                    res.send(user);
                },
                function(err){
                    res.sendStatus(400).send(error);
                });
        // for(var u in users) {
        //     if(users[u]._id === userId) {
        //         res.send(users[u]);
        //         return;
        //     }
        // }
        // res.send('0');
    }