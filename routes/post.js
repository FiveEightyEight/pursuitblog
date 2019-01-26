const express = require('express');
const PostService = require('../services/post');
const postPublic = express.Router();

postPublic.get('/:post_id', (req, res) => {

    // gets post by id
    const {
        post_id
    } = req.params;
    PostService.readByID(post_id)
        .then(data => {
            res.json({
                data,
            });
            return;
        }).catch(err => {
            res.json({
                message: 'error, no post found',
            })
            return;
        });
});

postPublic.get('/:post_id/comments', (req, res) => {
    // get post with comment and id
    const {
        post_id
    } = req.params;

    PostService.getAllComments(post_id)
        .then(data => {
            res.status(200)
                .json({
                    data,
                });
            return;

        }).catch(err => {

            res.status(404)
                .json({
                    message: 'Comments not found',
                });
            return;

        })
});


postPublic.get('/:post_id/comments/:comment_id', (req, res) => {
    const {
        post_id,
        comment_id
    } = req.params;

    PostService.getComment(post_id, comment_id)
    .then(data => {
        res.status(200)
            .json({
                data,
            });
        return;

    }).catch(err => {

        res.status(404)
            .json({
                message: 'Comment not found',
            });
        return;

    })
});


module.exports = postPublic;