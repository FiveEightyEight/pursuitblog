const express = require('express');
const CommentService = require('../services/comment');

const commentPrivate = express.Router();

commentPrivate.post('/', (req, res) => {

    // create comment
    // client must pass author(username) in body
    // client must pass post_id

    const {
        id, // user id
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
        }).catch(err => {
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

    const {
        id, // user id
        post_id,
        title,
        body,
    } = req.body;

    if (!post_id) {
        res.status(400)
            .json({
                message: 'post_id required to update comment',
            });
        return;
    }
    CommentService.readByID(comment_id)
        .then(data => {

            if(data[0].post_id !== parseInt(post_id)) {
                throw new Error('User not allowed to modify this comment');
            } else {
                console.log('in the else')
                if (!title) {
                    title = data[0].title;
                }
                if (!body) {
                    body = data[0].title;
                }
                return CommentService.update(comment_id, title, body);
            };
        }).then(data => {
            
            res.status(200)
                .json({
                    message: 'Comment updated!',
                });
            return;
        }).catch(err => {

            res.status(400)
                .json({
                    error: 'Failed to update comment',
                });
            return;
        });
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