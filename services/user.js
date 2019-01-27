const db = require('./pgp');
const PostService = require('./post');


const create = (username, email, password) => {
    return db.none(`INSERT INTO users (username, email, password)
    VALUES ($[username], $[email], $[password]);`, {
        username,
        email,
        password
    });
};

const read = (username) => {
    return db.one(`SELECT * FROM users 
    WHERE username = $[username];`, {
        username
    });
};

const readToken = (token) => {
    return db.one(`SELECT * FROM users 
    WHERE token = $[token];`, {
        token
    });
};

const login = (id, token) => {
    return db.none(`UPDATE users SET token = $[token]
    WHERE users.id = $[id];`, {
        id,
        token
    });
};

const update = (id, username, email, password, bio) => {
    if (!username && !email && !password && !bio) {
        console.log('UPDATE USER INFO FAILED @ FIRST CONDITIONAL')
        return new Promise((resolve, reject) => {
            reject(new Error('Nothing to update'));
        });
    };
    const newValueArr = [username, email, password, bio];
    const keyNameArr = ['username', 'email', 'password', 'bio'];
    let addKey = [];
    const obj = {id};
    
    for (let i = 0; i < newValueArr.length; i++) {
        const key = keyNameArr[i];
        const val = newValueArr[i]
        if (!newValueArr[i]) {
            continue;
        } else {
            addKey.push(`${key} = $[${key}]`);
            obj[key] = val;
        }
    };
    addKey = addKey.join(', ');
    // console.log('obj', obj)
    // console.log('addKey: ', addKey)
    return db.none(`UPDATE users SET ${addKey}
    WHERE users.id = $[id];`, obj);
};

const getAllPosts = (id) => {
    return db.any(`SELECT u.username, p.title, p.body
    FROM users u
    FULL JOIN posts p
        ON u.id = p.author
    WHERE u.id = $[id];`, {
        id
    });

};

const getPost = (userID, postID) => {
    return db.any(`SELECT u.username, p.title, p.body
    FROM users u
    FULL JOIN posts p
        ON u.id = p.author
    WHERE u.id = $[userID] AND p.id = $[postID];`, {
        userID,
        postID
    });
};

const getAllComments = (id) => {

    return db.any(`SELECT  c.title, c.body
    FROM comment c
    FULL JOIN users u
        ON u.id = c.author
    WHERE u.id = $[id];`, {
        id
    });
}

const getComment = (userID, commentID) => {
    return db.any(`SELECT  c.title, c.body
    FROM comment c
    FULL JOIN users u
        ON u.id = c.author
    WHERE u.id = $[userID] AND c.id = $[commentID];`, {
        userID,
        commentID,
    });
}

const deleteUser = (id) => {
    return db.result(`
    DELETE FROM comment WHERE comment.author = $[id];
    DELETE FROM posts WHERE posts.author = $[id];
    DELETE FROM users WHERE users.id = $[id];`, {id});
};



module.exports = {
    create,
    read,
    readToken,
    login,
    update,
    getAllPosts,
    getPost,
    getAllComments,
    getComment,
    deleteUser,
};