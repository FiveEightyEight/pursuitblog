const  db = require('./pgp');

const create = (author, title, body) => {
    return db.none(`INSERT INTO comments (author, post_id, title, body)
    VALUES ($[author], $[post_id], $[title], $[body]);` , {author, post_id, title, body});
};


// returns everything about comment, may want to omit author id
const readByID = (id) => {
    return db.any(`SELECT author, post_id, title, body FROM comments 
    WHERE id = $[id];`, {id});
};

const readByAuthor = (author) => {
    return db.any(`SELECT author, post_id, title, body FROM comments 
    WHERE author = $[author];`, {author});
};

const update = (id, post_id, title, body) => {
    if (!title && !body) {
        console.log('UPDATE COMMENT INFO FAILED @ FIRST CONDITIONAL')
        return new Promise((resolve, reject) => {
            reject(new Error('Nothing to update'));
        });
    };
    const newValueArr = [title, body];
    const keyNameArr = ['title', 'body',];
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
    return db.none(`UPDATE comments SET ${addKey}
    WHERE comments.id = $[id];`, obj);
};

module.exports = {
    create,
    readByID, 
    readByAuthor,
    update,
};