const UserService = require('./services/user');


const auth = ((req, res, next) => {
    const {
        token
    } = req.headers;

    if (!token) {
        res.status(401).json({
            message: 'Unauthorized access'
        })
        return;
        
    };

    // console.log(token);
    // console.log('req.path: ', req.path);
    const path = req.path.split('/')
    // console.log('path', path);
    if (path[1] === 'user') {
        // /user path
        UserService.read(path[2])
            .then(data => {
                if (data.token !== token) {
                    res.status(401).json({
                        message: 'Authentication Invalid'
                    });
                    return;
                }
                req.body.id = data.id;
                next();
            })
            .catch(err => {
                console.log('error: ', err)
                res.status(400).json({
                    message: 'Authentication Error'
                });
                return;
            })


    } else if (path[1] === 'post') {
        // /post path


    } else if (path[1] === 'comment') {
        // /comment path


    } else {
        res.status(404).json({
            message: 'invalid path',
        })
    };
});

module.exports = {
    auth,
}