const assert = require('assert');
const User = require('../src/userModel');

describe('Updating records', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe', likes: 0 });
        joe.save()
            .then(() => done());
    });





    function assertName(operation, done) {
        operation
            .then( () => User.find({}) )
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Alex');
                done();
            });
    }

    it('instance-----set and save', (done) => {
        joe.set('name', 'Alex');
        assertName(joe.save(), done);
    });

    it('instance-----update', (done) => {
        assertName(joe.update({ name: 'Alex' }), done);
    });

    it('class-----update', (done) => {
        assertName(
            User.update({ name: 'Joe' }, { name: 'Alex' }),
            done
        );
    });

    it('class-----find and update one record', (done) => {
        assertName(
            User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }),
            done
        );
    });

    it('class-----find record with an Id and update', (done) => {
        assertName(
            User.findByIdAndUpdate(joe._id, { name: 'Alex' }),
            done
        );
    });






    // Update Operator(Inc)
    it('A user can have their postcount incremented by 1', (done) => {
        User.update( { name: 'Joe' }, { $inc: { likes: 10 } })
            .then( () => User.findOne({ name: 'Joe' }) )
            .then((user) => {
                assert(user.likes === 10);
                done();
            });
    });
});
