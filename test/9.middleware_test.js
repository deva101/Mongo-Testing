const assert = require('assert');
const User = require('../src/userModel');
const BlogPost = require('../src/blogPostModel');
const Comment = require('../src/commentModel');

describe('Middleware', () => {
    let joe, blogPost;

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
        Promise.all( [joe.save(), blogPost.save(), comment.save()] )
            .then(() => done() );
    });


    it('Remove \'BlogPost\' before removing user', (done) => {
        joe.remove()
            .then( ()=> BlogPost.countDocuments() )
            .then( (no)=>{
                assert( no === 0 );
                done();
            });
    });


    // it.only('Remove \'Comment\' and \'BlogPost\' before removing user', (done) => {
    //     joe.remove()
    //         .then( () => {  // if parenthesis added then return statement has to be added
    //             return Comment.countDocuments()
    //         }).then( (number) => {
    //             // console.log(number,'$$$$$$');
    //             assert( number === 0 );
    //         }).then( ()=> BlogPost.countDocuments() )
    //         .then( (no)=>{
    //             // console.log(no,'$$$$$$');
    //             assert( no === 0 );
    //             done();
    //         });
    // });

});
