const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/userModel');

describe('CREATE', function(){
  // this.timeout(10000);
  
  it('Saving user in Db', function(done){
      // done used coz operation is async

    const joe = new User({ name: 'Joe' });

    joe.save()
        .then( function(){
    		// Is it inserted?
    		assert(!joe.isNew);
    		done();
    	});


      /* Works Well!!
      const Users = mongoose.model('user');

       Users.create( {name: 'Deva'}, function(err,res){
           if (err) {
               throw err;
           }else{
               assert(true);
               console.log('[Create_test]:',res);
           }
           done();
       })
       */


     /* Do not use this
     const { users,comments,blogposts } = mongoose.connection.collections;

     users.insertOne({name: 'Deva'},function(err,res){
        if (err) {
            throw err;
        }else{
            assert(true);
        }

        done();
     })
    */



	});


});