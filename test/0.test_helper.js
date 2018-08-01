const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connect to db...
// 'before' is executed only once
before(function (done) {
    // this.timeout(30000);

    mongoose.connect('mongodb://localhost:27017/users_test',{ useNewUrlParser: true });
    mongoose.connection
        .once('open', function(){
            console.log('Database Connected!');
            done();
        })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});


beforeEach( function(done ){

    // Ready to run nxt test!
    // Name yahi rahenge!!!
    const { users,comments,blogposts } = mongoose.connection.collections;

    users.remove( function(){
        comments.remove( function(){
            blogposts.remove( function(){
                done();
            })
        })
    });

});