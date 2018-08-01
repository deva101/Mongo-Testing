const assert = require('assert');
const User = require('../src/userModel');

describe('Virtual types', () => {
    // postCount is not a member of User Schema
    // it is computed dynamically
    it.only('postCount returns-----number of posts', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{ title: 'PostTitle' }]
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(joe.postCount === 1);
                done();
            });
    });
});