const express = require('express');
const UserService = require('../services/user');

const userPublic = express.Router();


userPublic.post('/', (req, res) => {
    // create user
    const {
        username,
        email,
        password
    } = req.body;
    console.log(req.body);

    if (!username || !email || !password) {
        res.json({
            message: 'require username, email, and password.'
        });
        return;
    } else {

        UserService.create(username, email, password)
            .then(_ => {
                res.json({
                    message: `${username} crearted`,
                });
            }).catch((err) => {
                res.json({
                    error: `could not create ${username}, try again`,
                })
            })
    }

});

userPublic.get('/:user_id', (req, res) => {
    // gets user's info; probably ALL info
    const {
        user_id
    } = req.params;
    UserService.read(user_id)
        .then(data => {
            // console.log(data)
            res.status(200).json({
                message: data,
            })
            return;
        }).catch( err=> {
            // console.log(err)
            res.json({
                error: 'user not found',
            })

            return;
        })
});

userPublic.get('/:user_id/posts', (req, res) => {
    // gets all user's posts
    const {
        user_id
    } = req.params;

    UserService.read(user_id)
    .then( data =>{
        console.log('data.id: ', data.id);
        return UserService.getAllPosts(data.id)
    }, err => {
        res.status(400).json({
            message: `could not find ${user_id}`,
        })
        return;
    })
    .then( data => {
        res.status(200).json({
            data,
        })
        return;
    })
    .catch( err => {
        res.status(400).json({
            message:'no posts found',
        })
        return;
    });
});

userPublic.get('/:user_id/posts/:post_id', (req, res) => {
    // gets specific post from user

    const {
        user_id,
        post_id
    } = req.params;

    res.json({
        message: `user public get w/ user post ID, user_id: ${user_id} | post_id: ${post_id}`,
    });

});

userPublic.get('/:user_id/comments', (req, res) => {
    // gets all user comments

    const {
        user_id
    } = req.params;
    res.json({
        message: `user public get w/ user comments, user_id: ${user_id}`,
    });

});

userPublic.get('/:user_id/comments/:comment_id', (req, res) => {

    // gets specific comment from  user

    const {
        user_id,
        comment_id
    } = req.params;
    res.json({
        message: `user public get w/ user comments, user_id: ${user_id} | comment_id: ${comment_id}`,
    });

});

userPublic.post('/user/login', (req, res) => {

    // user login

    res.json({
        message: 'user public login',
    })

});



module.exports = userPublic;