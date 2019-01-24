const express = require('express');

const userPrivate = express.Router();

userPrivate.put('/:user_id', (req, res) => {

    // update user

    const {
        user_id
    } = req.params;
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