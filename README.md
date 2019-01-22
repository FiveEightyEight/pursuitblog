# Blog API

You are to build a simple, authentication enabled Blog API. This API will contain the following high level functionalities:

* CRUD options for a User
* CRUD options for a Post, linked to a User
* CRUD options for a Comment, linked to both a User (the author) and a Post (the comment container)

All posts and comments should be publicly readable ONLY. Additionally, any user's details can be publicly accessed (save the email / password).

A user can be created publicly but only an authenticated user can update her/his profile via PUT or DELETE.

A post can only be created, deleted or updated by an authenticated user that is author of post.
A comment can only be created, deleted or updated by an authenticated user that is author of comment OR the author of the post.

# Routes

Here are the routes that must be implemented. Remember, **PRIVATE** routes imply that ONLY authenticated user that is author of post or comment may access those routes.

## KEY
**PUBLIC**: ✅
**PRIVATE**: ❌

## USER

#### ✅ POST /user 
#### ✅ GET /user/:user_id
#### ❌ PUT /user/:user_id
#### ❌ DEL /user/:user_id
#### ✅ GET /user/:user_id/posts
#### ✅ GET /user/:user_id/posts/:post_id
#### ✅ GET /user/:user_id/comments
#### ✅ GET /user/:user_id/comments/:comment_id
#### ✅ POST /user/login

## POST
#### ❌ POST /post
#### ✅ GET /post/:post_id
#### ❌ PUT /post/:post_id
#### ❌ DEL /post/:post_id
#### ✅ GET /post/:post_id/comments
#### ✅ GET /post/:post_id/comments/:comment_id


## COMMENT

#### ❌ POST /comment
#### ✅ GET /comment/:comment_id
#### ❌ PUT /comment/:comment_id
#### ❌ DEL /comment/:comment_id

# Models

## User

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR (100) UNIQUE NOT NULL,
  email VARCHAR (100) UNIQUE NOT NULL,
  password VARCHAR (250) NOT NULL,
  token VARCHAR (16)
);
```

## Post

```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  author INT REFERENCES users(id) NOT NULL,
  title VARCHAR (100) NOT NULL,
  body TEXT NOT NULL
);
```

## Comment
```sql
CREATE TABLE comment (
  id SERIAL PRIMARY KEY,
  author INT REFERENCES users(id) NOT NULL,
  post_id INT REFERENCES posts(id) NOT NULL,
  title VARCHAR (100) NOT NULL,
  body TEXT NOT NULL
);
```


# Optionally

You may use [Swagger](https://www.npmjs.com/package/express-swagger-generator) to auto generate API docs.
