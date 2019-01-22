const app = require('express')();
const port = 3000;

// Middleware

// Routes
app.get('*', (req, res) => {
    res.json({
        message: 'API BASE',
    });
});

// Listener
app.listen(port, _=>{
    console.log('Listening on port: ', port);
}) ;