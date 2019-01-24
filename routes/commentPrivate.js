const express = require('express');

const commentPrivate = express.Router();

commentPrivate.post('/', (req, res) => {

    // create post

    res.json({
        message: `private POST route: Create comment`,
    })

});

commentPrivate.put('/:comment_id', (req, res) => {

    // modify post
    const {comment_id} = req.params;
    res.json({
        message: `private PUT route: Edit comment | comment_id: ${comment_id}`
    })
});

commentPrivate.delete('/:comment_id', (req, res) => {

    // delete post 
    const {comment_id} = req.params;
    res.json({
        message: `private DELETE route: Delete comment | comment_id: ${comment_id}`
    })
});

module.exports= commentPrivate;