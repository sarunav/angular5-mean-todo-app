const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
var jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

var config = require("../config");
const auth = require("../controllers/auth");

var secretKey = config.secretKey;

function createToken(user) {
    var token = jsonwebtoken.sign({
            id: user._id,
            name: user.name,
            username: user.username,
            expiresIn: 30
        },
        secretKey, {
            // expiresInMinutes: 1440
        }
    );

    return token;
}

//Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

//Response handling
let response = {
    status: 200,
    data: [],
    message: null
}

//Models
let User = require('../models/users');
var Todos = require('../models/todo');

//Register user route
router.post('/user/register', (req, res) => {
    let user = new User({
        name: req.body.name,
        userName: req.body.userName,
        password: req.body.password
    });

    let token = createToken(user);

    user.save((err) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log("User registered successfuly!!");
            res.json({
                success: true,
                message: "User has been created!",
                token: token
            });
        }
    })
});

//Get users
router.get('/users', auth, (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json(users);
    });
});

//Login
router.post('/login', function(req, res) {

    User.findOne({
        userName: req.body.userName
    }).select('name userName password').exec(function(err, user) {
        console.log(user)
        if (err) throw err;

        if (!user) {
            res.status(403).send({
                error: true,
                message: 'User does not exist'
            })
        } else if (user) {
            user.comparePassword(req.body.password).then(function(isMatch) {
                if (!isMatch) {
                    res.status(403).send({
                        error: true,
                        message: 'Not a valid password'
                    })
                } else {
                    let token = createToken(user);
                    User.updateOne({ userName: req.body.userName }, { loggedInToken: token }, (err, update) => {
                        if (err) {
                            console.log(err);
                            res.status(403).send({
                                error: true,
                                message: 'User token update failed'
                            })
                        } else {
                            console.log('User token updated')
                        }
                    });

                    res.json({
                        success: true,
                        message: "Successful login",
                        token: token
                    });
                }
            }).catch(function(err) {
                console.log(err);
            });
        }
    });
});

//Logout user
router.post('/log-out', auth, (req, res) => {
    console.log('Log out route')
    User.updateOne({ _id: ObjectId(req.decoded.id) }, { $set: { loggedInToken: '' } }, (err, update) => {
        if (err) {
            console.log(err);
            res.status(500).send(err)
        } else {
            console.log('User token updated');
            res.status(200).send({ success: true, message: "You are now logged out" });
        }
    });
})

//Anything below is secured

//Get logged in user
router.get('/current-user', auth, (req, res) => {
    User.findOne({ _id: ObjectId(req.decoded.id) }, (err, user) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json(user);
    });
});

//Todos
router.post('/todo/add', auth, (req, res) => {
    let todo = new Todos({
        name: req.body.name,
        completed: req.body.completed,
        note: req.body.note,
        owner: req.decoded.id
    })
    todo.save((err) => {
        if (err) {
            console.log(err)
            res.status(400).send({
                success: false,
                message: "Error"
            });
        } else {
            console.log("Todo created successfuly!!");
            res.status(200).send({
                success: true,
                message: "Todo created"
            });
        }
    })
});

//Get todos
router.get('/todos', auth, (req, res) => {
    // req.decoded.id is from auth
    Todos.find({ owner: req.decoded.id }, (err, todo) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json(todo);
    });
});

//Get todo with ID
router.get('/todo/:Id', auth, (req, res) => {
    // console.log(req.params.Id)
    Todos.findById(req.params.Id, (err, result) => {
        if (err)
            console.log(err)
        else
            res.send(result);
    })
});

//Edit todo
router.post('/todo/edit/:Id', auth, (req, res) => {
    Todos.findById({ _id: ObjectId(req.params.Id) }, (err, update) => {
        if (err) {
            console.log(err);
            res.status(500).send(err)
        } else {
            update.name = req.body.name,
                update.completed = req.body.completed,
                update.note = req.body.note

            update.save((err, result) => {
                if (err) {
                    console.log(err);
                    res.status(400).send({
                        success: false,
                        message: "Error in update"
                    });
                } else {
                    console.log(result);
                    res.status(200).send({
                        success: true,
                        message: "Todo updated"
                    });
                }
            });
        }
    });
});

//Delete todo
router.post('/todo/delete/:id', auth, (req, res) => {
    console.log('Todo id: ', req.params.id)
    Todos.findByIdAndRemove({ _id: ObjectId(req.params.id) },
        (err, result) => {
            if (err) {
                console.log("error")
                res.send(400, "Error in delete")
            } else {
                res.send(200, "Deleted Successfully !!")
            }
        });
});




module.exports = router;