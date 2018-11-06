var models = require('../models');
var express = require('express');
var router = express.Router();

router.post('/create', function (req, res) {
    models.User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }).then(function (user) {
        let response = {};
        response.id = user.id;
        response.username = user.username;
        response.email = user.email;
        res.status(201).send(response);
    })
    .catch(function(err) {
        res.status(500).send(err);  
    });
});

module.exports = router;