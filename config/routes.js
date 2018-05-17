const User = require('./../controllers/users.js');
const Post = require('./../controllers/posts.js');
const Comment = require('./../controllers/comments.js');

module.exports = (app) => {
    app.get('/users', User.index);
    app.post('/users', User.create);
    app.get('/users/where', User.where);
    app.get('/users/:id', User.show);
    app.put('/users/:id', User.update);
    app.delete('/users/:id', User.delete);
    app.post('/login', User.login);
    app.post('/logout', User.logout);
    app.get('/test', User.test);


    app.get('/posts', Post.index);
    app.post('/posts', Post.create);
    app.get('/posts/:id', Post.show);
    app.get('/comments/:id/posts', Post.showByComment);
    app.put('/posts/:id', Post.update);
    app.delete('/posts/:id', Post.delete);

    app.get('/comments', Comment.index);
    app.post('/posts/:id/comments', Comment.create);
    app.get('/posts/:id/comments', Comment.showByPost);
    app.get('/comments/where', Comment.where);
    app.get('/comments/:id', Comment.show);
    app.put('/comments/:id', Comment.update);
    app.post('/comments/:id', Comment.delete);
}