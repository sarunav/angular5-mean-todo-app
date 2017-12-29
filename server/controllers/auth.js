const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const config = require("../config");

//Models
let User = require('../models/users');

let auth = router.use((req, res, next) => {

    console.log("Somebody requested secure area!");
    //Provide 'x-access-token' as key in headers
    let token = req.headers['x-access-token'];
    console.log('Auth token: ', token)

    if (token) {
        User.findOne({ loggedInToken: token }, (err, user) => {
            if (!user) {
                console.log('Wrong token!');
                res.status(403).send({ success: false, message: "Wrong token provided" });
            } else {
                jsonwebtoken.verify(token, config.secretKey, function(err, decoded) {
                    if (err) {
                        res.status(403).send({ success: false, message: "Failed to authenticate user" });
                    } else {
                        req.decoded = decoded;
                        console.log('Decode:', req.decoded);
                        next();
                    }
                })
            }
        })
    } else {
        res.status(403).send({ success: false, message: "No token provided" });
    }

});

module.exports = auth;