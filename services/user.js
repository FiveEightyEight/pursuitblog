const  db = require('./pgp');
const PostService = require('./post');


const create = (username, email, password) => {
    return db.none(`INSERT INTO users (username, email, password)
    VALUES ($[username], $[email], $[password]);` , {username, email, password});
};

const read = (username) => {
    return db.one(`SELECT * FROM users 
    WHERE username = $[username];`, {username});
};

const login = (id, token) => {
    return db.none(`UPDATE users SET token = $[token]
    WHERE users.id = $[id];` , {id, token});
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

const getPost = (userID, postID) => {
    return db.any(`SELECT u.username, p.title, p.body
    FROM users u
    FULL JOIN posts p
        ON u.id = p.author
    WHERE u.id = $[userID] AND p.id = $[postID];`, {userID, postID});
};

 

module.exports = {
    create,
    read,
    login,
    getAllPosts,
    getPost,
}