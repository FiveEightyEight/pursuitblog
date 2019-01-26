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
    if(!title || !body) {
        res.status(400)
        .json({
            message: 'Title & Body of post must be filled',
        });
        return;
    };
   PostService.create(id, title, body)
   .then( data => {
    //    console.log(data);
       res.status(200)
       .json({
           message: `Post: ${title}, created`
       });
       return;
   })
   .catch( err =>{
       res.status(400)
       .json({
           error: `failed to post`,
       });
   });

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