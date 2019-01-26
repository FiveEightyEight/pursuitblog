const express = require('express');
const CommentService = require('../services/comment');

const commentPublic = express.Router();

commentPublic.get('/:comment_id', (req, res) => {

    // get a public comment

    const {comment_id} = req.params;

    CommentService.readByID(comment_id)
    .then( data => {
        res.status(200)
        .json({
            title: data[0].title,
            body: data[0].body,
        })
        return;
    }).catch( err =>{
        res.status(404)
        .json({
            message: 'Comment not found',
        });
        return;
    });

});

module.exports = commentPublic;