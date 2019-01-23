const express = require('express');

const userPublic = express.Router();


userPublic.post('/', (req, res) => {
    // create user

    res.json({
        message: 'user public post',
    });
});

userPublic.get('/:user_id', (req, res) => {
    // gets user's info; probably ALL info
    const {
        user_id
    } = req.params;
    res.json({
        message: `user public get, user_id: ${user_id}`,
    });
});

userPublic.get('/:user_id/posts', (req, res) => {
    // gets all user's posts
    const {
        user_id
    } = req.params;
    res.json({
        message: `user public get w/ user posts, user_id: ${user_id}`,
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