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

    UserService.update(id, username, email, password, bio)
    .then(data => {
        res.status(200).json({
            message: `${user_id} successfully updated`
        });
        return;
    }).catch( err => {
        console.log(err)
        res.status(400).json({
            error: 'Could not update user information'
        });
    });

});

userPrivate.delete('/:user_id', (req, res) => { 

    // delete user

    const {
        user_id
    } = req.params;

    const {
        id,
    } = req.body;

    UserService.deleteUser(id)
    .then( data => {
        console.log(data)

        res.status(200).json({
            message: `${user_id} successfully deleted`
        });
        return;
    })
    .catch( err => {
        console.log(err)
        res.status(400).json({
            error: 'Could not delete user'
        });
    })

});


module.exports = userPrivate;