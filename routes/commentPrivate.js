const express = require('express');
const CommentService = require('../services/comment');

const commentPrivate = express.Router();

commentPrivate.post('/', (req, res) => {

    // create comment
    // client must pass author(username) in body

    res.json({
        message: `private POST route: Create comment`,
    })

});

commentPrivate.put('/:comment_id', (req, res) => {

    // modify comment
    const {comment_id} = req.params;
    res.json({
        message: `private PUT route: Edit comment | comment_id: ${comment_id}`
    })
});

commentPrivate.delete('/:comment_id', (req, res) => {

    // delete comment 
    const {comment_id} = req.params;
    res.json({
        message: `private DELETE route: Delete comment | comment_id: ${comment_id}`
    })
});

module.exports= commentPrivate;