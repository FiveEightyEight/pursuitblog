const  db = require('./pgp');

const create = (author, title, body) => {
    return db.none(`INSERT INTO posts (author, title, body)
    VALUES ($[author], $[title], $[body]);` , {author, title, body});
};


// returns everything about post, may want to omit author id
const readByID = (id) => {
    return db.any(`SELECT author, title, body FROM posts 
    WHERE id = $[id];`, {id});
};

const readByAuthor = (author) => {
    return db.any(`SELECT author, title, body FROM posts 
    WHERE author = $[author];`, {author});
};

module.exports = {
    create,
    readByID, 
    readByAuthor,
};