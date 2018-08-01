const assert = require('assert');
const User = require('../src/userModel');

describe('D-Delete',function() {
    // this.timeout(5000);
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });

        joe.save()
            .then( () => done() );
    });


    it('instance-----remove via callback', function (done) {
        joe.remove().then(function () {
            User.findOne({name : 'Joe'});
        }).then(function (user) {
            // console.log(user,"!!!!");
            assert(user === undefined);
            done();
        })
    });

    it('instance-----remove via callback', function (done) {
        joe.remove(function(err,res){
            if(err)
                assert(false);
            else
                assert(res);
            // console.log('err:',err);
            // console.log('res:',res);

            done();
        })
    });


    it('class-----remove', function (done) {
        User.remove()
            .then(function () {
                // const ckkl;
                // console.log("Hellih");
                User.findOne({name : 'Joe'});
            })
            .then(function (user) {
                // console.log(user,"!!!!");
                assert(user === undefined);
                done();
            })
    });

    it('class-----findOneAndRemove', (done) => {
        User.findOneAndRemove({ name: 'Joe' })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class-----findByIdAndRemove', (done) => {
        User.findByIdAndRemove(joe._id)
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });


});