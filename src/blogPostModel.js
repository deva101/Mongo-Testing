const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
    title: String,
    content: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

module.exports =  mongoose.model('blogPost',BlogPostSchema);