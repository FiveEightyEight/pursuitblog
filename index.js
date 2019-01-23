const app = require('express')();

const userPublic = require('./routes/user');
const port = 3000;


// Middleware

// Routes

app.use('/user', userPublic);

app.use((req, res) => {
    res.json({
        message: 'API BASE',
    });
});

// Listener
app.listen(port, _=>{
    console.log('Listening on port: ', port);
}) ;