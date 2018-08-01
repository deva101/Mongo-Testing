const assert = require('assert');
const User = require('../src/userModel');
const Comment = require('../src/commentModel');
const BlogPost = require('../src/blogPostModel');

describe('Assocations', () => {
    let joe, blogPost, comment;

    beforeEach((done) => {
        // Data
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });
        comment = new Comment({ content: 'Congrats on great post' });

        // Inter-Connect
        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        // ES6 Syntax
        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });

    it('relation between a user-----blogpost', (done) => {
        // Populate will derefference specied 'PROPERTY'(that is written in Schema)
        User.findOne({ name: 'Joe' })
            .populate('blogPosts')
            .then((user) => {
                assert( user.blogPosts[0].title === 'JS is Great' );
                done();
            });
    });


    it('saves a full relation graph', (done) => {
        User.findOne({ name: 'Joe' })
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.name === 'Joe');
                assert(user.blogPosts[0].title === 'JS is Great');
                assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
                assert(user.blogPosts[0].comments[0].user.name === 'Joe');

                done();
            });
    });



});
