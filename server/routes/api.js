const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
var config = require("../config");
var jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

var secretKey = config.secretKey;

function createToken(user){
	var token = jsonwebtoken.sign({
		id: user._id,
		name: user.name,
		username: user.username
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
        if(err){
            console.log(err);
            res.send(err);
        }else{
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
router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if(err){
            res.send(err);
            return;
        }
        res.json(users);
    });
});

//Login
router.post('/login', function(req, res){

    User.findOne({
        userName: req.body.userName
    }).select('name userName password').exec(function(err, user){
        console.log(user)
        if(err) throw err;

        if(!user){
            res.send({ message: "User does not exist"});
        } else if (user){
            var validPassword = user.comparePassword(req.body.password);

        //     var validPassword =  user.comparePassword(req.body.password, function(err, isMatch) {
        //     if (err) throw err;
        //     console.log('From api match', isMatch);
        // });
        console.log(validPassword)
            if(!validPassword){
                res.send({ message: "Invalid password"});
            }
             else {
                // token
                var token = createToken(user);
                res.json({
                    success: true,
                    message: "Successful login",
                    token: token
                });
            }
        }
    });
});

//Todos
router.post('/todo/add', (req, res) => {
    let todo = new Todos({
        name: req.body.name,
        completed: req.body.completed,
        note: req.body.note
    })
    todo.save((err) => {
        if(err)
            console.log(err)
        else
            console.log("Todo created successfuly!!");
            res.send("Todo created successfuly!!")
    })
});

//Get todos
router.get('/todos', (req, res) => {
    Todos.find({}, (err, todo) => {
        if(err){
            res.send(err);
            return;
        }
        res.json(todo);
    });
});

//Get todo with ID
router.get('/todo/:Id', (req, res) => {
    // console.log(req.params.Id)
    Todos.findById(req.params.Id, (err, result) => {
        if(err)
            console.log(err)
        else
           res.send(result); 
    })
});

//Edit todo
router.post('/todo/edit/:Id', (req, res) => {
    Todos.findById({ _id: ObjectId(req.params.Id)}, (err, update) => {
        if(err){
            console.log(err);
            res.status(500).send(err)
        } else {
            update.name = req.body.name,
            update.completed = req.body.completed,
            update.note = req.body.note

            update.save((err, result) => {
                if(err){
                    res.status(500).send(err)
                } else {
                    res.send(result);
                }
            });
        }
    });
});

//Delete todo
router.post('/todo/delete/:Id', (req, res) => {
    console.log(req.params.Id)
    Todos.findByIdAndRemove({ _id: ObjectId(req.params.Id) }, 
    (err, result) => {      
        if (err) {
            console.log("error")
            res.send(400, "Error in delete")
        } else {
            res.send(200, "Deleted Successfully !!")
        }
    });
})


module.exports = router;
