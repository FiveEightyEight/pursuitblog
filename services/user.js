const  db = require('./pgp');


const create = (username, email, password) => {
    return db.none(`INSERT INTO users (username, email, password)
    VALUES ($[username], $[email], $[password]);` , {username, email, password});
};

const read = (username) => {
    return db.one(`SELECT username FROM users 
    WHERE username = $[username];`, {username});
};

const update = (id, username, email, password, bio, token) => {

    

};
 

module.exports = {
    create,
    read,
}