const assert = require('assert');
const User = require('../src/userModel');

describe('READ', function(){
    // this.timeout(30000);

    let joe, maria, alex, zach;

    beforeEach((done) => {
        alex = new User({ name: 'Alex' });
        joe = new User({ name: 'Joe' });
        maria = new User({ name: 'Maria' });
        zach = new User({ name: 'Zach' });

        Promise.all( [joe.save(), alex.save(), maria.save(), zach.save()] )
            .then(() => done());
    });

    // PROJECTION
    it('find(joe) with only name', (done) => {
        User.find({ name: 'Joe' },{name:1})
            .then((users) => {
                // Id is assigned by mongoose first and this id is passed to mongodb
                // So to find the recent rcd...compare there _id's
                // console.log(users);
                assert(users[0]._id.toString() === joe._id.toString());
                done();
            });
    });

    /*  WRONG!!
    it.only('finds All users using toArray', (done) => {
        // done used coz operation is async
        User.find({ name: 'Joe' }).toArray(function(err,result){
            console.log(result);
            done();
        })
    });
    */

    it('findOne(_id)', (done) => {
        User.findOne({ _id: joe._id })
            .then( (user) => {
                assert( user.name === 'Joe');
                done();
            });
    });

    it('\'skip\' and \'limit\' the result set', (done) => {
        User.find({})
            .sort({ name: 1 })
            .skip(1)
            .limit(2)
            .then((users) => {
                assert(users.length === 2);
                assert(users[0].name === 'Joe');
                assert(users[1].name === 'Maria');
                done();
            });
    });


});