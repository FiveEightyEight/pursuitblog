const UserService = require('./services/user');
const auth = ( (req, res, next)=>{
    const {token} = req.headers;
    if(!token) {
        res.status(401).json({
            message: 'Unauthorized access'
        })
        return;
    } else {
        console.log(token);
        UserService.readToken(token)
        .then( data =>{
            if(data.token !== token) {
                res.status(401).json({
                    message: 'Authentication Invalid'
                });
                return;
            }
            req.body.id = data.id;
            next();
        })
        .catch( err => {
            console.log('error: ', err)
            res.status(400).json({
                message: 'Authentication Error'
            });
            return;
        })
    };
});

module.exports ={
    auth,
}