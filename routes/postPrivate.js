const express = require('express');

const postPrivate = express.Router();

postPrivate.post('/', (req, res) => {

    // create post

    res.json({
        message: `private POST route: Create post`,
    })

});

postPrivate.put('/:post_id', (req, res) => {

    // modify post
    const {post_id} = req.params;
    res.json({
        message: `private PUT route: Edit post | post_id: ${post_id}`
    })
});

postPrivate.delete('/:post_id', (req, res) => {

    // delete post 
    const {post_id} = req.params;
    res.json({
        message: `private DELETE route: Delete post | post_id: ${post_id}`
    })
});

module.exports= postPrivate;