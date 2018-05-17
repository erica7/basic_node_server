const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');

module.exports = {
    index: (req, res) => {
        User.find({})
            // .populate({ path: 'posts', model: 'Post' })
            // .populate({ path: 'comments', model: 'Comment' })
            .exec()
            .then((users) => { return res.json(users); })
            .catch((err) => { return res.json(err); })
    },
    create: (req, res) => {
        console.log("req.session: ", req.session)
        new User(req.body).save()
            .then((user) => { return res.json(user); })
            .catch((err) => { return res.json(err); });
    },
    show: (req, res) => {
        console.log("users show()")
        User.findById(req.params.id).exec()
            .then((user) => { res.json(user) })
            .catch((err) => { return res.json(err) });
    },
    where: (req, res) => {
        console.log("users where()")
        var obj = {};
        if (req.query.email) obj.email = req.query.email;
        if (req.query.name) obj.name = req.query.name;
        if (req.query.username) obj.username = req.query.username;
        console.log("obj: ", obj)
        if (Object.keys(obj).length == 0) return res.json(null);
        User.findOne(obj).exec()
            .then((user) => { console.log("users where() user: "); return res.json(user) })
            .catch((err) => { console.log("users where() err: "); return res.json(err) })
    },
    update: (req, res) => {
        User.findByIdAndUpdate(req.params.id, req.body).exec()
            .then((user) => { return res.json(user) })
            .catch((err) => { return res.json(err) })
    },
    delete: (req, res) => {
        User.findByIdAndRemove(req.params.id).exec()
            .then((user) => { return res.json(user) })
            .catch((err) => { return res.json(err) })
    },
    login: (req, res) => {
        if (req.session) {
            console.log("-- req.session: ", req.session)
            console.log("-- req.session.id: ", req.session.id)
            console.log("-- req.session.cookie: ", req.session.cookie)
            console.log("-- req.session.userId: ", req.session.userId)
        }
        User.findById(req.body.id).exec()
            .then((user) => {
                req.session.userId = user.id;
                return res.json(user)
            })
            .catch((err) => { 
                req.session.userId = ""; 
                return res.json(err); 
            });
    },
    logout: (req, res) => {
        req.session.destroy((err) => {  //TODO fixme 
            console.log("session destroy err: ", err)
        });
        return res.json(null);
    },
    test: (req, res) => {
        return req.session.userId != "" ? res.json("authenticated!") : res.json("not authenticated!");
    }
}