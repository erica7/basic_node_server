const mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, "Title cannot be blank."]
    },
    body: {
        type: String,
        required: [true, "Body cannot be blank."]
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
});

// Register the schema
mongoose.model('Post', postSchema);