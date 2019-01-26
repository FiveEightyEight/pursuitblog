const express = require('express');
const CommentService = require('../services/comment');

const commentPublic = express.Router();

commentPublic.get('/:comment_id', (req, res) => {

    // get a public comment

    const {comment_id} = req.params;

    res.json({
        message: `GET public comment, comment_id: ${comment_id}`,
    })
});

module.exports = commentPublic;