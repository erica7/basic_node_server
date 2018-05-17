const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "E-mail cannot be blank."]
    },
    password: {
        type: String,
        required: [true, "Password cannot be blank."]
    },
    name: {
        type: String,
        required: [true, "Name cannot be blank."]
    },
    username: {
        type: String,
        required: [true, "Username cannot be blank."]
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
});

userSchema.methods.authenticate = function(password)  {
    return this.password == password ? true : false;
}

// Register the schema
mongoose.model('User', userSchema);