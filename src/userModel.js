const mongoose = require('mongoose');
const PostSchema = require('./postSchema');

const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        validate: {
          validator: (name) => name.length > 2,
          message: 'Name must be longer than 2 characters.'
        },
        required: [true,'Name is required!']
    },
    likes: Number,
    blogPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogPost'
    }],
    posts: [PostSchema],
});

// Virtual Type
// 'postCount' variable counts number of posts associated with an article
UserSchema.virtual('postCount').get(function() {
    return this.posts.length;
});

 //To Remove comment and Post associated to 'user:Joe'
UserSchema.pre('remove', function(next){
    const BlogPost = mongoose.model('blogPost');
    const Comment = mongoose.model('comment');

    // Remove Comments of user 'Joe'
    Promise.all( [Comment.remove({user: this._id}), BlogPost.remove( { _id: { $in: this.blogPosts } }) ])
        .then( ()=> next() );
});

// Export
module.exports = mongoose.model('user', UserSchema);
