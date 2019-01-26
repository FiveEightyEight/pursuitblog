const express = require('express');
const PostService = require('../services/post');
const postPrivate = express.Router();

postPrivate.post('/', (req, res) => {

    // create post
    // client must pass author(username) in body

    const {
        id,
        author,
        title,
        body,
    } = req.body;
    if (!title || !body) {
        res.status(400)
            .json({
                message: 'Title & Body of post must be filled',
            });
        return;
    };
    PostService.create(id, title, body)
        .then(data => {
            //    console.log(data);
            res.status(201)
                .json({
                    message: `Post: ${title}, created`
                });
            return;
        })
        .catch(err => {
            res.status(400)
                .json({
                    error: `failed to create post`,
                });
        });

});

postPrivate.put('/:post_id', (req, res) => {

    // modify post

    const {
        id,
        author,
        title,
        body,
    } = req.body;
    const {
        post_id
    } = req.params;

    PostService.readByID(post_id)
        .then(data => {
            console.log('data: ', data);

            if (data[0].author !== id) {

                res.status(401)
                    .json({
                        message: 'User not allowed to modify this post'
                    });
                return;
            };
            if (!title) {
                title = data[0].title;
            }
            if (!body) {
                body = data[0].title;
            }
            return PostService.update(post_id, title, body)
        }).then(data => {
            res.status(201).json({
                message: 'Post updated',
            });
            return;
        })
        .catch(err => {

            res.status(400).json({
                error: 'Failed to update post',
            })

        });

});

postPrivate.delete('/:post_id', (req, res) => {

    // delete post 
    const {
        post_id
    } = req.params;
    res.json({
        message: `private DELETE route: Delete post | post_id: ${post_id}`
    })
});

module.exports = postPrivate;