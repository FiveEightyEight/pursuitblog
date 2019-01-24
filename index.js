const app = require('express')();

const commentPublic = require('./routes/comment');
const postPublic = require('./routes/post');
const userPublic = require('./routes/user');

const commentPrivate = require('./routes/commentPrivate');
const postPrivate = require('./routes/postPrivate');
const userPrivate = require('./routes/userPrivate');
const port = 3000;


// Middleware

// Routes

app.use('/user', userPublic);
app.use('/post', postPublic);
app.use('/comment', commentPublic);

// Authenticate Middleware

app.use('/user', userPrivate);
app.use('/post', postPrivate);
app.use('/comment', commentPrivate);

app.use((req, res) => {
    res.json({
        message: 'API BASE',
    });
});

// Listener
app.listen(port, _=>{
    console.log('Listening on port: ', port);
}) ;