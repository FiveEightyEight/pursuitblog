const express = require('express');
const CommentService = require('../services/comment');

const commentPrivate = express.Router();

commentPrivate.post('/', (req, res) => {

    // create comment
    // client must pass author(username) in body
    // client must pass post_id

    const {
        id,
        post_id,
        title,
        body,
    } = req.body;

    if (!post_id) {
        res.status(400)
            .json({
                message: 'post_id required to create comment',
            });
        return;
    }
    if (!title || !body) {
        res.status(400)
            .json({
                message: 'Title & Body of comment must be filled',
            });
        return;
    };
    CommentService.create(id, post_id, title, body)
        .then(_ => {

            res.status(201)
                .json({
                    message: `Comment: ${title}, created`
                });
            return;
        }).catch( err =>{
            res.status(400)
                .json({
                    error: `failed to created comment`,
                });
        });
});

commentPrivate.put('/:comment_id', (req, res) => {

    // modify comment
    const {
        comment_id
    } = req.params;
    res.json({
        message: `private PUT route: Edit comment | comment_id: ${comment_id}`
    })
});

commentPrivate.delete('/:comment_id', (req, res) => {

    // delete comment 
    const {
        comment_id
    } = req.params;
    res.json({
        message: `private DELETE route: Delete comment | comment_id: ${comment_id}`
    })
});

module.exports = commentPrivate;