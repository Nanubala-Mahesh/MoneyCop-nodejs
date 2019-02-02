const express = require('express');
const router = express.Router(); 
const { usersController } = require('../app/controllers/users_controller');

router.use('/users', usersController);
console.log('routes');

module.exports = {
    routes: router
}