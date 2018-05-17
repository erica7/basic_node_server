const mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    body: {
        type: String,
        required: [true, "Body cannot be blank."]
    },
});

// Register the schema
mongoose.model('Comment', commentSchema);