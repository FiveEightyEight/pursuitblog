const express = require('express');
const UserService = require('../services/user');
const uuidv1 = require('uuid/v1');

const userPublic = express.Router();


userPublic.post('/', (req, res) => {
    // create user
    const {
        username,
        email,
        password
    } = req.body;
    // console.log(req.body);

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
                username: data.username,
                bio: data.bio,
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

    UserService.read(user_id)
    .then( data =>{

        return UserService.getPost(data.id, post_id);
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

userPublic.post('/login', (req, res) => {

    // user login

    const {
        username,
        password
    } = req.body;

    let token = "";

    UserService.read(username)
    .then( data => {

        if(data.username !== username || data.password !== password) {

            res.status(401).json({
                message: 'login info invalid, try again'
            })
            return;
        }

            token = uuidv1();
        return UserService.login(data.id, token);
    })
    .then( data => {
        res.status(200)
        .json({
            message: 'login successful',
            token,
        });
        return;
    })
    .catch( err => {
        console.log(err)
        res.json({
            message: 'error, try again'
        });
        return;
    });

});



module.exports = userPublic;