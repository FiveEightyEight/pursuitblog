const  db = require('./pgp');
const PostService = require('./post');


const create = (username, email, password) => {
    return db.none(`INSERT INTO users (username, email, password)
    VALUES ($[username], $[email], $[password]);` , {username, email, password});
};

const read = (username) => {
    return db.one(`SELECT id, username FROM users 
    WHERE username = $[username];`, {username});
};

const update = (id, username, email, password, bio, token) => {



};

const getAllPosts = (id) => {
    return db.any(`SELECT u.username, p.title, p.body
    FROM users u
    FULL JOIN posts p
        ON u.id = p.author
    WHERE u.id = $[id];`, {id});

};
 

module.exports = {
    create,
    read,
    getAllPosts,
}