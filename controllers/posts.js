const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');

module.exports = {
    index: (req, res) => {
        Post.find({})
            .populate({ path: 'user', model: 'User' })
            .populate({ path: 'comments', model: 'Comment', populate: { path: 'user', model: 'User' } })
            .exec()
            .then((posts) => { return res.json(posts); })
            .catch((err) => { return res.json(err); })
    },
    create: (req, res) => {
        if (req.session.userId == "") {
            return res.json({ errors: { password: { message: "Invalid credentials." } } })
        }
        new Post({
            user: mongoose.Types.ObjectId(req.session.userId),
            title: req.body.title,
            body: req.body.body
        })
            .save()
            .then((post) => {
                User.findByIdAndUpdate(req.session.userId, { $push: { posts: post._id } }).exec() //TODO
                    .then((post) => { res.json(post); })
                    .catch((err) => { return res.json(err); });
                return res.json(post);
            })
            .catch((err) => { return res.json(err); });
    },
    show: (req, res) => {
        Post.findById(req.params.id)
            .populate({ path: 'user', model: 'User' })
            .populate({ path: 'comments', model: 'Comment', populate: { path: 'user', model: 'User' } })
            .exec()
            .then((post) => { res.json(post) })
            .catch((err) => { return res.json(err) });
    },
    showByComment: (req, res) => {
        Post.find({ comment: req.params.id })
            .populate({ path: 'user', model: 'User' })
            .populate({ path: 'comments', model: 'Comment', populate: { path: 'user', model: 'User' } })
            .exec()
            .then((posts) => { return res.json(posts) })
            .catch((err) => { return res.json(err) });
    },
    update: (req, res) => {
        Post.findById(req.params.id).exec()
            .then((post) => {
                if (post.userId == req.session.userId) {
                    if (req.body.title) {
                        post.title = req.body.title;
                    }
                    if (req.body.body) {
                        post.body = req.body.body;
                    }
                    post.save()
                        .then((post) => { res.json(post) })
                        .catch((err) => { return res.json(err) });
                } else {
                    return res.json({ errors: { password: { message: "Invalid credentials." } } })
                }
            })
            .catch((err) => { return res.json(err) });
    },
    delete: (req, res) => {
        Post.findById(req.params.id).exec()
            .then((post) => {
                if (post.user == req.session.userId) {
                    comment.remove()
                        .then((post) => { return res.json(post) })
                        .catch((err) => { return res.json(err) });
                }
            })
            .catch((err) => { return res.json(err) });
    }
}