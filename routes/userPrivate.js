const express = require('express');
const UserService = require('../services/user');

const userPrivate = express.Router();

userPrivate.put('/:user_id', (req, res) => {

    // update user

    const {
        user_id
    } = req.params;

    const {
        id,
        username,
        email,
        password,
        bio,
    } = req.body;
    console.log(req.body);
    res.json({
        message: `user private put, user_id: ${user_id}`,
    });

});

userPrivate.delete('/:user_id', (req, res) => { 

    // delete user

    const {
        user_id
    } = req.params;
    res.json({
        message: `user private delete, user_id: ${user_id}`,
    });

});


module.exports = userPrivate;