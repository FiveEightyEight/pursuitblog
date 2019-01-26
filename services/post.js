const db = require('./pgp');

const create = (author, title, body) => {
    return db.none(`INSERT INTO posts (author, title, body)
    VALUES ($[author], $[title], $[body]);`, {
        author,
        title,
        body
    });
};


// returns everything about post, may want to omit author id
const readByID = (id) => {
    return db.any(`SELECT author, title, body FROM posts 
    WHERE id = $[id];`, {
        id
    });
};

const readByAuthor = (author) => {
    return db.any(`SELECT author, title, body FROM posts 
    WHERE author = $[author];`, {
        author
    });
};

const update = (id, title, body) => {
    if (!title && !body) {
        console.log('UPDATE POST INFO FAILED @ FIRST CONDITIONAL')
        return new Promise((resolve, reject) => {
            reject(new Error('Nothing to update'));
        });
    };
    const newValueArr = [title, body];
    const keyNameArr = ['title', 'body', ];
    let addKey = [];
    const obj = {
        id
    };

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
    return db.none(`UPDATE posts SET ${addKey}
    WHERE posts.id = $[id];`, obj);
};

const getAllPostComments = (id) => {
    return db.any(`SELECT  p.title, p.body, c.title, c.body
    FROM comment c
    FULL JOIN posts p
        ON p.id = c.post_id
    WHERE p.id = $[id];`, {
        id
    });
}

const getPostComment = (postID, commentID) => {
    return db.any(`SELECT  p.title, p.body, c.title, c.body
    FROM comment c
    FULL JOIN posts p
        ON p.id = c.post_id
    WHERE p.id = $[postID] AND c.id = $[commentID];`, {
        postID,
        commentID,
    });
}


module.exports = {
    create,
    readByID,
    readByAuthor,
    update,
    getAllPostComments,
    getPostComment,
};