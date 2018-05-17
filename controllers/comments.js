const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');

module.exports = {
    index: (req, res) => {
        Comment.find({})
            .populate('user')
            .populate('post')
            .exec()
            .then((comments) => { return res.json(comments); })
            .catch((err) => { return res.json(err); })
    },
    create: (req, res) => {
        if (req.session.userId == "") {
            return res.json({ errors: { password: { message: "Invalid credentials." } } })
        }
        //create the comment 
        var comment = new Comment({
            user: mongoose.Types.ObjectId(req.session.userId),
            post: req.params.id,
            body: req.body.body
        });
        comment.save()
            .then((comment) => {
                console.log("comment save worked");
                // add to the user 
                User.findByIdAndUpdate(req.session.userId, { $push: { comments: comment._id } }).exec()
                    .then((user) => {
                        console.log("user update worked");
                        // add to the post 
                        Post.findByIdAndUpdate(req.params.id, { $push: { comments: comment._id } }).exec()
                            .then((post) => {
                                console.log("post update worked");
                                // res.json(post)
                            })
                            .catch((err) => { return res.json(err) })
                    })
                    .catch((err) => { return res.json(err) })
                return res.json(comment);
            })
            .catch((err) => { return res.json(err); });
    },
    show: (req, res) => {
        Comment.findById(req.params.id)
            .populate('user')
            .populate('post')
            .exec()
            .then((comment) => { res.json(comment) })
            .catch((err) => { return res.json(err) });
    },
    showByPost: (req, res) => {
        Comment.find({post: req.params.id})
            .populate('user')
            .populate('post')
            .exec()
            .then((comments) => { return res.json(comments) })
            .catch((err) => { return res.json(err) });

    },
    where: (req, res) => {
        console.log("comments where()")
        var obj = {};
        if (req.query.email) obj.email = req.query.email;
        if (Object.keys(obj).length == 0) return res.json(null);
        User.findOne(obj).exec()
            .then((user) => {
                console.log(user)
                Comments.find({ user: user._id }).exec()
                    .then((comments) => { return res.json(comments) })
                    .catch((err) => { return res.json(err) });
            })
            .catch((err) => { return res.json(err) });
    },
    update: (req, res) => {
        Comment.findById(req.params.id).exec()
            .then((comment) => {
                console.log("comment: ", comment)
                console.log("req.session.userId: ", req.session.userId)
                if (comment.user == req.session.userId) {
                    if (req.body.body) {
                        comment.body = req.body.body;
                    }
                    comment.save()
                        .then((comment) => { res.json(comment) })
                        .catch((err) => { return res.json(err) });
                } else {
                    return res.json({ errors: { password: { message: "Invalid credentials." } } })
                }
            })
            .catch((err) => { return res.json(err) });
    },
    delete: (req, res) => {
        // TODO test as different users 
        Comment.findById(req.params.id)
            .populate('post')
            .exec()
            .then((comment) => {
                if (comment.user == req.session.userId || comment.post.user == req.session.userId) {
                    comment.remove()
                        .then((comment) => { return res.json(comment) })
                        .catch((err) => { return res.json(err) });
                }
            })
            .catch((err) => { return res.json(err) });
    }
}

//TODO. On creation, handle unsuccessful additions to other engries (e.g. user or post) 