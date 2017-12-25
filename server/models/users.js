
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

let UserSchema = new Schema({
    updated_at: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String
    },
    userName: {
        type: String,
        required: true,
        index: { unique: true }
    },
	password: { 
        type: String, 
        reuired: true, 
        select: false 
    }
});

UserSchema.pre('save', function(done) {
    let self = this;
    if(self.isModified('password')) {
      bcrypt.hash(self.password, null, null, (err, hash) => {
        if(err) return next(err);
  
        this.password = hash;
        this.updated_at = new Date().toISOString();
        done();
      });
    } else {
      return done();
    }
  });

// UserSchema.methods.comparePassword = function(password) {
//     let user = this;

//     return bycrypt.compareSync(password, user.password);
// }

UserSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err){
        console.log('From compare: ', err);
        } else{
            console.log('From compare: ', isMatch);
        }
    });
};

module.exports = mongoose.model('users', UserSchema);
