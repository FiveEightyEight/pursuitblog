const express = require('express');
const PostService = require('../services/post');
const postPublic = express.Router();

postPublic.get('/:post_id', (req, res) => {

    // gets post by id
    const {post_id} = req.params;
    PostService.readByID(post_id)
    .then( data => {
        res.json({
            data,
        });
        return;
    }).catch( err => {
        res.json ({message: 'error, no post found',})
        return;
    });
});

postPublic.get('/:post_id/comments', (req, res) => {
    const {post_id} = req.params;

    res.json({
        message: `GET comments from public post, post_id: ${post_id}`,
    });
});


postPublic.get('/:post_id/comments/:comment_id', (req, res) => {
    const {post_id, comment_id} = req.params;

    res.json({
        message: `GET COMMENT from public post, post_id: ${post_id} | comment_id: ${comment_id}`,
    });
});


module.exports = postPublic;