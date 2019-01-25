const  db = require('./pgp');


UserService.create = (username, email, password) => {
    return db.none(`INSERT INTO users (username, email, password)
    VALUES ($[username], $[email], $[password]);` , {username, email, password});
};