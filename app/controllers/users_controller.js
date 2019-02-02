const express = require('express')
const router = express.Router() 
const { User } = require('../models/user')


// user sign up
router.post('/', function(req, res){
    let body = req.body
    let user = new User(body)
    user.save().then(function(user){
      return user.generateToken()
    })
    .then(function(token){
        res.header('x-auth', token).send()
    })
    .catch(function(err){
        res.send(err)
    })
})


// login
// post /users/login
router.post('/login', function(req, res){
    let body = req.body; 
    console.log(body);
    
    User.findByCredentials(body.email, body.password).then(function(user){
        return user.generateToken()
    })
    .then((token) => {
        res.header('x-auth', token).send()
    })
    .catch(function(err){
        res.status(401).send(err)
    })
})


// users list
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