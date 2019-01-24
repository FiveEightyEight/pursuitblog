const app = require('express')();

const postPublic = require('./routes/post');
const userPublic = require('./routes/user');

const userPrivate = require('./routes/userPrivate');
const port = 3000;


// Middleware

// Routes

app.use('/user', userPublic);
app.use('/post', postPublic);

// Authenticate Middleware

app.use('/user', userPrivate);


app.use((req, res) => {
    res.json({
        message: 'API BASE',
    });
});

// Listener
app.listen(port, _=>{
    console.log('Listening on port: ', port);
}) ;