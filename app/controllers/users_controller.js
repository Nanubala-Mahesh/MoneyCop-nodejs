const express = require('express')
const router = express.Router() 
const { User } = require('../models/user')


router.post('/', function(req, res){
    console.log('users Controller');
    
    let body = req.body
    let user = new User(body)
    user.save().then(function(user){
        res.send(user)
    })
    .catch(function(err){
        res.send(err)
    })
})


router.get('/', function(req, res){
    console.log('users ');
    User.find().then(function(users){
        res.send(users)
    })
    .catch(function(err){
        res.send(err)
    })
})

module.exports = {
    usersController: router
}